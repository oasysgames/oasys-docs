---
id: faq
title: Common FAQ
sidebar_label: Node FAQ
description: "A troubleshooting guide for validator node."
keywords:
  - docs
  - validator
  - commands
  - faq
---
# FAQ

### Q. Validator Header not found
While operating your node, you might encounter some of the errors listed below. These are not of concern, so you can safely ignore them.
```sh
ERROR[05-30|09:57:30.102] Failed to get validators in=Snapshot.apply hash=d069bc..ef6390 number=97920 err="header for hash not found"
```

---
### Q. How do I initiate block validation (mining)?
To initiate block validation (often referred to as mining), you should append the following options to your validator node (geth) command line:

- --mine: This option activates block production (or validation).
- ETHERBASE: This represents the operator's address.
- PASSWORD_FILE: This is the path to the operator's password file.
```sh
--mine --unlock $ETHERBASE --password $PASSWORD_FILE --allow-insecure-unlock
```
For those who selected the `No` option during the validator setup process, you should append the above options to the unit file as shown below:
```sh
ExecStart=$INSTALL_PATH \
  # ...
  --mine --unlock $ETHERBASE --password /home/geth/.ethereum/password.txt --allow-insecure-unlock
  # ...
```

---
### Q. How do I verify the block synchronization status?
Firstly, ensure that the `genesis.json` file is correctly set up by comparing the genesis block. Retrieve the genesis block using the following command:
```sh
sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec 'eth.getBlockByNumber("0x0")'
```
The expected output should be:
```
hash: "0x7027e4041ce0185f45aab280b852d49193f5adb0f728a0cb3846a9c9bbf4b7fe"
miner: "0x0000000000000000000000000000000000000000"
```
If the output differs, download the correct genesis.json from our [GitHub release page](https://github.com/oasysgames/oasys-validator/releases), replace the existing file, and restart the synchronization process from the beginning.

Next, check the synchronization status with the `eth.syncing` command:
```sh
sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```
The expected output is `false`, indicating synchronization is complete. If it's still syncing, the output will provide details on the syncing progress.

Lastly, confirm that the latest block number matches the one displayed on the [explorer](https://explorer.oasys.games/):
```sh
sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.blockNumber
```

---
### Q. How can I resolve the sync failure issue?
Firstly, please ensure that the latest head of your chain matches the one on the explorer.

To get the latest block number, use the following command:
```sh
sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.blockNumber
```
To retrieve the hash of a specific block, ensure you specify the block number in hex format:
```sh
sudo -u geth geth attach --exec 'eth.getBlockByNumber("0xff...").hash
```
If it matches, please wait until full syncing is achieved. If it does not match, you may not be following the canonical chain. In this case, you are advised to revert the latest head back to the point where it matches with the explorer. Please identify the head that matches with the explorer, then execute the setHead command.
```sh
sudo -u geth geth attach --exec 'debug.setHead("0xff...")'
```
If you are still facing synchronization issues, the root cause is likely related to your network environment. It is highly recommended to consider retrying in a fresh environment using a reliable cloud service provider, such as AWS, Azure, or GCP.

Here are a few things to keep in mind:
- Ensure the specifications exceed the [recommended requirements](/docs/hub-validator/operate-validator/hd-requirement).
- Make sure the [necessary ports](/docs/hub-validator/operate-validator/hd-requirement#firewall-settings) are open.
- Disable mining to ensure that the node can sync as a full node. You can disable mining mode by removing the `--mine` option when starting the node.

After starting the node, you might notice frequent forced peer disconnections. We haven't identified the root cause yet, but it might be related to the order in which blocks are received. At the checkpoint block(section), they need to be in order. Even if disconnections occur, the node automatically finds peers and resumes syncing. This pattern of disconnection and reconnection continues until the full sync is complete.

To prevent situations where syncing stops due to the absence of peers, we recommend noting connected peers by executing the following command periodically:
```sh
sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec admin.peers
```

If you get stuck due to a lack of peers, you can manually add them using the following command:
```sh
sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec admin.addPeer("enode://XXX...@XX.XX.XX.XX:30303")
```

You can verify whether the syncing is complete or not by referring to the [this question](/docs/hub-validator/operate-validator/faq#q-how-do-i-verify-the-block-synchronization-status).

---
### Q. Node keeps printing Looking for peers logs and is unable to connect to peers. How can this be resolved?
The sample log output is as follows:
```
INFO [05-28|01:32:16.363] Looking for peers   peercount=0 tried=154 static=0
INFO [05-28|01:32:26.385] Looking for peers   peercount=0 tried=250 static=0
INFO [05-28|01:32:36.440] Looking for peers   peercount=0 tried=97  static=0
INFO [05-28|01:32:46.481] Looking for peers   peercount=0 tried=192 static=0
```
Deleting all the node information may improve peer discovery. The node information is stored in the nodes directory under the datadir. Please try the following steps:
```sh
# 1. Stop geth

# 2. Backup the existing node information
mv /home/geth/.ethereum/geth/nodes /home/geth/.ethereum/geth/nodes-bk

# 3. Start geth
```
These steps will reset the node information and might help in finding new peers.

---
### Q. My full node is out of sync, and a BAD BLOCK error keeps appearing. How to recover?
The most straightforward method is to roll back to a block height well before the bad block occurred.
```sh
# Rollback to a specific height
debug.setHead("0xff...")
```
Ensure that the block hash matches the hash from the explorer for verification.
```sh
geth attach --exec 'eth.getBlockByNumber("0xff...").hash === "0xff.. hash from explorer"'
```

#### For Those Who Haven't Resolved the Issue
Please share the outputs of the following commands with the Oasys team:
```sh
# Get the Geth version
/usr/local/bin/geth version

# Get the Geth starting options
ps aux | grep geth

# Get the genesis block
sudo -u geth /usr/local/bin/geth attach -exec 'eth.getBlockByNumber("0x0")'

# Get the latest block
sudo -u geth /usr/local/bin/geth attach -exec 'eth.getBlockByNumber("latest")'

# Get the sync status
sudo -u geth /usr/local/bin/geth attach -exec 'eth.syncing'

# Contents of the bad block
########## BAD BLOCK #########
Chain config: %v

Validator: 0x%x
Number: %v
Hash: 0x%x
ParentHash: 0x%x
Time: %v
Difficulty: %v
ReceiptHash: 0x%x
Root: 0x%x
Extra: 0x%x
Transactions: %d
%v

Error: %v
##############################
```

---
### Q. How can I check the commission I can claim?
You have two options to do this: one is via web and the other is via the command line interface (CLI).

#### Web
You can view the amount that can be claimed on the `Claim Commission` tab on the [tools-fe](https://tools-fe.oasys.games/claim-commissions).

#### CLI
You can use the [oasys-pos-cli](https://github.com/oasysgames/oasys-pos-cli) utility tool to facilitate validator tasks. There's a specific command to check the commission that you can claim.

Here is a sample command:
```sh
# Set the private key as an environment variable.
$ export PRIVATE_KEY=STAKER_PRIVATE_KEY

# Display the validator information
$ oaspos validator:info --network mainnet

Balance               : 9 OAS
Status                : active
Operator Address      : 0x0123456789abcdef...
Commission Rate       : 10 %
Commissions           : 123000000000000000000 Wei
Jailed Epoch          : 0
Current Epoch Staking : 0 Wei
Next Epoch Staking    : 10,000,000 OAS
```

---
### Q. How can I check slashings?
You have two options to do this: one is through the web, and the other is via the command line interface (CLI).

#### Web
You can view the slashes in each recent 30 slots (days) on the `Check Validator` tab on the [tools-fe](https://tools-fe.oasys.games/check-validator).

#### CLI
You can use the [oasys-pos-cli](https://github.com/oasysgames/oasys-pos-cli) utility tool to facilitate validator tasks. There's a specific command that allows you to see how many times you have been slashed in each recent epoch.

Here is a sample command:

```sh
# Display the slashes in each epoch
# - Use the --validator option to specify your validator address.
# - Use the --back-epoch option to specify the number of epochs to go back in order to start listing the slashes.
$ ./oaspos validator:info-slash --network mainnet --validator 0xXX.. --back-epoch 30

+----+-------+-------+
| ID | Epoch | Slash |
+----+-------+-------+
|  1 |   200 |     0 |
|  2 |   199 |     3 |
...
| 30 |   170 |     1 |
+----+-------+-------+
```

---
### Q.How to Export a Private Key from Ledger?
To export a private key from a Ledger device, follow the official guide provided by Ledger. You can find detailed instructions on the [Ledger Support page](https://support.ledger.com/hc/en-us/articles/4404388633489-Export-your-accounts?docs=true).

---
### Q. How to Migrate a Validator to Another Machine?
Various factors might prompt you to migrate your operating validator node to a different server, such as:
- Improved Performance
- Enhanced Security
- Better Network Connectivity

For step-by-step instructions on how to move your validator node to a new server, please consult the [Migrating Validator to a New Server section](/docs/hub-validator/operate-validator/upgrade-migrate#migrating-validator-to-a-new-server).

---
### Q. How can I obtain the complete list of stakers?
You can obtain the list of stakers by calling the [getValidatorStakes](https://github.com/oasysgames/oasys-genesis-contract/blob/412faff50fd66546082792a34fda1108d5a7a355/contracts/StakeManager.sol#L601) function on the [StakeManager](/docs/architecture/hub-layer/contract#preset-contracts) contract.

For users who prefer a GUI interface, we are considering proofing the StakeManager on [Explorer](https://explorer.oasys.games/address/0x0000000000000000000000000000000000001001). However, due to the unconventional deployment method, it poses a challenge, and we have not yet implemented it.

---
### Frequently Used Commands for Hub
| Command                                             | Description                                                                                        |
| -------------------------------------               | ----------------------------------------------                                                     |
| `admin_addPeer`                                     | **Adds a new remote peer to the list of tracked static nodes.**                                    |
| `admin_addTrustedPeer`                              | **Adds the peer to a reserved trusted list which allows the node to always connect, even if the slots are full.** |                                                                    |
| `admin_nodeInfo`                                    | **The nodeInfo property can be queried for all the information known about the running Geth node.**|
| `admin_peers`                                       | **The peers property can be queried for all the information known about the connected peers.**     |
| `admin_removePeer`                                  | **Disconnects from a remote peer if the connection exists.**                                       |
| `admin_removeTrustedPeer`                           | **Removes a remote peer from the trusted peer set.**                                               |
| `admin.peers.length`                                | **Displays the total count of peers the node is connected with.**                                  |
| `clique_getSigners`                                 | **Retrieves the list of authorized signers at the specified block number.**                        |
| `clique_getSignersAtHash`                           | **Retrieves the list of authorized signers at the specified block hash.**                          |
| `debug_getBadBlocks`                                | **Returns a list of the last 'bad blocks' that the client has seen on the network and returns them as a JSON list of block-hashes.**                                                |
| `eth.getBlock("latest").number`                     | **Queries the height of the latest block.**                                                        |
| `debug_setHead`                                     | **Sets the current head of the local chain by block number.**                                      |
| `les.latestCheckpoint`                              | **Gets the index and hashes of the latest known checkpoint.**                                      |
| `net_peerCount`                                     | **Returns the number of connected peers.**                                                         |
|`eth.syncing.highestBlock - eth.syncing.currentBlock`| **Compares the current block of your node to the highest block.**                                  |
                            `
