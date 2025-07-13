#!/bin/bash

if [ "$EUID" -eq 0 ]; then
  echo "This script should be run by a user account."
  echo "Do NOT run as root or use 'sudo' to execute this script."
  exit 1
fi

if [ ! -f "/tmp/info_status.env" ]; then
  echo "Error: /tmp/info_status.env not found."
  exit 1
fi
source /tmp/info_status.env

if [ "$HAS_SUDO" != "Yes" ]; then
  echo "Current user: '$USERNAME' does NOT have sudo access."
  exit 1
fi

# Updated list of Debian APT packages to check
# 'nodejs' for Node.js runtime
# 'npm' for Node Package Manager
# 'python3' for Python 3 runtime
# 'nginx' for web server
# 'mongodb' for MongoDB database
# 'certbot' for Let's Encrypt SSL certificates
PACKAGES_TO_CHECK="nodejs npm python3 nginx mongodb certbot"
MISSING_PACKAGES=""
ALL_PACKAGES_INSTALLED=true

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