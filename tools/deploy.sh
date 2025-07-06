#!/bin/bash

echo "Running basic Debian system test..."

# Show OS and kernel info
echo -e "\n--- OS Info ---"
cat /etc/os-release
uname -a

# Check disk space
echo -e "\n--- Disk Usage ---"
df -h

# Check memory usage
echo -e "\n--- Memory Usage ---"
free -h

# Check CPU info
echo -e "\n--- CPU Info ---"
lscpu | grep 'Model name\|CPU(s):\|Thread'

# Check network interfaces
echo -e "\n--- Network Interfaces ---"
ip a

# Ping test
echo -e "\n--- Internet Connectivity Test ---"
ping -c 3 8.8.8.8

# Package manager test
echo -e "\n--- APT Package List ---"
apt list --installed | head -n 10

echo -e "\n✅ System test complete."

# Deployment/update section
echo -e "\n--- Updating resume-webserver ---"

TARGET_DIR="/var/www/resume-webserver"

if [ ! -d "$TARGET_DIR" ]; then
  echo "📁 Directory $TARGET_DIR does not exist. Creating it..."
  sudo mkdir -p "$TARGET_DIR" || {
    echo "❌ Failed to create $TARGET_DIR"
    exit 1
  }
  sudo chown "$USER":"$USER" "$TARGET_DIR"
fi

cd "$TARGET_DIR" || {
  echo "❌ Failed to navigate to $TARGET_DIR"
  exit 1
}

echo "📦 Stashing local changes (if any)..."
git stash save "Auto-stash before pulling latest from GitHub"

echo "🔄 Pulling latest changes from GitHub (rebase)..."
git pull origin master --rebase || {
  echo "❌ Git pull failed. Resolve issues manually."
  exit 1
}

echo "📤 Reapplying local changes (if any)..."
git stash pop || echo "✅ No stashed changes to apply."

echo "📦 Installing updated dependencies..."
npm install --omit=dev

echo "🚀 Restarting PM2 process..."
pm2 restart resume-website

echo "🌐 Restarting Nginx..."
sudo systemctl restart nginx

echo "📖 Tailing logs..."
pm2 logs resume-website
