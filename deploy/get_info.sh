#!/bin/bash

# --- Helper Functions ---
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

write_to_info_file() {
  local filename="/tmp/info.env"
  echo -n "" > "$filename" # Clear the file at the start
  local -n data_ref="$1"
  for key in "${!data_ref[@]}"; do
    echo "$key=\"${data_ref[$key]}\"" >> "$filename"
  done
}

# --- Parsing Functions for Complex Data ---

# Parses df output to calculate total disk capacity in GB
parse_disk_sizes_for_gb() {
  local awk_script='
  /^Filesystem/ { next }
  !/\/dev\/sr[0-9]*/ && !/\/dev\/loop[0-9]*/ && !/tmpfs/ && !/devtmpfs/ && !/overlay/ && !/squashfs/ {
    cap=$2; unit=""; total_gb=0;
    if (cap ~ /[0-9.]*[MGTP]/) {
      val=gensub(/([0-9.]*)([MGTP])/, "\\1", "g", cap); unit=gensub(/([0-9.]*)([MGTP])/, "\\2", "g", cap);
      if (unit == "G") total_gb += val; else if (unit == "M") total_gb += val / 1024; else if (unit == "T") total_gb += val * 1024;
    } else { if (cap ~ /^[0-9]*$/ && cap > 1000000) total_gb += cap / 1000000000; }
  }
  END { printf "%.0f", total_gb }
  '
  if command_exists df; then
    df -hP | awk "$awk_script"
  else
    echo "N/A"
  fi
}

# Parses lsblk output to extract drive names, sizes, FS types, and mount points
parse_lsblk_for_drive_details() {
  local awk_script='
  !/\/dev\/sr[0-9]*/ && !/\/dev\/loop[0-9]*/ {
    name=$1; size=$2; fstype=$3; mountpoint=$4;
    if (mountpoint != "" && fstype != "" && fstype != "vfat" && fstype != "ntfs" && fstype != "exfat") { NUM_DRIVES++; }
    drive_info = "  Name: " name ", Size: " size ", FS Type: " fstype ", Mounted On: " mountpoint;
    print drive_info;
  }
  END { print NUM_DRIVES }
  '
  if command_exists lsblk && command_exists awk; then
    local output
    output=$(lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT -d -p --noheadings | awk "$awk_script")
    local drive_details
    local num_drives
    num_drives=$(echo "$output" | tail -n 1)
    drive_details=$(echo "$output" | head -n -1)
    printf "%s\n%s" "$drive_details" "$num_drives"
  else
    printf "%s\n%s" "Could not gather disk information." "N/A"
  fi
}

# Fallback for drive details if lsblk is not available
parse_df_for_drive_details() {
  local awk_script='
  /^Filesystem/ { next }
  !/\/dev\/sr[0-9]*/ && !/\/dev\/loop[0-9]*/ && !/tmpfs/ && !/devtmpfs/ && !/overlay/ && !/squashfs/ {
    fs=$1; size=$2; used=$3; avail=$4; mountpoint=$6; fstype=$7;
    if (fs ~ /\/dev\/sd[a-z][0-9]*/ || fs ~ /\/dev\/nvme[0-9]*n[0-9]*/) { NUM_DRIVES++; }
    drive_info = "  Filesystem: " fs ", Size: " size ", Used: " used ", Avail: " avail ", Mountpoint: " mountpoint ", FS Type: " fstype;
    print drive_info;
  }
  END { print NUM_DRIVES }
  '
  if command_exists df && command_exists awk; then
    local output
    output=$(df -hP | awk "$awk_script")
    local drive_details
    local num_drives
    num_drives=$(echo "$output" | tail -n 1)
    drive_details=$(echo "$output" | head -n -1)
    printf "%s\n%s" "$drive_details" "$num_drives"
  else
    printf "%s\n%s" "Could not gather disk information." "N/A"
  fi
}


# --- Information Gathering Functions ---
get_os_info() {
  OS_NAME=$(lsb_release -ds 2>/dev/null || grep '^PRETTY_NAME=' /etc/os-release | cut -d'=' -f2 | tr -d '"' || uname -o)  # Add OS_VERSION here
  if command_exists lsb_release; then
    OS_VERSION=$(lsb_release -rs)
  elif grep -q '^VERSION_ID=' /etc/os-release; then
    OS_VERSION=$(grep '^VERSION_ID=' /etc/os-release | cut -d= -f2 | tr -d '"')
  else
    OS_VERSION=$(uname -r) # Fallback to kernel version if no OS version found
  fi
  CURRENT_DIR=$(pwd)
  CURRENT_USER=$(whoami)
  IS_ROOT=$(if [ "$EUID" -eq 0 ]; then echo "Yes"; else echo "No"; fi)
}

