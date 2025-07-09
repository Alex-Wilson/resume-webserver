#!/bin/bash

# Function to check for command existence
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Initial Welcome and System Information Display
echo "#####################################################"
echo "#       System Health Check and Initialization    #"
echo "#                 Script                          #"
echo "#####################################################"

echo -e "\n--- Initial System Overview ---"

# OS
echo "OS: $(lsb_release -ds 2>/dev/null || grep '^PRETTY_NAME=' /etc/os-release | cut -d'=' -f2 | tr -d '"' || uname -o)"
# User
echo "User: $(whoami)"

# CPU related
echo -e "\nCPU Info:"
if command_exists lscpu; then
  lscpu | grep -E 'Model name|CPU\(s\):|Thread' | sed 's/^  *//' | tr '\n' ' ' | sed 's/  */, /g; s/, $//'
else
  echo "  lscpu not found."
fi

echo -e "CPU Usage (Snapshot):"
if command_exists mpstat; then
  mpstat 1 1 | grep 'Average' | awk '{print "  " $NF "% Idle"}'
elif command_exists sar; then
  sar 1 1 | grep 'Average' | awk '{print "  " $NF "% Idle"}'
elif command_exists top; then
  echo "  $(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/g" | awk '{print 100 - $1}')% Used"
else
  echo "  (Install sysstat or top for detailed CPU usage)"
fi

# Mem related
echo -e "\nMemory Usage:"
free -h | awk 'NR==1 || NR==2' | column -t

# Disk related
echo -e "\nDisk Usage:"
df -h | awk 'NR==1 || /^\/dev\// {print $1, $2, $3, $4, $5, $6}' | column -t

# Network Wired/Wi-Fi (keeping this general as it's just interfaces)
echo -e "\nNetwork Interfaces:"
if command_exists ip; then
  ip -o -4 a | awk '{print "  " $2 ": " $4 " (" $7 ")"}'
else
  echo "  ip command not found."
fi

# Network Related (e.g., DNS, routing, but for simplicity, we'll keep it to just ping)
# If you wanted more "network related" info, you might add:
# echo "  DNS Servers: $(grep -E '^nameserver' /etc/resolv.conf | awk '{print $2}' | paste -sd ", " -)"
# echo "  Default Gateway: $(ip r | grep default | awk '{print $3}')"

# Internet connectivity being the last
echo -e "\nInternet Connectivity (8.8.8.8):"
if command_exists ping; then
  ping -c 1 8.8.8.8 > /dev/null 2>&1 && echo "  ✅ Connected" || echo "  ❌ Disconnected"
else
  echo "  ping command not found."
fi

echo -e "\n-----------------------------------------------------\n"

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
