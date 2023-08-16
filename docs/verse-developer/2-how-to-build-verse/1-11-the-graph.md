# The Graph (Indexer)

## Introduction
[The Graph](https://thegraph.com/) is a protocol for indexing and querying blockchain. By deploying a "Subgraph", blockchain data is automatically indexed by indexers, and can be easily accessed via GraphQL.

The Graph adopts a decentralized Web3 system based on token economics, but the indexing software is open-source and available for anyone to use as the [Graph node](https://github.com/graphprotocol/graph-node).

This document presents instructions on how to run a Graph node on the Verse-Layer and deploy a Subgraph.

## Setup the Graph node

### Create a docker-compose project
Create the project directory.

```shell
$ mkdir /path/to/project
$ cd /path/to/project
```

Create a `.env`.

```dotenv:./.env
NETWORK=<set the your verse's name (alphanumeric, hyphens, and underscores only)>
RPC_URL=<set the your verse's rpc (only http(s))>
```

Create a `docker-compose.yml`.

:::caution NOTES FOR PRODUCTION USE
1. Ensure the database password is robust.
2. Do not publicize the Graph node's Admin API (TCP/8020) and IPFS API (TCP/5001).
:::

```yaml:./docker-compose.yml
version: '3'

services:
  graph:
    image: graphprotocol/graph-node:v0.31.0
    environment:
      ethereum: $NETWORK:$RPC_URL
      postgres_db: graph_db
      postgres_user: graph_user
      postgres_pass: graph_pass
      postgres_host: postgres
      ipfs: http://ipfs:5001/
    ports:
      - 8000:8000/tcp # GraphQL(http)
      - 8001:8001/tcp # GraphQL(websocket)
      - 8020:8020/tcp # Admin API
    depends_on:
      - postgres
      - ipfs

  postgres:
    image: postgres:15.3
    environment:
      PGDATA: /data
      POSTGRES_DB: graph_db
      POSTGRES_USER: graph_user
      POSTGRES_PASSWORD: graph_pass
      POSTGRES_INITDB_ARGS: '--encoding=UTF8 --locale=C --lc-collate=C'
    volumes:
      - ./data/postgres:/data

  ipfs:
    image: ipfs/go-ipfs:v0.21.0
    environment:
      IPFS_PATH: /data
    volumes:
      - ./assets:/assets:ro
      - ./data/ipfs:/data
    ports:
      - 5001:5001/tcp
```

### Run the Postgres
```shell
$ docker-compose up postgres

postgres-1  | 2023-08-01 05:57:59.611 UTC [1] LOG:  database system is ready to accept connections
```

### Run the IPFS node
Initialize the IPFS data directory (Only for the first time).

```shell
$ docker-compose run --rm --entrypoint ipfs ipfs init

generating ED25519 keypair...done
peer identity: 12D3KooWDqPCG7V9WgwyyFoF8sRy2RT19F7Ze84KxegAEew17zoS
initializing IPFS node at /data
```

Modify the configuration file(`./data/ipfs/config`).

1. Prevent connection to other nodes.
    ```text:./data/ipfs/config
    # before
    "Bootstrap": [
      // list of bootstrap nodes
    ]

    # after
    "Bootstrap": null
    ```
1. Allow API access from external.
    ```text:./data/ipfs/config
    # before
    "Addresses": {
      "API": "/ip4/127.0.0.1/tcp/5001"
    }

    # after
    "Addresses": {
      "API": "/ip4/0.0.0.0/tcp/5001"
    }
    ```

Run the IPFS.

```shell
$ docker-compose up ipfs

ipfs-1  | WebUI: http://0.0.0.0:5001/webui
ipfs-1  | Gateway server listening on /ip4/127.0.0.1/tcp/8080
ipfs-1  | Daemon is ready
```

Check API access.

```shell
$ curl -XPOST 'http://127.0.0.1:5001/api/v0/config?arg=Identity.PeerID'

{"Key":"Identity.PeerID","Value":"12D3KooWA25ixrGxRWsMVReWZc9Dn1qZkDYvuv7LTTgCEsz5M8ef"}
```

### Run the Graph node
```shell
$ docker-compose up graph

graph-1  | Aug 01 06:44:11.789 INFO Graph Node version: 0.26.0 (2022-04-22)

~

graph-1  | Aug 01 06:44:45.183 INFO Syncing 1 blocks from Ethereum, code: BlockIngestionStatus, blocks_needed: 1, blocks_behind: 1, latest_block_head: 167721, current_block_head: 167720, provider: verse-rpc-0, component: BlockIngestor
```

Check API access.

```shell
$ curl -H 'Content-Type: application/json' -d '{}' http://127.0.0.1:8020/

{"jsonrpc":"2.0","error":{"code":-32600,"message":"Invalid request"},"id":null}
```

## Deploying Subgraph
Let's try deploying a Subgraph to index the `Transfer` events of ERC20.

### Install the graph-cli
```shell
$ npm install -g @graphprotocol/graph-cli
```

### Create a Subgraph
Set the parameters.

```shell
$ CONTRACT_NAME=MyToken
$ CONTRACT_ADDRESS=0x...
$ CONTRACT_ABI=/path/to/contract/abi.json
$ SUBGRAPH_NAME=TestGraph
$ SUBGRAPH_DIR=/path/to/project/dir
```

Create a Subgraph.

```shell
$ graph init $USER/$SUBGRAPH_NAME $SUBGRAPH_DIR \
  --node http://127.0.0.1:8020 \
  --protocol ethereum \
  --network mainnet \
  --contract-name $CONTRACT_NAME \
  --from-contract $CONTRACT_ADDRESS \
  --abi $CONTRACT_ABI \
  --index-events

Generate subgraph
  Write subgraph to directory
✔ Create subgraph scaffold
✔ Initialize networks config
✔ Initialize subgraph repository
✔ Install dependencies with yarn
✔ Generate ABI and schema types with yarn codegen
```

Change working directory.

```shell
$ cd $SUBGRAPH_DIR
```

### Downgrading Packages
Due to compatibility issues with IPFS in the latest version of The Graph packages, you need to downgrade the version. Please modify the `package.json`.

```json:./package.json
"dependencies": {
  "@graphprotocol/graph-cli": "0.45.1",
  "@graphprotocol/graph-ts": "0.30.0"
},
"resolutions": {
  "ipfs-http-client": "34.0.0",
  "concat-stream": "1.6.2"
}
```

Executing the downgrade.

```shell
$ yarn
```

### Modify the Manifest
To index chains not officially supported by The Graph, it is necessary to change the `dataSources[].network` in the manifest file(`subgraph.yaml`) to the same string as the `$NETWORK` variable in the `.env` file.

```yaml:./subgraph.yaml
# before
network: mainnet

# after
network: '<Set the $NETWORK value in the .env>'
```

### Deploy
Register the Subgraph with the indexer. (Only for the first time)

```shell
$ npm run create-local
> create-local
> graph create --node http://localhost:8020/ username/TestGraph

Created subgraph: username/TestGraph
```

Deploy it. You will be asked for a version name, so please specify as appropriate.

```shell
$ npm run deploy-local

> deploy-local
> graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 username/TestGraph

Which version label to use? (e.g. "v0.0.1"): v0.0.1

~

Build completed: QmbZC8ENbFWV7WNHqGuFPGzH4mSDtKRc9rXkst99eShT7i

Deployed to http://localhost:8000/subgraphs/name/username/TestGraph/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/username/TestGraph
```

### Querying
Let's try querying. First, transact a mint or transfer method on the ERC20 contract specified at `$CONTRACT_ADDRESS` to generate a Transfer event.

Then, open the development query editor ([GraphiQL](https://github.com/graphql/graphiql)) and run your query. The editor URL is displayed as `Queries (HTTP)` when deploying.  
(Example: `http://localhost:8000/subgraphs/name/{username}/{subgraph_name}`)

```graphql
{
  transfers {
    id
    from
    to
    value
  }
}
```

If the setup is successful, you should be able to retrieve the indexed Transfer events.

![Query Result Sample](/img/docs/techdocs/verse/the-graph/query-result.jpg)

## Related documents
- [https://thegraph.com/docs/en/](https://thegraph.com/docs/en/)
- [https://github.com/graphprotocol/graph-node/docs/getting-started.md](https://github.com/graphprotocol/graph-node/blob/08da7cb46ddc8c09f448c5ea4b210c9021ea05ad/docs/getting-started.md)
