# Upgrade Verse

## Check latest container version
You can check the latest container version at [oasys-optimism packages](https://github.com/orgs/oasysgames/packages?repo_name=oasys-optimism).

## Check L2 container version
To check the L2 container version, refer to `docker-compose.yml` in `verse-layer-optimism` repository.
```yaml
x-l2geth: &l2geth
  image: ghcr.io/oasysgames/oasys-optimism/l2geth:v0.1.6 # <- l2geth container version
  entrypoint: /bin/sh /assets/l2geth/run.sh

services:
  data-transport-layer:
    <<: *common
    image: ghcr.io/oasysgames/oasys-optimism/data-transport-layer:v0.1.6 # <- L2 data-transport-layer container version
    entrypoint: /bin/sh /assets/data-transport-layer/run.sh
  
  batch-submitter:
    <<: *common
    image: ghcr.io/oasysgames/oasys-optimism/batch-submitter:v0.1.6 # <- L2 batch-submitter container version

  message-relayer:
    <<: *common
    image: ghcr.io/oasysgames/oasys-optimism/message-relayer:v0.1.6 # <- L2 message-relayer container version
```

## Upgrade L2 container version

:::warning Important
**Verse Service Maintenance**
To upgrade the L2 container version, it's essential to stop the L2 containers. Please note that stopping the `l2geth` container will halt the Verse service. However, stopping containers other than `l2geth` will not affect the Verse service. Before upgrading the `l2geth` container, kindly inform Verse users about the scheduled maintenance!

**Backup l2geth data**

When you stop `l2geth` or `data-transport-layer` container, ensure you back up the data.
:::

To upgrade the L2 container version, follow these steps:

1. Stop the L2 containers:
```shell
# Stop data-transport-layer
$ docker-compose stop data-transport-layer && docker-compose rm data-transport-layer

# Stop l2geth
$ docker-compose stop l2geth && docker-compose rm l2geth

# Stop batch-submitter
$ docker-compose stop batch-submitter && docker-compose rm batch-submitter

# Stop message-relayer
$ docker-compose stop message-relayer && docker-compose rm message-relayer
```

2. Backup data(only `l2geth` or `data-transport-layer` upgrade):
Before backup, ensure instance disk has enough space.

```bash
# Check L2_DATA_DIR size
$ du -sh ./"<L2_DATA_DIR>" # Default L2_DATA_DIR is ./data/

# Backup L2_DATA_DIR
$ $DATE=date +"%Y-%m-%d"
$ cp ./"<L2_DATA_DIR>" ./"<L2_DATA_DIR>-$DATE" # Default L2_DATA_DIR is ./data/
```

3. Update the container version in `docker-compose.yml`.

4. Start the L2 containers:
```shell
# Start data-transport-layer
$ docker-compose up -d data-transport-layer

# Start l2geth
$ docker-compose up -d l2geth

# Start batch-submitter
$ docker-compose up -d batch-submitter

# Start message-relayer
$ docker-compose up -d message-relayer
```