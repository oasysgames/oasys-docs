---
---

# Validator Account

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

### Delegator (Staking OAS)
The delegator is an individual who delegates (=stakes) their assets to the validator owner. Since delegators can delegates tokens directly to the owner account through [multiple methods](/docs/staking/stake-oasys/1-1-stake), they can deposit their tokens and, in return, receive rewards.

It's worth noting that the validator owner can use their own address for staking, a process known as self-delegating.

### Validator Owner
The validator owner serves as the unique identity of the Validator. It's fixed, meaning you cannot switch or replace it. As such, it's the address that Delegators (those who stake OAS to your node) identify validator during the staking process.

Routine interactions are limited to 'joining as a Validator`, 'claiming commission rewards', and 'updating the operator'. Since the Validator owner account is used to sign transactions for these operations, using a hardware wallet is advisable for added security. Crucially, **if you lose access to the Owner's address, it is irretrievable**.

### Validator Operator
The Operator account is essential for the operation of the Validator node. Specifically, this account signs blocks. During the Validator Node program's startup, the operator private key typically resides on the same disk as the Validator node.

Thanks to the distinction between the Owner and Operator accounts, if the Operator's private key is ever compromised, the Owner can easily update to a new Operator address. Moreover, since Delegators (those who stake OAS) rely on the Owner's account, there's no need for Stakers to modify their staking target.
