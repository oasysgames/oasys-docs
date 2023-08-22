# Explorer
After building a Verse, you have to create a Verse explorer. Please use [blockscout](https://docs.blockscout.com/) to create a Verse explorer.

## Environment Variable
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
| JSON_RPC | The RPC endpoint used to a button of "Add My-Verse" in footer. |    rpc.myverse.com `(Your Verse RPC)`   |

If you build verse on the same server, you can set `ETHEREUM_JSONRPC_HTTP_URL` and `ETHEREUM_JSONRPC_TRACE_URL` as `http://host.docker.internal:8545/`.

## Manual Setup
If you set up blockscout for a Verse, You have to set it up manually.

### Git Clone
First, you have to clone [oasys-blockscout](https://github.com/oasysgames/oasys-blockscout).
```shell
git clone git@github.com:oasysgames/oasys-blockscout.git
```

### Set Environment Variables
After that, please set the environment variables to [common-blockscout.env](https://github.com/oasysgames/oasys-blockscout/blob/main/docker-compose/envs/common-blockscout.env) along with [Environment Variable](#environment-variable).

### Run Container
Finally, run the container with docker-compose.
```shell
cd docker-compose
docker compose up -d
```

When you finished docker-compose up, you can explore via `http://localhost:4000/`.
