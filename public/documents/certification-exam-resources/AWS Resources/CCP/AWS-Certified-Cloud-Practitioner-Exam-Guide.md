# AWS Certified Cloud Pracitioner

## About

### Purpose: 
This certification is ideal for individuals looking to build a foundational understanding of AWS Cloud. It’s geared toward non-technical roles or beginners in cloud computing and helps you learn about AWS core services, pricing, support plans, cloud concepts, and basic security practices. It’s often used to demonstrate cloud fluency within business or entry-level IT roles.

### Format: 
Multiple Choice, Multiple Response

### Time and Length of Test: 
90 minutes, 65 questions

### Passing Score:
70% (46/65, while 10-15 questions may not be used to make calculations)

### Exam Content Breakdown
- Cloud Concepts: (24%, Max 16)
- Security and Compliance(30%, Max 20)
- Cloud Technology (34%, 22 Max)
- Billing, Pricing, and Support (12%, 8 Max)


### Length of Certification:
Valid for 3 years

### Link to Exam Guide:
https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf

### Link to Exam: 
https://aws.amazon.com/certification/certified-cloud-practitioner/


## Study Resources:

### Pre-Req:
#### AWS Cloud Practitioner Essentials:
https://explore.skillbuilder.aws/learn/courses/134/aws-cloud-practitioner-essentials

-------------------------------------------------------------------------------------------------------------
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

### Cloud Concepts

#### Common Cloud Terms
**Cloud Computing:** On-demand delivery of IT resources over the internet with pay-as-you-go pricing.

**Virtualization:** Virtualization is the process of running multiple virtual machines on a single physical machine. Each virtual machine acts like a real computer with its own operating system and resources, but they all share the same physical hardware. This helps make better use of servers.

**Containerization:** A way to run and package software along with everything it needs, like libraries and settings. Containers are lightweight, fast to start, and can run the same way across different environments. AWS uses this in services like ECS and Fargate.

**Elasticity or "Vertical Scaling":** The system can automatically add or remove resources to match the workload. If demand goes up, it grows. If demand goes down, it shrinks. This helps save money and improve performance.

**Scalability or "Horizontal Scaling":** The system can handle increased demand by adding more resources. It can be done manually or automatically, and it ensures that the application keeps working well even as it grows. 


#### Share Responsiblity Model
AWS manages security of the cloud (Data center facilities, physical hardware, global network security, software for AWS services); you manage security in the cloud (OS patches, application-level security, encryption in-transit and at rest, IAM roles, IAM premissions, IAM policies, IAM MFA, network configurations,security group, NACL).

#### Cloud Deployment Models

**Single-Tenancy:** A dedicated environment for one customer. Compute resources are not shared with others. Offers greater isolation, control, and security. Used in regulated industries or for compliance reasons.

**Multi-Tenancy:** Multiple customers share the same infrastructure. Resources are logically isolated but physically shared. Enables cost savings and scalability. Most AWS services are multi-tenant by default.

**Public:** Cloud resources (like servers, storage) are owned and operated by a third-party cloud provider and shared among multiple customers (AWS, Azure, GCP).

**Private:** Cloud resources are used exclusively by a single organization. Can be hosted on-premises or by a third-party provider.

**Hybrid:** A mix of public and private clouds that are connected and share data/applications.

#### Cloud Service Models (aaS):
**Cloud Service Provider (CSP):** A company that offers cloud-based services which can be chained together to build full cloud architectures. They typically provide a unified API and utilize pay-as-you-go models.


**Infrastructure as a Service (IaaS):** Provides basic building blocks like virtual machines, networking, and storage (EC2, AWS VPC, EBS). Like renting an empty apartment where you furnish it and maintain it.

**Platform as a Service(PaaS):** Provides a ready-made environment for developers to build and deploy apps.Like renting a furnished apartment where you live in it, but maintenance is handled.

**Software as a Service (SaaS):** Provides fully functional applications over the internet. Like a hotel stay where everything is provided for you.


**Model**| **You Manage**          | **Cloud Provider Manages**   | **AWS Examples**               
---------|-------------------------|------------------------------|------------------------------
**IaaS** | OS, applications, data  | Hardware, networking,        | EC2, VPC, EBS                
         |                         | storage, virtualization      |                              
