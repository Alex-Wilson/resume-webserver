#!/bin/bash

# --- Dependency Check ---
INFO_SCRIPT_PATH="./tools/info.sh"
INFO_STATUS_FILE="/tmp/info_status.env"

if [ ! -f "$INFO_STATUS_FILE" ]; then
  echo "$INFO_STATUS_FILE not found. Running $INFO_SCRIPT_PATH..."
  "$INFO_SCRIPT_PATH"
  
  if [ ! -f "$INFO_STATUS_FILE" ]; then
      echo "Error: $INFO_SCRIPT_PATH failed to create $INFO_STATUS_FILE. Cannot proceed."
      exit 1
  fi
fi

#link file
source /tmp/info_status.env


# --- Package Check ---
# Updated list of Debian APT packages to check
# 'nodejs' for Node.js runtime
# 'npm' for Node Package Manager
# 'python3' for Python 3 runtime
# 'nginx' for web server
# 'mongodb' for MongoDB database
# 'certbot' for Let's Encrypt SSL certificates
# 'docker.io' for Docker engine
PACKAGES_TO_CHECK="nodejs npm python3 nginx mongodb certbot docker.io"
MISSING_PACKAGES=""
ALL_PACKAGES_INSTALLED=true


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

echo ""

if [ "$ALL_PACKAGES_INSTALLED" = true ]; then
  echo "All required system packages are installed."
  exit 0
else
  echo "Not all required system packages are installed."
  echo "Missing packages: $MISSING_PACKAGES"
  exit 1
fi