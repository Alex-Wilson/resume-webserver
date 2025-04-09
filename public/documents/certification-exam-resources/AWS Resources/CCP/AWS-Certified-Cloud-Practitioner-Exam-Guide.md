# AWS Certified Cloud Pracitioner

## About

### Purpose: 
This certification is ideal for individuals looking to build a foundational understanding of AWS Cloud. It’s geared toward non-technical roles or beginners in cloud computing and helps you learn about AWS core services, pricing, support plans, cloud concepts, and basic security practices. It’s often used to demonstrate cloud fluency within business or entry-level IT roles.

### Format: 
Multiple Choice, Multiple Response

### Time and Length of Test: 
90 minutes, 65 questions

### Length of Certification:
Valid for 3 years

### Passing Score:
70% (46/65)

### Link to Exam: 
https://aws.amazon.com/certification/certified-cloud-practitioner/

### Link to Exam Guide:
https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf


## Study Resources:

### Pre-Req:
#### AWS Cloud Practitioner Essentials:
https://explore.skillbuilder.aws/learn/courses/134/aws-cloud-practitioner-essentials


### Studying:
#### Exam Prep Standard Course:
https://explore.skillbuilder.aws/learn/courses/16434/exam-prep-standard-course-aws-certified-cloud-practitioner-clf-c02-english

#### Exam Prep Enhanced Course:
https://explore.skillbuilder.aws/learn/courses/16485/exam-prep-enhanced-course-aws-certified-cloud-practitioner-clf-c02-english

### Pre-Test Preperation

#### Exam Prep Official Questions:
https://explore.skillbuilder.aws/learn/courses/14050/aws-certified-cloud-practitioner-official-practice-question-set-clf-c02-english

#### Exam Prep Official-Pre Test:
https://explore.skillbuilder.aws/learn/courses/18115/exam-prep-official-pre-test-aws-certified-cloud-practitioner-clf-c02

#### Practice Exam:
https://explore.skillbuilder.aws/learn/courses/14637/aws-certified-cloud-practitioner-official-practice-exam-clf-c02-english

### Alternative Study Sources
Free Code Camp: https://www.youtube.com/watch?v=NhDYbskXRgc

VMs vs Containers vs Serverless/Edge/Function @ https://youtu.be/NhDYbskXRgc?si=pVKz1U2-UUgGYQ8e&t=4050




## Content

