# Verse Verifier
The Verse Verifier implements our unique mechanism, [Instant Verify](/docs/architecture/verse-layer/rollup/2-1-instant-verifier), designed to expedite L2 withdrawals. Originally, Optimistic Rollups required a 7-day waiting period for L2 withdrawals. By validating the L2 state with our L1 validator sets, we are able to bypass this waiting period.

## About
Instant Verifier of Verse-Layer for the Oasys Blockchain.

- Verify the rolluped state by Verse-Layer to the Hub-Layer, create signature and share with other verifiers via P2P.

- The verifier is also **verified by the Hub-Layer validator** and can finalize rollups by collecting signatures for 51% or more of total stake amount and submitting it to the verification contract.

- Verification of rollup state, P2P node, and submission of signatures to verification contracts can be used individually.

- All Hub Layer Validator need to install a Verse Verifier.

:::info Info

The Instant Verifier requires at least one Replica node of Verse node, which must be operated by someone other than the Verse Builder. The Replica node validates all the transactions coming from the Verse mode. The Instant Verifier refers to this Replica node to verify the Verse's integrity.

Oasys can serve as a Replica node operator. If you'd like us to operate a replica node, please submit your request by filling out the form:
[To use instant verifier in verse(Mainnet)](https://docs.google.com/forms/d/e/1FAIpQLSd21GXYp7c8LS-crUVTHZkaDBuEzDZfxJl78Zgb4Ejd7Dybjg/viewform)
:::

## Setup Verifier
Please refer to the `Activate Verse Verifier` section in our [verse-layer-opstack](https://github.com/oasysgames/verse-layer-opstack)
