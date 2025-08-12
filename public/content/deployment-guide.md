# Normie Deployment Guide

A practical guide for deploying a simple yet relatively secure web server. This document assumes the reader is familiar with navigating a Windows computer.

## Prerequisites

Before proceeding, ensure you have the following:

- A Windows operating system with administrator privileges  
- A stable internet connection  
- A willingness to learn  
- Determination  
- Common sense (optional but encouraged)

## Step 0: Learning
--------- Cut this out to another doc later --------------------------------------
### `cmd.exe`, a Windows Terminal (?)
Your computer operates through a series of abstraction layers that simplify complex hardware operations into user-friendly interactions. While you may be used to common tasks such as playing video games, watching cat videos, or checking your email, these activities typically rely on a **Graphical User Interface (GUI)**. A GUI consists of windows, icons, buttons, and other visual elements that allow you to interact with your system using a mouse and keyboard. While intuitive and user-friendly, GUIs are not always the most efficient way to communicate with a computer.

Many of the world’s most powerful and important technologies operate primarily through **Command Line Interfaces (CLIs)**. These are environments which only accept **text-based input**. Think of this as  as commands. Although this may seem unintuitive at first, the CLI allows users to perform complex tasks repeatedly, autonomously, and with far greater control. Rather than clicking through dozens of checkboxes in a GUI, a single command-line instruction can accomplish the same result instantly and reliably.

The terms **terminal**, **shell**, and **command line** are often used interchangeably, but they refer to subtly different components of the command-line ecosystem:

| Term                          | Definition |
|-------------------------------|------------|
| **Command Line Interface (CLI) or Command Line** | A method of user interaction with a computer system in which commands are entered as **text-based input**. The CLI encompasses both the terminal and the shell, and is commonly used for system administration, development, and automation—especially in environments where graphical interfaces are unavailable or inefficient. `cmd.exe` is one implementation of a CLI, but CLIs can also be specific to individual programs or operating systems. |
| **Terminal**                  | A software application or environment that provides a text-based interface through which users can input commands and view output. The terminal serves as a container or host for the shell. Examples include `cmd.exe`, GNOME Terminal, and Windows Terminal. |
| **Shell**                     | A command-line interpreter that processes user input, interprets commands, and communicates with the operating system to perform requested tasks. It provides scripting capabilities and supports both interactive and automated execution. Examples include Command Prompt (`cmd.exe`), PowerShell, Bash, and Zsh. |


> At the beginning of *The Matrix*, Neo is shown interacting with a command line interface to communicate with an unknown entity. He uses a terminal to issue commands through the shell to his operating system and ultimately transmits a message. This dramatization reflects how CLI-based systems offer direct and powerful control over the machine.
### Launching `cmd.exe`
In Windows, the traditional terminal is `cmd.exe`. This guide exclusively uses `cmd.exe` for consistency. To launch the Command Prompt:
1. Press `Windows` + `R` 
2. Type `cmd`
3. Press `Enter`
### General Security Info
#### Information Security

**Information Security (InfoSec)**, refers to the practice of protecting data from unauthorized access, disclosure, alteration, or destruction. This protection applies to data in all forms, whether physical, digital, or transmitted. Effective information security ensures that systems and data remain trustworthy, confidential, and accessible only to those with appropriate authorization.

##### CIA Triade
| Principle           | Description                                                                                                   | Analogy                                                                 | Real-World Activity                                                   |
|---------------------|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| **Confidentiality** | Ensures only authorized individuals can access sensitive data.                                                 | Only librarians may enter the vault.                                   | Encrypting files, applying access controls, or requiring multi-factor authentication. |
| **Integrity**       | Guarantees that data remains accurate and unaltered unless explicitly changed by authorized users.             | Books must not be tampered with or modified without approval.          | Using file checksums or digital signatures to verify data integrity.  |
| **Availability**    | Ensures that data and systems are accessible when needed by authorized users.                                  | The vault must be open and accessible during working hours.            | Implementing redundant systems, maintaining regular backups, or mitigating denial-of-service attacks. |


#### Cybersecurity (CybSec)

The prefix **"cyber"** originates from the Greek word *kybernetes* (κυβερνήτης), meaning "steersman" or "governor." It was adapted into English through the term **cybernetics**, a field introduced in the 1940s by mathematician Norbert Wiener. Cybernetics refers to the study of systems, control, and communication in animals and machines. Over time, "cyber" became shorthand for anything involving computers, digital systems, or virtual environments. It is now widely used as a prefix in terms such as **cyberspace**, **cybercrime**, and **cybersecurity**. In modern usage, **"cyber"** refers broadly to digital technology, computer networks, and internet-connected systems.

Cybersecurity is a specialized branch of information security focused on the protection of digital systems, networks, devices, and data from unauthorized access, disruption, alteration, or destruction caused by cyber-based threats. While information security addresses the protection of data in all forms, cybersecurity is concerned specifically with the digital domain. This includes safeguarding networked systems such as computers, servers, cloud platforms, mobile devices, and the communication infrastructure that connects them. Cybersecurity efforts aim to uphold the CIA Triade for digital assets, often in real time, while also responding to evolving threat actors and techniques.