---------|-------------------------|------------------------------|------------------------------
**PaaS** | Applications, data      | OS, runtime, infrastructure  | Elastic Beanstalk, Fargate   
---------|-------------------------|------------------------------|------------------------------
**SaaS** | Just use the software   | Everything (infra to app)    | Amazon Chime, GMail          


#### Benefits of Cloud Computing:
- **Pay-As-You-Go:** No upfront cost for hardware and only pay for what you use

- **Economies of Scale:** AWS serves millions of customers, reducing costs for everyone.

- **Elasticity and Scalability:** Instantly scale resources up or down based on demand.

- **Agility:** Deploy in minutes with the push of a button, or automatically.

- **Reduce OpEx:** AWS handles maintenance of physical infrastructure and servers.

- **Global Reach:** Deploy applications closer to users using AWS’s global infrastructure.


#### Where is the Cloud?
**Region:**  A physical region in the world where AWS has multiple data centers. Each Region has at least two Availability Zones which are geographically isolated for fault tolerance and compliance. Not all services are available in every Region. (**us-east**)

**Availability Zones (AZs):** One or more data centers within a Region. Each AZ has separate power, cooling, and networking, but they are connected with low-latency links. Spreading resources across AZs increases resilience and uptime. (us-east-**1a**)

**Edge Location:** A site that AWS uses to cache or deliver content closer to users. Used by services like CloudFront, Route 53, S3 Transfer Acceleration, and API Gateway. These locations improve performance and reduce latency by serving users from the nearest available location.

**GovCloud:** A specialized AWS Region designed to handle sensitive and regulated workloads (like Controlled Unclassified Information). GovCloud is operated by U.S. citizens on U.S. soil and is only available to approved U.S. customers for compliance with ITAR, EAR, DoD, and FedRAMP.

**Multi-AZ:** Deploying resources across multiple Availability Zones within the same AWS Region to improve fault tolerance, availability, and resilience.

#### Security Concepts
**Identity Access Managment(IAM):** A framework for managing digital identities and controlling access to resources.

**IAM User:** An individual identity (person or application) that can authenticate to AWS using a set of credentials (password, access keys).

**IAM Group:** A collection of IAM users. Groups allow you to manage permissions collectively.

**IAM Role:** Similar to users but are intended for AWS services or temporary access (like a third-party service needing access to your AWS resources). Roles do not have credentials (passwords or access keys). They are assumed by users or AWS services like EC2, Lambda, or ECS.

**IAM Policy:** A document that defines permissionsattached to users, groups, or roles to allow or deny specific actions on AWS resources.

**IAM Permission:** Define what actions a user, group, or role can perform on AWS resources. These actions are typically represented as API actions.

#### Networking Concepts

**Virtual Private Cloud (VPC):** An isolated network environment which is logically or physically paritioned from the rest of the cloud infrastructure. Building your own private data center in the cloud. 

**Subnet:** A smaller section of a VPC, used to group resources by role or exposure level

**Security Group (SG):** A virtual firewall working at the instance level to control inbound and outbound traffic for EC2 instances using only allow rules. If you allow incoming traffic the response is automatically allows out. 

**Network Access Control List (NACL):** Another layer of security that operates at the subnet level. Stateless so you must set allow and deny rules indpendently. 

**Route Table**: Controls how traffic is directed within your VPC and beyond, Tells subnets where to send traffic (e.g., to the internet, NAT gateway, or another subnet.) Each subnet has one route table.


### Pricing, Billing, and Support

#### Pricing Models

**On-Demand:** Pay for compute capacity by the second or hour

**Reserved Instances:** Commit to using an instance for 1 or 3 years, pay upfront, partial, or monthly for significant discounts. Best for steady, predictable workloads.

**Spot Instances:** Use unused EC2 capacity at a discount (up to 90% off). Can be interrupted by AWS with short notice. Best for flexible, fault-tolerant workloads.

**Dedicated Instances:**  A physical server fully dedicated to a single AWS customer. You have visibility and control over the entire server, including which EC2 instances run on it.

#### Price for EC2 Instance

Depends on Region, Instance Type, Amazon Machine Image, Pricing Model


#### Billing and Cost Management Tools

**Consolidated Billing:** Lets you combine billing for multiple AWS accounts under one management account (part of AWS Organizations). One bill, shared volume discounts across accounts. Great for teams, departments, or multi-account environments.

