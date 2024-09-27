---
id: build-validator-node
title: Validator Node Setup
sidebar_label: Node Setup
description: "Guide for setting up Node"
keywords:
  - geth
  - full node
  - validator
  - express
  - manual
---

# Build Oasys Node (geth)
## Build steps
### Full Node
Oasys's full node is capable of synchronizing blocks and executing commands on geth, including eth.getbalance. However, it is important to note that the Oasys full node itself does not function as a validator.

- [x] 1.[**Check Hardware requirements**](/docs/hub-validator/operate-validator/hd-requirement)
- [x] 2.Install geth through one of the following two options:
  - [**Express setup**](/docs/hub-validator/operate-validator/build-validator-node#express-setup): his is a straightforward method for setting up the validator node in your preferred environment.
  - [**Manual setup**](/docs/hub-validator/operate-validator/build-validator-node#manual-setup): This is a more engineering-friendly method. Those who use this setup will gain a good understanding of the Oasys validation node.
- [x] 3.Join our official [Discord](https://discord.gg/oasysgames). Announcements such as validator node updates are posted in the `announcement-validator` channel. Once you've joined, please remember to obtain roles in the `get-a-role` channel.

### Validator Node
The Oasys validator node operation involves running the validator client on the Oasys platform. To participate in the validator node operation, it is necessary to have a stake of **10,000,000 OAS** from a delegator or through self-delegation. Please make sure to prepare the required stake in advance.

- [x] 1.[**Check Hardware requirements**](/docs/hub-validator/operate-validator/hd-requirement) & [**validator account roles**](/docs/architecture/hub-layer/validator-account)
- [x] 2.Install geth through one of the following tow options:
  - [**Express setup**](/docs/hub-validator/operate-validator/build-validator-node#express-setup): his is a straightforward method for setting up the validator node in your preferred environment.
  - [**Manual setup**](/docs/hub-validator/operate-validator/build-validator-node#manual-setup): This is a more engineering-friendly method. Those who use this setup will gain a good understanding of the Oasys validation node.
- [x] 3.[**Join validator with PoS client**](/docs/hub-validator/operate-validator/join-validator#join-validator-to-pos-cli) or [**Join validator with Web**](/docs/hub-validator/operate-validator/join-validator#join-validator-to-pos-web). Web is recommended. (Please follow the steps for [joining](/docs/hub-validator/tools/2-3-nsuite#joining) as an N Suite user)
- [x] 4.[**stake your token with PoS client**](/docs/hub-validator/operate-validator/join-validator#4-staking) or [**stake your token with web**](/docs/hub-validator/operate-validator/join-validator#3-staking). (Please follow the steps for [staking](/docs/hub-validator/tools/2-3-nsuite#staking) as an N Suite user)
- [x] 5.[Enabling Fast Finality](/docs/hub-validator/operate-validator/build-validator-node#enabling-fast-finality)
- [x] 6.Check validation status on **next epoch**
- [x] 7.After stable validation, run [**Instant verifier**](/docs/hub-validator/operate-validator/setup-verifier)
- [x] 8.Join our official [Discord](https://discord.gg/oasysgames). Announcements such as validator node updates are posted in the `announcement-validator` channel. Once you've joined, please remember to obtain roles in the `get-a-role` channel.

---
## Express Setup
We have tested the Express Setup process on CentOS, so the provided commands may vary for other operating systems. However, rest assured that you can run Oasys nodes on any Linux OS or any other operating system of your choice.

### 1. Verify Installation of `unzip` and `wget` Commands

Please ensure that the `unzip` and `wget` commands are installed on your system. If they are not already installed, please proceed with their installation.

CentOS:
```sh
sudo yum install unzip
sudo yum install wget
```

Ubuntu:
```sh
sudo apt install unzip
sudo apt install wget
```

### 2. Download the Setup File
Ensure that you are downloading the latest `setup.sh` file. You can verify this by visiting the [**latest release**](https://github.com/oasysgames/oasys-validator/releases) page.

### 3. Granting Permissions to the Setup File
Once you have located the downloaded `setup.sh` file, please navigate to its location and grant the necessary permissions to the file.
```sh
sudo chmod +x setup.sh
```
### 4. Start setup.sh
```sh
./setup.sh
```
When starting Geth, you will encounter a question:

> Do you want to start block validation automatically?

If you wish to start the validator immediately, please select **YES**. If you choose **NO**, please check to [initiate block validation](/docs/hub-validator/operate-validator/faq#q-how-do-i-initiate-block-validation-mining) section in Q&A. Keep in mind that manually turning on the validator might take some time.


:::info Operator Address
The operator address required for registration in the later [Join Validator](/docs/hub-validator/operate-validator/join-validator#2-register-the-validator-operator) process is generated in Step 4. This step is identified by the print message `4. Create a private key`.

The address is written in the wallet.txt file located at `/home/geth/.ethereum/wallet.txt`. You can find the created account's address after the sentence `Public address of the key:`.

For more information about the operator, please refer to [this discription](/docs/architecture/hub-layer/validator-account#validator-operator-operator-account)
:::

### 5. Check `sestatus` Command
On CentOS, there are instances where running `sestatus` may cause interruptions with geth(Oasys Node). In such cases, it is necessary to make the following changes:

```sh
sestatus
```
Then, the following result will be displayed::
```sh
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          permissive
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Memory protection checking:     actual (secure)
Max kernel policy version:      33
```
We recommend changing the SELinux mode from `enforcing` to `permissive`.
To do this, open the `/etc/selinux/config` file and modify the value of SELINUX to "permissive":
```sh
This file controls the state of SELinux on the system.
SELINUX= can take one of these three values:
       enforcing - SELinux security policy is enforced.
      permissive - SELinux prints warnings instead of enforcing.
       disabled - No SELinux policy is loaded.
SELINUX=disabled
SELINUXTYPE= can take one of these three values:
     targeted - Targeted processes are protected,
     minimum - Modification of targeted policy. Only selected processes are protected.
     mls - Multi Level Security protection.
SELINUXTYPE=targeted
```
After making the changes, please restart your system for the modifications to take effect.

### 6. Starting Geth

To start Geth, execute the following command:
```sh
systemctl start geth
```
To check the status of your node, use the following command:
```sh
systemctl status geth
```


### 7. Checking Block Sync Status
For CentOS default installations, you can use the following command to check the block sync status:
```sh
sudo -u geth /usr/local/bin/geth attach --exec eth.syncing ipc:/home/geth/.ethereum/geth.ipc
```

---
## Manual Setup
### 1. Download the Oasys Geth Binary
Download the Oasys Geth binary from [GitHub](https://github.com/oasysgames/oasys-validator) and place it in any directory of your choice (e.g., /usr/local/bin). Alternatively, you can build it following the instructions provided in the README.md file.

### 2. Create an OS User for Geth
Create an OS user specifically for running Geth(Oasys Node) by executing the following commands:
```sh
sudo useradd -s /sbin/nologin geth
sudo mkdir /home/geth
sudo chown geth:geth /home/geth
sudo chmod 700 /home/geth
```
### 3. Download the Genesis Block Configuration
You can download the configuration files for the genesis block from [GitHub](https://github.com/oasysgames/oasys-validator/releases) or by using the wget command:

```sh
wget https://github.com/oasysgames/oasys-validator/releases/download/v1.0.4/genesis.zip

unzip genesis.zip
Archive:  genesis.zip
   creating: genesis/
  inflating: genesis/mainnet.json
  inflating: genesis/testnet.json

mv genesis/{target network}.json /home/geth/genesis.json
```

### 4. Create a Genesis Block
To create a genesis block, run the following command:
```sh
sudo -u geth geth init /home/geth/genesis.json
```

You will see the following output:
```sh
INFO [03-14|12:07:35.106] Maximum peer count                       ETH=50 LES=0 total=50
INFO [03-14|12:07:35.106] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
INFO [03-14|12:07:35.107] Set global gas cap                       cap=50,000,000
INFO [03-14|12:07:35.107] Allocated cache and file handles         database=/home/geth/.ethereum/geth/chaindata cache=16.00MiB handles=16
INFO [03-14|12:07:35.115] Writing custom genesis block
INFO [03-14|12:07:35.115] Persisted trie from memory database      nodes=5 size=743.00B time="42.208µs" gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [03-14|12:07:35.115] Successfully wrote genesis state         database=chaindata                           hash=f63988..28bcdc
INFO [03-14|12:07:35.115] Allocated cache and file handles         database=/home/geth/.ethereum/geth/lightchaindata cache=16.00MiB handles=16
INFO [03-14|12:07:35.121] Writing custom genesis block
INFO [03-14|12:07:35.122] Persisted trie from memory database      nodes=5 size=743.00B time="30.833µs" gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [03-14|12:07:35.122] Successfully wrote genesis state         database=lightchaindata                           hash=f63988..28bcdc
INFO [03-14|12:07:35.106] Maximum peer count ETH=50 LES=0 total=50 INFO [03-14|12
```

### 5. Generate a Secret Key for Geth
To create a secret key for Geth, execute the following command:
```sh
sudo -u geth geth account new
```
You will receive the following output:
:::warning Important
**Keep the secret key and password in a safe place.**
:::
```sh
INFO [03-14|12:10:46.047] Maximum peer count                       ETH=50 LES=0 total=50
INFO [03-14|12:10:46.047] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
Your new account is locked with a password. Please give a password. Do not forget this password.
Password:
Repeat password:

Your new key was generated

Public address of the key:   0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
Path of the secret key file: /home/geth/.ethereum/keystore/UTC--2022-03-14T12-11-06.835917424Z--abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd

- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!
- You must REMEMBER your password! Without the password, it's impossible to decrypt the key!
```
:::info Operator Address
The generated address is intended to be registered as an operator address in the later [Join Validator](/docs/hub-validator/operate-validator/join-validator#2-register-the-validator-operator) process. You can find the created account's address after the sentence `Public address of the key:`.

For more information about the operator, please refer to [this discription](/docs/architecture/hub-layer/validator-account#validator-operator-operator-account)
:::

Save the secret key password to a text file using the following command:
```sh
vi /home/geth/.ethereum/password.txt
```
### 6. Start Geth
Export the `NETWORK_ID` and `BOOTNODES` variables.

For the mainnet:
```sh
export NETWORK_ID=248
export BOOTNODES="enode://1e68361cb0e761e0789c014acdbd2491f30176acf25480408382916632e58af1711d857c75be5917319d06049937e49c09ca51a28590e6ee22aceca1161fd583@3.113.207.39:30301,enode://24a55fd923d780213d15f5551bcbb7171343ef095512927d91baca3e7917124c679f894282eefec37350088b31c45a49bb28df790eb88f487ad60a9b6ccc8f3b@35.238.159.190:30301"
```

For the testnet:
```sh
export NETWORK_ID=9372
export BOOTNODES="enode://319e4b45c1c00e26a4e04ff103242b09fff91dc5a6f6f06ad2181e20683cd9dc1c8dea95588cb4b91d3812e749e0e542e626ee094b6a67476fb67dc2db53d257@34.142.254.12:30301,enode://696f1728b4c44685558fbe9b641d226156668facde8f8d014d7a31e4c462ad0942652494c75db659c46002ca7da0996f61f7dcc26ed9391e42d13af626333f2e@35.247.178.119:30301,enode://54b81cfbdeb1bc55b1d32d78150442b8cee9fdf8e8fb0e8355b405a37afae28595fb31b0a265801d72f34975381619976cb60f8a055e122a24d1a9f668229ad7@34.143.178.245:30301"
```

`YOUR_ACCOUNT_ADDRESS` is the address associated with the secret key you have just created.
```sh
sudo -u geth geth \
 --networkid $NETWORK_ID \
 --bootnodes $BOOTNODES \
 --syncmode full --gcmode archive \
 --mine --miner.gaslimit 30000000 \
 --allow-insecure-unlock --unlock {YOUR_ACCOUNT_ADDRESS} \
 --password /home/geth/.ethereum/password.txt
```
### 7. Block Sync
Once Geth is started, the block synchronization process begins automatically. You can check the progress of synchronization by running the following command.

Please ensure you are in the installed directory and execute the command below to monitor the sync progress:
```sh
sudo -u geth geth attach --exec eth.syncing ipc:/home/geth/.ethereum/geth.ipc
```

You will receive the following output:
```sh
{
  currentBlock: 1969919,
  healedBytecodeBytes: 0,
  healedBytecodes: 0,
  healedTrienodeBytes: 0,
  healedTrienodes: 0,
  healingBytecode: 0,
  healingTrienodes: 0,
  highestBlock: 2163128,
  startingBlock: 0,
  syncedAccountBytes: 0,
  syncedAccounts: 0,
  syncedBytecodeBytes: 0,
  syncedBytecodes: 0,
  syncedStorage: 0,
  syncedStorageBytes: 0
}
```

Once the synchronization is complete, you will see the output `false`.
```sh
sudo -u geth geth attach --exec eth.syncing ipc:/home/geth/.ethereum/geth.ipc

false
```

## Enabling Fast Finality
The following steps outline how to enable [Fast Finality](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md), a mechanism designed to finalize PoS chains, originally developed by BSC. To enable this, validators need to generate and register a BLS key, which is used to sign blocks and attest to voted blocks.

### 1. Generate the BLS Key
Generate the key using the Geth command:
```sh
# Create a password file
sudo -u geth openssl rand -base64 18 > password.txt

# Create a wallet
sudo -u geth geth bls wallet create --datadir /home/geth/.ethereum/ --blspassword ./password.txt

# Generate a BLS Key
sudo -u geth geth bls account new --datadir /home/geth/.ethereum/ --blspassword ./password.txt

# Move the password file to bls directory
sudo mv ./password.txt /home/geth/.ethereum/bls/
```
To verify the key, use the following Geth command:
```sh
sudo -u geth geth bls account list --datadir /home/geth/.ethereum/ --blspassword /home/geth/.ethereum/bls/password.txt
```

### 2. Register the BLS Public Key
To associate your BLS key with your validator, it must be registered with the StakeManager contract. You have two options for this: using a manually or explorer.

#### Manual Registration
Call the [updateBLSPublicKey](https://github.com/oasysgames/oasys-genesis-contract/blob/v1.6.1/contracts/StakeManager.sol#L217) function of the [StakeManager](/docs/architecture/hub-layer/contract#preset-contracts) contract to register the BLS public key.
- blsPublicKey: The hexadecimal format of your BLS public key.
```solidity
function updateBLSPublicKey(bytes calldata blsPublicKey) external;
```
To verify the registration, call the [getValidatorInfo](https://github.com/oasysgames/oasys-genesis-contract/blob/v1.6.1/contracts/StakeManager.sol#L458C5-L468C10) function. This function returns a tuple containing various pieces of information, with the last item being the corresponding BLS public key.
- validator: the validator's owner address
- epoch: specify 0
```solidity
function getValidatorInfo(address validator, uint256 epoch)
  external
  view
returns (
    address operator,
    bool active,
    bool jailed,
    bool candidate,
    uint256 stakes,
    bytes memory blsPublicKey
)
```

#### Registration via Explorer
Open the [verified contract page](https://explorer.oasys.games/address/0x0000000000000000000000000000000000001001?tab=contract) of StakeManager on the blockchain explorer, then call the `updateBLSPublicKey` and `getValidatorInfo` functions as described in the manual method.

### 3. Enable Fast Finality on the Node
To enable Fast Finality on your node, add the following options to the node's startup command.
```sh
geth \
 ...
 --vote=true \
 --blswallet=/home/geth/.ethereum/bls/wallet \
 --blspassword=/home/geth/.ethereum/bls/password.txt \
 --vote-journal-path=/home/geth/.ethereum/bls
```
After setting this up, restart the node and check the logs to ensure the following message is printed:
```console
example log
```
