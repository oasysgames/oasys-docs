# FAQ

### Q. How much gas is consumed when rolling up a transaction to Hub Layer(L1)?
In our experiment of rolling up 1000 ERC20 transfer transactions, the total gas consumed was 2.7 million. If the gas price is 1.5 Gwei, the total gas cost is 0.004 OAS (calculated as 2.7M gas * 1.5 Gwei).

:::note Note
The consumed gas is the sum of 2 rollups
- Transaction data rollup = 1.3 M
- StateRoot rollup = 1.4 M
:::

---

### Q. How to Replace an Old Verse Node with a New Verse Node?
We highly recommend migrating to a new node by switching from the old writable node to an already synced read-only node.

If you want to create a new Verse node, you first have to set up the new node as a read-only full node. Once it's caught up with the new block, you can stop the old node and then change the read-only node to writable (making it the New Verse node).

Please refer to [this section](/docs/verse-developer/how-to-build-verse/1-7-read-node#promoting-replica-node) for instructions on promoting a replica node.

