---
---

# About Validator Account 

<!-- TRANSLATE: Not sure what is meant by 'Validator accounts may be various' -->
Oasys is Using the DPoS system. Validator accounts may be various. 

![wallet](/img/docs/techdocs/validator/wallet.png)

## Hub Layer

The Hub layer has decentralized nodes with 15 seconds of block confirmation time. During the development, we have noticed that currently using the private key multiple times running commands can be dangerous and bad for operations. 

So we have made two separate accounts for who is involved in validating. 


| Type | Delegator | Owner |
|-----------|-----------|-----------|
| Stake| O | O |
| Claim | O | O | 
| CLI | O | O |
| Claim Commission | X | O (Upto Validator's commission) |

On initial validators: The Delegator must pay a commission to the Validator Owner.
- If 1000 OAS is staked, and 10% APY is for validation, the reward would be 100 OAS.
- If the commission rate is 10%, the owner takes 10% of the delegated stake.
- So the Owner receives 10OAS, Delegator takes 90OAS.

The owner can stake themselves also. 

### **Delegator** 

The delegator is the token's delegator, who delegates assets to the Validator owner or builder account. 
Since the delegator (hub) can delegate tokens to the owner account, they can stake tokens onto the owner account and receive tokens.

The Validator Owner (Owner Account) can use the same address as the Delegator (self delegating).
L2 Owners can use the same address as the Delegator (self delegating).

### **Validator Owner (Owner Account)** 

The Validator owner is the account used to register the Operator address with the Staking Contract. In addition, the Staker will provide the Validator owner's address and deposit to the Staking Contract. Therefore, the Validator owner doesn't have to interact with it, excluding registering the Validator owner's account. 
The Validator owner account is used to sign transactions, so you can increase security by using a hardware wallet. And **there is no way to recover if you lost the Owner's address**. 

### **Validator Operator (Operator Account)**

The Operator account is the account the node (geth) uses to sign the block (the account created through manual setup Step 6 in the Hub layer node).

There is a risk of leakage because the **operator account's private key must be placed on the node disk**.

Due to the separation of Owner and Operator accounts, even if the Operator's private key is leaked, the Owner can update the new Operator address in the Staking Contract. Also, since Delegators or stakes are on the Owner's account, there is no need for Stakers to change the staking destination.
