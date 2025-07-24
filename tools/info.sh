#!/bin/bash

# Check for the prerequisite info file (This comment might be for the other script, keeping it as is)
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

OS_NAME=$(lsb_release -ds 2>/dev/null || grep '^PRETTY_NAME=' /etc/os-release | cut -d'=' -f2 | tr -d '"' || uname -o)
CURRENT_DIR=$(pwd)
CURRENT_USER=$(whoami)
IS_ROOT=$(if [ "$EUID" -eq 0 ]; then echo "Yes"; else echo "No"; fi)

# All Users
# Fetching users from /etc/passwd, excluding system users that typically don't have shells
# and ensuring each user is listed only once.
ALL_USERS=$(awk -F: '{ if ($7 != "" && $7 != "/sbin/nologin" && $7 != "/bin/false" && $7 != "/usr/sbin/nologin") print $1}' /etc/passwd | paste -sd ', ' -)


# Internet Connectivity
if command_exists ping; then
  PING_RESULT=$(ping -c 1 8.8.8.8 >/dev/null 2>&1 && echo "Connected" || echo "Disconnected")
else
  PING_RESULT="ping not found"
fi

# IPv4 Address (first non-loopback)
if command_exists ip; then
  IP4_ADDR=$(ip -o -4 addr show | awk '!/ lo / {print $4}' | cut -d'/' -f1 | head -n1)
else
  IP4_ADDR="N/A"
fi

# IPv6 Address (first non-loopback, global scope preferred)
if command_exists ip; then
  IP6_ADDR=$(ip -o -6 addr show scope global | awk '!/ lo / {print $4}' | cut -d'/' -f1 | head -n1)
  [ -z "$IP6_ADDR" ] && IP6_ADDR="N/A"
else
  IP6_ADDR="N/A"
fi

# Network Interfaces
if command_exists ip; then
  INTERFACES=$(ip -o link show | awk -F': ' '{print $2}' | paste -sd ', ' -)
else
  INTERFACES="N/A"
fi

# CPU Info
CPU_MODEL=$(lscpu | grep 'Model name' | awk -F: '{print $2}' | sed 's/^[ \t]*//')
CPU_FREQ=$(lscpu | grep 'CPU MHz' | awk -F: '{print $2}' | sed 's/^[ \t]*//' | xargs printf "%.0f MHz")
CPU_THREADS=$(lscpu | grep '^CPU(s):' | awk -F: '{print $2}' | sed 's/^[ \t]*//')

# CPU Usage Snapshot
if command_exists mpstat; then
  CPU_USAGE=$(mpstat 1 1 | awk '/Average/ { printf("%.1f%% Used", 100 - $NF) }')
elif command_exists top; then
  CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8 "% Used"}')
else
  CPU_USAGE="Unavailable"
fi

# RAM total and speed (speed from dmidecode if available)
RAM_TOTAL=$(free -h | awk '/Mem:/ {print $2}')
if command_exists dmidecode; then
  RAM_SPEED=$(sudo dmidecode --type 17 | grep 'Speed:' | grep -m 1 -v "Configured" | awk '{print $2, $3}')
else
  RAM_SPEED="N/A"
fi

# RAM usage
RAM_USED=$(free -h | awk '/Mem:/ {print $3}')
RAM_AVAIL=$(free -h | awk '/Mem:/ {print $7}')

# Disk usage (root partition)
DISK_TOTAL=$(df -h / | awk 'NR==2 {print $2}')
DISK_USED=$(df -h / | awk 'NR==2 {print $3}')
DISK_AVAIL=$(df -h / | awk 'NR==2 {print $4}')
DISK_FS=$(df -T / | awk 'NR==2 {print $2}')


