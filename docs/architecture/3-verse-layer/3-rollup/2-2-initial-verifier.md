# Instant Verifier

![Verifier](/img/docs/techdocs/verifier/verifier.png)

Oasys Hub-layer uses Optimistic Rollup, and state commitments are published to Hub-layer without any direct proof of the validity of these commitments. Instead, these commitments are considered pending for a while. If a proposed state commitment goes unchallenged for the duration of the challenge window (7 days in default), it is considered final. Once a commitment is considered final, smart contracts on Hub-layer can safely accept proof of the state of Optimism based on that commitment.

When a state commitment is challenged, Optimistic rollup can invalidate it through a "fault-proof" (formerly known as a "fraud-proof" (opens new window) process. If the commitment is successfully challenged, it is removed from the `StateCommitmentChain` and replaced by another proposed commitment. It's important to note that a successful challenge does not roll back Optimism itself, only the published commitments about the chain's state. The ordering of transactions and the state of Optimism are unchanged by a fault-proof challenge.


## Instant Verifier

Since, oasys found that 7 days for confirming as a final makes long time due for users, making instant approval for verifier by confirming between `origin state root` & `sequencer replica node`, which is confirmed by Hub-layer validators.
If 50% or more validators status is `true`, then instant verify can be done. 
