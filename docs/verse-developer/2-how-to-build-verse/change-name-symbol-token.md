# How to change Token name and symbol

## Environment Variables
For frontend environment variables configuration (including token-related variables), please refer to the [Blockscout v6 Frontend Documentation](https://github.com/oasysgames/blockscout-v6-frontend/blob/main/docs/ENVS.md).

## Update ENV Configuration
(see Verse token configuration when changing the token name)

### Step 1: Locate blockscout-v6-frontend/
```sh
cd blockscout-v6-frontend/
```

### Step 2: Update ENV Configuration
Update your environment variables file `config/envs/.env.common`.

### Step 3: Restart Docker Compose Services

Finally, rebuild and restart your Docker Compose services to apply the changes.

```sh
docker-compose stop
docker-compose build
docker-compose up -d
```
