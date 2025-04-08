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
Free Code Camp: https://www.youtube.com/watch?v=3hLmDS179YE


## Content

### Vocab:
**Cloud Computing:** Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical servers and infrastructure, companies can access technology services such as computing power, storage, and databases on an as-needed basis (Using someone else's computer).

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

### Support Plans
- Basic
- Developer
- Business
- Enterpise

| Plan        | Cost                   | Support Access                            | Best For                          |
|-------------|------------------------|-------------------------------------------|-----------------------------------|
| Basic       | Free                   | Billing and account support via email     | Individual users or basic use     |
| Developer   | Starts at $29/month    | Email support during business hours       | Development and testing           |
| Business    | Starts at $100/month   | 24x7 email, chat, and phone support       | Production environments           |
| Enterprise  | Starts at $15,000/month| 24x7 support plus Technical Account Manager| Mission-critical or large systems |


