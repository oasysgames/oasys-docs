# Verse Submitter
The Verse Builder can set [Instant Verifier](/docs/architecture/verse-layer/rollup/2-1-instant-verifier) by building Verse Submitter.

## About
Instant Verifier of Verse-Layer for the Oasys Blockchain.

- Verify the rolluped state by Verse-Layer to the Hub-Layer, create signature and share with other verifiers via P2P.

- The verifier is also **verified by the Hub-Layer validator** and can finalize rollups by collecting signatures for 51% or more of total stake amount and submitting it to the verification contract.

- Verification of rollup state, P2P node, and submission of signatures to verification contracts can be used individually.

- All Hub Layer Validator need to install a Verse Verifier. 

:::info Info

The Instant Verifier requires at least one Replica node of Verse node, which must be operated by someone other than the Verse Builder. The Replica node validates all the transactions coming from the Verse mode. The Instant Verifier refers to this Replica node to verify the Verse's integrity.

:::

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

# Set L1 chain
hub_layer:
  chain_id: 248
  rpc: wss://ws.mainnet.oasys.games/
  # If you are building the Verse Submitter on the L1 Testnet, 
  # comment out the mainnet settings above and uncomment the following testnet settings.

  # chain_id: 9372
  # rpc: wss://ws.testnet.oasys.games/

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
The Instant Verifier stores its data within a SQLite database.
Therefore, you can inspect the status of the verification and rollup processes by accessing this SQLite data.

If you have set up the Instant Verifier, you can inspect the `db.sqlite` file located in the `datastore` directory, which can be found in the path `/home/geth/.oasvlfy/config.yml`.
```yaml
datastore: /data/verse-verifier
```

To show data, execute SQLite.
```shell
sqlite3 /data/verse-verifier/db.sqlite
```

To better visualize the results of your queries, execute the following commands in SQLite:
```sql
.headers on
.mode column
```

Before examining the Verse verification status, it's essential to confirm your Verse's state_commitment_chain (scc) contract address.
You can check the state_commitment_chain address as `StateCommitmentChain` at `addresses.json` downloaded from [tools-fe](/docs/verse-developer/how-to-build-verse/1-2-manual#4-2-check-verse-information).

You can examine your Verse's verification status by running an SQL command with the `StateCommitmentChain` address as a condition in the WHERE clause.

```sql
.header on
.mode column

-- If you want to output in CSV format, uncomment it out.
-- .mode csv


-- Create temporary table for variables.
PRAGMA temp_store=2;
CREATE TEMP TABLE _vars(name TEXT PRIMARY KEY, value TEXT);

-- Please set the your `StateCommitmentChain` address (without the leading `0x`).
INSERT INTO _vars (name,value) VALUES (
  'scc',
  (
    SELECT id FROM optimism_sccs
    WHERE HEX(address) = UPPER('<Set here>')
  )
);

-- Rollup index range to be checked.
INSERT INTO _vars (name,value) VALUES (
  'last_index',
  (
    SELECT MAX(batch_index) FROM optimism_signatures
    WHERE optimism_scc_id = (SELECT value FROM _vars WHERE name = 'scc')
  )
);
INSERT INTO _vars (name,value) VALUES (
  'first_index',
  (SELECT value FROM _vars WHERE name = 'last_index') - 40
);

-- Please overwrite if you want to check a specific rollup index range.
-- UPDATE _vars SET value = '10' WHERE name = 'first_index';
-- UPDATE _vars SET value = '20' WHERE name = 'last_index';


-------- Table1: Display the number of verified verifiers per rollup. --------
-- If you want to output to a file, uncomment it out.
-- .output 'counts.txt'
SELECT
  sig.batch_index,
  SUM(CASE WHEN sig.approved = 1 THEN 1 ELSE 0 END) AS approves,
  SUM(CASE WHEN sig.approved = 0 THEN 1 ELSE 0 END) AS rejects
FROM  optimism_signatures AS sig
WHERE sig.optimism_scc_id = (SELECT value FROM _vars WHERE name = 'scc')
AND   sig.batch_index BETWEEN (SELECT value FROM _vars WHERE name = 'first_index') AND (SELECT value FROM _vars WHERE name = 'last_index')
GROUP BY sig.batch_index, sig.approved
ORDER BY sig.batch_index, sig.approved;


-------- Table2: Display signatures received from verifiers. --------
-- If you want to output to a file, uncomment it out.
-- .output 'signatures.txt'
SELECT 
  sig.id,
  HEX(signers.address) AS signer,
  sig.batch_index,
  HEX(sig.batch_root) AS 'state',
  CASE WHEN sig.approved = 1 THEN 'yes' ELSE 'no' END AS approved,
  HEX(sig.signature) AS signature
FROM  optimism_signatures AS sig
JOIN  optimism_sccs ON sig.optimism_scc_id = optimism_sccs.id 
JOIN  signers       ON sig.signer_id = signers.id 
WHERE sig.optimism_scc_id = (SELECT value FROM _vars WHERE name = 'scc')
AND   sig.batch_index BETWEEN (SELECT value FROM _vars WHERE name = 'first_index') AND (SELECT value FROM _vars WHERE name = 'last_index')
ORDER BY sig.batch_index, signers.id;
```

Column data is the following.

For the **`Table1`**

| Column  | Description |
| ---- | ---- |
| batch_index | Serial number of the rollup. |
| approves | Number of verifiers who approved to the rollup. |
| rejects  | Number of verifiers who rejected to the rollup. |

For the **`Table2`**

| Column  | Description |
| ---- | ---- |
| id | [ULID](https://github.com/ulid/spec) of the signature. |
| signer | The Ethereum address of the verifier who created the signature. |
| batch_index | Serial number of the rollup. |
| state | The StateRoot to be signed |
| approved | Whether the verifier has verified and approved or not. |
| signature | Off-chain signature received from verifier |

### How to monitor logs

Monitor all logs:
```shell
journalctl -fu oasvlfy --output=cat --no-pager
```

Monitor only logs of the your Verse:
```shell
journalctl -fu oasvlfy --output=cat --no-pager |
  grep -i '<Set the your `StateCommitmentChain` address (without the leading `0x`).>'
```

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
