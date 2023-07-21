# Build Oasys Node (geth)


## Build steps 

### Full Node
Oasys's full node is capable of synchronizing blocks and executing commands on geth, including eth.getbalance. However, it is important to note that the Oasys full node itself does not function as a validator.

- [x] 1.[**Check Hardware requirements**](/docs/hub-validator/operate-validator/1-1-hd-requirement)
- [x] 2.Install geth with [**Express setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#express-setup)[**Manual setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#manual-setup)

### Validator Node
The Oasys validator node operation involves running the validator client on the Oasys platform. To participate in the validator node operation, it is necessary to have a stake of **10,000,000 OAS** from a delegator or through self-delegation. Please make sure to prepare the required stake in advance.

- [x] 1.[**Check Hardware requirements**](/docs/hub-validator/operate-validator/1-1-hd-requirement) & [**validator account roles**](/docs/architecture/hub-layer/validator-account)
- [x] 2.Install geth with [**Express setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#express-setup)[**Manual setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#manual-setup)
- [x] 3.[**Join validator with PoS client**](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-cli) or [**Join validator with Web**](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-web). Web is recommended. (Please follow the steps for [joining](/docs/hub-validator/tools/2-3-nsuite#joining) as an N Suite user)
- [x] 4.[**stake your token with PoS client**](/docs/hub-validator/operate-validator/1-3-join-validator#4-staking) or [**stake your token with web**](/docs/hub-validator/operate-validator/1-3-join-validator#3-staking). (Please follow the steps for [staking](/docs/hub-validator/tools/2-3-nsuite#staking) as an N Suite user)
- [x] 5.Check validation status on **next epoch**
- [x] 6.After stable validation, run [**Instant verifier**](/docs/hub-validator/operate-validator/1-5-setup-verifier)

:::caution
The Oasys client undergoes frequent hard forks whenever it updates nodes. To continue validating on the Oasys chain, it is necessary to update your node prior to each hard fork. If you fail to update in a timely manner, you will be required to [**resync your node**](/docs/hub-validator/operate-validator/1-2-build-validator-node#resync-nodes).
::::::

## Express Setup

Please note that we have tested the Express Setup process on CentOS, so the provided commands may vary for other operating systems. However, rest assured that **you can run Oasys nodes on any Linux OS or any other operating system** of your choice.


### 1. Verify Installation of `unzip` and `wget` Commands

Please ensure that the `unzip` and `wget` commands are installed on your system. If they are not already installed, please proceed with their installation.

Cent os:
```sh
$ sudo yum install unzip
$ sudo yum install wget
```

Ubuntu:
```sh
$ sudo apt install unzip
$ sudo apt install wget
```

### 2. Download the Setup File
Ensure that you are downloading the latest `setup.sh` file. You can verify this by visiting the [**latest release**](https://github.com/oasysgames/oasys-validator/releases) page.

### 3. Granting Permissions to the Setup File
Once you have located the downloaded `setup.sh` file, please navigate to its location and grant the necessary permissions to the file.
```sh
$ sudo chmod +x setup.sh
```
### 4. Start setup.sh
```sh
$ ./setup.sh
```
When starting Geth, you will encounter a question:

**Do you want to start block validation automatically?**

If you wish to start the validator immediately, please select **YES**.

If you choose **NO**, please proceed to [Q4](/docs/hub-validator/operate-validator/1-8-faq#q4-i-have-selected-no-on-do-you-want-to-start-block-validation-automatically-on-setupsh) in the Validator Setup section. Keep in mind that manually turning on the validator might take some time.


### 5. Check `sestatus` Command
On CentOS, there are instances where running `sestatus` may cause interruptions with geth(Oasys Node). In such cases, it is necessary to make the following changes:

```sh
$ sestatus
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
$ systemctl start geth
```
To check the status of your node, use the following command:
```sh
$ systemctl status geth
```


### 7. Checking Block Sync Status
For CentOS default installations, you can use the following command to check the block sync status:
```sh
$ sudo -u geth /usr/local/bin/geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```

---

## Manual Setup
### 1. Download the Oasys Geth Binary
Download the Oasys Geth binary from [GitHub](https://github.com/oasysgames/oasys-validator) and place it in any directory of your choice (e.g., /usr/local/bin). Alternatively, you can build it following the instructions provided in the README.md file.

### 2. Create an OS User for Geth
Create an OS user specifically for running Geth(Oasys Node) by executing the following commands:
```sh
$ sudo useradd -s /sbin/nologin geth
$ sudo mkdir /home/geth
$ sudo chown geth:geth /home/geth
$ sudo chmod 700 /home/geth
```
### 3. Download the Genesis Block Configuration
You can download the configuration files for the genesis block from [GitHub](https://github.com/oasysgames/oasys-validator/releases) or by using the wget command:

```sh
$ wget https://github.com/oasysgames/oasys-validator/releases/download/v1.0.4/genesis.zip

$ unzip genesis.zip
Archive:  genesis.zip
   creating: genesis/
  inflating: genesis/mainnet.json
  inflating: genesis/testnet.json

$ mv genesis/{target network}.json /home/geth/genesis.json
```

### 4. Create a Genesis Block
To create a genesis block, run the following command:
```sh
$ sudo -u geth geth init /home/geth/genesis.json
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
$ sudo -u geth geth account new
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
Save the secret key password to a text file using the following command:
```sh
$ vi /home/geth/.ethereum/password.txt
```
### 6. Start Geth
Export the `NETWORK_ID` and `BOOTNODES` variables.

For the mainnet:
```sh
$ export NETWORK_ID=248
$ export BOOTNODES="enode://1e68361cb0e761e0789c014acdbd2491f30176acf25480408382916632e58af1711d857c75be5917319d06049937e49c09ca51a28590e6ee22aceca1161fd583@3.113.207.39:30301,enode://24a55fd923d780213d15f5551bcbb7171343ef095512927d91baca3e7917124c679f894282eefec37350088b31c45a49bb28df790eb88f487ad60a9b6ccc8f3b@35.238.159.190:30301"
```

For the testnet:
```sh
$ export NETWORK_ID=9372
$ export BOOTNODES="enode://4a85df39ec500acd31d4b9feeea1d024afee5e8df4bc29325c2abf2e0a02a34f6ece24aca06cb5027675c167ecf95a9fc23fb7a0f671f84edb07dafe6e729856@3.113.59.173:30303"
```

`YOUR_ACCOUNT_ADDRESS` is the address associated with the secret key you have just created.
```sh
$ sudo -u geth geth \
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
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```

You will receive the following output:
```sh
{
  currentBlock: 34559,
  highestBlock: 203190,
  knownStates: 0,
  pulledStates: 0,
  startingBlock: 0
}
```

Once the synchronization is complete, you will see the output `false`.
```sh
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing

false
```

## Updating the Node

### 1. Stop Geth
To stop Geth, execute the following command:
```sh
$ systemctl stop geth
```


### 2. Check Keystore
Navigate to the /home/geth directory. The default installation location is `/home/geth/.ethereum/`.

Verify that you have the secret key located in `/home/geth/.ethereum/keystore/`. Additionally, ensure that you have the `password.txt` file in /home/geth/.ethereum/password.txt.

Before proceeding with the upgrade, it is important to back up both the secret key and the password.txt file
```sh
Secret key file: /home/geth/.ethereum/keystore/UTC--2022-03-14T12-11-06.835917424Z--abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
```
After that, you can try using `journalctl` to check the update logs:
```sh
$ journalctl -u geth -n 1000 --no-pager
```
This command allows you to view the update logs.

### 3. Download the New Release
:::caution
Before downloading, please ensure that you are getting the **latest** version. Follow these steps based on your CPU architecture:
- Download geth-version_number-linux-amd64.zip(BINARY FILE) if you are using an Intel or AMD CPU.
- Download geth-version_number-linux-arm64.zip(BINARY FILE) f you are using an ARM-based CPU.
::::::

You can download the configuration files from [here](https://github.com/oasysgames/oasys-validator/releases).
To learn more about the setup process, you can refer to the setup.sh code deployment in the [GitHub repository](https://github.com/oasysgames/oasys-validator/blob/54aae939d3f01fc5f89b470a75e0b13cac4240a3/.github/setup_template.sh#L9).

### 4. Restart Geth
Restart Geth by executing the following command:
```sh
$ sudo systemctl start geth
``` 

### 5. Check Geth Status
To check the status of Geth, use the following command:
```sh
$ sudo systemctl status geth
``` 
You can also refer to `journalctl` to confirm if the upgrade is complete. Look for the following line in the logs:
```sh
INFO [11-02|11:16:11.821] Starting peer-to-peer node   instance=Geth/v1.0.1-54aae939/linux-amd64/go1.17.8
```
Alternatively, you can use the geth -h command to view version information.
```sh
geth -h 
```

If the above steps are not working:

1. Check the status of Geth and ensure that it deploys the contract:
``` sh
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
``` 
2. Check Block Sync Status
To check the block sync status, please refer to [this section](/docs/hub-validator/operate-validator/1-8-faq#q5-i-want-to-know-block-sync-status).

3. Restart Sync Process
If needed, you can restart the sync process by following the [instructions mentioned here](/docs/hub-validator/operate-validator/1-8-faq#q5-i-want-to-know-block-sync-status).


## Resync Nodes

### 1. Stop Geth
Stop the Geth process by executing the following command:
```sh
$ systemctl stop geth
```

### 2. Move Sync Data
Move the sync data located at `/home/geth/.ethereum/geth` to a different location using the following command:
```sh
$ mv /home/geth/.ethereum/geth /home/geth/.ethereum/geth-backup
```

### 3. Initialize Genesis Block
Initialize the genesis block using the [**latest**](https://github.com/oasysgames/oasys-validator/releases/) genesis.json file available on GitHub. Execute the following command:
```sh
$ sudo geth init genesis/mainnet.json
```

### 4. Restart Geth
Restart the Geth process by running the following command:
```sh
$ systemctl start geth
```
