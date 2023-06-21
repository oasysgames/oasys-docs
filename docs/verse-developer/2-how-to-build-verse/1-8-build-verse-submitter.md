# Verse Submitter
The Verse Builder can set [Instant Verifier](/docs/architecture/verse-layer/rollup/2-2-initial-verifier) by building Verse Submitter.

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

## Monitor Verifier

### How to check verse verification status
Instant Verifier manages data at SQLite.
You can check the verification status and rollup status from SQLite data.

If you build Instant Verifier, you can check `db.sqlite` at `datastore` of `/home/geth/.oasvlfy/config.yml`.
```yaml
datastore: /data/verse-verifier
```

To check verse status, execute SQLite.
```shell
sqlite3 /data/verse-verifier/db.sqlite
```

To make it easier to see the results of your query, execute the following at SQLite.
```sql
.mode column
```

Before checking verse verification status, you must check your verse state_commitment_chain(scc) contract address.
You can check the state_commitment_chain address as `StateCommitmentChain` at `addresses.json` downloaded from [tools-fe](/docs/verse-developer/how-to-build-verse/1-2-manual#4-2-check-verse-information).

#### How to check next rollup index(next index)
You can check the next rollup index with your state_commitment_chain(scc) address.

```sql
select id,hex(address), next_index from optimism_sccs where hex(address) = '<Your state_commitment_chain address>';
```

Column data is the following.

| Column  | Description | Example |
| ---- | ---- | ---- |
|  id  | | 1  |
|  address  | Address of state_commitment_chain | ADFB0D1B239819CC45B7A863DEEAC9A54F97EB75  |
|  next_index  | Index of the rollup that will be verified next | 3  |

`next_index` is the rollup index that will be verified next. To summarize, this scc verified rollup of (`next_index` - 1) times.

#### How to check latest rollup index(batch index) details
You can check the latest verified rollup index with your state_commitment_chain(scc) address.

```sql
WITH subquery AS (
  SELECT 
    optimism_signatures.id,
    optimism_signatures.previous_id,
    hex(signers.address) as validator_address,
    hex(optimism_sccs.address) as verse_scc_address,
    optimism_signatures.batch_index,
    hex(optimism_signatures.batch_root) as  batch_root,
    optimism_signatures.batch_size,
    optimism_signatures.prev_total_elements,
    optimism_signatures.approved,
    hex(optimism_signatures.signature) as optimism_signature
  FROM 
    optimism_signatures 
  JOIN 
    optimism_sccs ON optimism_signatures.optimism_scc_id = optimism_sccs.id 
  JOIN 
    signers ON optimism_signatures.signer_id = signers.id 
  WHERE 
      hex(optimism_sccs.address) = '<Your state_commitment_chain address>'
  ORDER BY
      optimism_signatures.batch_index DESC
)
SELECT * FROM subquery
WHERE subquery.batch_index =  (SELECT MAX(batch_index) FROM subquery);
```

Column data is the following.

| Column  | Description | Example |
| ---- | ---- | ---- |
|  id  | | 01H3E9VPZSN4KS0QSP3T1ZYJ28  |
|  previous_id  | Id of the previous rollup data that this validator_address signed for this verse | 01H3DWTPQED7GZKW1ZRHQ3M9YG  |
|  validator_address  | Validator that verified the rollup | A889698683900857FA9AC54FBC972E88292B5387  |
|  verse_scc_address  | Verse State_commitment_chain | ADFB0D1B239819CC45B7A863DEEAC9A54F97EB75  |
|  batch_index  | Rollup index | 2  |
|  batch_root  | State root used verification | 6094AE31953B97DAD3BEC31E170186DF52FEC23D858F159BE49445907AB36C1D  |
|  batch_size  | Number of L2 transactions this rollup will hold | 1  |
|  prev_total_elements  | How many layer2 transactions have been rolled up so far | 2  |
|  approved  | Whether the validator has validated and approved or not. True is 1, false is 0 | 1  |
|  optimism_signature  | Signature when validator verifies | 6A7F636DC04DF53DD2151F227B19FEF2EDB1AFAD5584A84D4FA12C2...  |

### How to monitor the submission of validator rollup verification
You can check the following in the submitter log.
- Submission of validator rollup verification to the verse state_commitment_chain(scc) contract
- Rollup verification completion

#### Submission of validator rollup verification
If a validation result for a validator is submitted to state_commitment_chain(scc), 'Sent transaction' will appear in the log.

```shell
2023-06-20 10:43:10 INFO [06-20|01:43:10.260] Sent transaction  worker=scc-submitter   scc=0xADFb0D1b239819cC45B7A863DEeac9A54F97eb75 from-index=0 to-index=0 call-size=1 tx=0xfff45b3380eb72a0d02a80b8f6f606759d73317a44618145c0c26358609e9d96 nonce=0 gas-limit=140,994 gas-fee=1,000,000,002 gas-tip=1,000,000,000 caller=scc_submitter.go:501
```

The above means the following.
- One validator's validation results are submitted to scc(`0xADFb0D1b239819cC45B7A863DEeac9A54F97eb75`)
- Not yet written in BLOCK. It is a transaction that has been sent to the mempool.
- L1 Submission Transaction hash is `0xfff45b3380eb72a0d02a80b8f6f606759d73317a44618145c0c26358609e9d96`.

#### Submission of validator rollup verification completion
If rollup verification completion, a 'Transaction succeeded' will appear in the log.

```shell
2023-06-20 10:43:19 INFO [06-20|01:43:19.262] Transaction succeeded  worker=scc-submitter   scc=0xADFb0D1b239819cC45B7A863DEeac9A54F97eb75 from-index=0 to-index=0 tx=0xfff45b3380eb72a0d02a80b8f6f606759d73317a44618145c0c26358609e9d96 caller=scc_submitter.go:538
```

The above means the following.
- Submission of validator rollup verification is completed
- L1 Submission Transaction hash is `0xfff45b3380eb72a0d02a80b8f6f606759d73317a44618145c0c26358609e9d96`.
