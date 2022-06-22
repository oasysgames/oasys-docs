---
sidebar_position: 2
sidebar_label: Hub-Layer node build
id: hub-layer
---

# Hub-Layer node build

## Express Setup 

Note that We've tested Express Setup on CentOS, so command may differ on other OS.

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
```
$ wget https://github.com/oasysgames/oasys-validator/releases/download/v1.0.0-alpha4/setup.sh
```
### 3. Giving Permission to Setup file  

Please navigate to downloaded location and give permission to setup.sh file.
```
$ sudo chmod +x setup.sh
```
### 4. Start setup.sh 
```
$ ./setup.sh
```
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

You can download configuration files on here, 
(https://github.com/oasysgames/oasys-validator/releases)

Or can download with using `wget` command. 
```
$ wget https://github.com/oasysgames/oasys-validator/releases/download/v1.0.0-alpha2/genesis.zip

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

### 5. Save bootstrap node configuration 

Save configuration information to `/home/geth/.ethereum/geth/static-nodes.json`

For mainnet:

```
"enode://093c363d9fa759b58cb0a59d8ca664b4b4981873dc0305b113edf6d0c865089ed9894300b385e58bb3da2f7b8b575170522c5f542a9d47cbff7d28d3c8c8dd65@35.73.174.118:30303" 
```

For testnet:
```
"enode://4a85df39ec500acd31d4b9feeea1d024afee5e8df4bc29325c2abf2e0a02a34f6ece24aca06cb5027675c167ecf95a9fc23fb7a0f671f84edb07dafe6e729856@35.77.156.6:30303"
```

### 6. Creates a secret key to be used by geth.
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

### 7. Save the secret key password to a text file
```
 $ vi /home/geth/.ethereum/password.txt
```
### 8. Start geth

For `YOUR_ACCOUNT_ADDRES`, use the secret key address you just created.

```
$ sudo -u geth geth \
 --networkid 248 \
 --syncmode full --gcmode archive \
 --mine --allow-insecure-unlock \
 --unlock {YOUR_ACCOUNT_ADDRESS} \
 --password /home/geth/.ethereum/password.txt \
 --http --http.addr 0.0.0.0 --http.port 8545 \
 --http.vhosts '*' --http.corsdomain '*' \
 --http.api net,eth,web3
```
### 9. Block Sync

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