**Budgets:** Helps you set custom cost and usage limits for an account or organization. Receive alerts when your spending exceeds a set thresholdCan also track usage and check reserved instance utilization.

**Cost Explorer:** Visual tool for analyzing your AWS costs and usage over time. Helps you find spending trends, forecast future costs, and explore usage by service or linked account.

**Billing Dashboard:** Centralized overview for current charges, bills, and payment methods. Shows charts of of basic account level billing for month-to-date spending. 

#### Support Tiers

**Plan**       |**Tech Support**| **Response Time**    | **Trusted Advisor** | **TAM**  | **Support Level**     |**Billing Support**| **Notes**
---------------|----------------|----------------------|---------------------|----------|-----------------------|-------------------|-------------------------------
**Basic**      | No             | None                 | Limited             | No       | General Info Only     | Yes               | Free, no tech support
**Developer**  | No             | < 24 hrs (general)   | Limited             | No       | Best-Effort Email     | Yes               | Starts at $29/mo
**Business**   | Yes            | 1 hr (critical)      | Full                | No       | AWS Technical Support | Yes               | Includes 3rd-party support
**Enterprise** | Yes            | 15 min (critical)    | All checks          | Yes      | TAM + Concierge       | Yes               | For mission-critical workloads


### AWS Services

#### Compute
**Elastic Cloud Compute (EC2):** A virtual server in the cloud. It lets you run applications on scalable, resizable compute capacity without needing to own or maintain physical servers.

**AWS Lamda or "Serverless Compute":** A serverless compute service that runs your code in response to events like a file upload, a database update, or an API call. You do not need to manage any servers. Lambda automatically handles scaling, availability, and performance. You only pay for the compute time your code uses. Best for short event-driven tasks. 


#### Networking

**Internet Gateway:** An Internet Gateway connects your VPC to the internet. It allows resources in public subnets to send and receive traffic from outside AWS.

**Amazon VPC:** Create your own private network within AWS. You control your IP ranges, subnets, routing, and security settings.

**Route 53:** A scalable and highly available Domain Name System (DNS) service.

**AWS Direct Connect:** A dedicated, private connection from your data center or office to AWS. Lower latency and more consistent performance than internet-based connections. Meets security and compliance needs.

**Elastic Load Balancer (ELB):** Automatically distributes incoming traffic across multiple targets like EC2 instances, containers, or IP addresses. This improves availability and fault tolerance by ensuring no single server gets overwhelmed. ELBs can work across multiple Availability Zones and support health checks to route traffic only to healthy targets. Supports the following types of load balancing:

- **Application Load Balancer (ALB):** OSI Layer 7, HTTP/HTTPS routing, microservices, web apps
- **Network Load Balancer (NLB):** OSI Layer 4, Extreme Performance, TCP/TLS. low latency
- **Classic Load Balancer (CLB):** OSI Layer 7 and 4, Legacy EC2-Classic only (Deprecated)


**CloudFront:** AWS’s Content Delivery Network (CDN). It delivers data, videos, apps, and APIs to users around the world with low latency and high speed. It works by caching content at Edge Locations close to the user. 

#### Databases
**RDS:** A managed service for relational databases (tables, rows, columns, **SQL**) like MySQL, PostgreSQL, SQL Server, Oracle, and MariaDB. AWS handles backups, patching, and scaling. 

**Aurora:** A high-performance database engine built by AWS. It is available as an option within RDS. Faster than traditional databases but more expensive. 

**DynamoDB:** A fast, fully managed NoSQL database service. Great for apps that need millisecond response times at any scale. Key-Value and/or document based configurations. Serverless with built in backups. 

**RedShift:** A data warehouse service used for analyzing large amounts of structured data.
Optimized for running complex queries across petabytes of data.

**Neptune:** A fully managed graph database service used to store and navigate highly connected data, like relationships between people, places, or things.

**Elasticache:** A fully managed in-memory data store and cache service which improves application performance by storing frequently accessed data in memory, rather than querying a database every time. Supports Redis and Memcached.

**Elastic Map Reduce (EMR):** A managed big data platform that lets you run Hadoop, Spark, and other frameworks to process massive datasets quickly and affordably.

#### Storage
**Simple Storage Service (S3):** A scalable object storage service used to store and retrieve any amount of data, at any time, from anywhere. It’s commonly used for storing files, backups, static websites, and media. S3 organizes data into buckets, and each file is called an object. It’s known for its durability, high availability, and built-in security features.


