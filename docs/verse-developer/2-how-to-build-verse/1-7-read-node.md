# Replica Node
You can build a read-only replica node of Verse-Layer.

The read-only verse nodes are synchronized with the verse itself, and users can retrieve information about the verse from the read-only verse nodes. In addition, a replica node can be promoted to a writable origin node.

## How synchronization works
There are two ways for synchronizing Verse-Layer's transaction data to the replica node.

### Synchronize from Origin
Synchronizes transaction data from the origin node of Verse-Layer. It is similar to the replication function of a SQL database. Transaction data can be synchronized with relatively low latency (500msec ~ 1000msec).

More precisely, the "data-transport-layer" service collects the Verse-Layer transaction data, and the replica node retrieves it and replay it on its own chain to achieve synchronization.

### Synchronize from Hub-Layer
Synchronize transaction data from the Hub-Layer's rollup contract (CanonicalTransactionChain). Synchronizing from the Hub-Layer means that only the transaction data which has been fully validated by the Oasys validators will be synchronized. There is a 30~60 seconds synchronization delay because the replica is synchronized after the roll-up transaction from the origin node is finalized.

More precisely, the "data-transport-layer" service collects roll-up events, and the replica node obtains them and replay them on its own chain to achieve synchronization.

### Which one should be choose?
If you are the origin node owner of the Verse-Layer and the purpose of creating a replica node is for RPC load balancing, we recommend synchronization from the Origin. Otherwise, synchronization from Hub-Layer is recommended.

## Setup Replica to synchronize from Origin
### Copy project directory
Copy the [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism) project directory from the origin node to the replica node. Exclude the `data` directory due to its large size.

Example of Using rsync:

```shell
$ rsync -av --exclude 'data/' /path/to/verse-layer-optimism/ replica:/path/to/verse-layer-optimism
```

### Override docker-compose
Create a `docker-compose.override.yml`.

```yaml:./docker-compose.override.yml
services:
  l2geth:
    environment:
      ROLLUP_BACKEND: l2
      ROLLUP_VERIFIER_ENABLE: 'true'
      ROLLUP_CLIENT_HTTP: http://<address of the origin node>:7878/

  # Do not start containers other than `l2geth`
  wallet:
    profiles: [disabled]
  data-transport-layer:
    profiles: [disabled]
  batch-submitter:
    profiles: [disabled]
  message-relayer:
    profiles: [disabled]
```

### Start container
Start the `l2geth` container.

```shell
$ docker-compose up -d
```

If you see a log like this, the synchronization has been successful.

```shell
$ docker-compose logs | head -50
l2geth-1  | INFO [08-03|08:21:42.696] Starting Verifier Loop                   poll-interval=500ms timestamp-refresh-threshold=5s
l2geth-1  | INFO [08-03|08:21:42.698] Syncing transaction range                start=0 end=14797 backend=l2
l2geth-1  | INFO [08-03|08:21:42.700] New block                                index=0     l1-timestamp=1687925249 l1-blocknumber=78 tx-hash=0xf102dde1f7264b37c5d303b8441f195c2e20da19334abc206d66bd01d1dc3dda queue-orign=sequencer gas=308985 fees=0 elapsed=302.5µs
l2geth-1  | INFO [08-03|08:21:42.704] New block                                index=1     l1-timestamp=1687925249 l1-blocknumber=78 tx-hash=0x7d1127a5c67b70e41756b2a1abaa287da261ac3400f97a3485fd70a1feb948e1 queue-orign=sequencer gas=45021  fees=0 elapsed=310.541µs
```

## Setup Replica to synchronize from Hub-Layer

### Create project directory

#### Case 1: If you have the Origin node.
Copy the [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism) project directory from the origin node to the replica node. Exclude the `data` directory due to its large size.

Example of Using rsync:

```shell
$ rsync -av --exclude 'data/' /path/to/verse-layer-optimism/ replica:/path/to/verse-layer-optimism
```

#### Case 2: If you do not have the Origin node.
1. Clone the [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism) repository provided by the Oasys Foundation.
  ```shell
  $ git clone https://github.com/oasysgames/verse-layer-optimism.git /path/to/verse-layer-optimism
  ```
