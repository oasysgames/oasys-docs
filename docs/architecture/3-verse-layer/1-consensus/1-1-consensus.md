# Consensus Logic on Verse 

Verse Layer uses optimism to employ optimistic rollups.
Optimistic Rollups take advantage of their parent chain's consensus mechanism (like PoW or PoS) instead of providing their own.

Since Hub Layer, the parent chain of Verse, uses PoS consensus mechanism, Verse Layer also uses PoS consensus mechanism to process transactions and preserve the state.

When an optimistic rollup is performed, the Verse transaction data  is also inserted into Hub Layer.
Since Hub Layer unconditionally accepts the Verse Layer's transactions, a period called the "challenge window" is set to verify the transaction data received from Verse Layer.