**S3 Glacier/Glacier Deep Archive:** Low-cost archival storage for infrequently accessed data used for long-term backups, archives, and compliance. Retrieval time can take minutes to hours but it is much cheaper than standard storage options.

**Elastic Block Storage (EBS):** Provides persistent block-level storage volumes for use with independent EC2 instances. Think of it like a virtual hard drive attached to an EC2 instance. Commonly used for databases, apps, or boot volumes. Uses volumes to store and run data and uses snapshots to replicate volumes. 

**Elastic File Storage (EFS):** A fully managed, shared file storage system that can be used by multiple EC2 instances at once, working like a network drive. Grows and shrinks automatically based on usage. Common use cases include web servers, content management systems, analytics tools.

**Storage Gateway:** Provides on-prem access to AWS storage (S3) using local interfaces like NFS, SMB, or iSCSI. Used for hybrid storage setups.

#### Migration
**AWS Snowball:** Physical device for offline data transfer to AWS.

**AWS Snowball Edge:** Same as Snowball, but with compute capabilities for processing data before upload.

**AWS Snowmobile:** For extremely large data migrations (up to exabytes) using a literal shipping truck.

**AWS Database Migration Service (DMS):** Migrates databases from on-premises or cloud environments to AWS quickly and securely.


#### Containerization
**FarGate:** A serverless compute engine for containers. Used with ECS (or EKS) to run containers without provisioning or managing servers.You define CPU, memory, and container settings

**Elastic Container Service (ECS):** A fully managed service to run and scale containerized applications using Docker containers. Supports EC2 and Fargate.

**Elastic Kubernetes Service (EKS):** A fully managed Kubernetes service that lets you run containerized applications using Kubernetes, an open-source container orchestration platform. AWS handles the Kubernetes control plane, so you don’t have to manage cluster infrastructure manually. "Kubernetes-as-a-Service".


**Elastic Container Registry (ECR):** A fully managed container image registry that stores and manages Docker container images.Works seamlessly with ECS, EKS, and Fargate.

#### Orchestration and Infrastructure as Code
**Amazon Machine Image (AMI):**
An AMI is a pre-configured template that contains the information needed to launch a virtual server (EC2 instance) in AWS. It includes the operating system, application server, and applications. You can use AWS-provided AMIs, community AMIs, or create your own.

**Auto Scaling Groups (ASG):** 
An Auto Scaling Group automatically manages a group of EC2 instances. It can increase or decrease the number of instances based on demand, helping keep your application available and cost-efficient. You define the minimum, maximum, and desired number of instances, and AWS handles the rest.

**AWS CloudFormation:** A tool that lets you create and manage AWS resources using code. Instead of clicking around in the console, you write a template that defines everything your environment needs, like a blueprint for your cloud setup.

**AWS OpsWorks:** A configuration management service that uses Chef and Puppet. These are automation tools that help you configure servers, install software, and manage infrastructure as code. Alternative to CloudFormation if you prefer procedural automation over declarative templates. 

**Elastic Beanstalk (EBS):** An easy-to-use service for deploying and scaling web applications just upload the code and AWS does the rest. 


#### Logging
**CloudTrail:** Tracks user activity and API calls made in your AWS account

**CloudWatch:** Monitors your AWS resources and applications in real time. It collects metrics, logs, and alarms so you can track performance and react to issues at a glance using the dashboard. 

#### Security and Compliance

**Shield (Standard and Advanced):**  A managed Distributed Denial of Service (DDoS) protection service that safeguards AWS applications from external attacks.

**Web Application Firewall (WAF):** A web application firewall that helps protect your web applications from common attacks like SQL injection and XSS. Works with CloudFront, API Gateway, Application Load Balancer (ALB), and AppSync. Supports custom rules and rate-limiting. Operates at Layer 7 (Application layer).


**Trusted Advisor:** An automated best-practice checker that analyzes your AWS environment and provides recommendations about: Cost optimization, performance, security, fault tolerance, and service limits. Basic and developer tiers are limited to free "core" checks but business and enterprise get additional checks and extra recommendations. Can give a hollistic view of services and resources. 

**Inspector:** An automated security assessment tool for EC2 and container workloads. Scans for vulnerabilities and unintended network exposure to help meet compliance requirements. Works on a single instance. 

