# Joining as a Validator
Becoming a validator is essentially registering your node as a potential validator. Through the joining process, your validator owner and operator keys are registered.

For an understanding of the distinctions between the owner and operator, please consult the [Validator Account](/docs/architecture/hub-layer/validator-account#validator-owner) section for more details.

Please note that it may take up to one epoch (approximately **1 day**) for the staking process to be fully completed.

In terms of timing, you can undertake the joining process at any point, even before setting up your node (as discussed in the previous node build section). However, it's essential to remember that staking is not possible without first joining. Hence, the correct order is to join and then stake.

For details on staking, please refer to the [staking section](/docs/staking/stake-oasys/1-1-stake). Staking processes are the same for general users. Please note that in order to become a validator, the validator owner must be staked a minimum of 10,000,000 OAS.

:::note Note
Currently, we highly recommend a validator reward rate of 10% on the mainnet. We don't want validators to compete based on low validator reward rates. Instead, we encourage competition through game development. This is why we are not advocating for differences in validator reward rates.
:::

We offer three methods for joining, as described below:
1. [Web(tools-fe)](/docs/hub-validator/operate-validator/join-validator#webtools-fe)
    - Ideal for those who prefer a user-friendly UI.
2. [CLI Tool](/docs/hub-validator/operate-validator/join-validator#cli-tool)
    - Suitable for those who prefer using the command-line interface.
    - Note that the Web(tools-fe) above currently supports only a limited number of wallets, such as MetaMask. If you have an unsupported wallet, but it can extract your wallet details, you can process using this tool.
3. [Contract Direct Calling](/docs/hub-validator/operate-validator/join-validator#contract-direct-calling)
    - For those who use NSuite or prefer to use bare-bone contract direct calling, please refer to the bottom section on this page.

<!-- As a brief note, let us outline the support status of related tasks for each method.
||Web|CLI|Contract|
|---------|----------|----------|
|Stake|O|O|O|
|Stake with Hard wallet|O|O (Need to export Private key)|O|
|Check reward|O|O|O|
|Claim reward|O|O|O|
|Check commissions|O|O|O|
|Claim commissions|O|O|O| -->

---

## Web(tools-fe)
Join the PoS network as a validator using the [tools-fe](https://tools-fe.oasys.games/join-validator) web interface.

### 1. Connect to Your Validator Owner Wallet
First, sign in with your **Validator owner account** using MetaMask. Make sure your network is set to Oasys Mainnet (currently, Testnet is not supported).

**Mainnet**

|      Title      | Value                              |
|-----------------|------------------------------------|
| ChainID         | 248                                |
| Currency Symbol | OAS                                |
| RPC             | https://rpc.mainnet.oasys.games/   |


Once you've connected your wallet, your Validator owner address will be displayed.
![connect_wallet](/img/docs/tech/joinvalidator/connect_wallet.png)

### 2. Register the Validator Operator
Input the Validator Operator's address and click **Register**.
If you followed the Express Setup, you would have generated the operator address in the earlier validator node building steps. You can find the details [here](/docs/hub-validator/operate-validator/build-validator-node#4-start-setupsh). For those who opted for the manual setup, the details are available [here](/docs/hub-validator/operate-validator/build-validator-node#5-generate-a-secret-key-for-geth).


Once completed, you'll see a confirmation message indicating success.
![join](/img/docs/tech/joinvalidator/join_validator.png)

### Updating the Operator
You can update the operator address at any time. Regularly rotating your operator address is recommended to enhance security.

Input the new Validator Operator address and select **Update**.
Once successfully updated, a confirmation message will be displayed.
![join_update](/img/docs/tech/joinvalidator/join_validator_update.png)

### Staking
Please refer to the [staking](/docs/staking/stake-oasys/1-1-stake) section for more details.

For Validators who wish to stake using the Oasys Hub (Web) and haven't been listed yet, it's essential to note. **Even if you're not yet listed, you can still stake**. Just input your validator's owner address in the search bar. As long as your validator has joined the network, the staking screen for your validator will appear.
![staking](/img/docs/tech/oasys-hub/staking.png)

---

## CLI Tool
You can download the CLI tool from our GitHub repository:
https://github.com/oasysgames/oasys-pos-cli/releases

### 1. Create an Owner Account
Execute the command below to generate a private key for the Owner account. If you already possess an account, you may bypass this step.
```sh
$ oaspos crypto:create-account
```
The following output will be displayed:
```sh
Address : 0x0123456789abcdef...
Key     : 0x0123456789abcdef0123456789abcdef...
```

### 2. Obtain OAS
Before joining, make sure you have enough OAS to cover the gas fees.

<!-- If you lack gas, and you want your validator to join Oasys Testnet PoS, you can obtain tokens from the [faucet](https://faucet.testnet.oasys.games/).

:::note Testnet Issue
As of now, it is not possible to join as a validator on the testnet. We apologize for the inconvenience caused, and we plan to remove this restriction in the near future. Additionally, not only validators but also full nodes are unable to sync with the testnet. We are actively working on resolving this issue and expect to address it after the release of the next new testnet version. Thank you for your understanding and patience.
::: -->

### 3. Register as a Validator
The operator address is generated in the previous validator node building section. For Express Setup users, it can be found [here](/docs/hub-validator/operate-validator/build-validator-node#4-start-setupsh), and for manual users, it can be found [here](/docs/hub-validator/operate-validator/build-validator-node#5-generate-a-secret-key-for-geth).

#### 3.1. Export Validator Owner Private Key
First, export your validator owner's private key as follows:
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

#### 3.2. Joining as a Validator
Use the following command to join as a validator:
```bash
$ oaspos validator:join --network mainnet --operator 0x0123456789abcdef...
```
Upon successful completion, you will see the following output:
```bash
sending (tx: 0x0123456789abcdef)...: success with 130999 gas
```
The `validator:join` command enrolls your validator with the staking contract.

### 3.2 Confirm Your Registration
Verify your registration using the `validator:info` command. If successful, you'll see the following output:
```sh
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

### Update Operator
You can update the operator address at any time. Regularly rotating your operator address is recommended to enhance security.

To update the operator, you need to export your validator owner's private key:
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```
You can update the operator using one of the following method:
```bash
$ oaspos validator:update-operator \
  --network mainnet \
  --operator 0x0123456789abcdef...
```

---

## Contract Direct Calling
[StakeManager.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/StakeManager.sol) is the contract with which you will interact. This contract has been deployed at the address `0x0000000000000000000000000000000000001001` in both mainnet and testnet.

For users who need the ABI, please find it [here](https://github.com/oasysgames/oasys-genesis-contract/blob/main/artifacts/contracts/StakeManager.sol/StakeManager.json#L5).


### 1. Joining
The interface for the joining function is as follows:
- operator: Address of the operator
```solidity
function joinValidator(
    address operator
) external;
```

The operator address is generated in the previous validator node building section. For Express Setup users, it can be found [here](/docs/hub-validator/operate-validator/build-validator-node#4-start-setupsh), and for manual users, it can be found [here](/docs/hub-validator/operate-validator/build-validator-node#5-generate-a-secret-key-for-geth).

It's important to note that the specified address is not the owner address, but rather the operator address. When registering the owner address, **the sender of this transaction automatically becomes the owner**.

### 2 Confirm Your Registration
The interface for getting validator information is as follows:
- validator: The address of the `owner`
- epoch: The epoch for which you want to check the validator's status. It's recommended to set it to `0`.
```solidity
function getValidatorInfo(
    address validator,
    uint256 epoch # If set to `0`, the latest epoch will be used automatically.
) external;
```
It's crucial to specify the owner's address, not the operator's. Since this is a read-only transaction, you won't incur any gas fees; it's always free. Additionally, the sender is not restricted; any account will suffice.

### Update Operator
You can update the operator address at any time. Regularly rotating your operator address is recommended to enhance security.

The interface for the update function is as follows:
- operator: Address of the operator
```solidity
function updateOperator(
    address operator
) external
```

It's important to note that **the sender of the transaction should be the owner**.
