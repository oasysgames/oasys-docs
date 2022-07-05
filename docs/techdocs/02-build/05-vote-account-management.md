---
sidebar_position: 6
sidebar_label: Validator Account
---

# Validator Account

## Participating POS
    
## Download CLI Tool

To run the Staking Contract, Please download CLI tool in Github.
    
    https://github.com/oasysgames/oasys-pos-cli/releases

    
## 1. Making owner account

Create a private key for the Owner account.
We are working on hardware wallet support.
    
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
    
### `--operator` Account Setting

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

### Export Private Key 
    
```
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

### Joining as a validator 
    
```
$ oaspos validator:join --network testnet --operator 0x0123456789abcdef...
```
    
If you successfully done, following output will show up. This means you are done with joining.
```
sending (tx: 0x0123456789abcdef)...: success with 130999 gas
```
    
## 4. Balance Required

To be a Hub-Layer Validator, Staking 10M OAS Token is required. 
    
    
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