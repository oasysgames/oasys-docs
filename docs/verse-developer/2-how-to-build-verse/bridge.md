
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
           index index.html index.html;
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

## How to create a new Verse

If you want to create a new Verse, you will need to set it up manually by following these steps:

### Step 1: Add ChainID

Please add the new Chain ID to the [front/src/constants/types.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/types.ts#L1-L17)

```ts
export enum ChainId {
	OASYS = 248,
	TCG = 2400,
	SAAKURU = 7225878,
	MCH = 29548,
	XPLA = 7300,
	HOME = 19011,
	DEFI = 16116,
	YOOLDO = 50006,
	GEEK = 75512,
	CHAIN = 5555,
	DM2 = 68770,
	GESO = 428,
}
```

### Step 2: Add the Verse to the [front/src/constants/chains/index.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/index.ts#L28)

1. Please add chain information to the [const CHAINS](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/index.ts#L20-L35)

```ts
export const CHAINS: { [k in ChainId]: Chain } = {
	[ChainId.OASYS]: Oasys,
	[ChainId.OASYS_TESTNET]: OasysTestnet,
	[ChainId.SANDVERSE_TESTNET]: SandVerse,
	[ChainId.TCGVERSE]: TCGVerse,
	[ChainId.MCHVERSE]: MCHVerse,
	[ChainId.SAAKURUVERSE]: SaakuruVerse,
	[ChainId.XPLA]: XPLAVerse,
	[ChainId.HOME]: HOMEVerse,
	[ChainId.DEFI]: DefiVerse,
	[ChainId.YOOLDO]: YooldoVerse,
	[ChainId.GEEK]: GeekVerse,
	[ChainId.CHAIN]: ChainVerse,
	[ChainId.DM2]: Dm2Verse,
	[ChainId.GESO]: GesoVerse,
}
```

2. Please add chain ID information to the [const L2MainnetChainIds](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/index.ts#L37-L49)

```ts
export const L2MainnetChainIds = [
	ChainId.TCGVERSE,
	ChainId.MCHVERSE,
	ChainId.SAAKURUVERSE,
	ChainId.XPLA,
	ChainId.HOME,
	ChainId.DEFI,
	ChainId.YOOLDO,
	ChainId.GEEK,
	ChainId.CHAIN,
	ChainId.DM2,
	ChainId.GESO,
]
```

3. Please add chain information to the [export](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/index.ts#L57-L72)

```ts
export {
	Oasys,
	OasysTestnet,
	SandVerse,
	TCGVerse,
	MCHVerse,
	SaakuruVerse,
	XPLAVerse,
	HOMEVerse,
	DefiVerse,
	YooldoVerse,
	GeekVerse,
	ChainVerse,
	Dm2Verse,
	GesoVerse,
}
```

### Step 3: Add the Verse to the verseicons.ts

Please add chain icon path to the [front/src/constants/verseicons.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/verseicons.ts#L3-L18)

```ts
export const CHAINS_ICONS: { [k in ChainId]: string } = {
	[ChainId.OASYS]: '/images/Oasys.png',
	[ChainId.OASYS_TESTNET]: '/images/Oasys.png',
	[ChainId.SANDVERSE_TESTNET]: 'SandVerse',
	[ChainId.TCG]: '/images/tcg.svg',
	[ChainId.MCH]: '/images/mch.svg',
	[ChainId.SAAKURU]: '/images/saakuru.svg',
	[ChainId.XPLA]: '/images/xpla.png',
	[ChainId.HOME]: '/images/home.png',
	[ChainId.DEFI]: '/images/defi.jpeg',
	[ChainId.YOOLDO]: '/images/yooldo.png',
	[ChainId.GEEK]: '/images/geek.jpg',
	[ChainId.CHAIN]: '/images/chain.svg',
	[ChainId.DM2]: '/images/dm2.svg',
	[ChainId.GESO]: '/images/geso.svg',
}
```

### Step 4: Add the V1 Verse values to the useDepositWithdraw.ts

Please add the V1 Verse chain ID to the [front/src/hooks/useDepositWithdraw.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/hooks/useDepositWithdraw.ts#L22)

```ts
const verseV1 = [ChainId.SAAKURU]
```

### Step 5: Create the Verse file

Please create the Verse file in the [front/src/constants/chains](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/) directory.

1. Copy the [front/src/constants/chains/tcg.ts](https://github.com/oasysgames/explorer-bridge/blob/main/front/src/constants/chains/tcg.ts) file.

```ts
import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'

import { ChainId, TokenIndex } from '../types'

export const TCGVerse = defineChain({
	id: ChainId.TCGVERSE,
	name: 'TCG Verse',
	nativeCurrency: { name: 'Oasys', symbol: 'OAS', decimals: 18 },
	rpcUrls: {
		default: {
			http: ['https://rpc.tcgverse.xyz'],
		},
	},
	blockExplorers: {
		default: {
			name: 'TCG Verse scan',
			url: 'https://explorer.tcgverse.xyz',
		},
	},
	contracts: {
		...chainConfig.contracts,
		l1StandardBridge: {
			[ChainId.OASYS]: {
				address: '0xa34a85ecb19c88d4965EcAfB10019E63050a1098',
			},
		},
	},
	erc20Addresses: {
		[TokenIndex.USDT]: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0',
		[TokenIndex.TCGC]: '0xA29b548056c3fD0f68BAd9d4829EC4E66f22f796',
		[TokenIndex.MCHC]: '0xcfD1D50ce23C46D3Cf6407487B2F8934e96DC8f9',
		[TokenIndex.TOTEM]: '0xc8058960a9d7E7d81143BDBA38d19e6824165932',
		[TokenIndex.DMT]: '0x35D48A789904E9b15705977192e5d95e2aF7f1D3',
		[TokenIndex.USDCeLegacy]: '0x3bB4445D30AC020a84c1b5A8A2C6248ebC9779D0',
	},
})

```

2. Update the Verse file

When updating the Verse file , configure the following variables in the `defineChain` function. Below are example values for TCG Verse.

|    Variable                         | Value |
|-------------------------------------|--------|
| id                                  | `ChainId.TCGVERSE`   |
| name                                | `TCG Verse`   |
| rpcUrls default http                | `https://rpc.tcgverse.xyz`   |
| blockExplorers default name         | `TCG Verse scan`   |
| blockExplorers default url          | `https://explorer.tcgverse.xyz`   |
| contracts l1StandardBridge address  | `0xa34a85ecb19c88d4965EcAfB10019E63050a1098`   |
| erc20Addresses                      | `[TokenIndex.USDT]: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0'  ...` |
