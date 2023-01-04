# Join Validator to PoS (WEB)

## Participating PoS using Web
Before participating PoS, You have to complete building validator at [Build Validator Node (geth)](/docs/hub-validator/operate-validator/1-2-build-validator-node)

You can join validator to PoS at [oasys-pos-fe](https://tools-fe.oasys.games/validator).

### 1. Connect Validator owner wallet
First, Login with the Validator owner via metamask.

Check your network is Oasys Mainnet(We do not support testnet now).

**Mainnet**

|                 |                                    |
|-----------------|------------------------------------|
| ChainID         | 248                                |
| Currency Symbol | OAS                                |
| RPC             | https://rpc.mainnet.oasys.games/   |


After connecting wallet, you can see Validator owner address. 
![connect_wallet](/img/docs/tech/joinvalidator/connect_wallet.png)

### 2. Register Validator operator
Input Validator Operator(operator address) and press **Register**.

You will see a successful message if you have done.
![join](/img/docs/tech/joinvalidator/join_validator.png)

### Update Operator
Input new validator operator address and press **Update**.

You will see a successful message if you have done.
![join_update](/img/docs/tech/joinvalidator/join_validator_update.png)

### 3. Staking
There no staking function in [oasys-pos-fe](https://tools-fe.oasys.games/validator).
You have to stake via [oasys-pos-cli](/docs/hub-validator/operate-validator/1-3-join-validator-cli#4-staking)