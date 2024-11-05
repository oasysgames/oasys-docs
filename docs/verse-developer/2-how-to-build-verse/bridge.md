
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
| NEXT_PUBLIC_FAVICON       | Favicon pass          | `/tcgverse_favicon.ico`   |
| NEXT_PUBLIC_HEADER_LOGO   | Header logo pass      | `/images/header/tcgverse_logo.png`   |
| NEXT_PUBLIC_FOOTER_HOMEPAGE_URL | Homepage URL    | `https://tcgverse.xyz`   |
| NEXT_PUBLIC_FOOTER_DISCORD_URL  | Discord URL     | `https://discord.com/invite/rYq23RtZHH`   |
| NEXT_PUBLIC_FOOTER_X_URL        | X URL           | `https://discord.com/invite/rYq23RtZHH`   |
| NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID | Wallet connect project ID | `***`   |

### Step 3: Infra (@Binh )

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