get_all_users() {
  ALL_USERS=$(awk -F: '{ if ($7 != "" && $7 != "/sbin/nologin" && $7 != "/bin/false" && $7 != "/usr/sbin/nologin") print $1}' /etc/passwd | paste -sd ', ' -)
}

get_network_info() {
  if command_exists ping; then
    PING_RESULT=$(ping -c 1 8.8.8.8 >/dev/null 2>&1 && echo "Connected" || echo "Disconnected")
  else
    PING_RESULT="ping not found"
  fi

  if command_exists ip; then
    IP4_ADDR=$(ip -o -4 addr show | awk '!/ lo / {print $4}' | cut -d'/' -f1 | head -n1)
    IP6_ADDR=$(ip -o -6 addr show scope global | awk '!/ lo / {print $4}' | cut -d'/' -f1 | head -n1)
    [ -z "$IP6_ADDR" ] && IP6_ADDR="N/A"
    INTERFACES=$(ip -o link show | awk -F': ' '{print $2}' | paste -sd ', ' -)
  else
    IP4_ADDR="N/A"
    IP6_ADDR="N/A"
    INTERFACES="N/A"
  fi
}

get_cpu_info() {
  CPU_MODEL=$(lscpu | grep 'Model name' | awk -F: '{print $2}' | sed 's/^[ \t]*//')
  CPU_FREQ=$(lscpu | grep 'CPU MHz' | awk -F: '{print $2}' | sed 's/^[ \t]*//' | xargs printf "%.0f MHz")
  CPU_THREADS=$(lscpu | grep '^CPU(s):' | awk -F: '{print $2}' | sed 's/^[ \t]*//')

  if command_exists mpstat; then
    CPU_USAGE=$(mpstat 1 1 | awk '/Average/ { printf("%.1f%% Used", 100 - $NF) }')
  elif command_exists top; then
    CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8 "% Used"}')
  else
    CPU_USAGE="Unavailable"
  fi
}

get_ram_info() {
  RAM_TOTAL=$(free -h | awk '/Mem:/ {print $2}')
  RAM_USED=$(free -h | awk '/Mem:/ {print $3}')
  RAM_AVAIL=$(free -h | awk '/Mem:/ {print $7}')

  if command_exists dmidecode; then
    RAM_SPEED=$(sudo dmidecode --type 17 | grep 'Speed:' | grep -m 1 -v "Configured" | awk '{print $2, $3}')
  else
    RAM_SPEED="N/A"
  fi
}

get_disk_info() {
  local total_disk_capacity_gb=0
  local num_drives=0
  local drive_details=""

  total_disk_capacity_gb=$(parse_disk_sizes_for_gb)

  if command_exists lsblk && command_exists awk; then
    local lsblk_output_and_count
    lsblk_output_and_count=$(parse_lsblk_for_drive_details)
    num_drives=$(echo "$lsblk_output_and_count" | tail -n 1)
    drive_details=$(echo "$lsblk_output_and_count" | head -n -1)

    if [[ "$num_drives" == "N/A" || -z "$num_drives" ]]; then
      local df_output_and_count
      df_output_and_count=$(parse_df_for_drive_details)
      num_drives=$(echo "$df_output_and_count" | tail -n 1)
      drive_details=$(echo "$df_output_and_count" | head -n -1)
    fi
  elif command_exists df && command_exists awk; then
    local df_output_and_count
    df_output_and_count=$(parse_df_for_drive_details)
    num_drives=$(echo "$df_output_and_count" | tail -n 1)
    drive_details=$(echo "$df_output_and_count" | head -n -1)
  else
    num_drives="N/A"
    drive_details="Could not gather disk information."
  fi

  DISK_TOTAL="$total_disk_capacity_gb"
  NUM_DRIVES=$num_drives
  DRIVE_DETAILS="$drive_details"
}

get_package_manager_info() {
  PKG_MANAGER=""
  PKG_MANAGER_VERSION=""

  if command_exists apt; then
    PKG_MANAGER="apt"
    PKG_MANAGER_VERSION=$(apt --version | head -n1)
  elif command_exists dnf; then
    PKG_MANAGER="dnf"
    PKG_MANAGER_VERSION=$(dnf --version | head -n1)
  elif command_exists yum; then
    PKG_MANAGER="yum"
    PKG_MANAGER_VERSION=$(yum --version | head -n1)
  elif command_exists pacman; then
    PKG_MANAGER="pacman"
    PKG_MANAGER_VERSION=$(pacman --version | head -n1)
  fi
}

get_hostname_info() {
  HOSTNAME_VALUE=$(hostname)
}

get_kernel_info() {
  KERNEL_VERSION=$(uname -r)
}

