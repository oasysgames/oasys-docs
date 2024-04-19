# Upgrade Verse
:::warning Verse Service Maintenance
To upgrade the L2 container version, it's essential to stop the L2 containers. Please note that stopping the `op-node` and `op-geth` container will halt the Verse service. However, stopping containers other than those will not affect the Verse service. Before upgrading, kindly inform Verse users about the scheduled maintenance!
:::

## Upgrading OP Services
First, check for the [latest release](https://github.com/oasysgames/oasys-opstack/releases), then update the container version in your docker-compose file.
```yml
op-node:
  <<: *resident
  image: ghcr.io/oasysgames/oasys-opstack/op-node:vXX.XX.XX
  ...
op-batcher:
  <<: *resident
  image: ghcr.io/oasysgames/oasys-opstack/op-batcher:vXX.XX.XX
  ...
op-proposer:
  <<: *resident
  image: ghcr.io/oasysgames/oasys-opstack/op-proposer:vXX.XX.XX
  ...
```
Regarding op-geth, refer this [latest release page](https://github.com/oasysgames/oasys-op-geth/releases)
```yml
op-geth:
  <<: *resident
  image: ghcr.io/oasysgames/oasys-op-geth:vXX.XX.XX
  ...
```
Backup data(only `op-node` or `op-geth` upgrade):
Before backup, ensure instance disk has enough space.
```shell
# Check size
# Default L2_DATA_DIR is ./data/
du -sh ./<L2_DATA_DIR>/op-node
du -sh ./<L2_DATA_DIR>/op-geth

# Backup
$DATE=date +"%Y-%m-%d"
cp ./<L2_DATA_DIR> ./<L2_DATA_DIR>/op-node-$DATE
cp ./<L2_DATA_DIR> ./<L2_DATA_DIR>/op-geth-$DATE
```
Stop and restart the container using the following commands:
```shell
# Stop the container
docker-compose stop op-node && docker-compose rm op-node
docker-compose stop op-geth && docker-compose rm op-geth
docker-compose stop op-batcher && docker-compose rm op-batcher
docker-compose stop op-propoer && docker-compose rm op-propoer

# Start the container
docker-compose up -d op-node
docker-compose up -d op-geth
docker-compose up -d op-batcher
docker-compose up -d op-proposer
```

## Upgrading message-relayer
First, check for the [latest release](https://github.com/oasysgames/opstack-message-relayer/releases), then update the container version in your docker-compose file.
```yml
message-relayer:
  <<: *resident
  image: ghcr.io/oasysgames/opstack-message-relayer:vXX.XX.XX
  ...
```
Backup message-relayer folder.
```shell
# Check size
# Default L2_DATA_DIR is ./data/
du -sh ./<L2_DATA_DIR>/message-relayer

# Backup
$DATE=date +"%Y-%m-%d"
cp ./<L2_DATA_DIR> ./<L2_DATA_DIR>/message-relayer-$DATE
```
Stop and restart the container using the following commands:
```shell
# Stop the container
docker-compose stop message-relayer && docker-compose rm message-relayer

# Start the container
docker-compose up -d message-relayer
```

## Updating Verifier
First, check for the [latest release](https://github.com/oasysgames/verse-verifier/releases), then update the container version in your docker-compose file.
```yml
verse-verifier:
  <<: *resident
  image: ghcr.io/oasysgames/verse-verifier:vXX.XX.XX
  # ...
```
Stop and restart the container using the following commands:
```shell
# Stop the container
docker-compose stop verse-verifier && docker-compose rm verse-verifier

# Start the container
docker-compose up -d verse-verifier
```