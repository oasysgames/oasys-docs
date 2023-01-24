# Setup Instant Verifier

## About
Instant Verifier of the Verse-Layer for the Oasys Blockchain.

- Verify the rolled up state from the Verse-Layer to the Hub-Layer, create signatures and share with other verifiers via P2P.

- The verifier is also **verified by the Hub-Layer validator** and can finalize rollups by collecting signatures for 51% or more of total stake amount and submitting it to the verification contract.

- Verification of the rollup state, P2P node, and submission of signatures to verification contracts can be used individually.

- All Hub Layer Validator need to install a Verse Verifier. 

## Quick Start

Download the binary from the [releases page](https://github.com/oasysgames/verse-verifier/releases).

> The Verifier creates a keccak256 hash of [ethereum signed messages](https://eips.ethereum.org/EIPS/eip-712) with the same private key as the Hub-Layer validator, so it is recommended to run it on the same node as the Hub-Layer validator.

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

Edit config.yml.
```yml
wallets:
  # Wallet used by Verifier (Usually the same address as geth)
  signer:
    address: '0x...' # set your account created L1-light-node.
    password: /home/geth/.ethereum/password.txt # set your account password path that is created L1-light-node.
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