Cybersecurity is a broad and evolving field. While the domains listed below are commonly recognized, it is important to understand that cybersecurity can be organized in many different ways depending on the perspective: technical, operational, strategic, or organizational.

| Technical Domain                              | Description |
|-------------------------------------|-------------|
| **Governance, Risk, and Compliance (GRC)** | Focuses on aligning cybersecurity with business objectives, ensuring regulatory compliance, managing risk, and establishing security policies, frameworks, and audits. |
| **Security Architecture and Engineering** | Designs and builds secure IT infrastructure. Involves security models, secure systems design, segmentation, encryption protocols, and architectural risk assessments. |
| **Network Security**                | Protects the infrastructure and data transmitted across internal and external networks. Involves firewalls, IDS/IPS, VPNs, and network segmentation. |
| **Endpoint Security**              | Secures devices such as laptops, smartphones, and servers. Includes antivirus, EDR solutions, and configuration hardening. |
| **Application Security**           | Ensures software is designed and maintained to resist attacks. Includes secure coding practices, vulnerability scanning, and application firewalls. |
| **Identity and Access Management (IAM)** | Manages user identities and enforces access controls. Involves SSO, MFA, least privilege enforcement, and directory services. |
| **Cloud Security**                 | Protects data, applications, and workloads in cloud environments. Covers misconfiguration management, access controls, encryption, and shared responsibility models. |
| **Incident Response and Threat Detection (IR/TD)** | Detects, investigates, and responds to security incidents. Includes SOC operations, SIEM platforms, and forensic analysis. |
| **Offensive Security**             | Simulates attacks to uncover vulnerabilities. Includes red teaming, penetration testing, ethical hacking, and adversary emulation. |
| **Security Operations**            | Encompasses day-to-day tasks like log monitoring, alert triage, and continuous threat detection. Typically associated with Security Operations Centers (SOCs). |
| **Data Protection and Privacy**    | Focuses on safeguarding personal and sensitive information. Involves encryption, data loss prevention (DLP), and adherence to data privacy laws like GDPR or CCPA. |
| **Cryptography and Key Management**| Designs and implements cryptographic systems and manages digital certificates, encryption keys, and secure communications protocols. |
| **Physical Security**              | Protects physical infrastructure such as data centers, offices, and critical hardware from unauthorized access or tampering. Often integrates with cyber controls. |
| **Security Awareness and Training**| Educates users about cybersecurity best practices and social engineering risks. Supports organizational resilience through phishing simulations and user testing. |
| **Third-Party and Supply Chain Risk Management** | Assesses and mitigates risks introduced by vendors, contractors, and external dependencies. Often includes due diligence and contract controls. |

Cybersecurity professionals often work in specialized **roles** based on their approach to offense and defense:

| Operational Role        | Description |
|-------------|------|
| **Red Team** | Offensive specialists who simulate real-world attacks to identify vulnerabilities. |
| **Blue Team** | Defensive operators who monitor, protect, and respond to threats in real time. |
| **Purple Team** | A cooperative function that facilitates communication and shared learning between red and blue teams, helping improve defenses based on offensive insights. |

Cybersecurity practices can also be categorized by **when** in the attack timeline they operate also known as what **response phase** they operate in:

| Response Phase | Timing     | Focus |
|----------------|------------|-------|
| **Prevent**     | **Before** | Security architecture, hardening systems, patch management, employee training, and access control. |
| **Detect**      | **During** | Monitoring tools, intrusion detection systems, log analysis, threat intelligence, and anomaly detection. |
| **Respond**     | **After**  | Incident handling, containment, recovery, forensic investigation, and reporting. |

> These perspectives are not mutually exclusive. A strong cybersecurity strategy often maps tools, personnel, and processes across **all three views**: by **technical domain, by operational role, and by response phase**.

#### Operational Security (OpSec)
Consider the fear of returning to your Miami Vice mansion after a successful Hollywood-style bank robbery, only to realize you left your wallet and government-issued ID inside the vault. This is the essence of a failure in OpSec.

**Operational Security (OpSec)**, is the discipline of identifying and protecting critical information that could be used by adversaries to gain insight into systems, operations, or personnel. Originally developed in military and clandestine intelligence contexts, OpSec is now a core component of cybersecurity strategy across all industries. Unlike traditional security controls that focus on technical barriers, OpSec emphasizes **behavioral, procedural, and informational** risks that could lead to a security breach. The core goal of OpSec is to minimize the amount of actionable information an adversary can gather from observing routine operations, system outputs, or public disclosures.




Examples of :
- Avoiding password reuse  
- Masking or rotating IP addresses  
- Concealing internal system architecture  
- Restricting public disclosure of internal details





#### Analogy

Imagine being a covert agent:  
Even small details — such as the background of a selfie — might reveal your location or intentions. OpSec is about reducing what adversaries can infer from seemingly harmless information.

> *Loose tweets sink fleets.*

---

## Core Security Concepts

