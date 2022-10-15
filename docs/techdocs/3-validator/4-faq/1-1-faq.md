---
---

# FAQ

## Node Setup

### Q1. Validator Header not found
    
On Hub layer manual setup Step.8, you may see lots of following error. There is no problem, so please ignore them.

ERROR[05-30|09:57:30.102] Failed to get validators in=Snapshot.apply hash=d069bc..ef6390 number=97920 err="header for hash not found"
    
### Q2. Block sync command result `false` 

```
$ sudo -u geth /usr/local/bin/geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
```

On Manual Setup Step 9 or Using this command, You can see command result `false` when block sync is done

After synced, whenever you receive a new block from another Validator, you will see a log similar to the following:

INFO [05-30|10:00:52.359] Imported new chain segment blocks=1 txs=0 mgas=0.000 elapsed=2.138ms mgasps=0.000 number=105,080 hash=9e2e47..97dbb5 dirty=0.00B

### Q3. Restore Public key& Address

You can run python 3 script, with following commands : 

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

### Q4. I have selected No on Do you want to start block validation automatically? on setup.sh

Since you have selected automatic block validation, 
Block miner status is `off`, so you need to turn on.

1. in systemd unit file please add geth start option `--alow-insecure-unlock`

```
ExecStart=$INSTALL_PATH \
  --datadir ${DATA_DIR} \
  --networkid ${NETWORK_ID} \
  --bootnodes ${BOOTNODES} \
  --miner.etherbase ${ETHERBASE} \
  --miner.gaslimit ${GASLIMIT}$SYSTEMD_OPTS \
  --syncmode full --gcmode archive \
  --allow-insecure-unlock
```


2. Unlock IPC connected Wallet

```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc -exec 'personal.unlockAccount("0x1234....")'
```

3. Miner Restart

```
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc -exec 'miner.start(1)'
```

4. Check geth status 

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


### Exporting Ledger Private Key

You can navigate onto [ledger](https://support.ledger.com/hc/en-us/articles/4404388633489-Export-your-accounts?docs=true)



## Faucet 

Testnet:

https://faucet.testnet.oasys.games/


