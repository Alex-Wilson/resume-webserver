#!/bin/bash

if [ "$EUID" -eq 0 ]; then
  echo "This script should be run by a user account."
  echo "Do NOT run as root or use 'sudo' to execute this script."
  echo "The user must have sudo privileges, but the script should be run normally."
  exit 1
fi

./info.sh || {
  echo "Failed to execute info.sh. Check permissions or path."
  exit 1
}

source /tmp/info_status.env


# Check if current user has sudo access
if [ "$HAS_SUDO" != "Yes" ]; then
  echo "Current user: '$USERNAME' does NOT have sudo access."

  # Check if any users have sudo privileges
  SUDO_USERS=$(getent group sudo | cut -d: -f4 | tr ',' '\n' | grep -v '^$')

  if [ -z "$SUDO_USERS" ]; then
    echo "No users with sudo privileges exist on this system."
  fi
  exit 1
fi

PACKAGES_TO_CHECK="node nginx"

# Variable to track if all packages are installed
ALL_PACKAGES_INSTALLED=true

# Function to check if a package is installed using apt
check_package_installed_apt() {
  local pkg_name="$1"
  # apt list --installed returns lines like "package/release,now version install-state"
  # We grep for the package name and check if the line contains ",automatic" or ",local"
  # which usually indicates it's installed.
  # A more robust way might be to check the exit code of 'apt-cache policy' or similar.
  # For simplicity and common use cases, checking the output of apt list is often sufficient.
  if apt list --installed 2>/dev/null | grep -q "^$pkg_name/"; then
    echo "Package '$pkg_name' is installed."
    return 0 # Success
  else
    echo "Package '$pkg_name' is NOT installed."
    return 1 # Failure
  fi
}

# Iterate over the packages and check their installation status
for pkg in $PACKAGES_TO_CHECK; do
  if ! check_package_installed "$pkg"; then
    ALL_PACKAGES_INSTALLED=false
  fi
done

# Report the final status
if [ "$ALL_PACKAGES_INSTALLED" = true ]; then
  echo "All required packages (node, nginx) are installed."
  exit 0
else
  echo "Not all required packages (node, nginx) are installed."
  exit 1
fi