get_ufw_status() {
  if command_exists ufw; then
    UFW_STATUS=$(sudo ufw status | head -n 1 | awk '{print $2}') # Gets "Status: inactive" or "Status: active" and takes second field
    if [[ "$UFW_STATUS" == "inactive" ]]; then
      UFW_STATUS="Inactive"
    elif [[ "$UFW_STATUS" == "active" ]]; then
      UFW_STATUS="Active"
    else
      UFW_STATUS="Unknown"
    fi
  else
    UFW_STATUS="UFW not installed"
  fi
}

# --- Display Information ---
display_system_info() {
  echo "#####################################################"
  echo "#             Health and Info Check                #"
  echo "#####################################################"

  echo -e "\n--- System Overview ---"
  printf "+----------------------+-----------------------------+\n"
  printf "| %-20s | %-27s |\n" "Hostname" "$HOSTNAME_VALUE"
  printf "| %-20s | %-27s |\n" "OS" "$OS_NAME"
  printf "| %-20s | %-27s |\n" "OS Version" "$OS_VERSION"
  printf "| %-20s | %-27s |\n" "Kernel" "$KERNEL_VERSION"
  printf "| %-20s | %-27s |\n" "User" "$CURRENT_USER"
  printf "| %-20s | %-27s |\n" "All Users" "$ALL_USERS"
  printf "| %-20s | %-27s |\n" "Root/Sudo" "$IS_ROOT"
  printf "| %-20s | %-27s |\n" "Current Directory" "$CURRENT_DIR"
  printf "| %-20s | %-27s |\n" "Package Manager" "$PKG_MANAGER $PKG_MANAGER_VERSION"
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
  printf "+----------------------+-----------------------------+\n"

  echo -e "\n--- Disk Overview ---"
  printf "+----------------------+-----------------------------+\n"
  printf "| %-20s | %-27s |\n" "Total Disk Capacity" "$DISK_TOTAL"
  printf "| %-20s | %-27s |\n" "Number of Drives" "$NUM_DRIVES"
  printf "+----------------------+-----------------------------+\n"

  # Print the multi-line DRIVE_DETAILS if it contains content
  if [[ -n "$DRIVE_DETAILS" ]]; then
    echo -e "\n--- Drive Details ---"
    echo -e "$DRIVE_DETAILS" # This variable already contains newlines and formatting
    printf "+-----------------------------------------------------+\n"
  fi

  echo -e "\n--- Security Overview ---"
  printf "+----------------------+-----------------------------+\n"
  printf "| %-20s | %-27s |\n" "UFW Status" "$UFW_STATUS"
  printf "+----------------------+-----------------------------+\n"
}


# --- Main Execution ---
get_os_info
get_all_users
get_network_info
get_cpu_info
get_ram_info
get_disk_info
get_package_manager_info
get_hostname_info
get_kernel_info
get_ufw_status

# --- Display Information ---
display_system_info

# --- Save Information to File ---
declare -A info_data
info_data["OS_NAME"]="$OS_NAME"
info_data["OS_VERSION"]="$OS_VERSION"
info_data["KERNEL_VERSION"]="$KERNEL_VERSION"
info_data["HOSTNAME"]="$HOSTNAME_VALUE"
info_data["CURRENT_DIR"]="$CURRENT_DIR"
info_data["CURRENT_USER"]="$CURRENT_USER"
info_data["IS_ROOT"]="$IS_ROOT"
info_data["ALL_USERS"]="$ALL_USERS"
info_data["PING_RESULT"]="$PING_RESULT"
info_data["IP4_ADDR"]="$IP4_ADDR"
info_data["IP6_ADDR"]="$IP6_ADDR"
info_data["INTERFACES"]="$INTERFACES"
info_data["CPU_MODEL"]="$CPU_MODEL"
info_data["CPU_FREQ"]="$CPU_FREQ"
info_data["CPU_THREADS"]="$CPU_THREADS"
info_data["CPU_USAGE"]="$CPU_USAGE"
info_data["RAM_TOTAL"]="$RAM_TOTAL"
info_data["RAM_USED"]="$RAM_USED"
info_data["RAM_AVAIL"]="$RAM_AVAIL"
info_data["RAM_SPEED"]="$RAM_SPEED"
info_data["DISK_TOTAL"]="$DISK_TOTAL"
info_data["NUM_DRIVES"]="$NUM_DRIVES"
info_data["DRIVE_DETAILS"]="$DRIVE_DETAILS"
info_data["PKG_MANAGER"]="$PKG_MANAGER"
info_data["PKG_MANAGER_VERSION"]="$PKG_MANAGER_VERSION"
info_data["UFW_STATUS"]="$UFW_STATUS"

write_to_info_file "info_data"

echo -e "\nHealth and information check completed!\n"
exit 0