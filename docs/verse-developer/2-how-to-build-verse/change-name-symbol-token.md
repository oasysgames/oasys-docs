
# How to change Token name and symbol

## Update ENV Configuration of blockscout-v6-frontend

### Step 1: Locate blockscout-v6-frontend/
```sh
cd blockscout-v6-frontend/
```

### Step 2: Update ENV Configuration

Updating `configs/envs/.env.common` file in the project root directory with the following content:


```yaml
## verse token
NEXT_PUBLIC_TOKENS_UPDATED_ADDRESS=
NEXT_PUBLIC_TOKENS_UPDATED_NAME=
NEXT_PUBLIC_TOKENS_UPDATED_SYMBOL=

```
↓
```yaml
## verse token
NEXT_PUBLIC_TOKENS_UPDATED_ADDRESS=0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000
NEXT_PUBLIC_TOKENS_UPDATED_NAME=Oasys
NEXT_PUBLIC_TOKENS_UPDATED_SYMBOL=OAS
```

Replace `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` with the actual value.

### Step 3: Restart Docker Compose Services

Finally, rebuild and restart your Docker Compose services to apply the changes.

```sh
docker-compose stop
docker-compose build
docker-compose up -d
```
