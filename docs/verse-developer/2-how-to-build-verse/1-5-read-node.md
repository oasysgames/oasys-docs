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

```bash
docker-compose up -d data-transport-layer
docker-compose up -d l2geth
```