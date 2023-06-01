# Preparation
- You need Linux knowledge, skill, experience to read this docs.
- If you are not familiar with Oasys, please read [What's Oasys?](/docs/tech-docs/whats-oasys/1-1-whats-oasys)

## Setting up Account in AWS
warning never use AWS root account ref. [AWS IAM UserGuide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html)

## Log into AWS
Signing up for AWS is outside the scope of this article, but Amazon has instructions [here](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

It is highly recommended that you set up Multi-Factor Authentication on your AWS root user account to protect it. Amazon has documentation for this [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root).

Once your account is set up, you should create a new EC2 instance. An EC2 is a virtual machine instance in AWS's cloud. Go to the [AWS Management Console](https://console.aws.amazon.com/) and enter the EC2 dashboard.

## Region
 Anywhere you like. Decentralized is our top priority. 

## Create key pairs
To Log into your EC2 instance in secure, [create or prepare key](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html) that grants access to the instance.

## Create a security group

To continue setting by scripts and console, please allow "SSH" from "MyIP".
Also please allow [these ports](/docs/hub-validator/operate-validator/1-1-hd-requirement#firewall-settings).

## Create EC2 instance

Select EC2 instance type on AWS. 
For details, check out [minumum spec](/docs/hub-validator/operate-validator/1-1-hd-requirement), `m5.xlarge` or higher instance is recommended. 

## Network 
 - you can start validator node from Single-AZ. If you need more availability, please use multi-AZ or multi-region.
