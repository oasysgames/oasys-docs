---
sidebar_position: 1
sidebar_label: Hub-Layer node build
id: hub-layer
---

# Hub-Layer node build
## Server Environment

### Recommended Environment
|         |                                   |
|---------|-----------------------------------|
| OS      | Linux                             |
| CPU     | 2 Core / 1.8GHz / x86_64 or ARM   |
| RAM     | 8GB DISK： 100GB SSD              |
| Network | 100Mbps                           |

### Firewall Settings
- TCP/UDP port 30303 allowed (for P2P between nodes)
- TCP port 8545 allowed (for RPC)

### Validator Build Steps
1. Download the Oasys geth binary from github (coming soon) and place it in any directory. (Or build it according to README.md)
2. Create an OS user to be used by geth.
```
$ sudo useradd -s /sbin/nologin geth
$ sudo mkdir /home/geth
$ sudo chown geth:geth /home/geth
$ sudo chmod 700 /home/geth
```
3. Download the configuration file (genesis.json) for the genesis block.
```
$ wget (coming soon) -O /home/geth/genesis.json
```

4. Create a genesis block.
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

5. Save bootstrap node configuration to `/home/geth/.ethereum/geth/static-nodes.json`
```
[ "enode://093c363d9fa759b58cb0a59d8ca664b4b4981873dc0305b113edf6d0c865089ed9894300b385e58bb3da2f7b8b575170522c5f542a9d47cbff7d28d3c8c8dd65@35.75.212.171:30303" ]
```
6. Creates a secret key to be used by geth.
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
7. Save the secret key password to a text file.
```
 $ echo {YOUR_PASSWORD} > /home/geth/.ethereum/password.txt
 ```
 8. Start geth. For YOUR_ACCOUNT_ADDRES, use the secret key address you just created.
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
  9. Immediately after startup, the block synchronization process takes place. The progress of synchronization can be checked with the following command. 
```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
{
  currentBlock: 34559,
  highestBlock: 203190,
  knownStates: 0,
  pulledStates: 0,
  startingBlock: 0
}
```
Synchronization is complete when the output changes to `false`.
```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
false
```
