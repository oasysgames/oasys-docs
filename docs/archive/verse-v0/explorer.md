# Explorer
After building a Verse, you have to create a Verse explorer. Please use [blockscout](https://docs.blockscout.com/) to create a Verse explorer.

## Blockscout v5
### Update L2Geth Startup Options
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

### Environment Variable
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
| BLOCKSCOUT_HOST     | Host for API endpoint.               | explorer.example.com `(Your Host)` |
| BLOCKSCOUT_PROTOCOL | Url scheme for API endpoint.         | `http` or `https`                   |

If you build verse on the same server, you can set `ETHEREUM_JSONRPC_HTTP_URL` and `ETHEREUM_JSONRPC_TRACE_URL` as `http://host.docker.internal:8545/`.

### Manual Setup
If you set up blockscout for a Verse, You have to set it up manually.

#### Git Clone
First, you have to clone [oasys-blockscout](https://github.com/oasysgames/oasys-blockscout).
```shell
git clone https://github.com/oasysgames/oasys-blockscout.git
```

#### Set Environment Variables
After that, please set the environment variables to [common-blockscout.env](https://github.com/oasysgames/oasys-blockscout/blob/main/docker-compose/envs/common-blockscout.env) along with [Environment Variable](#environment-variable).

#### Set Brand Config Variables

You can adjust settings related to branding, such as theme colors and logos, to align with your desired branding.

| Item                  | Description                                                                                                      | Target File or Directory Path                                                                         | Example                                                                                                                                                                          |
|-----------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Theme Colors and CSS  | Set the stylesheet of your instance to the one you prefer.                                                       | `apps/block_scout_web/assets/css/theme/_neutral_variables.scss`                                        | Change `$primary: #5c34a2;` to `$primary: #ff0000;`                                                                                                                              |
| Logos                 | Use the LOGO and FOOTER_LOGO environment variables to link to your uploaded logos.                              | <code>apps/block_scout_web/assets/static/images</code> <br /> <code>docker-compose/envs/common-blockscout.env</code>           | Place `foo.png` into `apps/block_scout_web/assets/static/images` and set `LOGO=/images/foo.png` in `docker-compose/envs/common-blockscout.env`                                    |
| MetaData              | Adjust MetaTags for different pages.                                                                             | `apps/block_scout_web/lib/block_scout_web/templates/chain/_metatags.html.eex`                          | Replace content in `<meta name="description" content="...` with your desired content.                                                                                            |
| Favicon               | Replace the existing favicons.                                                                                   | `apps/block_scout_web/assets/static/images`                                                            | Replace favicons in the specified folder.                                                                                                                                         |
| Menus                 | Use the APPS_MENU environment variable to add an apps menu.                                                     | `docker-compose/envs/common-blockscout.env`                                                           | Set `APPS_MENU=true` and `EXTERNAL_APPS=[{"title": "App", "url": "https://app", "embedded?": true}]`.                                                                             |
| Top Navigation Bar    | Data for this section is rendered from a specific template.                                                      | `apps/block_scout_web/lib/block_scout_web/templates/layout/_topnav.html.eex`                          | Refer to the specific template.                                                                                                                                                   |
| Footer                | The data for the footer is sourced from another template.                                                        | `apps/block_scout_web/lib/block_scout_web/templates/layout/_footer.html.eex`                          | Change `FOOTER_GITHUB_LINK=https://example.com` to `FOOTER_GITHUB_LINK=https://example.io`.                                                                                       |

#### Reflect settings for network changes

You can modify the network settings using either a script or the manual method.

###### Using the script

```shell
cd docker-compose
./modify_networks.sh default_network_name
```
This script alters the following variables:
- SUPPORTED_CHAINS
- SUBNETWORK

###### Manual method

Please modify the variables below:

- docker-compose/envs/common-blockscout.env
  - SUPPORTED_CHAINS
  - SUBNETWORK

You can check the [this page](https://docs.blockscout.com/for-developers/manual-deployment#deployment-steps) for the detail of manual deployment.

#### Run Container
Finally, run the container with docker-compose
(it may take several tens of minutes for build)
```shell
docker-compose build 
docker compose up -d
```

When you finished docker-compose up, you can explore via `http://localhost:4000/`.

#### Post-Build Checklist

- **UI Checks**
  - **CSV Download Functionality**: Test and ensure CSVs can be downloaded seamlessly without encountering errors.
  - **Logo Display**: Verify the correct placement and visibility of logos in both the top left header and bottom left footer across night and light modes.
  - **Network Listing**: Review and confirm the accuracy of the network list displayed.
  - **MetaMask Integration**: Test the functionality of the button for adding networks to MetaMask, ensuring smooth integration and operation.

- **Verify Contract Feature on Blockscout**
  - Confirm that Smart Contracts can be successfully verified, both through the GUI and using the Hardhat via API.

- **Error Log Verification**
  - **Internal Transactions**: Ensure the accurate retrieval of internal transactions without errors from the WebSocket endpoint.
  - **Additional Error Logs**: Confirm there are no other error logs present that could indicate underlying issues.

- **Monitoring and Alerts**
  - **CPU and Memory Usage**: Monitor server performance during CSV downloads and Smart Contract verifications, ensuring optimal operation.
  - **Storage Usage**: Verify that storage usage is monitored with configured alerts to notify when predetermined thresholds are surpassed.
  - **PostgreSQL Database Load**: Check for any load-related issues on the PostgreSQL database serving Blockscout, ensuring it is within operational norms.
