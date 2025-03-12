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
Update your environment variables file `configs/envs/.env.common`. Add or modify the following variables (example):

```env
# Network Currency Configuration
NEXT_PUBLIC_NETWORK_CURRENCY_NAME=OAS
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=OAS
NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS=18

# Verse Layer Token Configuration (Oasys-specific patch)
NEXT_PUBLIC_TOKENS_UPDATED_ADDRESS=0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000
NEXT_PUBLIC_TOKENS_UPDATED_NAME=Oasys
NEXT_PUBLIC_TOKENS_UPDATED_SYMBOL=OAS
```

Note: The Verse Layer Token Configuration variables are Oasys-specific patches applied to customize the token settings.

### Step 3: Restart Docker Compose Services

Finally, rebuild and restart your Docker Compose services to apply the changes.

```sh
docker-compose stop
docker-compose build
docker-compose up -d
```
