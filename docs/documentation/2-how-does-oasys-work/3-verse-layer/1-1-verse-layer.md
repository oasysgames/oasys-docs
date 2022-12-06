# How the Verse Layer work?

必要なエンティティ　（Sequencer, Proposer）

Deposit

Sequencer

Proposer

それぞれの動きを解説


### **L2 Owner**

L2 Owner is the Owner of Verse-Layer. Users or operators can `deposit` tokens onto the L2 Owner. 
The primary purpose of the L2 Owner is to have a deposit wallet for verse operation and managing L2 Sequencer and L2 Proposer.

You can deploy verse by running `verse factory contract`.However, while running, you need to send **Sequencer Address** and **Proposer Address**, so you need to roll up on specific addresses only.

Since it's not an active wallet and not used after running the 'verse factory contract`, you can store it in a safe wallet.
You can use a wallet in hard wallet, or Multi-sig wallet if you want.

### **L2 Sequencer**

L2 Sequencer is, used by **Sequencer Node** in optimism. Also well known as a `Canonical transfer chain`. It roll-up Verse-Layer's transaction uses the sequencer node itself to Hub-Layer. The sequencer address is written in the Optimism contract in Hub-Layer, and roll-up can be done only on specifically approved addresses for security. L2 Owner must update the approved address on the contract if a key is leaked.

### **L2 Proposer**

L2 Proposer is used by **Proposer Node** in optimism, Proposer node roll-up Verse layer's status root(Merkle Tree) onto Hub-Layer. 
A L2 Proposer needs to read block chain process, so it only needs to use a hot wallet. The proposer address is written in Hub-Layer's optimism contract and allows approved addresses only. L2 Owner must update the approved address on the contract if the private key leaks. 
