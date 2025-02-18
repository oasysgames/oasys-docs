# Upgrade Verse

## Upgrading OP Services
First, check for the [latest release](https://github.com/oasysgames/oasys-opstack/releases), then update the container version in your docker-compose file.
:::warning Verse Service Maintenance
To upgrade the L2 container version, it's essential to stop the L2 containers. Please note that stopping the `op-node` and `op-geth` container will halt the Verse service. However, stopping containers other than those will not affect the Verse service. Before upgrading, kindly inform Verse users about the scheduled maintenance!
:::
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

## Hardfork
A guide on how to apply each hardfork. As an important note, **before performing any updates, always ensure to communicate with Oasys dev team the hardfork date and time, along with the updated configuration details**. The dev team will also apply changes on the replica nodes.

### Apply Canyon
To apply the Canyon hardfork, you need to change 2 files.

The first file is `rollup.json`, located under the assets directory. Add the `canyon_time` property to this file. This property indicates when the Canyon update will be applied. The value should be a Unix timestamp. The following example means the hardfork is applied from `1717579595`, which indicates Wed, 05 Jun 2024 09:26:35 GMT.
```json
{
  "genesis": {
   // ...
  },
  "regolith_time": 0,
  "canyon_time": 1717579595, // Wed, 05 Jun 2024 09:26:35 GMT
  // ...
}
```

The second file is `docker-compose.yml`. Set the `GETH_OVERRIDE_CANYON` environment to the op-geth service. The example is below. Ensure the time matches the setting above.
```yml
services:
  op-geth:
    <<: *resident
    image: ghcr.io/oasysgames/oasys-op-geth:v1.1.1 # The container image should be greater than v1.1.0.
    entrypoint: geth
    environment:
      GETH_DATADIR: /data
      ...
      GETH_OVERRIDE_CANYON: 1717579595
```

After making these changes, please follow the [Upgrading OP Services](/docs/verse-developer/how-to-build-verse/upgrade-verse#upgrading-op-services) steps. The Canyon upgrade corresponds to version v1.1.0. Ensure that the container image version is greater than this. Once completed, ensure the upgrade is successful by checking the logs.

Check the op-node log by running the following command:
```sh
docker-compose logs op-node | grep "Rollup Config"
```
Ensure the canyon_time is correctly configured.
```
op-node-1 | t=2024-06-05T09:49:34+0000 lvl=info msg="Rollup Config" <lots of lines> canyon_time="@ 1717579595 ~ Wed Jun  5 09:26:35 UTC 2024" span_batch_time="(not configured)
```
Secondly, check the op-geth log by running the following command:
```sh
docker-compose logs op-geth | grep "Canyon:"
```
Ensure the Canyon: is actually applied.
```
op-geth-1  | INFO [06-05|09:52:43.423]  - Canyon: @1717579595
```