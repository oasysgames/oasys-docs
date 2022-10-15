---
---

# Block Confirmation

## Mining
Hub-Layer stores the data gathered on Oasys securely and in a stable manner, not to run applications directly. To ensure stable information propagation to globally distributed nodes, blocks are generated every 15 seconds to avoid short block generation times and stability. Also, to avoid meaningless transaction execution, we will prevent meagre gas costs and set a reasonable minimum gas cost. The goal is to achieve a minimum gas cost of approximately 1 cent per transfer, depending on the prevailing market price.

Block generation is performed by a node called the validator, selected by PoS (weighted random shuffling) based on the number of OAS tokens staked. An epoch period is every 5760 blocks (about one day). When the last block of each epoch is executed, the staking reward for the epoch is determined, and the next validator is determined (incorporation of a new validator or withdrawal of an existing validator). A particular validator contract manages validator information.

There are two rewards for validators: commission fees and gas fees. The staking reward is calculated based on the target ARR, of which the validator earns a fee based on the commission rate. A gas fee is handled similarly to EIP-1559, following Ethereum.
