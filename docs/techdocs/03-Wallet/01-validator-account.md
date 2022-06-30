---
sidebar_position: 1
sidebar_label: Validator Account
---

## About Validator Account 

Oasys is Using PoS system、 which is having two different account type for validators.

**Owner Account** <br>
**Operator Account**

The Operator account is the account that the node(geth) uses to sign the block (the account created in Manual setup Step.6 in Hub layer node will be used).

There is a high risk of leakage because the operator account private key must be placed on the node disk.
    
The Owner account is the account used to register the Operator address with Staking Contract.In addition, Staker (stakers) will provide Owner address and deposit to Staking Contract.

The Owner account is only used to sign transactions, so you can increase security by using a hardware wallet.
    
Due to the separation of Owner and Operator accounts, even if Operator's private key is leaked, Owner can simply register the new Operator address in Staking Contract.
Also, there is no need for Stakers to change the staking destination.