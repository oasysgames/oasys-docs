# Join Validator to PoS (CLI & Web)

## Flow Checklist

Please refer to the [**Checklist for Validators**](/docs/hub-validator/operate-validator/1-2-build-validator-node#validator-node-operation) to review the entire process.

1. Join the validator to the PoS consensus using either the CLI or the Web interface.
2. Stake or delegate **10,000,000 OAS** to activate the validator node.
3. Check the validation status in the next epoch.

||Web|CLI|
|---------|----------|----------|
|Stake|O|O|
|Stake with Hard wallet|O|O (Need to export Private key)|
|Check reward|O|O|
|Claim reward|O|O|
|Check commissions|❌|O|
|Claim commissions|O|O|


## Join Validator to PoS (Web)

### Participating in PoS using the Web Interface
Before participating in PoS, ensure that you have completed the steps to build a validator node as outlined in [Building a Validator Node (Geth)](/docs/hub-validator/operate-validator/1-2-build-validator-node).

You can join the validator to the PoS network through the [tools-fe](https://tools-fe.oasys.games/join-validator) web site.

### 1. Connect Your Validator Owner Wallet
Start by logging in with your Validator owner account via MetaMask.
Ensure that your network is set to Oasys Mainnet (Testnet is not supported at the moment).

**Mainnet**

|      Title      | Value                              |
|-----------------|------------------------------------|
| ChainID         | 248                                |
| Currency Symbol | OAS                                |
| RPC             | https://rpc.mainnet.oasys.games/   |


After connecting your wallet, you will see your Validator owner address.
![connect_wallet](/img/docs/tech/joinvalidator/connect_wallet.png)

### 2. Register the Validator Operator
Enter the Validator Operator (operator address) and click on **Register**.
The operator address is generated in the previous validator node building section. For Express Setup users, it can be found [here](/docs/hub-validator/operate-validator/1-2-build-validator-node#4-start-setupsh), and for manual users, it can be found [here](/docs/hub-validator/operate-validator/1-2-build-validator-node#5-generate-a-secret-key-for-geth).

You will receive a success message upon completion.
![join](/img/docs/tech/joinvalidator/join_validator.png)

#### Update Operator
Enter the new Validator Operator address and click on **Update**.
You will receive a success message upon completion.
![join_update](/img/docs/tech/joinvalidator/join_validator_update.png)

### 3. Staking
To stake OAS, you have two options: staking via [Oasys Hub](https://hub.oasys.games/staking) or using a command-line tool called [oasys-pos-cli](/docs/hub-validator/operate-validator/1-3-join-validator#4-staking). Oasys Hub is a web User Interface, making it much easier to use. However, it currently only supports a limited number of web wallets, such as Metamask. On the other hand, the command-line tool allows you to use any wallet, as it can intake an exported private key.

As for Oasys Hub, once your validator node is registered, it will be listed on the Staking page. **Even if you're not yet listed, you can still stake**. Just input your validator's owner address in the search bar. As long as your validator has joined the network, the staking screen for your validator will appear.

![staking](/img/docs/tech/oasys-hub/staking.png)

## Join Validator to PoS (CLI)

### Participating in PoS using CLI
Before participating in PoS, you need to complete building a validator at [Build Validator Node (geth)](/docs/hub-validator/operate-validator/1-2-build-validator-node)

We highly recommend using the [Join Validator to PoS (WEB)](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-web).

### Download CLI Tool

To run the Staking Contract, please download the CLI tool from Github:
https://github.com/oasysgames/oasys-pos-cli/releases

    
### 1. Create Owner Account

To create a private key for the Owner account, use the following command. If you already have an account, you can skip this step. For more details, refer to [Wallet](/docs/architecture/hub-layer/validator-account).
    
```sh
$ oaspos crypto:create-account
```
The following output will be displayed:

```sh
Address : 0x0123456789abcdef...
Key     : 0x0123456789abcdef0123456789abcdef...
```

### 2. Obtain OAS
Before staking tokens, ensure that you have sufficient gas fees. If you lack gas, and you want your validator to join Oasys Testnet PoS, you can obtain tokens from the [faucet](https://faucet.testnet.oasys.games/).

:::note Testnet Issue
As of now, it is not possible to join as a validator on the testnet. We apologize for the inconvenience caused, and we plan to remove this restriction in the near future. Additionally, not only validators but also full nodes are unable to sync with the testnet. We are actively working on resolving this issue and expect to address it after the release of the next new testnet version. Thank you for your understanding and patience.
:::

### 3. Register as a Validator
You can register your validator owner address and validator operator address to the Staking Contract using the CLI tool. Alternatively, you can use the tools-fe (WEB) interface as mentioned in the instructions above.

The operator address is generated in the previous validator node building section. For Express Setup users, it can be found [here](/docs/hub-validator/operate-validator/1-2-build-validator-node#4-start-setupsh), and for manual users, it can be found [here](/docs/hub-validator/operate-validator/1-2-build-validator-node#5-generate-a-secret-key-for-geth).

#### 3.1. Export Validator Owner Private Key
First, export your validator owner's private key as follows:
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

#### 3.2. Joining as a Validator
Use the following command to join as a validator:
```bash
$ oaspos validator:join --network testnet --operator 0x0123456789abcdef...
```
Upon successful completion, you will see the following output:
```bash
sending (tx: 0x0123456789abcdef)...: success with 130999 gas
```
The validator:join command registers your validator onto the staking contract. Once you have successfully registered, you will see your validator in Oasys Hub.

### 4. Staking
To become a validator, the validator owner must possess more than 10,000,000 OAS.
To stake your OAS tokens, you must export your validator owner's (Owner account) private key first:
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```
Next, execute the staking command with the appropriate parameters:
```bash
$ oaspos staker:stake \
  --network mainnet \
  --validator Owner Account Address \
  --oas 10000000
```
If you are staking sOAS, use the following parameter:
```bash
$ oaspos staker:stake \
  --network mainnet \
  --validator Owner Account Address \
  --soas 10000000
``` 
    
### 5. Confirming Staking
To confirm your staking status, export your validator owner's private key:
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```
After staking, you can check the staking status with the following command:
```bash
$ oaspos validator:info --network testnet
```
The output will look like this:
```bash
Balance               : 9 OAS
Status                : active
Operator Address      : 0x0123456789abcdef...
Commission Rate       : 10 %
Commissions           : 0 Wei
Jailed Epoch          : 0
Current Epoch Staking : 0 Wei
Next Epoch Staking    : 10,000,000 OAS
```
Please note that it may take up to one epoch (approximately **1 day**) for the staking process to be fully completed.

:::note Note
Currently, we highly recommend a commission rate of 10% on the mainnet. We don't want validators to compete based on low commission rates. Instead, we encourage competition through game development. This is why we are not advocating for differences in commission rates.
:::

### 6. Check Node Operation
You can check the node status with the following command:
```bash
$ sudo systemctl status geth
```

### 7. Update Operator
To update the operator, you need to export your validator owner's private key:
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```
You can update the operator using one of the following methods:
```bash
$ oaspos validator:update-operator \
  --network mainnet \
  --operator 0x0123456789abcdef...
```
or
```bash
$ oaspos validator:update-operator \
  --rpc https://rpc.mainnet.oasys.games/ \
  --chain-id 248 \
  --operator 0x0123456789abcdef...
```
Please choose the method that suits your requirements.

