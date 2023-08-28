# Recover L1 Testnet chaindata
Currently Validator in L1 testnet can unintentionally break chaindata.

When the chaindata in L1 testnet is broken and block synchronization fails, you may see logs like the following in geth:
```shell
WARN [09-06|10:07:14.694] Synchronisation failed, dropping peer 
ERROR[09-06|10:08:19.785]
########## BAD BLOCK #########
...
```

In such a case, it is necessary to reacquire the correct chaidata and re-join as a validator.
To recover from this situation and rejoin as a validator, follow these steps.

## Recover L1 Testnet Validator chaindata
### Stop geth
```shell
systemctl stop geth
```

### Remove old chaindata
```shell
# Remove old chaindata
cd <YOUR_GETH_DATA_DIRECTORY>
rm -rf ./chaindata
```

### Get chain data
```shell
# In <YOUR_GETH_DATA_DIRECTORY>

# Get chaindata from backup
wget https://cdn.testnet.oasys.games/_validator/snapshot/chaindata.tgz
tar -xzvf chaindata.tgz -C .
rm -rf chaindata.tgz
```

### Restart your geth
```shell
systemctl start geth
```

## Check if your geth import block from others geth
To check if your geth is importing blocks from others, monitor your geth log using the following command:
```shell
journalctl -f -u geth
```

Look for the log line `Imported new chain segment` which indicates that your geth is importing blocks from other peers.
```shell
Aug 15 04:45:01: INFO [08-15|04:45:18.148] Looking for peers  
Aug 15 04:45:03: INFO [08-15|04:45:03.011] Imported new chain segment  
```

## Check if your geth has same chaindata as rpc
### Create shell script to check
Please create the following shell script as `check.sh` at your geth server.

```shell
BLOCK_NUMBER="${1:-latest}"

echo "block_number: $BLOCK_NUMBER"

LOCAL_HASH=$(curl -s -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["'$BLOCK_NUMBER'", false],"id":1}' -H "Content-Type: application/json" http://127.0.0.1:8545 | jq -r '.result.hash')
TESTNET_HASH=$(curl -s -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["'$BLOCK_NUMBER'", false],"id":1}' -H "Content-Type: application/json" https://rpc.testnet.oasys.games | jq -r '.result.hash')

if [ "$LOCAL_HASH" = "$TESTNET_HASH" ]; then
    echo "block_number hash is same as rpc"
else
    echo "block_number hash is different as rpc"
fi
```

### Check if your geth block is same as rpc
To check if your geth block has the same hash as the RPC, run the following commands:
```shell
# Check indicated block hash
sh check.sh 0x108dd6

# Check latest block hash
sh check.sh
```

