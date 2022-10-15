---
---

# About Validator Account 

Oasys is Using DPoS system. Validator accounts may be various. 

![wallet](/img/docs/techdocs/validator/wallet.jpg)

## Hub Layer

Hub layer it self is, having decentralized nodes with 15 seconds of block confirmation. While we are developing, we have noticed using private key multiple times running commands can be dangerous at the moment, and bad for operation. 

So, we have made two seperate account for who is involved in validator. 

| Type | Delegator | Owner |
|-----------|-----------|-----------|
| Stake| O | O |
| Claim | O | O | 
| CLI | O | O |
| Claim Commission | X | O |

### **Delegator** 

Delegator is delegator of token, who delegate assets onto owner, or builder account. 
Since delegator(hub) need to delegate token onto owner account, they can stake token onto owner account, and can receive tokens. 

### **Owner Account** 

The Owner account is the account used to register the Operator address with Staking Contract.In addition, Staker (stakers) will provide Owner address and deposit to Staking Contract. Owner it self don't have to interact excluding registering owner account. 
The Owner account is only used to sign transactions, so you can increase security by using a hardware wallet. And **there is no way to recover if you lost owner address**. 

### **Operator Account**

The Operator account is the account that the node(geth) uses to sign the block (the account created in Manual setup Step.6 in Hub layer node will be used).

There is a high risk of leakage because the **operator account private key must be placed on the node disk**.

Due to the separation of Owner and Operator accounts, even if Operator's private key is leaked, Owner can simply update the new Operator address in Staking Contract. Also, since Delegators or stakers stakes on owner account, there is no need for Stakers to change the staking destination.

## Verse Layer

Verse layer is using optimism, designed for high speed. Since we are using optimistic, we have three wallet address model for nodes, and deposits.

### **Builder Wallet**

Builder wallet is owner of Verse-Layer, users or operators can deoposit token onto builder wallet. 
Main purpose of builder wallet is having deposit wallet for verse gas fees. 

You can deploy verse by running `verse factory contract`, while you are running, you need to send **Sequencer Address** and **Proposer Address**, so you need to roll-up on specific address only. 

Since it's not active wallet and not used after running `verse factory contract`, you can store on safe wallet.

You can use wallet in: 

- Hard Wallet
- Multi-sig using other providers

*Please note that Multi-sig should be migrated on oasys prior on use. 

### **Sequencer Wallet**

Sequencer wallet is, used by **Sequencer Node** in optimism. Sequencer node it self are used by roll-up Verse-Layer's transaction to Hub-Layer. Sequencer address is written in Optimism contract in Hub-Layer, and roll-up can be done only on specific approved address for security. If key is leaked, builder need to update approved address on contract.  

### **Proposer Wallet**

Proposer wallet is, used by **Proposer Node** in optimism, Proposer node roll-up Verse layer's status root(Merkle Tree) onto Hub-Layer. 
Proposer wallet need to read block chain process, so it need to use hot wallet only. Proposer address is written in Hub-Layer's optimism contract, and allow approved address only. If key is leaked, builder need to update approved address on contract. 


## **Delegator**

Delegator can deligate tokens onto specific address. Delegator can stake onto Hub layer's owner's account or, Verse layer's Builder account. 
