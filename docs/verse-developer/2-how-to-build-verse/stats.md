
# Charts and Stats

## Introduction
New Blockscout stats service

Blockscout provides a way to easily calculate and display chain-relevant charts and statistics. For example, it can calculate and display the number of blocks per day, the average block reward, or the number of active accounts per day.

Statistics are implemented using a separate microservice that is connected to the indexed blockscout database. The source code and full README.md for the service is available here: https://github.com/blockscout/blockscout-rs/tree/main/stats

## How to run Charts and Stats

### Step 1: Locate blockscout-v6-backend/docker-compose
```sh
cd blockscout-v6-backend/docker-compose/
```

### Step 2: Update a Docker Compose Configuration

Updating `services/stats.yml` file in the project root directory with the following content:


```yaml
version: '3.9'

services:
  stats-db-init:
    image: postgres:15
    volumes:
      - ./stats-db-data:/var/lib/postgresql/data
    entrypoint:
      - sh
      - -c
      - |
        chown -R 2000:2000 /var/lib/postgresql/data

  stats-db:
    image: postgres:15
    user: 2000:2000
    shm_size: 256m
    restart: always
    container_name: 'stats-db'
    command: postgres -c 'max_connections=200'
    environment:
        POSTGRES_DB: 'stats'
        POSTGRES_USER: 'stats'
        POSTGRES_PASSWORD: 'password'
    ports:
      - target: 5432
        published: 7433
    volumes:
      - ./stats-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U stats -d stats"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  stats:
    image: ghcr.io/blockscout/stats:${STATS_DOCKER_TAG:-latest}
    pull_policy: always
    platform: linux/amd64
    restart: always
    container_name: 'stats'
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    env_file:
      -  ../envs/common-stats.env
    environment:
      - STATS__DB_URL=postgresql://{uname}:{upass}@{DB_DOMAIN}:5432/{stats_DB}
      - STATS__BLOCKSCOUT_DB_URL=postgresql://{uname}:{upass}@{DB_DOMAIN}:5432/{indexing_DB}
      - STATS__CREATE_DATABASE=true
      - STATS__RUN_MIGRATIONS=true
      - STATS_CHARTS__TEMPLATE_VALUES__NATIVE_COIN_SYMBOL=OAS
```

Replace `{uname}`, `{upass}`, `{DB_DOMAIN}`, `{stats_DB}`, `{indexing_DB}`,  with the actual values of your RDS.

### Step 3: Config NGIX

Updating the `proxy/default.conf.template` file involves modifying the NGINX configuration to suit your specific deployment needs. This file is used to configure how NGINX proxies requests to your BlockScout application.

Below are steps and examples on how to update the `default.conf.template` file.

#### Locate the `default.conf.template` File

First, navigate to the `proxy/` directory to find the `default.conf.template` file.

```sh
cd blockscout-v6-backend/docker-compose/proxy/
```

#### Open the `default.conf.template` File

Open the `default.conf.template` file using your preferred text editor. For example:

```sh
nano default.conf.template
```

#### Update NGINX Configuration

Updating the `default.conf.template` file allows you to customize NGINX configurations for your BlockScout deployment. Key sections to modify include the server name  security headers. After making the necessary changes, restart your Docker Compose services to apply the new configuration.
Here is an example of a basic `default.conf.template` file with comments explaining each section. You can modify it based on your requirements.

