# Verse Read Node
You can build read-only verse nodes.

The read-only verse nodes are synchronized with the verse itself, and users can retrieve information about the verse from the read-only verse nodes.

## Setup
### Get verse settings
You have to get verse setting on [tools-fe](https://tools-fe.oasys.games/check-verse) with verse-build tx. Please refer to the following to obtain addressses.json and genesis.json, which contain the settings for verse.

- [Check verse information from the verse_build transaction](https://docs.oasys.games/docs/verse-developer/how-to-build-verse/1-2-manual#4-2-check-verse-information-from-the-verse_build-transaction)

### Set Environment variable
As well as the verse construction, use [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism) to launch the read-only verse node.

- [Create .env file](https://docs.oasys.games/docs/verse-developer/how-to-build-verse/1-2-manual#5-create-env-file)

When setting environment variable, please follow it.

.env
```bash
# Layer2 settings
L2_CHAIN_ID=<YOUR_VERSE_CHAIN_ID>
L2_HTTP_URL=<YOUR_VERSE_RCP>

# You don't need to set private_key
SEQUENCER_ADDRESS=<YOUR_SEQUENCER_ADDRESS>
SEQUENCER_KEY=

PROPOSER_ADDRESS=<YOUR_PROPOSER_ADDRESS>
PROPOSER_KEY=
```

docker-compose.yml
```bash
ROLLUP_BACKEND: l2
ROLLUP_VERIFIER_ENABLE: 'true'
```

### Run Verse containers
Please refer to the following to run verse containers.

- [Run Containers](https://docs.oasys.games/docs/verse-developer/how-to-build-verse/1-2-manual#6-run-containers)

You only need to run data-transport-layer and l2geth containers.

- data-transport-layer : Data-transport between L1 and L2
- l2geth : L2 geth. Core component on Verse. 

```bash
docker-compose up -d data-transport-layer
docker-compose up -d l2geth
```

## Confirm synchronization
You can confirm read-only verse node is synchronizing verse. 

### Check current block number
Please check blockNumber with the following request parameters on a respective node(verse node and read-only node).

```json
{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 0
}
```

The response's result is blockNumber.
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x7e4"
}
```

If the read-only node possesses the latest verse info, each blockNumber coincides.  

### Open Docker log
To check if read-only verse node is synchronizing, please open docker container log.

```bash
docker logs verse-layer-optimism-l2geth-1
```

### Update block number
In verse, a block is created for each transaction.

Please execute a transaction in verse and update the blockNumber.

If checked following logs, it means that read-only verse node is synchronizing.
```bash
2023-02-08 10:33:31 INFO [02-08|01:33:31.697] Syncing transaction range                start=2047 end=2047 backend=l2
2023-02-08 10:33:31 INFO [02-08|01:33:31.708] New block                                index=2047 l1-timestamp=1675820010 l1-blocknumber=762673 tx-hash=0x4ecebfaad3c98a0337ad122e11db2b30d20ac4e5ada757193e1ce03e2957b7e4 queue-orign=sequencer gas=2448863 fees=0 elapsed=6.310ms
```

### Check block number update
As before, please check blockNumber.

If each blockNumber coincides, the read-only node completed to synchronize verse node.
