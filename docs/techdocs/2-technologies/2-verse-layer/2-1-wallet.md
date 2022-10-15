---
---

# Wallet

## **Builder Wallet**

Builder wallet is owner of Verse-Layer, users or operators can deoposit token onto builder wallet. 
Main purpose of builder wallet is having deposit wallet for verse gas fees. 

You can deploy verse by running `verse factory contract`, while you are running, you need to send **Sequencer Address** and **Proposer Address**, so you need to roll-up on specific address only. 

Since it's not active wallet and not used after running `verse factory contract`, you can store on safe wallet.
You can use wallet in hard wallet that can support, EVM compatible chain.

Also, Verse deposit on builder wallet can be done by other Delegator, it doesn't have to be wallet provider is having full token for a building verse. 

## **Sequencer Wallet**

Sequencer wallet is, used by **Sequencer Node** in optimism. Sequencer node it self are used by roll-up Verse-Layer's transaction to Hub-Layer. Sequencer address is written in Optimism contract in Hub-Layer, and roll-up can be done only on specific approved address for security. If key is leaked, builder need to update approved address on contract.  

## **Proposer Wallet**

Proposer wallet is, used by **Proposer Node** in optimism, Proposer node roll-up Verse layer's status root(Merkle Tree) onto Hub-Layer. 
Proposer wallet need to read block chain process, so it need to use hot wallet only. Proposer address is written in Hub-Layer's optimism contract, and allow approved address only. If key is leaked, builder need to update approved address on contract. 


## **Delegator**

Delegator can deligate tokens onto specific address. Delegator can stake onto Hub layer's owner's account or, Verse layer's Builder account. 