```nginx
map $http_upgrade $connection_upgrade {

  default upgrade;
  ''      close;
}

server {
    listen       80;
    server_name  localhost;
    proxy_http_version 1.1;

    location ~ ^/(api|socket|sitemap.xml|auth/auth0|auth/auth0/callback|auth/logout) {
        proxy_pass            ${BACK_PROXY_PASS};
        proxy_http_version    1.1;
        proxy_set_header      Host "$host";
        proxy_set_header      X-Real-IP "$remote_addr";
        proxy_set_header      X-Forwarded-For "$proxy_add_x_forwarded_for";
        proxy_set_header      X-Forwarded-Proto "$scheme";
        proxy_set_header      Upgrade "$http_upgrade";
        proxy_set_header      Connection $connection_upgrade;
        proxy_cache_bypass    $http_upgrade;
        add_header 'Access-Control-Allow-Origin' '*' always;
    }
    location / {
        proxy_pass            ${FRONT_PROXY_PASS};
        proxy_http_version    1.1;
        proxy_set_header      Host "$host";
        proxy_set_header      X-Real-IP "$remote_addr";
        proxy_set_header      X-Forwarded-For "$proxy_add_x_forwarded_for";
        proxy_set_header      X-Forwarded-Proto "$scheme";
        proxy_set_header      Upgrade "$http_upgrade";
        proxy_set_header      Connection $connection_upgrade;
        proxy_cache_bypass    $http_upgrade;
        add_header 'Access-Control-Allow-Origin' '*' always;
    }
}
server {
    listen       8080;
    server_name  localhost;
    proxy_http_version 1.1;
    proxy_hide_header Access-Control-Allow-Origin;
    proxy_hide_header Access-Control-Allow-Methods;
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'PUT, GET, POST, OPTIONS, DELETE, PATCH' always;

    location / {
        proxy_pass            http://stats:8050/;
        proxy_http_version    1.1;
        proxy_set_header      Host "$host";
        proxy_set_header      X-Real-IP "$remote_addr";
        proxy_set_header      X-Forwarded-For "$proxy_add_x_forwarded_for";
        proxy_set_header      X-Forwarded-Proto "$scheme";
        proxy_set_header      Upgrade "$http_upgrade";
        proxy_set_header      Connection $connection_upgrade;
        proxy_cache_bypass    $http_upgrade;
    }
}
server {
    listen       8081;
    server_name  localhost;
    proxy_http_version 1.1;
    proxy_hide_header Access-Control-Allow-Origin;
    proxy_hide_header Access-Control-Allow-Methods;
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'PUT, GET, POST, OPTIONS, DELETE, PATCH' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,x-csrf-token' always;

    location / {
        proxy_pass            http://visualizer:8050/;
        proxy_http_version    1.1;
        proxy_buffering       off;
        proxy_set_header      Host "$host";
        proxy_set_header      X-Real-IP "$remote_addr";
        proxy_connect_timeout 30m;
        proxy_read_timeout    30m;
        proxy_send_timeout    30m;
        proxy_set_header      X-Forwarded-For "$proxy_add_x_forwarded_for";
        proxy_set_header      X-Forwarded-Proto "$scheme";
        proxy_set_header      Upgrade "$http_upgrade";
        proxy_set_header      Connection $connection_upgrade;
        proxy_cache_bypass    $http_upgrade;
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Allow-Methods' 'PUT, GET, POST, OPTIONS, DELETE, PATCH' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,x-csrf-token' always;
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

**server_name**: Change `localhost` to your domain name if you are running BlockScout on a public server.
**Security Headers**: Add security headers to enhance the security of your application.

#### Save and Exit

After making the necessary changes, save the file and exit the text editor. For example, in `nano`, you can do this by pressing `Ctrl+O` to save and `Ctrl+X` to exit.


### Step 4: Restart Docker Compose Services

Finally, restart your Docker Compose services to apply the changes.

```sh
docker-compose stop

