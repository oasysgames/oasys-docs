# Bridge

The Bridge service enables asset transfers exclusively within the Oasys blockchain, specifically between Layer 1 and Layer 2.

## How to run the Bridge

If you set up bridge for a Verse, You have to set it up manually.


### Step 1: Navigate to the frontend directory

You need to [set up the Blockscout](/docs/verse-developer/how-to-build-verse/explorer) frontend and backend first.
And navigate to the frontend directory:

```sh
cd blockscout-v6-frontend
```

### Step 2: Check token address

Please check if the token addresses defined 
for your Verse in the file within 
`bridge/constants/tokens.ts` 
eg. `bridge/constants/chains/tcg.ts`
are correct.

```ts
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
    }
    // your token information
```

```ts
export const TCGVerse = /*#__PURE__*/ defineChain({
    id: ChainId.TCG,
    name: 'TCG Verse',
    ...
    erc20Addresses: {
        [TokenIndex.USDT]: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0',
        [TokenIndex.TCGC]: '0xA29b548056c3fD0f68BAd9d4829EC4E66f22f796',
        // ...
        // your token address
    },
```

### Step 3: Add tokens if necessary

If adding a new token is required, please update the following file:

`bridge/constants/types.ts`

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

### Step 4: Set Environment Variables

Set environment variables based on the information in 
Environment Variables for Bridge.

#### Environment Variables For Bridge

When creating a bridge instance, configure the following environment variables. Below are example values for TCG Verse.

|    Variable               |   Description         | Value                                   |
|---------------------------|-----------------------|-----------------------------------------|
| NEXT_PUBLIC_MENU_BRIDGE_VISIBLE       | Set to true to show bridged Token               | true or false                           |
| NEXT_PUBLIC_L2_CHAIN_ID   | L2 chain ID           | `2400`                                  |


#### Prerequisites

- Docker installed on your machine
- Basic knowledge of Docker and Nginx

## How to create a new Verse

If you want to create a new Verse, 
you will need to set it up manually by following these steps:

### Step 1: Add ChainID

Please add the new Chain ID to the `bridge/constants/types.ts`

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

### Step 2: Add the Verse to the `bridge/constants/verseicons.ts`

1. Please add chain information

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

2. Please add chain ID information to the `bridge/constants/chains/index.ts`

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

3. Please add chain information to the `bridge/constants/chains/index.ts`

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

Please add chain icon path to the `bridge/constants/verseicons.ts`

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

Please add the V1 Verse chain ID to the `bridge/hooks/useDepositWithdraw.ts`

```ts
const verseV1 = [ChainId.SAAKURU]
```

### Step 5: Create the Verse file

Please create the Verse file in the `bridge/constants/chains/` directory.

1. Copy the  `bridge/constants/chains/tcg.ts` file.

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

When updating the Verse file , configure the 
following variables in the `defineChain` function. 
Below are example values for TCG Verse.

|    Variable                         | Value |
|-------------------------------------|--------|
| id                                  | `ChainId.TCGVERSE`   |
| name                                | `TCG Verse`   |
| rpcUrls default http                | `https://rpc.tcgverse.xyz`   |
| blockExplorers default name         | `TCG Verse scan`   |
| blockExplorers default url          | `https://explorer.tcgverse.xyz`   |
| contracts l1StandardBridge address  | `0xa34a85ecb19c88d4965EcAfB10019E63050a1098`   |
| erc20Addresses                      | `[TokenIndex.USDT]: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0'  ...` |
