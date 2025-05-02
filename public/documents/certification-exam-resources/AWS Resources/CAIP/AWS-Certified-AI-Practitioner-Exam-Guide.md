# AWS Certified AI Practitioner

## About

### Purpose: 
This certification is designed for individuals who want to demonstrate a foundational understanding of artificial intelligence (AI), machine learning (ML), and generative AI concepts within the AWS Cloud. It is suitable for both technical and non-technical roles, such as business analysts, project managers, IT support, marketing professionals, and sales teams who interact with AI/ML solutions or need to understand their applications.

### Format: 
Multiple Choice, Multiple Response, Ordering, Matching, and Case Study

### Time and Length of Test: 
90 minutes, 65 questions

### Passing Score:
70% (46/65)

### Exam Content Breakdown:
- Fundamentals of AI and ML: (20%, Max 13)
- Fundamentals of Generative AI: (24%, Max 16)
- Applications of Foundation Models: (28%, Max 18)
- Guidelines for Responsible AI: (14%, Max 9)
- Security, Compliance, and Governance for AI Solutions: (14%, Max 9)

### Length of Certification:
Valid for 3 years

### Link to Exam Guide:
https://d1.awsstatic.com/training-and-certification/docs-ai-practitioner/AWS-Certified-AI-Practitioner_Exam-Guide.pdf

### Link to Exam: 
https://aws.amazon.com/certification/certified-ai-practitioner/








## Study Resources:
Free Code Camp 4 Hour Crash Course (Out of date but still very informative in a short time): https://www.youtube.com/watch?v=3hLmDS179YE

Free Code Camp Updated Video (Pretty much every product in AWS): https://www.youtube.com/watch?v=NhDYbskXRgc

Exam Pro Free Test: https://app.exampro.co 

W3 Schools AWS Quiz: https://www.w3schools.com/quiztest/quiztest.php?qtest=AWSCE

## Content

### Cloud Concepts

#### Common Cloud Terms
**Cloud Computing:** On-demand delivery of IT resources over the internet with pay-as-you-go pricing.

**Virtualization:** Virtualization is the process of running multiple virtual machines on a single physical machine. Each virtual machine acts like a real computer with its own operating system and resources, but they all share the same physical hardware. This helps make better use of servers.

**Containerization:** A way to run and package software along with everything it needs, like libraries and settings. Containers are lightweight, fast to start, and can run the same way across different environments. AWS uses this in services like ECS and Fargate.

**Elasticity or "Vertical Scaling":** The system can automatically add or remove resources to match the workload. If demand goes up, it grows. If demand goes down, it shrinks. This helps save money and improve performance.

**Scalability or "Horizontal Scaling":** The system can handle increased demand by adding more resources. It can be done manually or automatically, and it ensures that the application keeps working well even as it grows. 


#### Share Responsiblity Framework
AWS manages security of the cloud (Data center facilities, physical hardware, global network security, software for AWS services); you manage security in the cloud (OS patches, application-level security, encryption in-transit and at rest, IAM roles, IAM premissions, IAM policies, IAM MFA, network configurations, security group, NACL).


| **Responsibility Area**                        | **Responsible Party** |
|------------------------------------------------|------------------------|
| Physical security of AWS data centers          | AWS                    |
| Patching the OS on EC2 instances               | Customer               |
| Managing IAM users and permissions             | Customer               |
| Encrypting data in transit                     | Customer               |
| Power, networking, and cooling infrastructure  | AWS                    |
| Configuring S3 bucket access policies          | Customer               |
| Ensuring availability of core AWS services     | AWS                    |
| Security **of** the cloud (e.g., hardware)     | AWS                    |
| Security **in** the cloud (e.g., app config)   | Customer               |
| Compliance and auditing setup/configuration    | Both                   |



### Well Architected Framework***
**Operational Excellence:** Run and monitor systems to deliver business value, and continuously improve.

**Security:** Protect data, systems, and assets through risk assessments and mitigation.

**Reliability:** Ensure workloads perform correctly and consistently (includes failover).

**Performance:** Use IT and computing resources efficiently.

**Cost Optimization:**Avoid unnecessary costs.

**Sustainability:** Minimize environmental impact (recently added).

#### Combo Questions
Many of the "make-or-break" questions of the CCP will combine aspects of the Shared Resonsiblity Model or Well Architected Framwork like the questions below. Understanding what the customer is responsible for and why they are responsible is a huge help on the exam.

    Q: Which pillar is supported by patching EC2 instances, and who is responsible?
    A: Security, Customer

    Q: Deploying an app in multiple AZs supports which pillar, and who handles that responsibility?
    A: Reliability, Shared (AWS provides AZs, Customer configures deployment)

    Q: Using CloudTrail to log account activity supports which pillar, and who’s responsible?
    A: Security, Customer (must enable and configure)

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