1. You have to download the verse settings from [tools-fe](https://tools-fe.oasys.games/check-verse) with `chain id` or `builder address`. Please refer to the following to obtain `addressses.json` and `genesis.json`, which contain the settings for verse.
    - Related document: [Check verse information](/docs/verse-developer/how-to-build-verse/1-2-manual#4-2-check-verse-information)
1. [Create `.env` file](/docs/verse-developer/how-to-build-verse/1-2-manual#5-create-env-file)
1. Add the Verse Chain ID to the `.env` file.
  ```dotenv:./.env
  # Layer2 settings
  L2_CHAIN_ID=<YOUR_VERSE_CHAIN_ID>

  # You don't need to set private keys
  SEQUENCER_ADDRESS=
  SEQUENCER_KEY=

  PROPOSER_ADDRESS=
  PROPOSER_KEY=

  MESSAGE_RELAYER_ADDRESS=
  MESSAGE_RELAYER_KEY=
  ```

### Override docker-compose
Create a `docker-compose.override.yml`.

```yaml:./docker-compose.override.yml
services:
  l2geth:
    environment:
      ROLLUP_BACKEND: l1
      ROLLUP_VERIFIER_ENABLE: 'true'

  # Do not start containers other than `data-transport-layer` and `l2geth`
  wallet:
    profiles: [disabled]
  batch-submitter:
    profiles: [disabled]
  message-relayer:
    profiles: [disabled]
```

### Start containers
Start `data-transport-layer` and `l2geth` container.

```shell
$ docker-compose up -d
```

If you see a log like this, the synchronization has been successful. It will take some time to collect roll-up data from the Hub-Layer immediately after startup.

```shell
$ docker-compose logs l2geth | head -100
l2geth-1  | INFO [08-03|09:03:28.103] Running in verifier mode                 sync-backend=l1
l2geth-1  | INFO [08-03|09:03:28.103] Configured rollup client                 url=http://host.docker.internal:47878/ chain-id=420 ctc-deploy-height=8
l2geth-1  | INFO [08-03|09:03:28.116] Connected to upstream service 
l2geth-1  | INFO [08-03|09:03:28.118] Still syncing                            index=172 tip=9779
l2geth-1  | INFO [08-03|09:03:38.129] Still syncing                            index=1857 tip=9779

~~~ "Still syncing" repeats for a while ~~~

l2geth-1  | INFO [08-03|09:08:28.658] Starting Verifier Loop                   poll-interval=500ms timestamp-refresh-threshold=5s
l2geth-1  | INFO [08-03|09:08:28.664] Syncing transaction batch range          start=0 end=1260
l2geth-1  | INFO [08-03|09:08:28.669] New block                                index=0     l1-timestamp=1687925249 l1-blocknumber=78 tx-hash=0xf102dde1f7264b37c5d303b8441f195c2e20da19334abc206d66bd01d1dc3dda queue-orign=sequencer gas=308985 fees=0 elapsed=303.458µs
l2geth-1  | INFO [08-03|09:08:28.672] New block                                index=1     l1-timestamp=1687925249 l1-blocknumber=78 tx-hash=0x7d1127a5c67b70e41756b2a1abaa287da261ac3400f97a3485fd70a1feb948e1 queue-orign=sequencer gas=45021  fees=0 elapsed=345.25µs
```

## Confirm synchronization
After setup the replica node, please confirm status of synchronization.

### Confirm the Genesis Block 
Compare hash and stateRoot of the Genesis Block(number=0) between the origin node and the replica node.

```shell
$ curl http://<address of the origin node and the replica node>:8545/ \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0", "method":"eth_getBlockByNumber", "params":["0x0", false], "id":1}' \
  | jq '.result | { number, hash, stateRoot }'
{
  "number": "0x0",
  "hash": "0x...",
  "stateRoot": "0x..."
}
```

### Confirm the Latest Block 
Compare the latest block of the replica node with the block of the same number from the origin node.

Get the latest block of the replica node.

```shell
$ curl http://<address of the replica node>:8545/ \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0", "method":"eth_getBlockByNumber", "params":["latest", false], "id":1}' \
  | jq '.result | { number, hash, stateRoot }'
{
  "number": "0x...",
  "hash": "0x...",
  "stateRoot": "0x..."
}
```

Get the same block of the origin node.

```shell
$ curl http://<address of the origin node>:8545/ \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0", "method":"eth_getBlockByNumber", "params":["0x...", false], "id":1}' \
  | jq '.result | { number, hash, stateRoot }'
{
  "number": "0x...",
  "hash": "0x...",
  "stateRoot": "0x..."
}
```

## Promoting Replica node
The replica node can be promoted to writable origin node.

### Stop block creation
Prevents the origin node from creating a new block.

```shell
$ docker-compose exec l2geth geth attach -exec 'miner.stop()'
```

### Confirm synchronization
Confirm that the replica node has caught up with the latest block on the origin node. If you are synchronizing from a Hub-Layer, you must wait for the origin node to complete its last rollup.

```shell
$ curl http://<address of the origin node and the replica node>:8545/ \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0", "method":"eth_getBlockByNumber", "params":["latest", false], "id":1}' \
  | jq '.result | { number, hash, stateRoot }'
{
  "number": "0x...",
  "hash": "0x...",
  "stateRoot": "0x..."
}
```

### Stop containers
Stop all containers on the origin node and the replica node.

```shell
$ docker-compose down
```

:::danger IMPORTANT
Be sure to stop the origin node, running multiple Verse-Layer nodes can cause problems.
:::

### Unoverride docker-compose
Remove the `docker-compose.override.yml`.

```shell
$ rm docker-compose.override.yml
```

### Modity .env
If you have built a replica node of the type to be synchronized from the Hub-Layer, add private keys to the `.env` file.

```dotenv:./.env
SEQUENCER_ADDRESS=0x...
SEQUENCER_KEY=0x...

PROPOSER_ADDRESS=0x...
PROPOSER_KEY=0x...

MESSAGE_RELAYER_ADDRESS=0x...
MESSAGE_RELAYER_KEY=0x...
```

### Copying data from the Origin
If you have built a replica node of the type to be synchronizes from the origin node, you must wait until the `data-transport-layer` service finishes collecting data from the Hub-Layer. If you do not want to wait for the "data-transport-layer", copy data from the origin node.

Example of Using rsync:

```shell
$ rsync -av ./data/data-transport-layer/ replica:/path/to/verse-layer-optimism/data/data-transport-layer
```

### Start containers
Start all containers.

```shell
$ docker-compose up -d
```
