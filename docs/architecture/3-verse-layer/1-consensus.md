---
---

# Consensus Logic on Verses 

The Verse Layer uses optimism to employ optimistic rollups.
Optimistic Rollups take advantage of their parent chain's consensus mechanism (like PoW or PoS) instead of providing their own.

Since the Hub Layer, which is the parent chain of the Verse, uses a PoS consensus mechanism, the Verse Layer also uses a PoS consensus mechanism to process transactions and preserve the state.

When an optimistic rollup is performed, the Verse transaction data is also inserted into the Hub Layer.
Since the Hub Layer unconditionally accepts the Verse Layer's transactions, a period called the "challenge window" is set to verify the transaction data received from the Verse Layer.
