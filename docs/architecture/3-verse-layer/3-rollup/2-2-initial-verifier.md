# Instant Verifier

![Verifier](/img/docs/techdocs/verifier/verifier.png)

The Oasys Hub-layer uses Optimistic Rollup, and state commitments are published to the Hub-layer without any direct proof of the validity of these commitments. Instead, these commitments are considered pending for a while. If a proposed state commitment goes unchallenged for the duration of the challenge window (7 days by default), it is considered final. Once a commitment is considered final, smart contracts on the Hub-layer can safely accept that this commitment is proven to be correct based on Optimism.

When a state commitment is challenged, Optimistic rollups can invalidate it through a "fault-proof" (formerly known as a "fraud-proof" (opens new window) process. If the commitment is successfully challenged, it is removed from the `StateCommitmentChain` and replaced by another proposed commitment. It's important to note that a successful challenge does not roll back Optimism itself, only the published commitments about the chain's state. The ordering of transactions and the state of Optimism are unchanged by a fault-proof challenge.


## Instant Verifier

Since we at Oasys deemed that 7 days for confirming a comittment as final is a long time for users, it is possible to make instant approvals for verifiers by confirming between `origin state root` & `sequencer replica node`, which is confirmed by Hub-layer validators.
If the validators status is `true` for 50% or more validators, then instant verify can be done. 
