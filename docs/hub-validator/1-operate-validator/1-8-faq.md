# FAQ

## Node Setup

### Q1. Validator Header not found
    
On the Hub layer manual setup Step 8, you may see a few of the following errors. There is no problem, so please ignore them.

```sh
ERROR[05-30|09:57:30.102] Failed to get validators in=Snapshot.apply hash=d069bc..ef6390 number=97920 err="header for hash not found"
```
    
---
### Q2. Block sync command result `false` 

```
$ sudo -u geth /usr/local/bin/geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```

On manual setup step 9 or using this command, You can see the command result is `false` when block sync is completed.

After syncing, whenever you receive a new block from another validator, you will see a log similar to the following:

INFO [05-30|10:00:52.359] Imported new chain segment blocks=1 txs=0 mgas=0.000 elapsed=2.138ms mgasps=0.000 number=105,080 hash=9e2e47..97dbb5 dirty=0.00B

---
### Q3. Restore Public key & Address

You can run python a 3 script, with following commands : 

```
from eth_account._utils.legacy_transactions import (
    serializable_unsigned_transaction_from_dict,
)
from eth_account._utils.signing import extract_chain_id, to_standard_v
from web3 import HTTPProvider, Web3

w3 = Web3(HTTPProvider('https://rpc.testnet.oasys.games/'))
tx = w3.eth.get_transaction('Your Transaction hash')

txdata = {
  "gasPrice": tx['gasPrice'],
  "nonce": tx['nonce'],
  "to": tx['to'],
  "value": tx['value'],
  "gas": tx['gas'],
  "data": tx['input'],
  "chainId": extract_chain_id(tx['v'])[0],
}
unsigned_tx = serializable_unsigned_transaction_from_dict(txdata)

v = to_standard_v(extract_chain_id(tx['v'])[1])
r = w3.toInt(tx['r'])
s = w3.toInt(tx['s'])
signature = w3.eth.account._keys.Signature(vrs=(v, r, s))

recoverd_pubkey = signature.recover_public_key_from_msg_hash(unsigned_tx.hash())
recoverd_address = "0x" + Web3.keccak(recoverd_pubkey.to_bytes()).hex()[26:]

print(Web3.toChecksumAddress(tx['from']))
print(Web3.toChecksumAddress(recoverd_address))
```

---
### Q4. I have selected No on Do you want to start block validation automatically? on setup.sh

Since you have selected automatic block validation, 
Block miner status is `off`, so you need to turn it on.



1. In the systemd unit file please add geth start option `--alow-insecure-unlock`

```
ExecStart=$INSTALL_PATH \
  --datadir ${DATA_DIR} \
  --networkid ${NETWORK_ID} \
  --bootnodes ${BOOTNODES} \
  --miner.etherbase ${ETHERBASE} \
  --miner.gaslimit ${GASLIMIT} \
  --syncmode full --gcmode archive \
  --allow-insecure-unlock
```
2. Restart Geth.

```
$ sudo systemctl stop geth
```

```
$ sudo systemctl start geth
```

Meanwhile, please input geth boot options [geth boot options, manual setup 7 start geth]/docs/hub-validator/operate-validator/1-2-build-validator-node).


3. Unlock IPC connected Wallet

You need to input `Validator Operator (Operator Account)` on `personal.unlockAccount`. 

```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc -exec 'personal.unlockAccount("0x1234....")'
```

4. Miner Restart

```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc -exec 'miner.start(1)'
```

5. Check geth status 

```
$ sudo systemctl status geth'
```

If you have **staked** more than 10Million token, and miner is working, you may see, 

```
Successfully sealed a new block 
```

OR, 


```
Commit new sealing block
```

If your miner status is not working, you may see

```
Block sealing failed
```
---
### Q5. I want to know the block sync status 

```
$ sudo -u geth /usr/local/bin/geth attach /home/geth/.ethereum/geth.ipc -exec 'eth.getBlockByNumber("0x0")'
```

You can figure out your genesis.json is the right file through the hash parameter.

For example, If you have installed v1.0.0, You will find following hash.

```
hash: "0x7027e4041ce0185f45aab280b852d49193f5adb0f728a0cb3846a9c9bbf4b7fe"
miner: "0x0000000000000000000000000000000000000000"
```

Each version has an original hash on the genesis block, `'eth.getBlockByNumber("0x0")'` allows you to check if you've installed the right version.


```
$ sudo -u geth /usr/local/bin/geth attach /home/geth/.ethereum/geth.ipc -exec 'eth.getBlockByNumber("latest")'
```

You can check the latest block hash with this. 

For example: 

```
hash: "0xec5497b5f3f72105dd720b627ef394fe6d0bc41ed542fc4ebda52f022f643125"
miner: "0xB6e607Fb81223C87DbCA06451594202A82C4D6eA"
```

You can check, `"0xec5497b5f3f72105dd720b627ef394fe6d0bc41ed542fc4ebda52f022f643125"` 's miner is `"0xB6e607Fb81223C87DbCA06451594202A82C4D6eA"`. 
If miner is displayed `"0x0000000000000000000000000000000000000000"`, you need to turn on miner. You can navigate onto [Q4. block validation](/docs/hub-validator/operate-validator/1-8-faq#q4-i-have-selected-no-on-do-you-want-to-start-block-validation-automatically-on-setupsh).


---
### Q6. Check Unit file.

You can check with the following unit file, make sure your unit file is written correctly.

```
Environment=DATA_DIR=/home/geth/.ethereum
Environment=NETWORK_ID=248
Environment=BOOTNODES=enode://1e68361cb0e761e0789c014acdbd2491f30176acf25480408382916632e58af1711d857c75be5917319d06049937e49c09ca51a28590e6ee22aceca1161fd583@3.113.207.39:30301,enode://24a55fd923d780213d15f5551bcbb7171343ef095512927d91baca3e7917124c679f894282eefec37350088b31c45a49bb28df790eb88f487ad60a9b6ccc8f3b@35.238.159.190:30301
Environment=ETHERBASE=YOUR OPERATOR ADDRESS HERE
Environment=PASSWORD=/home/geth/.ethereum/password.txt
Environment=GASLIMIT=30000000

ExecStart=/usr/local/bin/geth \
  --datadir ${DATA_DIR} \
  --networkid ${NETWORK_ID} \
  --bootnodes ${BOOTNODES} \
  --miner.etherbase ${ETHERBASE} \
  --miner.gaslimit ${GASLIMIT} \
  --mine --unlock ${ETHERBASE} --password ${PASSWORD} --allow-insecure-unlock \
  --syncmode full --gcmode archive
```

Please confirm that you have the following parameter. 

`--allow-insecure-unlock`

You need to enable unlocking, which allows unlocking with a password so the operator can sign blocks. 

`/home/geth/.ethereum/password.txt`

Make sure you have a password (used while making nodes, operator's password on setup.sh) which is non-encrypted.

`Environment=ETHERBASE=YOUR OPERATOR ADDRESS HERE`

Make sure you have your operator address in here.

---
### Q7. How can I check the commission I can claim?
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
### Q8. How can I check slashings?
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
### Q9. Exporting Ledger Private Key
You can navigate onto [ledger](https://support.ledger.com/hc/en-us/articles/4404388633489-Export-your-accounts?docs=true)