### Vulnerability vs Exploit vs Threat

| Term             | Definition                                                                                  | Analogy                          |
|------------------|----------------------------------------------------------------------------------------------|----------------------------------|
| **Vulnerability** | A weakness or flaw in a system that could be used to compromise security.                   | An unlocked door                 |
| **Exploit**        | A method or tool used to take advantage of a vulnerability.                                 | A person picking the lock        |
| **Threat**         | An entity or circumstance capable of exploiting a vulnerability to cause harm.             | A burglar targeting your home    |

#### Summary

- A **vulnerability** is a potential risk.  
- An **exploit** is the method of attack.  
- A **threat** is the actor or force carrying out the attack.

---

## Next Steps

Now that you understand the basic layers of system interaction and core security principles, you're ready to begin preparing your machine for secure web server deployment.














## Step 0: Initial Setup

### Password Manager

#### Why use one?
"I dont need one" - 🤡

In my opinion using a password manager is the greatest step that anyone can take to protect their data online. If you had a unq 



Wrong. If you use the same password across multiple sites, or store them in a sticky note (digital or physical), you're putting your data at risk. We need to practice Information Security. This is a series of practices.  




-Download Password Manager (KPXC)
-Create Email (Tua, Proton, RYO)
-Create Git Repo (GitHub, GitLab, RYO)
-Choose and register a domain name(Namecheap, PorkBun, Dreamhost, HostGator, CloudFlare)
-Choose and register with a hosting provider (Amazon Web Services, Digital Ocean, BackYardBandwidth, CloudFlare)





## 🔨 1. Development Environment Setup

### ✅ On Your Local Machine (Windows/Linux)
- Create your Node.js project (`npm init -y`)
- Write your app (e.g., `src/app.js`)
- Use Git for version control
- Push your repo to GitHub

```bash
ssh-keygen -t ed25519 -C "you@example.com" -f ~/.ssh/github_ed25519
```
- Add the public key to your GitHub account
- Configure `~/.ssh/config` to simplify SSH usage

```ssh
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_ed25519
```

---

## 🌐 2. DigitalOcean Droplet Creation

- Create a Debian-based droplet
- Upload your public SSH key during creation
- SSH into your droplet as `root`

```bash
ssh root@your-ip
```

- Create a new user (e.g., `willy`) with sudo access

```bash
adduser willy
usermod -aG sudo willy
```

---

## 🔒 3. SSH & Key Security

- Generate separate keys for root and willy on your local machine
- Lock down key permissions (`chmod 600` on Linux or `icacls` on Windows)
- Move SSH to a non-standard port (e.g., `1337`) in `/etc/ssh/sshd_config`
- Restart SSH and UFW:

```bash
sudo systemctl restart sshd
sudo ufw allow 1337/tcp
```

---

## 🔐 4. Firewall and Fail2Ban

- Enable UFW:
```bash
sudo ufw enable
sudo ufw allow 443/tcp
sudo ufw allow 1337/tcp
```
- Install Fail2Ban:
```bash
sudo apt install fail2ban
```
- Configure `/etc/fail2ban/jail.local` to protect SSH with generous limits:
```ini
[sshd]
enabled = true
port = 1337
maxretry = 100
```

---

## 🧰 5. Cloning and Running Your App

- Create a directory:
```bash
sudo mkdir -p /var/www
cd /var/www
```
- Clone your repo:
```bash
git clone git@github.com:your-username/your-repo.git
cd your-repo
```
- Install Node and PM2:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
npm install --omit=dev
```
- Start your app:
```bash
pm2 start src/app.js --name resume-website
pm2 save
pm2 startup
```

---

## 🌐 6. Nginx & SSL with Certbot

- Install Nginx and Certbot:
```bash
sudo apt install nginx python3-certbot-nginx
```
- Create your Nginx config at `/etc/nginx/sites-available/resume-website`

```nginx
server {
    server_name alexwilson.info www.alexwilson.info your.droplet.ip;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/alexwilson.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alexwilson.info/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name _;
    return 301 https://alexwilson.info$request_uri;
}
```
- Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/resume-website /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```
- Run Certbot:
```bash
sudo certbot --nginx -d alexwilson.info -d www.alexwilson.info
```

---

## 🔁 7. Deployment Flow

- Create a `deploy.sh` script:
```bash
#!/bin/bash
git stash
git pull --rebase
git stash pop
npm install --omit=dev
pm2 restart resume-website
sudo systemctl reload nginx
```
- Make it executable:
```bash
chmod +x deploy.sh
```
- Run it after pulling changes from GitHub

---

## 📦 8. Bonus: Future Docker Support
- Keep all secrets out of GitHub
- Use `.gitignore` to exclude:
```gitignore
*.pem
*.key
.ssh/
id_ed25519*
```
- Plan to create a Dockerfile and image for easy redeployment

---

## ✅ You’re Live!
You now have a secure, production-ready Node.js app running with HTTPS, process management, and hardened access. Time to build more cool stuff!

---

*Need help? Fork this guide or open a discussion on GitHub!*

