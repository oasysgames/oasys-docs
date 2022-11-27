# Build Validator Node (Join)

---
---

## Participating POS using CLI

---   
## Download CLI Tool

To run the Staking Contract, Please download CLI tool in Github.
    
https://github.com/oasysgames/oasys-pos-cli/releases

    
## 1. Making owner account

Create a private key for the Owner account.
If you already have account, you can skip this. 
You can find details in [Wallet](/docs/techdocs/wallet/1-2).
    
```
$ oaspos crypto:create-account
```
And following output will show up. 

```
Address : 0x0123456789abcdef...
Key     : 0x0123456789abcdef0123456789abcdef...
```

## 2. Obtaining OAS From Faucet

You may need gas fees to stake tokens. So Please check you have sufficient gas. If not, you can go to faucet to obtain tokens.

https://faucet.testnet.oasys.games/
    
## 3. Register as a Validator
    
Using CLI Tool, You must register your Address to Staking Contract.
    
`PRIVATE_KEY` is for Enviornment Settings, Please Use Password of Owner's Account.

If you have used express setup, you can skip 3.1.
    
### 3.1. `--operator` Account Setting

You can make account if not having one : 
```
$ sudo -u geth geth account new
```

You can see Account Data If you making it : 

```
Your new key was generated
    
Public address of the key:   0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
Path of the secret key file: /home/geth/.ethereum/keystore/UTC--2022-03-14T12-11-06.835917424Z--abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
```

Please Set the geth address with selected address on Secret file : 

### 3.2. Export Private Key 

You must export validator owner(Owner account)'s Key. 
    
```
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

### 3.3. Joining as a validator 

You cna use [Web Join](/docs/techdocs/validator/hub-layer-client-join/1-2)
    
```
$ oaspos validator:join --network testnet --operator 0x0123456789abcdef...
```
    
If you successfully done, following output will show up. This means you are done with joining.
```
sending (tx: 0x0123456789abcdef)...: success with 130999 gas
```

validator:join command registers onto staking contract.
If you successfully registered, you may see in Oasys Hub.

## 4. Staking


You can use [oasys hub](/docs/techdocs/validator/stakinghub/1-1) instead.

```
$ export PRIVATE_KEY=Token holder's(Delegator's)address
```


```
$ oaspos staker:stake \
  --mainnet
  --validator Owner Account Address \
  --oas 10000000
```

If it's sOAS, you can input sOAS in parameter.
```
$ oaspos staker:stake \
  --mainnet
  --validator Owner Account Address \
  --soas 10000000
``` 
    
## 5. Confirming Staking

After your staking is done, You may check Staking Status with following command : 
    
```
$ oaspos validator:info --network testnet
```
And Following output will come out.

```
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

## 6. Check node operation. 

```
$ sudo systemctl status geth
```
Run to know geth status.

If you found 




## 7. Update Operator. 

First, you need to expxort private key. 
```
$ export PRIVATE_KEY=Owner Account Private Key
```

Two ways can be done with CLI. 
And we are building web it can be done on online later.

```
$ oaspos validator:update-operator \
  --mainnet \
  --operator 0x0123456789abcdef...
```


```
$ oaspos validator:update-operator \
  --rpc https://rpc.mainnet.oasys.games/ \
  --chain-id 248 \
  --operator 0x0123456789abcdef...
```

---
## Participating POS using Web

---

While you are running a command on [join:validator](/docs/techdocs/validator/hub-layer-client-join/1-1#3-register-as-a-validator):

```
$ oaspos validator:join --network mainnet --operator 0x0123456789abcdef...
```

If you are using CLI, you need to export private key, which takes time. 
So we have prepared command execution web, made with web3.js. 


[join validator web](https://oasys-pos-fe-git-fix-joinvalidator-oasys.vercel.app/)

--- 

![join1](/img/docs/techdocs/joinvalidator/1.png)

First, Login via metamask. 

Check your network is Oasys Mainnet(We do not support testnet now).

**Mainnet**
|-----------------|------------------------------------|
| ChainID         | 248                                |
| Currency Symbol | OAS                                |
| RPC             | https://rpc.mainnet.oasys.games/   |


![join2](/img/docs/techdocs/joinvalidator/2.png)

After login, you may see Validator Operator(operator address). 

input **Validator Operator(operator address)** and press **Register**.


![join3](/img/docs/techdocs/joinvalidator/3.png)

You will see successful if you are done.