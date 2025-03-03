# Explorer
After building a Verse, you have to create a Verse explorer. Please use [blockscout](https://docs.blockscout.com/) to create a Verse explorer.

## Blockscout v6
### Update L2Geth (For Verse v0) Startup Options
The explorer utilizes the `txpool` and `debug` namespaces of the JSON RPC to communicate l2geth. Therefore, you need to enable these two namespaces. Please ensure to include these namespaces in the starting options or environment variables.

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
:::warning Security Concern Regarding Activating debug and txpool Namespaces
The `debug` namespace contains dangerous commands, such as `setHead(blockNum)`, which roll back the block head to a past state. Therefore, it's crucial not to expose the raw API to the public. We recommend introduce middleware that blocks requests to the debug namespace. To facilitate this, we offer the verse-proxy solution. Please refer to here: [Set allowed verse request methods](/docs/verse-developer/how-to-build-verse/verse-proxy#set-allowed-verse-request-methods)

As an alternative solution, consider building a [read-only replica Verse](/docs/verse-developer/how-to-build-verse/read-node) and then direct the explorer to refer to this replica. Make only the write node's RPC endpoint available to the public, ensuring the debug namespace is disabled.

Regarding the `txpool`, there isn't as significant a security concern as with the debug namespace. However, it is still advisable not to make it publicly accessible. Opening this endpoint to the public is unnecessary since the explorer offers similar capabilities.
:::

### Update op-geth (For Verse v1) Startup Options

The Blockscout explorer requires access to certain JSON-RPC namespaces to function properly with `op-geth`. Specifically, it needs access to the `txpool` and `debug` namespaces. Here is how you can ensure these are enabled:

1. **Locate the Startup Script or Configuration**:
   - Find the script or configuration file used to start your `op-geth` node. This could be a shell script, a systemd service file, or a Docker Compose file.

2. **Enable Required JSON-RPC Namespaces**:
   - Modify the startup command or configuration to include the `txpool` and `debug` namespaces. You can do this by adding them to the `--http.api` and/or `--ws.api` options, depending on whether you're using HTTP or WebSocket for RPC.

   Example startup command:
   ```bash
   op-geth --networkid <your_network_id> \
           ... \
           --http.api "eth,net,web3,txpool,debug" \
           --ws.api "eth,net,web3,txpool,debug" \
           ...
   ```

3. **Environment Variables**:
   - If your setup uses environment variables to define configuration, ensure these namespaces are included in the respective variables for HTTP or WebSocket APIs.

   Example environment variable configuration:
   ```plaintext
   ETH_HTTP_API="eth,net,web3,txpool,debug"
   ETH_WS_API="eth,net,web3,txpool,debug"
   ```

4. **Restart the Node**:
   - After making these changes, restart your `op-geth` node to apply the new settings.

5. **Verify Configuration**:
   - Check the logs of your `op-geth` node to confirm that it starts without errors and that the specified namespaces are available.
   - Use a JSON-RPC client to test connectivity and ensure that the `txpool` and `debug` namespaces are accessible.

### Environment Variable For Blockscout Backend
When creating a blockscout instance, you have to set the environment variable using blockscout.

You can check the environment variable lists at [this page](https://docs.blockscout.com/for-developers/information-and-settings/env-variables).

When creating a verse blockscout, please set the following environment variables.

|    Variable               |   Description                              | Value |
|---------------------------|--------------------------------------------|--------|
| DATABASE_URL              | Variable to define the Postgres Database endpoint.                     |    postgresql://postgres:@host.docker.internal:7432/blockscout?ssl=falset  `(Your DATABASE RPC)`   |
| ETHEREUM_JSONRPC_VARIANT  | Tells the application which RPC Client the node is using               |    geth `(Verse uses geth)`    |
| ETHEREUM_JSONRPC_HTTP_URL | The RPC endpoint used to fetch blocks, transactions, receipts, tokens. |    rpc.myverse.com `(Your Verse RPC)`   |
| ETHEREUM_JSONRPC_TRACE_URL | The RPC endpoint specifically for the Erigon/Geth/Nethermind/Besu client used by trace_block and trace_replayTransaction. This can be used to designate a tracing node. |    rpc.myverse.com `(Your Verse RPC)`   |
| SECRET_KEY_BASE | Required for contract verification. Specify a random string of 64 characters. | On Unix, you can create it with the following command <br /> <code>head -c 64 /dev/urandom \| base64 \| cut -c 1-64</code> |
| JSON_RPC | The RPC endpoint used to a button of "Add My-Verse" in footer for Metamask. |    rpc.myverse.com `(Your Verse RPC)`   |
| CHAIN_ID | Unique identifier for the "My-Verse" blockchain within the Ethereum network. It used to a button of "Add My-Verse" in footer for Metamask. |    1234 `(Your Verse ChainID)`   |
| RE_CAPTCHA_SECRET_KEY | Used by advanced CSV export        | Your secret  key                 |
| RE_CAPTCHA_CLIENT_KEY | Used by advanced CSV export         | Your client key                  |
| RE_CAPTCHA_DISABLED | Disable reCAPTCHA.         | true                   |

If you build verse on the same server, you can set `ETHEREUM_JSONRPC_HTTP_URL` and `ETHEREUM_JSONRPC_TRACE_URL` as `http://host.docker.internal:8545/`.

### Environment Variable For Blockscout Frontend
For frontend environment variables configuration, please refer to the [Blockscout v6 Frontend Documentation](https://github.com/oasysgames/blockscout-v6-frontend/blob/main/docs/ENVS.md).

### Featured Network Configuration Properties
The `NEXT_PUBLIC_FEATURED_NETWORKS` environment variable expects a URL pointing to a JSON file that contains an array of network configurations. Each network configuration object in the array should have the following properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| title | string | The display name of the network shown in the network menu | "HUB-Mainnet" |
| url | string | The URL of the network's explorer | "https://explorer.oasys.games/" |
| group | string | The group category for the network (either "Mainnets" or "Testnets") | "Mainnets" |
| icon | string | URL to the network's icon image (optional) | "" |

Example JSON structure:
```json
[
  {
    "title": "HUB-Mainnet",
    "url": "https://explorer.oasys.games/",
    "group": "Mainnets",
    "icon": ""
  },
  {
    "title": "HUB-Testnet",
    "url": "https://explorer.testnet.oasys.games/",
    "group": "Testnets",
    "icon": ""
  }
]
```

The networks will be displayed in the Blockscout UI's network menu, grouped by their specified group category.

### Manual Setup
If you set up blockscout for a Verse, You have to set it up manually.
#### Backend Setup
##### Git clone 
First, you have to clone [oasys-blockscout-v6-backend](https://github.com/oasysgames/blockscout-v6-backend).
```shell
git clone https://github.com/oasysgames/blockscout-v6-backend.git
```
##### Set Environment Variables
After that, please set the environment variables to [common-blockscout.env](https://github.com/oasysgames/blockscout-v6-backend/blob/main/docker-compose/envs/common-blockscout.env) along with [Environment Variable](#environment-variable-for-blockscout-backend).

##### Run Container
Finally, run the container with docker-compose
(it may take several tens of minutes for build)
```shell
sudo FRONT_PROXY_PASS=http://host.docker.internal:3000 docker compose -f external-frontend.yml up -d
```
##### Optional
###### Migrate verifed contract data from v5 to v6
When build new blockscout, verify contract data is always no data so if you want hold verified contract data before on v5. You need migrate data from blockscout v5 to blockscout v6.

Let's run

```shell
cd blockscout-v6-backend/migrates/
cp config/.env.sample config/.env

# modify variable
vi config/.env

# start migrate
sudo chmod +x excutes/verified_contract.sh
./excutes/verified_contract.sh

```

#### Frontend Setup
##### Git clone 
First, you have to clone [oasys-blockscout-v6-frontend](https://github.com/oasysgames/blockscout-v6-frontend).
```shell
git clone https://github.com/oasysgames/blockscout-v6-frontend.git
```
##### Set Environment Variables
After that, please set the environment variables to [.env.common](https://github.com/oasysgames/blockscout-v6-frontend/blob/main/configs/envs/.env.common) along with [Environment Variable](#environment-variable-for-blockscout-frontend).

##### Run Container
Finally, run the container with docker-compose
(it may take several tens of minutes for build)
```shell
docker-compose build 
docker compose up -d
```
When you finished docker-compose up, you can explore via `http://localhost/ or http://localhost:3000/`.

#### Post-Build Checklist

- **UI Checks**
  - **CSV Download Functionality**: Test and ensure CSVs can be downloaded seamlessly without encountering errors.
  - **Logo Display**: Verify the correct placement and visibility of logos in both the top left header and bottom left footer across night and light modes.
  - **Network Listing**: Review and confirm the accuracy of the network list displayed.
  - **MetaMask Integration**: Test the functionality of the button for adding networks to MetaMask, ensuring smooth integration and operation.

- **Verify Contract Feature on Blockscout**
  - Confirm that Smart Contracts can be successfully verified, both through the GUI and using the Hardhat via API.

- **Rest API, Graphql**
  - Confirm that Rest API and Graphql can be called successfully.

- **Wallet Connect**
  - Confirm that Wallet Connect can be connected successfully.

- **Error Log Verification**
  - **Internal Transactions**: Ensure the accurate retrieval of internal transactions without errors from the WebSocket endpoint.
  - **Additional Error Logs**: Confirm there are no other error logs present that could indicate underlying issues.

- **Monitoring and Alerts**
  - **CPU and Memory Usage**: Monitor server performance during CSV downloads and Smart Contract verifications, ensuring optimal operation.
  - **Storage Usage**: Verify that storage usage is monitored with configured alerts to notify when predetermined thresholds are surpassed.
  - **PostgreSQL Database Load**: Check for any load-related issues on the PostgreSQL database serving Blockscout, ensuring it is within operational norms.
