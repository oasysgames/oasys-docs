# Upgrade Verse

## Upgrading Verse Node
Verse node upgrades are released in the [verse-layer-opstack](https://github.com/oasysgames/verse-layer-opstack) repository.

The verse-layer-opstack repository uses semantic versioning, where patch version updates are focused on bug fixes and parameter changes, while minor version updates are for OPStack protocol upgrades (i.e. hardforks). The major version is fixed at `v1`(meaning Verse V1).

This section describes applying a minor version upgrade(hardfork) to a running Verse node.

:::danger Important Notes
**Service Maintenance**
To upgrade the Verse node, it's essential to stop the containers. Please note that stopping the `op-node` and `op-geth` container will halt the Verse service. However, stopping containers other than those will not affect the Verse service. Before upgrading, kindly inform Verse users about the scheduled maintenance!

**About Replica Nodes**
All nodes, including replicas, must be upgraded. Replicas operated by Oasys also need to be upgraded. Therefore, please contact the Oasys team in advance of the scheduled work date and time.
:::

**Upgrade Steps**
1. Stop the containers
1. Create a backup
1. Change version tag in [verse-layer-opstack](https://github.com/oasysgames/verse-layer-opstack) repository
1. Add upgrade timestamps to .env
1. Start the containers

### 1. Stop the containers
Stop all containers across all nodes, including replica nodes.
```shell
cd /path/to/verse-layer-opstack

docker-compose stop -t60
```

### 2. Create a backup
Back up the origin node data as upgrades involve irreversible changes to chain data. If the data size is large, using cloud provider disk snapshot functionality is recommended.
```shell
# Check data size
du -hcs ./data/{op-node,op-geth}

# Check available disk space
df -h .

# Create backups
cp ./data/op-node ./data/op-node-$(date +'%Y-%m-%d')
cp ./data/op-geth ./data/op-geth-$(date +'%Y-%m-%d')
cp ./data/message-relayer ./data/message-relayer-$(date +'%Y-%m-%d')
```

### 3. Change version tag in verse-layer-opstack
```shell
# Fetch updates
git fetch origin

# Change tag
git checkout <version tag>
```

### 4. Add upgrade timestamps to .env
Add the block timestamps for L2 upgrades to the `.env` file. These timestamps must be set slightly in the future as `op-node` and `op-geth` must be launched before the specified times. Due to specification constraints, `0` cannot be used.
```sh
# Example command to get timestamp 10 minutes ahead
expr $(date +%s) + 600
```
##### Applying the Canyon Hardfork
Set the following environment variable. If you have already applied it, you can skip this step.
```sh
OP_OVERRIDE_CANYON=17XXX... #(Future Unix Time)
```

#### Applying the Granite Hardfork (Includes Delta, Ecotone, Fjord)
Set the following environment variables. If you have already applied them, you can skip this step.
```sh
OP_OVERRIDE_DELTA=17XXX...   #(Future Unix Time)
OP_OVERRIDE_ECOTONE=17XXX... #(Future Unix Time)
OP_OVERRIDE_FJORD=17XXX...   #(Future Unix Time)
OP_OVERRIDE_GRANITE=17XXX... #(Future Unix Time)
```

:::danger
- Do not modify timestamps after upgrades have been applied. **In particular, never re-change to a future**
- Please share these timestamps with the Oasys team.
:::

### 5. Start the containers
Start `op-geth` container:
```shell
docker-compose up -d op-geth
```

Check if upgrade times are loaded:
```shell
docker-compose logs op-geth | egrep '@\d+'

# output
op-geth-1  | INFO [02-25|14:41:23.062]  - Canyon:                      @1740494383
op-geth-1  | INFO [02-25|14:41:23.062]  - Ecotone:                     @1740494383
op-geth-1  | INFO [02-25|14:41:23.062]  - Fjord:                       @1740494383
op-geth-1  | INFO [02-25|14:41:23.062]  - Granite:                     @1740494383
```

Start `op-node` container:
```shell
docker-compose up -d op-node
```

Check if upgrade times are loaded:
```shell
docker-compose logs op-node | grep "Rollup Config"

# output
op-node-1  | t=2025-02-25T15:02:45+0000 lvl=info msg="Rollup Config" <lots of lines> canyon_time="@ 1740494383 ~ Tue Feb 25 14:39:43 UTC 2025" delta_time="@ 1740494383 ~ Tue Feb 25 14:39:43 UTC 2025" ecotone_time="@ 1740494383 ~ Tue Feb 25 14:39:43 UTC 2025" fjord_time="@ 1740494383 ~ Tue Feb 25 14:39:43 UTC 2025" granite_time="@ 1740494383 ~ Tue Feb 25 14:39:43 UTC 2025" holocene_time="(not configured)" interop_time="(not configured)" alt_da=false
```

When the upgrade time is reached, the `op-node` should output logs related to the upgrades:
```shell
docker-compose logs op-node | grep upgrade

# output
op-node-1  | t=2025-02-25T15:28:17+0000 lvl=info msg="Sequencing Ecotone upgrade block"
op-node-1  | t=2025-02-25T15:28:17+0000 lvl=info msg="Sequencing Fjord upgrade block"
op-node-1  | t=2025-02-25T15:28:17+0000 lvl=info msg="Sequencing Granite upgrade block"
```

Start all other containers:
```shell
docker-compose up -d
```

## Upgrading L1 Contracts
*TODO*

## Enabling Blob Rollup
Blob transactions (EIP-4844) were introduced to reduce L2 rollup transaction costs. Unlike traditional calldata, blobs are not stored permanently on-chain and are pruned after a few weeks, improving Ethereum's scalability.

#### Requirements:
The OPStack supports blob transactions starting from the `Ecotone` upgrade. Ensure that your Verse has applied this upgrade before proceeding.

#### How to Enable Blob-Based Rollups:
Enabling blob transactions in the rollup is straightforward. Simply set the following environment variable in the op-batcher configuration:
```yml
op-batcher:
  ...
  environment:
    ...
    OP_BATCHER_DATA_AVAILABILITY_TYPE: blobs
```
Once you set this variable, restart op-batcher to apply the changes. Andd ensure that batcher-produced transactions are using blob-type transactions (Type 3).
