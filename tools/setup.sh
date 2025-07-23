#!/bin/bash

INFO_SCRIPT_PATH="./tools/info.sh"
INFO_STATUS_FILE="/tmp/info_status.env"
TIME_THRESHOLD=$((60 * 60 * 24)) # 24 hours in seconds

# Check if info_status.env exists and is fresh
if [ ! -f "$INFO_STATUS_FILE" ]; then
  echo "$INFO_STATUS_FILE: file not found. Running $INFO_SCRIPT_PATH..."
  "$INFO_SCRIPT_PATH"
elif [ $(( $(date +%s) - $(stat -c %Y "$INFO_STATUS_FILE") )) -gt "$TIME_THRESHOLD" ]; then
  echo "$INFO_STATUS_FILE is older than $TIME_THRESHOLD seconds. Re-running $INFO_SCRIPT_PATH..."
  "$INFO_SCRIPT_PATH"
fi

# Validate that info_status.env now exists
if [ ! -f "$INFO_STATUS_FILE" ]; then
  echo "Error: $INFO_SCRIPT_PATH failed to create $INFO_STATUS_FILE. Cannot proceed. Check location and permissions."
  exit 1
fi

echo "Information script ran successfully."


# --- Package Check ---
# Updated list of Debian APT packages to check
# 'nodejs' for Node.js runtime
# 'npm' for Node Package Manager
# 'python3' for Python 3 runtime
# 'nginx' for nginx web server
# 'mongodb' for MongoDB database
# 'certbot' for Let's Encrypt SSL certificates
# 'docker.io' for Docker engine
# 'git' for Git version control
# 'doctl' for Digital Ocean
PACKAGES_TO_CHECK="nodejs npm python3 nginx mongodb certbot docker.io git doctl"
MISSING_PACKAGES=()


------------------------------------------------------------
#check if anything is written in the installed attribute of a package
check_package_installed_apt_policy() {
  local pkg_name="$1"
  if apt-cache policy "$pkg_name" 2>/dev/null | grep -q "Installed: (none)"; then
    echo "Package '$pkg_name' is NOT installed."
    return 1
  else
    echo "Package '$pkg_name' is installed."
    return 0
  fi
}

#iterate through packages, adding any not found to our string
for pkg in $PACKAGES_TO_CHECK; do
  if ! check_package_installed_apt_policy "$pkg"; then
    ALL_PACKAGES_INSTALLED=false
    MISSING_PACKAGES+="$pkg "
  fi
done

if [ "$ALL_PACKAGES_INSTALLED" = true ]; then
  echo "All required system packages are installed."
  exit 0
else
  echo "Not all required system packages are installed."
  echo "Missing packages: $MISSING_PACKAGES"
  exit 1
fi


# Handle missing packages
if [ "$ALL_PACKAGES_INSTALLED" = false ]; then
  echo "Not all required system packages are installed."
  echo "Missing packages: $MISSING_PACKAGES"
  
  # Ask the user if they want to install the missing packages
  read -p "Do you want to attempt to install the missing packages? (y/N): " install_choice
  
  if [[ "$install_choice" =~ ^[Yy]$ ]]; then
    echo "Attempting to install missing packages using sudo..."
    # Use sudo to install packages. The -y flag automatically answers yes to prompts.
    # shellcheck disable=SC2086 # We want word splitting for $MISSING_PACKAGES here
    sudo apt update && sudo apt install -y $MISSING_PACKAGES
    
    # Verify installation
    REMAINING_MISSING=""
    for pkg in $MISSING_PACKAGES; do
      if ! check_package_installed_apt_policy "$pkg"; then
        REMAINING_MISSING+="$pkg "
      fi
    done
    
    if [ -z "$REMAINING_MISSING" ]; then
      echo "All missing packages installed successfully."
    else
      echo "Some packages failed to install: $REMAINING_MISSING"
    fi
  else
    echo "Skipping package installation. Exiting."
    exit 1
  fi
else
  echo "All required system packages are installed."
fi

echo "Starting project setup"

DEFAULT_PROJECT_DIR="$HOME/projects/"

# Prompt user for project directory
read -p "Enter the absolute path for your project directory: " PROJECT_DIR

# Validate the path
if [ -z "$PROJECT_DIR" ]; then
  echo "Error: Project directory cannot be empty."
  exit 1
fi