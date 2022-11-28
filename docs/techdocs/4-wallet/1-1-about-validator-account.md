---
---

# About Validator Account 

Oasys is Using the DPoS system. Validator accounts may be various. 

![wallet](/img/docs/techdocs/validator/wallet.jpg)

## Hub Layer

The Hub layer has decentralized nodes with 15 seconds of block confirmation. While developing, we have noticed that using the private key multiple times running commands can be dangerous at the moment and bad for operation. 

So, we have made two separate accounts for who is involved in a validator. 


| Type | Delegator | Owner |
|-----------|-----------|-----------|
| Stake| O | O |
| Claim | O | O | 
| CLI | O | O |
| Claim Commission | X | O (Upto Validator's commission) |

On initial validators: The Delegator must pay a commission to the Validator Owner.
- If 1000 OAS is staked, and 10% APY is for validation, the reward would be 100 OAS.
- If the commission rate is 10%, the owner takes 10% of the delegated stake.
- So Owner receives 10OAS, Delegator takes 90OAS.

The owner can stake himself also. 

### **Delegator** 

The delegator is the token's delegator, who delegates assets to the Validator owner or builder account. 
Since the delegator(hub) can delegate tokens to the owner account, they can stake tokens onto the owner account and receive tokens.

Validator Owner (Owner Account) can use same address with Delegator(self delegating).
L2 Owner can use same address with Delegator(self delegating).

### **Validator Owner (Owner Account)** 

The Owner account is the account used to register the Operator address with Staking Contract. In addition, Staker will provide the Owner address and deposit to Staking Contract. Therefore, the Owner doesn't have to interact, excluding registering the Owner's account. 
The Owner account is used to sign transactions, so you can increase security using a hardware wallet. And **there is no way to recover if you lost the Owner's address**. 

### **Validator Operator (Operator Account)**

The Operator account is the account the node(geth) uses to sign the block (the account created in Manual setup Step.6 in the Hub layer node ).

There is a risk of leakage because the **operator account's private key must be placed on the node disk**.

Due to the separation of Owner and Operator accounts, even if Operator's private key is leaked, the Owner can update the new Operator address in Staking Contract. Also, since Delegators or stakes are on the Owner's account, there is no need for Stakers to change the staking destination.

## Verse Layer

The verse layer uses optimism, designed for high speed. Since we are using optimistic, we have three wallet address models for nodes and deposits.

| Type | Verse Deposit | Gas fee |
|-----------|-----------|-----------|
| L2 Owner| Required to deposit 1 million OAS Token by anyone | X |
| L2 Sequencer | X | Gas Fee Required to Rollup Verse's TX | 
| L2 Proposer | X | Gas Fee Required to Rollup Verse's TX  |

### **L2 Owner**

L2 Owner is the Owner of Verse-Layer. Users or verse operators can `deposit` tokens onto the L2 Owner. 
The primary purpose of the L2 Owner is to have a deposit wallet for verse gas fees. 

You can deploy verse by running `verse factory contract`.However, while running, you need to send **Sequencer Address** and **Proposer Address**, so you need to roll up on specific addresses only. 

Since it's not an active wallet and not used after running the 'verse factory contract`, you can store it in a safe wallet.

You can use a wallet in: 

- Hard Wallet

*Please note that Multi-sig should deploy on Oasys before use. 

### **L2 Sequencer**

L2 Sequencer is, used by **Sequencer Node** in optimism. Roll-up Verse-Layer's transaction uses the sequencer node itself to Hub-Layer. The sequencer address is written in the Optimism contract in Hub-Layer, and roll-up can be done only on specifically approved addresses for security. The builder must update the approved address on the contract if a key is leaked.  

### **L2 Proposer**

L2 Proposer is used by **Proposer Node** in optimism, Proposer node roll-up Verse layer's status root(Merkle Tree) onto Hub-Layer. 
A L2 Proposer needs to read block chain process, so it only needs to use a hot wallet. The proposer address is written in Hub-Layer's optimism contract and allows approved addresses only. The builder must update the approved address on the contract if the private key leaks. 