#### AWS Organizations

**AWS Organizations** Centrally manage multiple AWS accounts from a single management account. It helps with centralized billing, access control, policy enforcement, and compliance across all accounts in your organization.  Group accounts by team, project, or environment. Apply policies to multiple accounts at once. Integrates with IAM for fine-grained access control

**Root Account User:** The original account owner login created when setting up an AWS account. It has full administrative access to every AWS service and billing function. Use only for account setup and critical tasks Create and use IAM users for everyday accessAdd multi-factor authentication (MFA) to the Root User immediately

**Organizational Units (OUs):** A group of AWS accounts inside an Organization. You can create a hierarchy by nesting OUs inside each other, which makes it easier to manage teams, departments, or environments like dev and prod.

**Service Control Policies (SCPs):**
SCPs let you set permission boundaries for all accounts in your Organization or OU. They help ensure accounts stay within your security and compliance rules, no matter what individual IAM users or roles are allowed to do.

**Consolidated Billing:**

### AWS Services

#### Compute
**Elastic Cloud Compute (EC2):** A virtual server in the cloud. It lets you run applications on scalable, resizable compute capacity without needing to own or maintain physical servers.

**AWS Lamda or "Serverless Compute":** A serverless compute service that runs your code in response to events like a file upload, a database update, or an API call. You do not need to manage any servers. Lambda automatically handles scaling, availability, and performance. You only pay for the compute time your code uses. Best for short event-driven tasks. 

**Resource Access Manager:** A service that is used to share resources across your AWS accounts.


#### Networking

**Internet Gateway:** An Internet Gateway connects your VPC to the internet. It allows resources in public subnets to send and receive traffic from outside AWS.

**Amazon VPC:** Create your own private network within AWS. You control your IP ranges, subnets, routing, and security settings.

**VPC Peering:** A non-transative networking connectiong between two VPCs that enables private IP communication. Must be manually configured with routing and security groups. 

**AWS PrivateLink:** A service that allows private connectivity to services in another VPC without exposing traffic to the public internet. Creates interface VPC endpoints to access services more privately than VPC Peering for service-specific access. Best for simple direct communicaiton between two VPCs. 

**Transit Gateway:** A hub-and-spoke model that allows you to connect multiple VPCs and on-prem networks through a central gateway. Supports transative routing. Highly scalable. Best for large, enterpise, hybrid cloud setups.  

**Route 53:** A scalable and highly available Domain Name System (DNS) service.

**AWS Direct Connect:** A dedicated, private connection from your data center or office to AWS. Lower latency and more consistent performance than internet-based connections. Meets security and compliance needs.

**AWS Client VPN:** A managed client-based VPN service that gives you the ability to securely access your AWS resources and the resources in your on-premises network. With Client VPN, you can access your resources from any location through an OpenVPN-based VPN client. You would use Client VPN to connect individual laptops to AWS, not an entire data center.

**AWS Site-to-Site VPN:** Creates an encrypted network path between your on-premises network and your AWS Cloud network. This connection uses the internet, so you cannot expect consistency. Even though the traffic is encrypted, the connection is not private because the internet is a shared resource.


**Elastic Load Balancer (ELB):** Automatically distributes incoming traffic to multiple registered targets like EC2 instances, containers, or IP addresses in the same AWS Region. This improves availability and fault tolerance by ensuring no single server gets overwhelmed. ELBs can work across multiple Availability Zones and support health checks to route traffic only to healthy targets. Supports the following types of load balancing:

- **Application Load Balancer (ALB):** OSI Layer 7, HTTP/HTTPS routing, microservices, web apps
- **Network Load Balancer (NLB):** OSI Layer 4, Extreme Performance, TCP/TLS. low latency
- **Classic Load Balancer (CLB):** OSI Layer 7 and 4, Legacy EC2-Classic only (Deprecated)


**CloudFront:** AWS’s Content Delivery Network (CDN). It delivers data, videos, apps, and APIs to users around the world with low latency and high speed. It works by caching content at Edge Locations close to the user. 

#### Storage
**Simple Storage Service (S3):** A scalable, highly available, and durable storage service commonly used for storing files, backups, static websites, and media. Data is organized into buckets, and each file is called an object. Built in security features, considered the default for object storage.


**S3 Glacier/Glacier Deep Archive:** Low-cost archival storage for infrequently accessed data used for long-term backups, archives, and compliance. Retrieval time can take minutes to hours but it is much cheaper than standard storage options.

**Elastic Block Storage (EBS):** Provides persistent block-level storage volumes for use with independent EC2 instances. Think of it like a virtual hard drive attached to an EC2 instance. Commonly used for databases, apps, or boot volumes. Uses volumes to store and run data and uses snapshots to replicate volumes. 

