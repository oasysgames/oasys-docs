# Verse Submitter
The Verse Builder can set [Instant Verifier](/docs/architecture/verse-layer/rollup/2-2-initial-verifier) by building [verse submitter](/docs/verse-developer/how-to-build-verse/1-6-build-verse-submitter).

## About
Instant Verifier of Verse-Layer for the Oasys Blockchain.

- Verify the rolluped state by Verse-Layer to the Hub-Layer, create signature and share with other verifiers via P2P.

- The verifier is also **verified by the Hub-Layer validator** and can finalize rollups by collecting signatures for 51% or more of total stake amount and submitting it to the verification contract.

- Verification of rollup state, P2P node, and submission of signatures to verification contracts can be used individually.

- All Hub Layer Validator need to install a Verse Verifier. 

## Setup Verifier

Download the binary from the [releases page](https://github.com/oasysgames/verse-verifier/releases) and place it in `/usr/local/bin/oasvlfy`.

- For AMD / Intel CPU, Please download `oasvlfy-v0.0.X-linux-amd64.zip`. 
- For ARM based CPU, Please download `oasvlfy-v0.0.X-linux-arm64.zip`. 

Create a daemon user.

```shell
groupadd geth
useradd geth -g geth -s /usr/local/sbin/geth -m
```

Create data and keystore directories.

```shell
mkdir -p /home/geth/.oasvlfy /home/geth/.ethereum/keystore
chown -R geth:geth /home/geth/.oasvlfy /home/geth/.ethereum/keystore
```

Create a submitter's private key. You can use docker image or [oasys-validator](https://github.com/oasysgames/oasys-validator) binary.

- Using docker image
  ```shell
  # Create a keystore directory.
  mkdir /home/geth/.ethereum/keystore
  chown geth:geth /home/geth/.ethereum/keystore

  # Create a private key.
  docker run --rm -ti \
    -v /home/geth/.ethereum/keystore:/keystore ethereum/client-go \
    --keystore /keystore account new

  # Change owner.
  chown geth:geth /home/geth/.ethereum/keystore/*
  ```

- Using oasys-validator binary
  ```shell
  # Download the geth binary for AMD/Intel CPU.
  curl -Lo geth.zip \
    https://github.com/oasysgames/oasys-validator/releases/download/v1.0.4/geth-v1.0.4-linux-amd64.zip

  # Download the geth binary for ARM-Based CPU.
  curl -Lo geth.zip \
    https://github.com/oasysgames/oasys-validator/releases/download/v1.0.4/geth-v1.0.4-linux-arm64.zip

  # Extract binary.
  unzip geth.zip

  # Create a private key.
  ./geth --keystore /home/geth/.ethereum/keystore account new

  # Change owner.
  chown geth:geth /home/geth/.ethereum/keystore/*

  # Delete binary as they are not needed.
  rm geth
  ```

Create a configuration file. [Click here for a sample.](https://github.com/oasysgames/verse-verifier/blob/main/readme/config.yml)

```shell
curl -o /home/geth/.oasvlfy/config.yml \
    https://raw.githubusercontent.com/oasysgames/verse-verifier/main/readme/config.yml

chown geth:geth /home/geth/.oasvlfy/config.yml
```

Edit config.yml to set verse submitter.

:::caution
- Please check you have verse submitter's private key at the **keystore** directory.
  - If you do not have a private key, [please create one](#create-private-key).
  - If password protected, make sure password.txt exists on disk.
- Please deposit OAS for gas to submitter's wallet on L1(10 OAS or higher).
- You need to listen **4101(tcp/udp)** port so it can send, receive signatures with other verifiers.
:::

```yml
wallets:
  # <!-- comment out or delete this block. -->
  # signer:
  #   address: '0x'
  #   password: /home/geth/.ethereum/password.txt

  # Wallet used by Submitter (gas is required)
  submitter:
    address: '0x...' # set the your submitter's private key address.
    password: /home/geth/.ethereum/password.txt

...

# Verification worker
verifier:
  enable: false

# Signature submitting worker
submitter:
  enable: true
  targets:
    - chain_id: 420  # Chain ID of your Verse-Layer
      wallet: submitter
```

Create a systemd unit file. [Click here for a sample.](https://github.com/oasysgames/verse-verifier/blob/main/readme/oasvlfy.service)

```shell
curl -o /usr/lib/systemd/system/oasvlfy.service \
    https://raw.githubusercontent.com/oasysgames/verse-verifier/main/readme/oasvlfy.service

systemctl daemon-reload
```

Run the Verifier.

```shell
systemctl start oasvlfy
```

It may require some time for synchronization between the verifier from database. 

:::info
If your private key is password protected and you do not want to use password.txt, you must unlock it manually.

```shell
oasvlfy wallet:unlock --config /home/geth/.oasvlfy/config.yml --name signer
```
::::::


## Updating Verifier 

Check the binary from the [releases page](https://github.com/oasysgames/verse-verifier/releases).

Download the latest release of verifier and place it in `/usr/local/bin/oasvlfy`.

- For AMD / Intel CPU, Please download `oasvlfy-v0.0.X-linux-amd64.zip`. 
- For ARM based CPU, Please download `oasvlfy-v0.0.X-linux-arm64.zip`. 

Stop the verifier. 

```shell
systemctl stop oasvlfy
```

Run the new verifier again. 

```shell
systemctl start oasvlfy
```

:::info
If your private key is password protected and you do not want to use password.txt, you must unlock it manually.

```shell
oasvlfy wallet:unlock --config /home/geth/.oasvlfy/config.yml --name signer
```
::::::