### Vocab:
**Cloud Computing:** Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical servers and infrastructure, companies can access technology services such as computing power, storage, and databases on an as-needed basis (Using someone else's computer).

Cloud Service Provider (CSP): 
1. Offer many cloud services, not just compute or storage

2. Let you chain services together to build full cloud architectures

3. Provide a unified API to interact with all services

4. Use metered billing (per-second or per-hour)

5. Offer monitoring tools like logs and metrics

6. Include IaaS offerings (compute, network, storage)

7. Support automation through Infrastructure as Code (IaC) tools

**Infrasturcutre as a Service(IaaS):** These are the basic building blocks of cloud IT. You get access to networking features, virtual computers, and storage space. You manage the operating systems and applications yourself.
Examples: AWS, Azure, Google Cloud Platform (GCP), Digital Ocean

**Platform as a Service (PaaS):** Platform as a Service (PaaS)
This takes away the need to manage servers or infrastructure. You can just focus on building and deploying your app.
Examples: Heroku, Firebase, Vercel

**Software as a Service (SaaS):** Software as a Service (SaaS)
These are ready-to-use apps provided over the internet. You don’t worry about how they’re hosted or maintained.
Examples: Gmail, Microsoft Excel Online, Salesforce, Toast

**Cloud Deployment Model**
All infrastructure runs in the cloud, managed by a cloud provider like AWS. You don’t own any physical servers. You access everything over the internet.

**Hybrid Deployment Model**
A mix of on-premise and cloud environments. Some resources are kept locally, and others run in the cloud. This helps businesses move to the cloud gradually or meet specific needs.

**On-Premise (Private Cloud) Deployment Model**
Everything is run and managed in your own data center. You buy and maintain the physical servers, networking, and storage.

**Region:**  A Region is a physical, geographically distinct  location where AWS has multiple data centers. Each Region includes at least two Availability Zones to support high availability and fault tolerance. Regions are isolated from each other to prevent issues in one area from affecting another. Not all services are availble in all regions. 
Examples: **us-east**

**Availability Zones (AZs):** An AZ is one or more data centers owned by AWS within a Region. Each has separate power, networking, and connectivity. AZs are isolated from each other to provide high availability and fault tolerance. Distributing resources across AZs helps protect against failures.
Example: us-east-**1a**

**Edge Location:** An Edge Location is a data center connected to the AWS network, often run by a trusted partner. It’s used to deliver content and services like CloudFront, Route 53, S3 Transfer Acceleration, and API Gateway with low latency. Requests are automatically routed to the nearest Edge Location for faster response times. 

**GovCloud** A specialized Region designed to host sensitive data and regulated workloads, such as Controlled Unclassified Information (CUI). It’s operated by U.S. citizens on U.S. soil and is only accessible to vetted U.S. entities and root account holders who pass a screening process. It supports compliance with regulations like ITAR, EAR, DoD, and FedRAMP.

**Amazon Machine Image (AMI):**
An AMI is a pre-configured template that contains the information needed to launch a virtual server (EC2 instance) in AWS. It includes the operating system, application server, and applications. You can use AWS-provided AMIs, community AMIs, or create your own.

**Auto Scaling Groups:** 
An Auto Scaling Group automatically manages a group of EC2 instances. It can increase or decrease the number of instances based on demand, helping keep your application available and cost-efficient. You define the minimum, maximum, and desired number of instances, and AWS handles the rest.

**Elastic Load Balancer (ELB):** Automatically distributes incoming traffic across multiple targets like EC2 instances, containers, or IP addresses. This improves availability and fault tolerance by ensuring no single server gets overwhelmed. ELBs can work across multiple Availability Zones and support health checks to route traffic only to healthy targets.

**Simple Storage Service (S3):** A scalable object storage service used to store and retrieve any amount of data, at any time, from anywhere. It’s commonly used for storing files, backups, static websites, and media. S3 organizes data into buckets, and each file is called an object. It’s known for its durability, high availability, and built-in security features.

**CloudFront:** AWS’s Content Delivery Network (CDN). It delivers data, videos, apps, and APIs to users around the world with low latency and high speed. It works by caching content at Edge Locations close to the user. 

**Relational Database Service (RDS):** A managed service that makes it easy to set up, operate, and scale relational databases in the cloud. It supports popular database engines like MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server. AWS handles backups, patching, and maintenance, so you can focus on your data and applications.

**AWS Lamda:** A serverless compute service that runs your code in response to events like a file upload, a database update, or an API call. You do not need to manage any servers. Lambda automatically handles scaling, availability, and performance. You only pay for the compute time your code uses.

**Single-Tenant:** One customer has the entire physical server to themselves. The hardware is not shared with anyone else. This physical isolation is often used for compliance, licensing, or security reasons.

**Multi-Tenant:** Multiple customers share the same physical hardware. Each customer’s resources are kept separate using virtualization. This setup is more cost-efficient and is the default for most cloud services.

**AWS CloudFormation:** A tool that lets you create and manage AWS resources using code. Instead of clicking around in the console, you write a template that defines everything your environment needs, like a blueprint for your cloud setup.


TO ADD:
AutoScale vs ELB
CloudTrail vs Cloudwatch Logs vs Inspector vs Trusted Advisor vs Artificat
AWS Premium Support
Cost of EC2 instance (location, AMI type, and instance type)
Tiers/limits/cost of S3
AWS Config
AWS Multi-AZ
VPC vs Subnets vs Security Group vs NACL
ECR
EMR
ECS
Storage Gateway vs AWS DMS
EBS Volume vs EBS Snapshot
Elasticache 
Glacier vs Redshift vs Aurora vs DynamoDB vs RDS
AWS IAM (AWS IAM Groups vs AWS IAM Permissions vs AWS IAM Users vs AWS IAM Roles )

Role/Resource/Permission/Policy



### Common Cloud Services:
 - Compute: Virtaul computer that can run code (EC2)
 - Networking: virtual network defining internet connections or network isolations between services or outbound to the internet. (Route 53, CloudFront)
 - Storage: Virtual hard-drive to store files (EBS)
 - Database: virtual data base for storing data for general purpose (outside of a file) (RDS)

### 6 Advantages of Cloud Computing:
1. Pay Only for What You Use
Instead of spending a lot of money upfront on servers and data centers, you just pay a smaller amount based on what you use.

2. Lower Costs Through Sharing
Since AWS serves millions of customers, the cost of running everything gets shared, making it cheaper for everyone.

3. Adjust Resources Anytime
You can easily increase or decrease how much computing power you use based on what you need at the moment.

4. Move Faster
You can launch new projects and try out ideas quickly, without waiting on hardware or setup.

5. Less Maintenance, More Focus
AWS takes care of the servers and infrastructure, so you can spend more time focusing on your business or app.

6. Reach Users All Over the World
With AWS data centers in many locations, you can make your app or website available to users everywhere with low delays.



### Free Services:
- IAM
- VPC
- AutoScaling
- CloudFormation
- Elastic Beanstalk
- Opsworks
- Amplify
- AppSync
- CodeStar
- Organizations and Consolidated Billing
- AWS Cost Explorer

### Pricing Models:

- On-Demand
- Reserved
- Spot
- Dedicated

**On-Demand:** This is the default EC2 pricing model. There is no upfront payment and no long-term commitment. You are charged by the second or hour, depending on the instance type. It is ideal for short-term, unpredictable, or spiky workloads, and a great choice for testing, development, or launching new applications.

**Reserved Instances:** best for applications that run consistently over a long period of time. You save money by committing to use a specific instance type in a specific Region for one to three years. This commitment can reduce costs by up to 75 percent compared to On Demand pricing. Reservation is paid in three ways: all upfront, partial upfront, or no upfront. RIs can be shared across linked accounts within an AWS Organization. RIs can be sold at the Reserved Instance Marketplace.


**Spot:**  AWS offers this option to make use of idle compute resources in its data centers.Use unused EC2 capacity at 90 percent cheaper than On Demand. The trade-off is that Spot Instances can be interrupted at any time if AWS needs the capacity back for On Demand customers. If AWS interrupts a Spot Instance, you are not charged for the time after termination. However, if you choose to stop the instance yourself, you will be charged for the full time it ran. Spot Instances are a powerful way to run large workloads at low cost, as long as your app can handle sudden stops or delays.

**Dedicated Host Instances:** A physical server fully dedicated to your use. It helps meet strict security, compliance, or licensing requirements that do not allow sharing with other customers. This option is useful when you have server-bound software licenses that require the underlying hardware to be isolated, or when regulations prevent you from using multi-tenant environments. Dedicated Hosts are available through both On Demand and Reserved pricing models, giving you flexibility based on your needs.

**AWS Account Vending Machine (AVM):** A tool used to automatically create and configure new AWS accounts in a consistent and secure way. It is part of AWS Control Tower and helps organizations manage multiple accounts at scale. AVM is useful for large teams, businesses, or schools that need to give people access to their own AWS environments without manually setting up each one. It helps ensure consistency, saves time, and improves security.

**Virtual Private Cloud (VPC):** A VPC is your own logically isolated section of the AWS cloud. You control the network setup and can launch AWS resources like EC2 instances inside it.

**Internet Gateway:** An Internet Gateway connects your VPC to the internet. It allows resources in public subnets to send and receive traffic from outside AWS.

**Route Tables:** Route tables tell network traffic where to go. You use them to define paths between subnets, the internet, and other networks.

**Network Access Control List (NACL):** A NACL is a firewall that controls traffic in and out of a subnet. It works at the subnet level and applies rules to all resources inside.

**Security Groups:** Security Groups act as firewalls for individual EC2 instances. You use them to control which traffic is allowed to reach or leave an instance.

**Subnets:** Subnets divide your VPC into smaller sections. They help you organize resources and control access. You can create public subnets (connected to the internet) and private subnets (internal only).

**Envelope Encryption:** When you encrypt your data, your data is protected, but you have to protect your encryption key. Uses a master key as an added layer of security. 



### Support Plans
- Basic
- Developer
- Business
- Enterpise

| Plan        | Price (Starting At)     | Support Access                                  | Best For                              |
|-------------|-------------------------|--------------------------------------------------|----------------------------------------|
| Basic       | Free                    | Email support for billing and account only       | Individuals, non-technical issues      |
| Developer   | $29 per month           | Business hours email support for one user        | Development and testing environments   |
| Business    | $100 per month or 10%*  | 24x7 support via phone, chat, and email          | Production workloads                   |
| Enterprise  | $15,000 per month or 3%*| 24x7 support, Technical Account Manager, guidance| Mission-critical or enterprise systems |

### Amazon Trusted Advisor

Amazon Trusted Advisor is a tool that helps you keep your AWS account secure, cost-efficient, and well-optimized. It checks your environment and gives you suggestions on how to improve things like performance, security, and cost savings. Think of it like a cloud health inspector that gives you a personalized report card.

Trusted Advisor runs automated checks and highlights areas where you can:
   - Save money by shutting down unused resources
   - Improve security by locking down access
   - Boost performance and reliability
   - Stay within AWS service limits

    Each check includes:
    - A simple status (Green, Yellow, or Red)
    - A clear explanation of what’s wrong
    - Steps you can take to fix it

Categories of Checks
- Cost Optimization – Spot idle resources and reduce waste (Idle Load Balancer, Unassociated elastic IP)
- Security – Flag open ports, weak permissions, and missing MFA (IAM Key rotation)
- Fault Tolerance – Check if backups, failovers, and scaling are set up (RDS backups)
- Performance – Identify resource bottlenecks or misconfigurations (High Utilization)
- Service Limits – Warn you when you’re close to hitting limits (VPC limits)


Access Based on Support Plan
- Basic and Developer – Access to core checks only
- Business and Enterprise – Full access to all checks and extra recommendations

### AWS Budgets
Ability to setup alerts if you exceed or are approaching your defined budget. 

Create Cost, Usage, or Reservation Budgets. 

Alerts support EC2, RDS, Redshift, ElastiCache reseverations. 

## AWS Organization
**AWS Organizations** Centrally manage billing, access, security, and compliance for multiple AWS accounts. It helps you organize accounts into groups and apply settings from one place.

**Root Account User:** The Root User is the original login for an AWS account. It has full access to all services and resources. Every AWS account starts with one Root User — but it is recommended to use it only for account setup and then switch to IAM users for daily tasks.

**Organizational Units (OUs):** A group of AWS accounts inside an Organization. You can create a hierarchy by nesting OUs inside each other, which makes it easier to manage teams, departments, or environments like dev and prod.

**Service Control Policies (SCPs):**
SCPs let you set permission boundaries for all accounts in your Organization or OU. They help ensure accounts stay within your security and compliance rules, no matter what individual IAM users or roles are allowed to do.

## Database Services

DynamoDB: NoSQL key/value database

DocumentDB: NoSQL Document database compatible with MongoDB

Relational Database Service: Supports multiple engines
    - Aurora: Fully Managed
    - Aurora Serverless: Only runs when needed, like AWS lambda

Neptune: Graph Database

Redshift: Comlumnar database for massive data (>1 petabyte)

ElsatiCache: Redis or memory cached database

## Provisioning
- Elastic Beanstalk: Service for deploying and scaling web applications and services devloped with Java, .NET, PHP, Node.JS, Python, Ruby, Go, or Docker

- OpsWorks: Configuration management service that provides maanged instances of Chef and Puppet

-Cloud Formation: IaC using JSON or YAML

- AWS QuickStart: pre-made packages that can launch and configure your AWS compute, network, storage, and other services required to deploy a workload on AWS

- AWS Marketplace: A digital catalog of thousands of software listings from independent software vendors you can use to find, buy, test, and deploy software. 


## Computing Services

**Elsatic Container Service (ECS):** Docker as a Service, container orchestration that supports dockers


**Elastic Kubernetes Service (EKS):** Easy to deploy, manage, and scale containerized applications using Kubernetes. 

## Storage Services

S3 Glacier: low cost storage for archiving and long-term backup

Storage gateway: Hybrid cloud storage with local caching 

Elastic Block Storage: Hard drive in the cloud you attach to EC2 instances (ssd, hhd). 

Elastic File Storage: File storage mountable to multiple EC2 instances at the same time

Snowball: Physically migrate lots of data via a computer suitcase 50-80TB 

Snowball Edge: A better version of Snowball 100TB

Snowmobile: Shipping container, pulled by a semi-trailer-truck 100 PB


## Business Centric Services:

Amazon Connect: Call Center

Workspaces: Virtual Remote Desktop

WorkDocks: AWS version of SharePoint

Chime: online meetings and video confrences

WorkMail: Business Email

Pinpoint: Marketing campaign management system used for sending targeted emails, SMS, push notifcations, and voice messages

Simple Email Services (SES): send maketing, notification, and emails

QuickSight: A business intelligence service connect multiple data sources and visualize data


## Hybrid Products

Direct Connect: Dedicated gigbit network connection from premises to AW

VPN establish a secure connection to AWS. Can use site-to-site or client-VPN. 

Storage Gateway: A hybrid storage service that enables your on-premise applications to use AWS clous storage. Used for backups, archives, distaster recovery, cloud data processing, storage tiering, and migration. 

Active Directory: AWS Managed Micorsoft Active Directory, which enalbes the use of Microsoft Active Directory in the cloud.

## Logging Services

CloudTrail: logs all API calls (SDK, CLI) between AWS services (who is getting blames)

CloudWatch: a collection of multiple services
    - Cloudwatch Logs: Performance data about AWS servives, cpu utilization, application logs, lammbda logs
    - Cloudwatch Metrics: represents a time-ordered set of data points. A variable to monitor.
    - Cloudwatch Events: trigger an event based on a condition
    - Cloudwatch Alarms: trigger notifications based on metrics
    - Cloudwatch Dashboard: visualizations 


## Shared Responsibility Model

Admins/Owners/Users are responsible for their own data and configuration (Security in the cloud)

AWS is responsible for hardware, operations of managed services, and global infrastructure (security of the cloud)

## Compliance

AWS Artifact: Shows proof of compliance with current AWS setup

Amazon Inspector: Security benchmarking tool for specific EC2 instances. Can perform network and host assessments. 

AWS WAF: Web Application Firewall tool for EC2 instances. Can be used with CloudFront or an Application Load Balancer.

AWS Shield: Managed DDOS protection typically used with CloudFront or Route53. Has a very expensive premium plan for services like Route 53, CloudFront, ELB 

Amazon Guard Duty: Amazon IDS/IPS uses CloudTrail logs, VPC Flow Logs, and DNS Logs

Key Management Service (KMS): Multi-tenant hardware security module, allows integration with other products to allow encryption with the check of a box, uses envelope encryption. 

Amazon Macie: Fully managed service that continuosly monitors S3 data acess activity for anomalies, and generates detailed alerts when it detects risk of unauthorized access or inadverent data leaks. 

Security Group vs NACL:

Security: Acts a firewall at the instance level, implicetely denies all traffic, you create allow rules

NACL: Acts as a firewall at the subnet level. You create Allow and Deny rules.

## Elastic Transcode vs Media Convert

Elastic Transcoder: The old way, transcodes videos to streaming formats

AWS Elemental MediaConvert: Transcodes videos to streaming formats, overlay images, insert video clips, extract captions, robust UI

## SNS vs SQS
Simple Notifications Service (SNS): Send notifications to subscribers of tipics via multiple protocols such as sqs, email and sms. Typically used for sending plain text emails. THe best example is the billing alarm. Great for webhooks, simple emails, and lambda functions. 

Simple Queue Service (SQS): Pleaces messages into a queue. Applications pull queue using AWS SDK. Really good for delayed tasks or queing emails. 

## Amazon Inspector vs Trusted Advisor vs Artificat:

Inspector audits a single EC2 instance and generates a report

Trusted Adviosr give a hollistiv view of recommendations across multiple services and best practices. Does not generate reports

Artifact: Generate a report proving compliance for a given compliance framework like PCI or HIPPA

## Load Balancing

Application Load Balancer (ALB): OSI Layer 7, HTTP and HTTPS Traffic

Network Load Balancer (NLB): OSI Layer 4, TCP and TLS traffic where extreme performance is required. Ultra-low latency. Optimized for volatile or sudden traffic. 

Classic Load Balancer (CLB): OSI Layer 7 and Layer 4, used for application built with EC2-Classic network

## SNS vs SES
Simple Notificaiton Service is used for plain text while SES allows the construction of html emails, templating engines, and custom domain name emails. 