---
---

# N Suite

## Login to N Suite 
![N Suite](/img/docs/techdocs/nsuite/1.png)

First, loginto [N Board](https://board.nsuite.io), and select Workflow, New Request and Contract method. 

---
## Joining


### Select Method(Join POS)

![N Suite](/img/docs/techdocs/nsuite/2.png)

Select StakeManager, Oasys is for a Mainnet, Oasys Testnet is for a Testnet.

![N Suite](/img/docs/techdocs/nsuite/join.png)

Select joinValidator(address) if you want to run `$oaspos validator:join` command in N Suite.

### Select Stake Manager

![N Suite](/img/docs/techdocs/nsuite/4.png)

Please input, Title of Request, Message for Request, Duedate in advance.
Please `approve sOAS token` use before staking it. 

If there is no method for approve sOAS, please contact N Suite team. 

On Execution details, Please input [Validator Operator](/docs/architecture/hub-layer/validator-account#validator-operator-operator-account) in `operator(address)`.


For confirming operator address, run following command on validator pc.

```
$ sudo -u geth /usr/local/bin/geth attach ipc:/home/geth/.ethereum/geth.ipc -exec eth.accounts
```

## Staking

### Approve sOAS 

If you are using sOAS, you need to approve token. 

![N Suite](/img/docs/techdocs/nsuite/soas.png)

Select sOAS.

![N Suite](/img/docs/techdocs/nsuite/approve.png)

Select Approve

![N Suite](/img/docs/techdocs/nsuite/spend.png)

On `Spender`, please input `0x0000000000000000000000000000000000001001`

### Select Method(Stake)

![N Suite](/img/docs/techdocs/nsuite/2.png)

Select StakeManager, Oasys is for a Mainnet, Oasys Testnet is for a Testnet.

![N Suite](/img/docs/techdocs/nsuite/stake.png)

Select stake(address,uint8,uint256) if you want to run `$oaspos staker:stake` command in N Suite.

### Select Stake Manager

![N Suite](/img/docs/techdocs/nsuite/stake2.png)

Please input, Title of Request, Message for Request, Duedate in advance.
On Execution details, Please input 

- input data [Validator owner address](/docs/architecture/hub-layer/validator-account#validator-owner-owner-account)

You can use owner address previously sent to foundation.

- token (uint8)

| Type | token number |
|-----------|-----------|
| OAS| 0 |
| WOAS| 1 |
| sOAS| 2 |


- amount (uint256)

Amount you want to stake. 

If you are inputing 1.5 OAS, please input: 

```
1500000000000000000
```

## Updating Bridge Contract
Update the your Verse's bridge contract deployed on the Hub-Layer.

Estimated working time is 30-60 minutes.

### 1. Get contract address
You will get the address of the bridge contract on [this page](https://tools-fe.oasys.games/check-verse).

1. Press the `Connect` button to establish a connection with Metamask.
1. Switch the network on Metamask to the `Oasys Mainnet`. If not registered, please register from the [chainlist.org](https://chainlist.org/chain/248).
1. Enter the Chain ID of your Verse in the form and press the `Get Verse Info` button.

If the Chain ID is correct, the Verse information will be displayed, so please note the address of `L1ERC721Bridge`.

<img src="/img/docs/techdocs/nsuite/20230613-verse-info.jpg" width="600" />

### 2. Register custom contract
Register the ERC721 bridge as a custom contract in N Suite.

- Name: ***YOUR_VERSE_NAME*** / L1ERC721Bridge
- Address: The address obtained in the previous step.
- Network: Select the `Oasys`.

If the address is correct, the `ABI` will be automatically filled in.

For example:
<img src="/img/docs/techdocs/nsuite/20230613-register-bridge.jpg" width="600" />

### 3. Run Workflow
Create a new workflow. Select `Contract Method > Standard method execution` for the workflow type.

- Network: Select the `Oasys`.
- From Address: Select the address used for the Verse build (It is referred to as `Verse Builder` or `Verse Owner`).
- Contract: The custom contract registered in the previous step.
- Method: Select the `setCode(bytes)`.
- `Input data > _code(bytes)`: Please copy and paste the `deployedBytecode` of [this file](https://github.com/oasysgames/oasys-optimism/blob/5186190c3250121179064b70d8e2fbd2d0a03ce3/packages/contracts/artifacts/contracts/oasys/L1/messaging/L1ERC721BridgeV2.sol/L1ERC721BridgeV2.json#L276) from beginning to end without any mistakes.

For example:
<img src="/img/docs/techdocs/nsuite/20230613-workflow.jpg" width="600" />

Run the workflow after input is complete.

### 4. Check result
Check if the contract has been successfully updated.

```shell
# Enter the address of the bridge contract.
BRIDGE_ADDRESS=''

RPC_URL='https://rpc.mainnet.oasys.games/'

STORAGE_SLOT='0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'

IMPLEMENTATION_ADDRESS=$(curl -s $RPC_URL \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0", "method":"eth_getStorageAt", "params":["'$BRIDGE_ADDRESS'", "'$STORAGE_SLOT'", "latest"], "id":1}' \
| jq -rM .result | echo 0x$(cut -c27-))

curl -s $RPC_URL \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0", "method":"eth_getCode", "params":["'$IMPLEMENTATION_ADDRESS'", "latest"], "id":1}' \
| jq -rM .result | md5
```

If the MD5 hash of the contract code is `e73f4d4d142012e33f4860478c935965`, the update has been successfully completed.
