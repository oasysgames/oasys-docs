---
---

# Verse Accounts

### **L2 Owner**

L2 Owner is the Owner of the Verse-Layer. Users or operators can `deposit` tokens onto the L2 Owner. 
The primary purpose of the L2 Owner is to have a deposit wallet for verse operations and to manage the L2 Sequencer and L2 Proposer.

You can deploy a verse by running the `verse factory contract`. However, while running, you need to send **Sequencer Address** and **Proposer Address**, so you need to roll up on specific addresses only.

Since it's not an active wallet and not used after running the `verse factory contract`, you can store it in a safe wallet.
If you want, you can use a wallet, a hardware wallet, or a Multi-sig wallet.

### **L2 Sequencer**
The L2 Sequencer is used by the **Sequencer Node** in optimism. Also well known as a `Canonical transfer chain`.**Sequencer Node** roll-up Verse-Layer's data to Hub-Layer. The sequencer address is written in the Optimism contract in the Hub-Layer, and the Verse operator's L2 Sequencer can only do a roll-up on specifically approved security addresses. The L2 Owner must update the approved address on the contract if a key is leaked.

### **L2 Proposer**

The L2 Proposer is used by the **Proposer Node** in optimism. The Proposer node rolls-up the Verse Layer's status root(Merkle Tree) onto the Hub-Layer. 
An L2 Proposer needs to read the block chain process, so it only needs to use a hot wallet. The proposer address is written in the Hub-Layer's optimism contract and allows approved addresses only. The L2 Owner must update the approved addresses on the contract if the private key leaks. 

### **L2 Message Relayer**
The L2 Message Relayer is used by the **Relayer Node** in optimism. The Relayer node relay messages between L1 and L2. Messaging is mainly used in token bridges, but can also be used in your applications. Untrusted third parties can run the Relayer node because the contract verifies the message body. However, due to the cost of gas, it is generally run by the Verse owner.