# Initial Welcome and System Information Display
echo "#####################################################"
echo "#             Health and Info Check                #"
echo "#####################################################"
printf "+----------------------+-----------------------------+\n"
printf "+----------------------+-----------------------------+\n"
echo -e "\n--- System Overview ---"
printf "+----------------------+-----------------------------+\n"
printf "| %-20s | %-27s |\n" "OS" "$OS_NAME"
printf "| %-20s | %-27s |\n" "User" "$CURRENT_USER"
printf "| %-20s | %-27s |\n" "All Users" "$ALL_USERS" # Added All Users here
printf "| %-20s | %-27s |\n" "Root/Sudo" "$IS_ROOT"
printf "| %-20s | %-27s |\n" "Current Directory" "$CURRENT_DIR"
printf "| %-20s | %-27s |\n" "Package Manager" "$CURRENT_DIR"
printf "+----------------------+-----------------------------+\n"
echo -e "\n--- Network Overview ---"
printf "+----------------------+-----------------------------+\n"
printf "| %-20s | %-27s |\n" "Internet Connectivity" "$PING_RESULT"
printf "| %-20s | %-27s |\n" "IPv4 Address" "$IP4_ADDR"
printf "| %-20s | %-27s |\n" "IPv6 Address" "$IP6_ADDR"
printf "| %-20s | %-27s |\n" "Interfaces" "$INTERFACES"
printf "+----------------------+-----------------------------+\n"
echo -e "\n--- Hardware Overview ---"
printf "+----------------------+-----------------------------+\n"
printf "| %-20s | %-27s |\n" "CPU Model" "$CPU_MODEL"
printf "| %-20s | %-27s |\n" "CPU Frequency" "$CPU_FREQ"
printf "| %-20s | %-27s |\n" "CPU Threads" "$CPU_THREADS"
printf "| %-20s | %-27s |\n" "CPU Usage" "$CPU_USAGE"
printf "| %-20s | %-27s |\n" "RAM Total" "$RAM_TOTAL"
printf "| %-20s | %-27s |\n" "RAM Speed" "$RAM_SPEED"
printf "| %-20s | %-27s |\n" "RAM Used" "$RAM_USED"
printf "| %-20s | %-27s |\n" "RAM Available" "$RAM_AVAIL"
printf "| %-20s | %-27s |\n" "Disk Total" "$DISK_TOTAL"
printf "| %-20s | %-27s |\n" "Disk Used" "$DISK_USED"
printf "| %-20s | %-27s |\n" "Disk Available" "$DISK_AVAIL"
printf "| %-20s | %-27s |\n" "Disk FS Type" "$DISK_FS"
printf "+----------------------+-----------------------------+\n"
printf "+----------------------+-----------------------------+\n"

STATUS_FILE="/tmp/info_status.env"
echo "USERNAME=\"$CURRENT_USER\"" >> "$STATUS_FILE"
echo "IS_ROOT=\"$IS_ROOT\"" >> "$STATUS_FILE"
echo "PACKAGE_MANAGER=\"$PKG_MANAGER\"" >> "$STATUS_FILE"
echo "PACKAGE_MANAGER_VERSION=\"$PKG_MANAGER_VERSION\"" >> "$STATUS_FILE"
echo "INTERNET=\"$PING_RESULT\"" >> "$STATUS_FILE"
echo "IPV4=\"$IP4_ADDR\"" >> "$STATUS_FILE"
echo "IPV6=\"$IP6_ADDR\"" >> "$STATUS_FILE"
echo "CPU_USAGE=\"$CPU_USAGE\"" >> "$STATUS_FILE"
echo "RAM_TOTAL=\"$RAM_TOTAL\"" >> "$STATUS_FILE"
echo "RAM_AVAIL=\"$RAM_AVAIL\"" >> "$STATUS_FILE"
echo "DISK_TOTAL=\"$DISK_TOTAL\"" >> "$STATUS_FILE"
echo "DISK_AVAIL=\"$DISK_AVAIL\"" >> "$STATUS_FILE"
echo "ALL_USERS=\"$ALL_USERS\"" >> "$STATUS_FILE"



echo -e "\nHealth and information check completed!\n"
exit 0