FRONT_PROXY_PASS=http://host.docker.internal:3000 docker-compose -f external-frontend.yml up -d
```

## Register and deploy a domain with HTTPS 
To register and deploy a domain with HTTPS using Route 53, an Application Load Balancer (ALB), and a target group that forwards traffic to port 8080 of an EC2 instance, follow these steps:

### Prerequisites

1. An AWS account
2. Domain registration (either through Route 53 or another domain registrar)
3. AWS CLI installed and configured
4. An EC2 instance running and accessible

### Step 1: Set Up Route 53 Hosted Zone

If you don’t already have a hosted zone for your domain in Route 53, you need to create one.

1. Go to the **Route 53** service in the AWS Management Console.
2. Click on **Hosted zones**.
3. Click **Create hosted zone**.
4. Enter your domain name and leave the type as **Public Hosted Zone**.
5. Click **Create**.

### Step 2: Configure Security Group for EC2 Instance

Ensure that your EC2 instance’s security group allows inbound traffic on port 8080.

1. Go to the **EC2 Dashboard** in the AWS Management Console.
2. Select the **Security Groups** link in the sidebar.
3. Find and select the security group associated with your EC2 instance.
4. Click on the **Inbound rules** tab.
5. Click **Edit inbound rules**.
6. Add a new rule for HTTP on port 8080:
   - Type: Custom TCP Rule
   - Protocol: TCP
   - Port Range: 8080
   - Source: 0.0.0.0/0 (or a more restrictive range if needed)
7. Click **Save rules**.

### Step 3: Create an Application Load Balancer (ALB)

1. Go to the **EC2 Dashboard** in the AWS Management Console.
2. Under **Load Balancing**, click on **Load Balancers**.
3. Click **Create Load Balancer** and select **Application Load Balancer**.
4. Configure the load balancer:
   - Name: `stats-alb`
   - Scheme: Internet-facing
   - IP address type: IPv4
   - Listeners: HTTP on port 80 and HTTPS on port 443
   - Availability Zones: Select the appropriate VPC and subnets
5. Click **Next: Configure Security Settings**.
6. Choose to create or select an existing SSL certificate from ACM (AWS Certificate Manager):
   - If you don’t have an SSL certificate, request one via ACM.
7. Click **Next: Configure Security Groups**.
8. Select an existing security group or create a new one that allows inbound HTTP traffic on port 80 and HTTPS on port 443.
9. Click **Next: Configure Routing**.
10. Configure the target group:
    - Name: `stats-target-group`
    - Target type: Instance
    - Protocol: HTTP
    - Port: 8080 (this is where the ALB will forward traffic to your EC2 instances)
    - Health checks: HTTP on port 8080
11. Click **Next: Register Targets**.
12. Select your EC2 instance and click **Add to registered**.
13. Click **Next: Review** and then **Create**.

### Step 4: Associate Your Domain with the ALB

1. Go back to the **Route 53** service in the AWS Management Console.
2. Click on **Hosted zones** and select your domain.
3. Click **Create Record Set**.
4. Create an `A` record to point your domain to the ALB:
   - Name: Leave blank to use the root domain or enter a subdomain.
   - Type: A - IPv4 address
   - Alias: Yes
   - Alias Target: Select your ALB from the dropdown list.
5. Click **Create**.

### Step 5: Update ALB Listener to Use HTTPS

1. Go back to the **Load Balancers** section in the EC2 Dashboard.
2. Select your newly created ALB (`stats-alb`).
3. Click on the **Listeners** tab.
4. Ensure you have a listener on port 443 (HTTPS) that forwards traffic to the target group on port 8080.

### Step 6: Test the Setup

1. Wait for the DNS changes to propagate, which can take a few minutes.
2. Open a web browser and navigate to your domain (`https://stats-blockscout-domain.com`).
3. Ensure that the traffic is correctly forwarded to the ALB, which in turn forwards it to the EC2 instance on port 8080.


## Update ENV Configuration of blockscout-v6-frontend

### Step 1: Locate blockscout-v6-frontend/
```sh
cd blockscout-v6-frontend/
```

### Step 2: Update ENV Configuration

Updating `configs/envs/.env.common` file in the project root directory with the following content:


```yaml
## Blockchain statistics
# NEXT_PUBLIC_STATS_API_HOST=http://localhost:8080
```
↓
```yaml
## Blockchain statistics
NEXT_PUBLIC_STATS_API_HOST=`https://stats-blockscout-domain.com`
```

Replace ``https://stats-blockscout-domain.com`　with the actual value.

### Step 3: Restart Docker Compose Services

Finally, rebuild and restart your Docker Compose services to apply the changes.

```sh
docker-compose stop
docker-compose build
docker-compose up -d
```