**Artifact:** A self-service portal for accessing AWS’s compliance reports and security documentation such as SOC, ISO, PCI reports. Used in audits and compliance tracking. 
 
**Key Management System (KMS):** A managed service to create and control encryption keys across services like S3, EBS, and RDS. Integrated with IAM. 

**AWS Identity and Access Management(IAM)**: Service which controls access to AWS resources. It lets you securely manage access by creating and controlling users, groups, roles, and permissions.

**IAM Dashboard:**  Where you manage your users, groups, roles, and policies. You can create new users, assign them roles or permissions, view the access keys, and troubleshoot access issues from here.

**Amazon Macie:** A fully managed service that uses machine learning (ML) to automatically discover, classify, and protect sensitive data like personal identifiable information (PII) in Amazon S3.

**Amazon GuardDuty:** A threat detection service that continuously monitors for malicious activity and unauthorized behavior in AWS accounts. Similar to IDS/IPS. 

**AWS Control Tower:** A tool to help set up and govern a secure, multi-account AWS environment automatically. Automates account creation using AWS best practices and provides a dashboard for visibility and management. 

**AWS Config:** A service that records and monitors the configuration of AWS resources over time.

**Quantum Ledger Database (QLDB):** A ledger database designed to store a complete, verifiable history of changes to application data. Immutable, cryptographically verifiable, and serverless. 

**AWS Landing Zone:** A pre-configured, secure starting point for setting up a multi-account AWS environment. Think of it like a “blueprint” or starter kit for an enterprise-ready AWS setup. 

**AWS Managed Microsoft Active Directory:** A managed directory service that runs Microsoft Active Directory in the AWS cloud to join an EC2 instances with a domain using Group Policy, LDAP, and/or Kerberos. Supports hybrid environments with on-prem AD. 


#### Inter-Application Services
**Simple Notification Service (SNS):** A publish/subscribe (pub/sub) messaging service that sends messages to multiple subscribers at once. Commonly used to send real-time alerts via SMS, email, or Lambda.

**Simple Queue Service (SQS):**A message queuing service that stores messages between distributed application components. It allows services to communicate reliably without needing to run at the same time.

**Simple Email Service (SES):** A cloud-based email service used to send transactional or marketing emails.

**WorkDocks:** A secure document collaboration and storage service for businesses. Amazon Sharepoint. 

**QuickSight:** A business intelligence (BI) and data visualization service. Amazon PowerBI. 


#### Developer Services

**API Gatway:** A fully managed service that lets you create, publish, maintain, monitor, and secure APIs at any scale. Supports RESTful and WebSocket APIs. Often used as a frontend to Lambda or microservices for building scalable APIs for web and mobile apps.

**AppSync:** A fully managed service for developing GraphQL APIs by connecting to data sources like DynamoDB, Lambda, or RDS. It handles real-time data sync, caching, and offline access automatically for projects like  chat, dashboards, or collaborative tools.

**Amplify:** Build, test, deploy full-stack apps (frontend-focused)

**CodeStar:** DevOps dashboard to scaffold and manage full app lifecycle





Consolidated Billing
**AWS Organizations** Centrally manage billing, access, security, and compliance for multiple AWS accounts. It helps you organize accounts into groups and apply settings from one place.

**Root Account User:** The Root User is the original login for an AWS account. It has full access to all services and resources. Every AWS account starts with one Root User — but it is recommended to use it only for account setup and then switch to IAM users for daily tasks.

**Organizational Units (OUs):** A group of AWS accounts inside an Organization. You can create a hierarchy by nesting OUs inside each other, which makes it easier to manage teams, departments, or environments like dev and prod.

**Service Control Policies (SCPs):**
SCPs let you set permission boundaries for all accounts in your Organization or OU. They help ensure accounts stay within your security and compliance rules, no matter what individual IAM users or roles are allowed to do.


- AWS QuickStart: pre-made packages that can launch and configure your AWS compute, network, storage, and other services required to deploy a workload on AWS

- AWS Marketplace: A digital catalog of thousands of software listings from independent software vendors you can use to find, buy, test, and deploy software. 

Pinpoint: Marketing campaign management system used for sending targeted emails, SMS, push notifcations, and voice messages
Elastic Transcoder: The old way, transcodes videos to streaming formats

AWS Elemental MediaConvert: Transcodes videos to streaming formats, overlay images, insert video clips, extract captions, robust UI

