# Build Validator Node (geth)


## Build steps 

### Full node

Oasys's full node can sync blocks, and execute commands on geth. (e.g. execute `eth.getbalance`)
It's not validator, but 

Full node only
- [x] 1.[**Check Hardware requirements**](/docs/hub-validator/operate-validator/1-1-hd-requirement)
- [x] 2.Install geth with [**Express setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#express-setup)[**Manual setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#manual-setup)

### Validator node operation

Oasys validator node operation runs validator client on Oasys.
Validator node operation require stake from delgator or self delgation of **10,000,000 OAS**. Please prepare in advance. 

- [x] 1.[**Check Hardware requirements**](/docs/hub-validator/operate-validator/1-1-hd-requirement) & [**validator account roles**](/docs/architecture/hub-layer/validator-account)
- [x] 2.Install geth with [**Express setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#express-setup)[**Manual setup**](/docs/hub-validator/operate-validator/1-2-build-validator-node#manual-setup)
- [x] 3.[**Join validator with PoS client**](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-cli) or [**Join validator with Web**](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-web). Web is recommended. (Please follow the steps for [joining](/docs/hub-validator/tools/2-3-nsuite#joining) as an N Suite user)
- [x] 4.[**stake your token with PoS client**](/docs/hub-validator/operate-validator/1-3-join-validator#4-staking) or [**stake your token with web**](/docs/hub-validator/operate-validator/1-3-join-validator#3-staking). (Please follow the steps for [staking](/docs/hub-validator/tools/2-3-nsuite#staking) as an N Suite user)
- [x] 5.Check validation status on **next epoch**
- [x] 6.After stable validation, run [**Instant verifier**](/docs/hub-validator/operate-validator/1-5-setup-verifier)

:::caution
Oasys client does frequent hardfork everytime it updates nodes, Which requires to update your node before hardfork to keep validate on Oasys chain. If you are late with updating, you must [**resync node**](/docs/hub-validator/operate-validator/1-2-build-validator-node#resync-nodes).
::::::

## Express Setup 

Note that We've tested Express Setup on CentOS, so commands may differ on another OS.
**You can run any Linux OS** for nodes.

### 1. Check command `unzip` and `wget` is installed

Check `unzip` and `wget` is installed. If not, please install.

　Cent os:
```
$yum install unzip
$yum install wget
```
　Ubuntu:
```
$apt install unzip
$apt install wget
```

### 2. Download Setup File
Please check you are downloading latest setup.sh. check from [**latest release**](https://github.com/oasysgames/oasys-validator/releases)

### 3. Giving Permission to Setup file  

Please navigate to the downloaded location and give permission to setup.sh file.
```
$ sudo chmod +x setup.sh
```
### 4. Start setup.sh 
```
$ ./setup.sh
```

While you are starting on Geth, you will be asked a question, 

**Do you want to start block validation automatically?**

**PLEASE SELECT YES** If you are willing to start validator right away.

If you select NO, Navigate [Q4](/docs/hub-validator/operate-validator/1-8-faq#q4-i-have-selected-no-on-do-you-want-to-start-block-validation-automatically-on-setupsh). On Validator Setup, you may have to turn it on manually, which might take time. 


### 5. Check `sestatus`

　On CentOs, sometimes `sestatus` stops to run geth, so you need to change：

```
$ sestatus
```
　then, following result will out:

```
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

　We recommended to change enforcing onto `permissive`. 

　Open the `/etc/selinux/config` file and change the SELINUX value to disabled:

```
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

　And restart system. 


### 6. Start Geth


Start geth:
```
$ systemctl start geth
```
Checking Node Status:
```
$ systemctl status geth
```


### 7. Checking Block Sync Status


　CentOs Default: 

```
$ sudo -u geth /usr/local/bin/geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```


---



## Manual Setup 
### 1. Download the Oasys geth binary from [github]

Download from (https://github.com/oasysgames/oasys-validator) and place it in any directory (e.g. /usr/local/bin).  
(Or build it according to README.md)
### 2. Create an OS user to be used by geth.
```
$ sudo useradd -s /sbin/nologin geth
$ sudo mkdir /home/geth
$ sudo chown geth:geth /home/geth
$ sudo chmod 700 /home/geth
```
### 3. Download the configuration file for the genesis block from [github]

You can download configuration files from here, 
(https://github.com/oasysgames/oasys-validator/releases)

Or can download with using `wget` command. 
```
$ wget https://github.com/oasysgames/oasys-validator/releases/download/v1.0.4/genesis.zip

$ unzip genesis.zip
Archive:  genesis.zip
   creating: genesis/
  inflating: genesis/mainnet.json
  inflating: genesis/testnet.json

$ mv genesis/{target network}.json /home/geth/genesis.json
```

### 4. Create a genesis block.
```
$ sudo -u geth geth init /home/geth/genesis.json
```

　The following will be output.
```
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

### 5. Creates a secret key to be used by geth.
```
 $ sudo -u geth geth account new
```
The following will be output.
```
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
**Important: Keep the secret key and password in a safe place.**  

### 6. Save the secret key password to a text file
```
 $ vi /home/geth/.ethereum/password.txt
```
### 7. Start geth

Exports `NETWORK_ID` and `BOOTNODES`.


For mainnet:
```
$ export NETWORK_ID=248
$ export BOOTNODES="enode://1e68361cb0e761e0789c014acdbd2491f30176acf25480408382916632e58af1711d857c75be5917319d06049937e49c09ca51a28590e6ee22aceca1161fd583@3.113.207.39:30301,enode://24a55fd923d780213d15f5551bcbb7171343ef095512927d91baca3e7917124c679f894282eefec37350088b31c45a49bb28df790eb88f487ad60a9b6ccc8f3b@35.238.159.190:30301"
```

For testnet:
```
$ export NETWORK_ID=9372
$ export BOOTNODES="enode://4a85df39ec500acd31d4b9feeea1d024afee5e8df4bc29325c2abf2e0a02a34f6ece24aca06cb5027675c167ecf95a9fc23fb7a0f671f84edb07dafe6e729856@3.113.59.173:30303"
```

For `YOUR_ACCOUNT_ADDRES`, use the secret key address you just created.
```
$ sudo -u geth geth \
 --networkid $NETWORK_ID \
 --bootnodes $BOOTNODES \
 --syncmode full --gcmode archive \
 --mine --miner.gaslimit 30000000 \
 --allow-insecure-unlock --unlock {YOUR_ACCOUNT_ADDRESS} \
 --password /home/geth/.ethereum/password.txt
```
### 8. Block Sync

Immediately after startup, the block synchronization process takes place. The progress of synchronization can be checked with the following command. 

Please check installed directory, and write the command below to check sync:

```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```


You can see following result：

```
{
  currentBlock: 34559,
  highestBlock: 203190,
  knownStates: 0,
  pulledStates: 0,
  startingBlock: 0
}
```

When Synchronization is complete, you can see output`false`.

```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
false
```

## Updating node 

### 1. Stop Geth 

```
$ systemctl stop geth
```


### 2. Check keystore

First navigate into /home/geth

Your default install location is `/home/geth/.ethereum/`.

and Check you have secret key on, `/home/geth/.ethereum/keystore/`, You have `password.txt` on `/home/geth/.ethereum/password.txt`

Back up `secret key`, `password.txt` before upgrade. 

```
Secret key file: /home/geth/.ethereum/keystore/UTC--2022-03-14T12-11-06.835917424Z--abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
```
After that,

```
journalctl -u geth -n 1000 --no-pager
```

You can try `journalctl` to　check update logs.

### 3. Download new release

:::caution
Please check your version is **latest** version before downloading.
- Download geth-version_number-linux-amd64.zip(BINARY FILE) if you are using Intel or AMD CPU. 
- Download geth-version_number-linux-arm64.zip(BINARY FILE) if you are using ARM based chip CPU. 
::::::

You can download configuration files on here, 
(https://github.com/oasysgames/oasys-validator/releases)

You can learn about setup process by navigating [how setup.sh code deploys code](https://github.com/oasysgames/oasys-validator/blob/54aae939d3f01fc5f89b470a75e0b13cac4240a3/.github/setup_template.sh#L9).


### 4. Restart geth
```
$ sudo systemctl start geth
``` 

### 5. Check geth status

```
$ sudo systemctl status geth
``` 

You can see `journalctl` if upgrade is complete. 

```
INFO [11-02|11:16:11.821] Starting peer-to-peer node   instance=Geth/v1.0.1-54aae939/linux-amd64/go1.17.8
```

or, you can use 

```
geth -h 
```

to see version info.

If not working :

1. Check geth status, make sure it deploys contract. 

``` 
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
``` 

2. [Check Block sync status.](/docs/hub-validator/operate-validator/1-8-faq#q5-i-want-to-know-block-sync-status)
3. [Restart sync process.](/docs/hub-validator/operate-validator/1-8-faq#q5-i-want-to-know-block-sync-status)


## Resync Nodes

### 1. Stop geth

```
systemctl stop geth
```

Stop geth process.

### 2. Move sync data

```
mv /home/geth/.ethereum/geth /home/geth/.ethereum/geth-backup
```

move sync data on `/home/geth/.ethereum/geth` to somewhere else.

### 3. Init genesis.json

```
sudo geth init genesis/mainnet.json
```
Init [**latest**](https://github.com/oasysgames/oasys-validator/releases/) genesis.json file on github.

### 4. Restart geth 

```
systemctl start geth
```