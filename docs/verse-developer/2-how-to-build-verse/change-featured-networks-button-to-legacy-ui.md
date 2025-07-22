# Changing featured networks button display to Legacy UI style

## Environment Variables
For frontend environment variables configuration (including the featured networks button display style), please refer to the [Blockscout v8 Frontend Documentation](https://github.com/oasysgames/blockscout-v8-frontend/blob/main/docs/ENVS.md).

## Update ENV Configuration

### Step 1: Navigate to the blockscout-v8-frontend directory
```sh
cd blockscout-v8-frontend/
```

### Step 2: Update Environment Variable Configuration
Update your environment variables file `configs/envs/.env.common`. Add or modify the following variable:

```env
# Configure featured networks button to use legacy UI style
NEXT_PUBLIC_SHOW_FEATURED_NETWORKS_BY_OLD_UI=true
```

This setting will enable the display of the featured networks button using the legacy UI style.

### Step 3: Restart Docker Compose Services

Finally, rebuild and restart your Docker Compose services to apply the changes:

```sh
docker-compose stop
docker-compose build
docker-compose up -d
```