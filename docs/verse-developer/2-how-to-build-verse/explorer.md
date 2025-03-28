# Explorer
After building a Verse, you have to create a Verse explorer. Please use [blockscout](https://docs.blockscout.com/) to create a Verse explorer.

## Prerequisites
Before setting up the Blockscout explorer, you need to configure your Verse node to support the required JSON-RPC namespaces.

:::warning Security Concern Regarding JSON-RPC Namespaces
The Blockscout explorer requires access to the `txpool` and `debug` namespaces. However, these namespaces pose security risks that need to be carefully considered:

- **debug namespace**: Contains dangerous commands like `setHead(blockNum)` that can roll back the block head to a past state. Never expose this namespace directly to the public.
- **txpool namespace**: While less risky than debug, it's still recommended to restrict public access as the explorer already provides similar capabilities through its interface.

To mitigate these risks, consider the following approaches:

1. Use verse-proxy to control access to these namespaces. See: [Set allowed verse request methods](/docs/verse-developer/how-to-build-verse/verse-proxy#set-allowed-verse-request-methods)
2. Set up a [read-only replica Verse](/docs/verse-developer/how-to-build-verse/read-node) for the explorer, while keeping the write node's RPC endpoint (with restricted namespaces) for public access.
:::

### Configure Verse Node (For Verse v0)
If you are using L2Geth, enable the required namespaces in your node configuration:

```sh
# In the case of starting options
geth \
  ... \
  --http.api=eth,web3,net,shh,rollup,txpool,debug \
  --ws.api=eth,web3,net,shh,rollup,txpool,debug \
  ...

# In the case of environment variables
RPC_API=eth,web3,net,shh,rollup,txpool,debug
WS_API=eth,web3,net,shh,rollup,txpool,debug
```

### Configure Verse Node (For Verse v1)
If you are using op-geth, follow these steps to enable the required namespaces:

1. **Locate the Startup Script or Configuration**:
   - Find the script or configuration file used to start your `op-geth` node.

2. **Enable Required JSON-RPC Namespaces**:
   ```bash
   op-geth --networkid <your_network_id> \
           ... \
           --http.api "eth,net,web3,txpool,debug" \
           --ws.api "eth,net,web3,txpool,debug" \
           ...
   ```

   Or using environment variables:
   ```plaintext
   ETH_HTTP_API="eth,net,web3,txpool,debug"
   ETH_WS_API="eth,net,web3,txpool,debug"
   ```

3. **Restart and Verify**:
   - Restart your `op-geth` node to apply the settings
   - Check the logs to confirm the namespaces are available

## Common Backend Environment Variables
Both BlockScout v6 and v7 share the following environment variables that need to be configured:

For more details, see [Blockscout Backend Environment Variables](https://docs.blockscout.com/setup/env-variables/backend-env-variables).

   |    Variable               |   Description                              | Value |
   |---------------------------|--------------------------------------------|--------|
   | DATABASE_URL              | Postgres Database endpoint                  | postgresql://postgres:@host.docker.internal:7432/blockscout?ssl=falset |
   | ETHEREUM_JSONRPC_VARIANT  | RPC Client type                           | geth |
   | ETHEREUM_JSONRPC_HTTP_URL | RPC endpoint for main operations          | rpc.myverse.com |
   | ETHEREUM_JSONRPC_TRACE_URL | RPC endpoint for tracing operations. This endpoint must support debug_traceTransaction method for internal transactions. For Verse v1 (OP Stack), ensure that the debug namespace is enabled and the node is configured to support internal transaction tracing. | rpc.myverse.com |
   | SECRET_KEY_BASE | Random string for contract verification    | Generate using: `head -c 64 /dev/urandom \| base64 \| cut -c 1-64` |
   | JSON_RPC | RPC endpoint for MetaMask integration        | rpc.myverse.com |
   | CHAIN_ID | Chain ID for MetaMask integration           | Your Verse ChainID |
   | RE_CAPTCHA_SECRET_KEY | reCAPTCHA secret key                      | Your secret key |
   | RE_CAPTCHA_CLIENT_KEY | reCAPTCHA client key                      | Your client key |

   Note: If running on the same server, use `http://host.docker.internal:8545/` for RPC URLs.

## Frontend Environment Variables
Both BlockScout v6 and v7 share the following frontend environment variables that need to be configured:

:::note Important Notes for Verse v1 Environment
When setting up Blockscout for Verse v1 (OP Stack), ensure the following configuration:

1. Set `NEXT_PUBLIC_VERSE_VERSION=1` to enable OP Stack specific features
2. Set `NEXT_PUBLIC_HOMEPAGE_HIDDEN_OP_NODE_TXS=true` to hide internal L2 transactions (recommended for cleaner transaction view)
:::

For more common details, see [Blockscout Frontend Environment Variables](https://docs.blockscout.com/for-developers/information-and-settings/env-variables/frontend-common-envs).

### OP Stack Related Variables
   |    Variable               |   Description                              | Value |
   |---------------------------|--------------------------------------------|--------|
   | NEXT_PUBLIC_HOMEPAGE_HIDDEN_OP_NODE_TXS | Controls the visibility of OP Stack transactions. When enabled, it hides L2 transactions from the OP Stack node . This is particularly useful for Verse v1 which uses OP Stack. | `true` or `false` |
   | NEXT_PUBLIC_VERSE_VERSION | Specifies the Verse version. Set to `1` for Verse v1 (OP Stack) or `0` for Verse v0 (L2Geth). This affects how bridge transactions and other version-specific features are handled in the explorer. | `0` or `1` |

### Token Configuration Variables
   |    Variable               |   Description                              | Value | Version |
   |---------------------------|--------------------------------------------|--------|---------|
   | NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY | reCAPTCHA site key for the application. Note: In versions prior to v1.38.x, this was temporarily named as `NEXT_PUBLIC_RE_CAPTCHA_V3_APP_SITE_KEY`. From v1.38.x onwards, it has been reverted back to `NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY`. | Your reCAPTCHA site key | All |
   | NEXT_PUBLIC_UPDATED_TOKENS | URL of a JSON configuration file or a JSON string containing updated token information. Used to override token display information in the explorer. | URL: `https://oasys-blockscout-networks.s3.ap-northeast-1.amazonaws.com/blockscout-updated-tokens.json` or JSON string: `{"tokens":[{"address":"0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000","name":"Oasys","symbol":"OAS"},{"address":"0xE1aB220E37AC55A4E2dD5Ba148298A9c09fBD716","name":"Legacy Bridged USDC (Celer)","symbol":"USDC.e-legacy"}]}` | v1.38.x+ |

## Blockscout v6

### Setup Blockscout
#### Backend Setup
1. **Clone Repository**:
   ```shell
   git clone https://github.com/oasysgames/blockscout-v6-backend.git
   cd blockscout-v6-backend
   ```

2. **Checkout Specific Version**:
   Check available versions at [blockscout-v6-backend releases](https://github.com/oasysgames/blockscout-v6-backend/tags) and checkout the desired version:
   ```shell
   # Example: checking out the latest stable version
   git checkout <version-tag>
   ```

3. **Configure Environment Variables and Start**:
   Set the following variables in [common-blockscout.env](https://github.com/oasysgames/blockscout-v6-backend/blob/main/docker-compose/envs/common-blockscout.env):

   ```shell
   cd docker-compose/envs/
   vim common-blockscout.env
   docker compose build
   docker compose up -d
   ```

   Refer to the [Common Backend Environment Variables](#common-backend-environment-variables) section above for the required configuration.

4. **Run Backend Container**:
   ```shell
   sudo FRONT_PROXY_PASS=http://host.docker.internal:3000 docker compose -f external-frontend.yml up -d
   ```

#### Frontend Setup
1. **Clone Repository**:
   ```shell
   git clone https://github.com/oasysgames/blockscout-v6-frontend.git
   cd blockscout-v6-frontend
   ```

2. **Checkout Specific Version**:
   Check available versions at [blockscout-v6-frontend releases](https://github.com/oasysgames/blockscout-v6-frontend/tags) and checkout the desired version:
   ```shell
   # Example: checking out the latest stable version
   git checkout <version-tag>
   ```

3. **Configure Environment Variables**:
   - Set variables in [.env.common](https://github.com/oasysgames/blockscout-v6-frontend/blob/main/configs/envs/.env.common)
   - For available options, see [Blockscout v6 Frontend Documentation](https://github.com/oasysgames/blockscout-v6-frontend/blob/main/docs/ENVS.md)
   - For Featured Networks configuration, see [Featured Network Configuration Properties](https://github.com/blockscout/frontend/blob/main/docs/ENVS.md#featured-network-configuration-properties)
   - For OP Stack configuration, see [OP Stack Related Variables](#op-stack-related-variables)
   - For Token configuration, see [Token Configuration Variables](#token-configuration-variables)

4. **Run Frontend Container**:
   ```shell
   docker-compose build 
   docker compose up -d
   ```

   Access the explorer at `http://localhost/` or `http://localhost:3000/`

#### Optional: Migrate Verified Contract Data
If you want to migrate verified contract data from v5 to v6:

```shell
cd blockscout-v6-backend/migrates/
cp config/.env.sample config/.env
vi config/.env  # modify variables as needed
sudo chmod +x excutes/verified_contract.sh
./excutes/verified_contract.sh
```

### Post-Build Verification
Perform these checks to ensure proper operation:

#### UI Functionality
- [x] CSV downloads work without errors
- [x] Logos display correctly in both light/dark modes
- [x] Network list is accurate
- [x] MetaMask integration works properly

#### Core Features
- [x] Smart Contract verification (GUI and API)
- [x] REST API and GraphQL endpoints
- [x] Wallet Connect integration
- [x] Internal transactions retrieval

#### System Health
- [x] Monitor CPU and memory usage
- [x] Check storage usage and alerts
- [x] Verify PostgreSQL database performance
- [x] Review error logs
