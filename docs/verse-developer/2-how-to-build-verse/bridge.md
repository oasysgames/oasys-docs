
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

### Step 5: Change tokens if necessary

### Step 6: add the Verse logo

Please add the Verse logo to the [front/public/images/header](https://github.com/oasysgames/explorer-bridge/tree/main/front/public/images/header) directory.

### Step 7: Update the Verse favicon  if necessary

Please update the Verse favicon in the [front/public/images](https://github.com/oasysgames/explorer-bridge/tree/main/front/public/images) directory if necessary.