**Elastic File Storage (EFS):** A fully managed, shared file storage system that can be used by multiple EC2 instances at once, working like a network drive. Grows and shrinks automatically based on usage. Common use cases include web servers, content management systems, analytics tools.

**Storage Gateway:** Provides on-prem access to AWS storage (S3) using local interfaces like NFS, SMB, or iSCSI. Used for hybrid storage setups.

#### Databases
**RDS:** A managed service for relational databases (tables, rows, columns, **SQL**) like MySQL, PostgreSQL, SQL Server, Oracle, and MariaDB. AWS handles backups, patching, and scaling. 

**Aurora:** A high-performance database engine built by AWS. It is available as an option within RDS. Faster than traditional databases but more expensive. 

**DynamoDB:** A fast, fully managed NoSQL database service. Great for apps that need millisecond response times at any scale. Key-Value and/or document based configurations. Serverless with built in backups. 

**DynamoDB Accelerator (DAX):** A fully managed, in-memory cache for Amazon DynamoDB that delivers microsecond response times — up to 10x faster than standard DynamoDB queries.

**RedShift:** A data warehouse service used for analyzing large amounts of structured data.
Optimized for running complex queries across petabytes of data.

**Neptune:** A fully managed graph database service used to store and navigate highly connected data, like relationships between people, places, or things.

**Elasticache:** A fully managed in-memory data store and cache service which improves application performance by storing frequently accessed data in memory, rather than querying a database every time. Supports Redis and Memcached.

**Elastic Map Reduce (EMR):** A managed big data platform that lets you run Hadoop, Spark, and other frameworks to process massive datasets quickly and affordably.

#### Migration
**AWS Snowball:** Physical device for offline data transfer to AWS.

**AWS Snowball Edge:** Same as Snowball, but with compute capabilities for processing data before upload.

**AWS Snowmobile:** For extremely large data migrations (up to exabytes) using a literal shipping truck.

**AWS Database Migration Service (DMS):** Migrates databases from on-premises or cloud environments to AWS quickly and securely. Does not migrate servers or any other infrastructure. 

**Application Migration Service (AWS MGN):** The primary service for lifting and shifting physical, virtual, or cloud-based servers to AWS. It automates the process of rehosting applications by continuously replicating your source servers to AWS, allowing for fast and reliable cutover with minimal downtime.

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

**AWS Control Tower:** A tool to help set up and govern a secure, multi-account AWS environment automatically. Automates account creation using AWS best practices and provides a dashboard for visibility and management. Automates landing zone creation using AWS Organizations, Service Catalog, and CloudFormation.

**AWS Config:** A service that records and monitors the configuration of AWS resources over time.

**Quantum Ledger Database (QLDB):** A ledger database designed to store a complete, verifiable history of changes to application data. Immutable, cryptographically verifiable, and serverless. 

**AWS Landing Zone:** A pre-configured, secure starting point for setting up a multi-account AWS environment. Think of it like a “blueprint” or starter kit for an enterprise-ready AWS setup. 

**AWS Managed Microsoft Active Directory:** A managed directory service that runs Microsoft Active Directory in the AWS cloud to join an EC2 instances with a domain using Group Policy, LDAP, and/or Kerberos. Supports hybrid environments with on-prem AD. 

**Certificate Manager (ACM):** A service that is used to create, store, and renew public and private SSL/TLS certificates. You can use ACM to implement encryption in transit and at rest by using a protocol, such as TLS.

**Security Hub:** A service that is used to centrally view your security posture in AWS. You can use Security Hub to check your AWS environment against security industry standards and best practices.


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


**AWS Marketplace:** A digital catalog of software products and services that you can deploy directly into your AWS environment.

**Pinpoint:** A user engagement service for sending targeted messages through email, SMS, push notifications, and voice.

**Elemental MediaConvert:** A file-based video transcoding service used to convert media files into formats for playback on TVs, smartphones, and other devices.


#### Artificial Intelligence/Machine Learning Tools
**Transcribe:** A service that uses machine learning to convert audio data to text.

**Polly:** A machine learning service that converts text to speech. This service provides the ability to read text out loud.

**Textract:** A machine learning service that can extract text from scanned documents.

**Translate:** A machine learning language translation service.

**SageMaker:**  A fully managed machine learning (ML) service that helps you build, train, and deploy ML models at scale handeling data preperation/cleaning, model building, model training, deployment, inference management, and monitoring. 

**Amazon Comprehend:** Natural language processing model (NLP) to extract meaning from text like sentiment analysis or create a summary.

**Amazon Rekognition:** Image and video analysis model for facial recognition or object detection.  

**Amazon Lex:** Build conversational interfaces using voice and text (used in Alexa).

