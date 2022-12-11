# Join Validator to PoS (CLI)

## Participating PoS using CLI
Before participating PoS, You have to complete building validator at [Build Validator Node (geth)](/docs/hub-validator/operate-validator/1-2-build-validator-node)

And we recommend to [participate PoS using WEB](/docs/hub-validator/operate-validator/1-6-join-validator-web).

### Download CLI Tool

To run the Staking Contract, Please download CLI tool in Github.
    
https://github.com/oasysgames/oasys-pos-cli/releases

    
### 1. Create owner account

Create a private key for the Owner account.
If you already have account, you can skip this. 
You can find details in [Wallet](/docs/tech/wallet/1-2).
    
```
$ oaspos crypto:create-account
```
And following output will show up. 

```
Address : 0x0123456789abcdef...
Key     : 0x0123456789abcdef0123456789abcdef...
```

### 2. Obtain OAS
You may need gas fees to stake tokens. So Please check you have sufficient gas. 

If not and you want your validator to join oasys testnet PoS, you can go to [faucet](https://faucet.testnet.oasys.games/) to obtain tokens.

### 3. Register as a Validator
Using CLI Tool, You must register your validator Owner address, validator Operator Address to Staking Contract.

You can use [oasys-pos-fe(WEB)](/docs/hub-validator/operate-validator/1-6-join-validator-web) instead CLI.

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
Commission Rate       : 0 %
Commissions           : 0 Wei
Jailed Epoch          : 0
Current Epoch Staking : 0 Wei
Next Epoch Staking    : 10,000,000 OAS
```
    
To fully done staking, you must wait for 1 Epoch to be run on blockchain, which is approx 1 day. 

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
