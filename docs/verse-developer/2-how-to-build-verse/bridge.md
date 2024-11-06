
# Bridge

The Bridge service enables asset transfers exclusively within the Oasys blockchain, specifically between Layer 1 and Layer 2.

## How to run the Bridge

If you set up bridge for a Verse, You have to set it up manually.

### Step 1: Fork the Github repository

#### Git clone

First, clone the [explorer-bridge](https://github.com/oasysgames/explorer-bridge) repository:

```sh
git clone https://github.com/oasysgames/explorer-bridge.git
```

### Step 2: Set Environment Variables

Set environment variables based on the information in Environment Variables for Bridge.

#### Environment Variables For Bridge

When creating a bridge instance, configure the following environment variables. Below are example values for TCG Verse.

|    Variable               |   Description         | Value |
|---------------------------|-----------------------|--------|
| NEXT_PUBLIC_APP_URL       | App URL               | `https://explorer.tcgverse.xyz/`   |
| NEXT_PUBLIC_L2_CHAIN_ID   | L2 chain ID           | `2400`   |
| NEXT_PUBLIC_TITLE         | Page title            | `Bridge TCG Verse`   |
| NEXT_PUBLIC_FAVICON       | Favicon path          | `/tcgverse_favicon.ico`   |
| NEXT_PUBLIC_HEADER_LOGO   | Header logo path      | `/images/header/tcgverse_logo.png`   |
| NEXT_PUBLIC_FOOTER_HOMEPAGE_URL | Homepage URL    | `https://tcgverse.xyz`   |
| NEXT_PUBLIC_FOOTER_DISCORD_URL  | Discord URL     | `https://discord.com/invite/rYq23RtZHH`   |
| NEXT_PUBLIC_FOOTER_X_URL        | X URL           | `https://x.com/tcgverse`   |
| NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID | Wallet connect project ID | `***`   |

### Step 3: Build and Deploy
This guide provides instructions to build a Docker image, run a container from that image, copy a directory from the container to your host machine, and then set up an Nginx container to serve static files.

#### Prerequisites

- Docker installed on your machine
- Basic knowledge of Docker and Nginx

#### 1. Build the Docker Image

- Locate to your project directory

	```sh
	cd explorer-bridge/front
	```

-  Build the Docker image:

   ```bash
   docker build -t explorer-bridge-image -f ./Dockerfile .
   ```

#### 2. Run the Container

- Run a container from the image you just built:

	```bash
	docker run --name oasys-bridge-container explorer-bridge-image
	```

#### 3. Copy Directory from Container to Host

Identify the directory to copy from the container. In this example, assume the static files are in `/app/out`.

Use the `docker cp` command to copy the directory to your host machine:

   ```bash
   docker cp oasys-bridge-container:/app/out ./build/out
   ```

#### 4. Run Nginx Container to Serve Static Files

1. Create an `nginx.conf` file to configure Nginx. Below is an example configuration:

   ```nginx
   server {
       listen 80;
       server_name localhost;

       location / {
           root /usr/share/nginx/html;
           index index.html index.htm;
           try_files $uri $uri/ =404;
       }
   }
   ```

2. Run the Nginx container with the static files:

   ```bash
   docker run --name nginx-static -v $(pwd)/build/out:/usr/share/nginx/html:ro -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro -p 8080:80 -d nginx
   ```

   - `-v $(pwd)/build/out:/usr/share/nginx/html:ro` mounts the static files to the Nginx container.
   - `-v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro` mounts the custom Nginx configuration.

3. Access the static files by navigating to `http://localhost:8080` in your web browser.

### Step 4: Check token address

Please check if the token addresses defined for your Verse in the file within [front/src/constants/chains](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains) are correct.

- e.g. TCG Verse [(front/src/constants/chains/tcgverse.ts)](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/tcgverse.ts#L53-L58)

```tsx
erc20Addresses: {
	[TokenIndex.USDT]: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0',
	[TokenIndex.TCGC]: '0xA29b548056c3fD0f68BAd9d4829EC4E66f22f796',
	[TokenIndex.MCHC]: '0xcfD1D50ce23C46D3Cf6407487B2F8934e96DC8f9',
	[TokenIndex.TOTEM]: '0xc8058960a9d7E7d81143BDBA38d19e6824165932',
	[TokenIndex.DMT]: '0x35D48A789904E9b15705977192e5d95e2aF7f1D3',
	[TokenIndex.USDCeLegacy]: '0x3bB4445D30AC020a84c1b5A8A2C6248ebC9779D0',
},
```

### Step 5: Add tokens if necessary

If adding a new token is required, please update the following two files:

1. [front/src/constants/types.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/types.ts#L31-L46)

```tsx
export enum TokenIndex {
	OAS,
	USDT,
	TCGC,
	MCHC,
	DMT,
	TOTEM,
	MARD,
	EPL,
	CGG,
	WETH,
	WBTC,
	USDCe,
	GEEK,
	USDCeLegacy,
}
```

2. [front/src/constants/tokens.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/tokens.ts#L3-L75)

```tsx
export const TOKEN_LIST: { [k in TokenIndex]: TokenInfo } = {
	// mainnet
	[TokenIndex.OAS]: {
		ind: TokenIndex.OAS,
		symbol: 'OAS',
		icon: '/images/tokens/OAS.png',
	},
	[TokenIndex.USDT]: {
		ind: TokenIndex.USDT,
		symbol: 'USDT',
		icon: '/images/tokens/USDT.png',
	},
	...
}
```


### Step 6: Add the Verse logo

Please add the Verse logo to the [front/public/images/header](https://github.com/oasysgames/explorer-bridge/tree/main/front/public/images/header) directory.

### Step 7: Update the Verse favicon  if necessary

Please update the Verse favicon in the [front/public/images](https://github.com/oasysgames/explorer-bridge/tree/main/front/public/images) directory if necessary.
