# Join Validator to PoS (CLI & Web) 

## Flow checklist

Please check [**Checklist for validator**](/docs/hub-validator/operate-validator/1-2-build-validator-node#validator-node-operation) to see whole process.

1. Join Validator with PoS or Web to participate blockchain consensus
2. Stake or delegate **10,000,000 OAS to activate validator node
3. Check status of validation on next epoch

||Web|CLI|
|---------|----------|----------|
|Stake|O|O|
|Stake with Hard wallet|O|O (Need to export Private key)|
|Check reward|O|O|
|Claim reward|O|O|
|Check commissions|X|O|
|Claim commissions|O|O|


## Join Validator to PoS (WEB)

### Participating PoS using Web
Before participating in PoS, You have to complete building a validator at [Build Validator Node (geth)](/docs/hub-validator/operate-validator/1-2-build-validator-node)

You can join validator to PoS at [tools-fe](https://tools-fe.oasys.games/join-validator).

### 1. Connect Validator owner wallet
First, Login with the Validator owner via metamask.

Check that your network is Oasys Mainnet(We do not support testnet now).

**Mainnet**

|                 |                                    |
|-----------------|------------------------------------|
| ChainID         | 248                                |
| Currency Symbol | OAS                                |
| RPC             | https://rpc.mainnet.oasys.games/   |


After connecting the  wallet, you can see the Validator owner address. 
![connect_wallet](/img/docs/tech/joinvalidator/connect_wallet.png)

### 2. Register Validator operator
Input Validator Operator(operator address) and press **Register**.

You will see a success message after doing this.
![join](/img/docs/tech/joinvalidator/join_validator.png)

### Update Operator
Input the new validator operator address and press **Update**.

You will see a success message after doing this.
![join_update](/img/docs/tech/joinvalidator/join_validator_update.png)

### 3. Staking
There's no staking function in [tools-fe](https://tools-fe.oasys.games/join-validator).
You have to stake via [oasys-pos-cli](/docs/hub-validator/operate-validator/1-3-join-validator#4-staking) or [Oasys Hub](https://hub.oasys.games/). 



## Join Validator to PoS (CLI)

### Participating PoS using CLI
Before participating in PoS, you have to complete building a validator at [Build Validator Node (geth)](/docs/hub-validator/operate-validator/1-2-build-validator-node)

And we recommend to [participate PoS using WEB](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-web).

### Download CLI Tool

To run the Staking Contract, Please download the CLI tool from Github.
    
https://github.com/oasysgames/oasys-pos-cli/releases

    
### 1. Create owner account

Create a private key for the Owner account.
If you already have an account, you can skip this step. 
You can find details in [Wallet](/docs/architecture/hub-layer/validator-account).
    
```
$ oaspos crypto:create-account
```
And following output will show up. 

```
Address : 0x0123456789abcdef...
Key     : 0x0123456789abcdef0123456789abcdef...
```

### 2. Obtain OAS
You may need gas fees to stake tokens. So Please check that you have sufficient gas. 

If not and you want your validator to join oasys testnet PoS, you can go to [faucet](https://faucet.testnet.oasys.games/) to obtain tokens.

### 3. Register as a Validator
Using CLI Tool, You must register your validator Owner address, validator Operator Address to Staking Contract.

You can use tools-fe(WEB) instead CLI.

#### 3.1. Export Validator Owner private key 

You must export validator owner(Owner account)'s Key. 
    
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

#### 3.2. Joining as a validator 
```bash
$ oaspos validator:join --network testnet --operator 0x0123456789abcdef...
```

If you successfully done, following output will show up. This means you are done with joining.
```bash
sending (tx: 0x0123456789abcdef)...: success with 130999 gas
```

validator:join command registers onto staking contract.
If you successfully registered, you may see in Oasys Hub.

### 4. Staking
You must export validator owner(Owner account)'s Key. 
Validator owner has to possess more than 10000000 OAS.
    
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```


```bash
$ oaspos staker:stake \
  --network mainnet \
  --validator Owner Account Address \
  --oas 10000000
```

If it's sOAS, you can input sOAS in parameter.
```bash
$ oaspos staker:stake \
  --network mainnet \
  --validator Owner Account Address \
  --soas 10000000
``` 
    
### 5. Confirming Staking
You must export validator owner(Owner account)'s Key. 
    
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

After your staking is done, You may check Staking Status with following command : 
    
```bash
$ oaspos validator:info --network testnet
```
And Following output will come out.

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
    
To fully done staking, you must wait for 1 Epoch to be run on blockchain, which is approx 1 day. 


:::note Note

Currently, we highly recommend a commission rate of 10% on the mainnet. We don't want validators to compete based on low commission rates. Instead, we encourage competition through game development. This is why we are not advocating for differences in commission rates.

:::

### 6. Check node operation. 
Checking Node Status:
```bash
$ sudo systemctl status geth
```

### 7. Update Operator. 
You must export validator owner(Owner account)'s Key. 
```bash
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

Two ways can be done with CLI. 

```bash
$ oaspos validator:update-operator \
  --network mainnet \
  --operator 0x0123456789abcdef...
```


```bash
$ oaspos validator:update-operator \
  --rpc https://rpc.mainnet.oasys.games/ \
  --chain-id 248 \
  --operator 0x0123456789abcdef...
```
