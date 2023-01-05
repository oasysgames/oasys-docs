# Verse Submitter
Verse Builder can set [Instant Verifier](/docs/architecture/verse-layer/rollup/2-2-initial-verifier) by building [verse submitter](/docs/verse-developer/how-to-build-verse/1-6-build-verse-submitter).

If you build verse submitter, first you have to build [L1-Light-node](/docs/verse-developer/how-to-build-verse/1-5-build-L1-light-node).

## About
Instant Verifier of Verse-Layer for the Oasys Blockchain.

- Verify the rolluped state by Verse-Layer to the Hub-Layer, create signature and share with other verifiers via P2P.

- The verifier is also **verified by the Hub-Layer validator** and can finalize rollups by collecting signatures for 51% or more of total stake amount and submitting it to the verification contract.

- Verification of rollup state, P2P node, and submission of signatures to verification contracts can be used individually.

- All Hub Layer Validator need to install Verse Verifier. 

## Quick Start

Download the binary from the [releases page](https://github.com/oasysgames/verse-verifier/releases).

> The Verifier create keccak256 hash of [ethereum signed messages](https://eips.ethereum.org/EIPS/eip-712) with the same private key as the Hub-Layer validator, so it is recommended to run on the same node as the Hub-Layer validator.

Create a data directory.

```shell
mkdir /home/geth/.oasvlfy
chown geth:geth /home/geth/.oasvlfy
```

> **Please check you have password.txt & validator operator's private key on disk.**
> **You need to listen 4101 port so it can send, receive transaction.** 

Create a configuration file. [Click here for a sample.](https://github.com/oasysgames/verse-verifier/blob/main/readme/config.yml)

> Open the TCP port that P2P listens on the firewall.

```shell
curl -O /home/geth/.oasvlfy/config.yml \
    https://raw.githubusercontent.com/oasysgames/verse-verifier/main/readme/config.yml
```

Edit config.yml to set verse submitter.

Set L1 address with plenty of OAS for the submitter because the submitter needs to have OAS for gas.

```yml
wallets:
  # Wallet used by Verifier (Usually the same address as geth)
  signer:
    address: '0x...' # set your account created L1-light-node.
    password: /home/geth/.ethereum/password.txt # set your account password path that is created L1-light-node.

  # Wallet used by Submitter (gas is required)
  submitter:
    address: '0x...' # set your L1 account address having plenty of OAS. (e.g. sequencer address).
...
submitter:
  enable: true  # Only enable for Verse Builder
  targets:
    - chain_id: 420  # Chain ID of your Verse-Layer
      wallet: submitter
```

Create a systemd unit file. [Click here for a sample.](https://github.com/oasysgames/verse-verifier/blob/main/readme/oasvlfy.service)

```shell
curl -O /usr/lib/systemd/system/oasvlfy.service \
    https://raw.githubusercontent.com/oasysgames/verse-verifier/main/readme/oasvlfy.service

systemctl daemon-reload
```

Run the Verifier.

```shell
systemctl start oasvlfy
```

Unlock the private key if it is password protected.(Same with unlocking while setting up on hub-layer node setup.)

```shell
oasvlfy wallet:unlock --config /home/geth/.oasvlfy/config.yml --name signer
Password:
```


## Updating Verifier 

Check the binary from the [releases page](https://github.com/oasysgames/verse-verifier/releases).

Download the latest release of verifier. 

- For AMD / Intel CPU , Please download AMD. 
- For ARM based CPU , Please download ARM. 

Stop the verifier. 

```shell
systemctl stop oasvlfy
```

Run the new verifier again. 

It may require some time for synchronization between the verifier from database. 

Unlock the private key if it is password protected.(Same with unlocking while setting up on hub-layer node setup.)

```shell
oasvlfy wallet:unlock --config /home/geth/.oasvlfy/config.yml --name signer
Password:
```
