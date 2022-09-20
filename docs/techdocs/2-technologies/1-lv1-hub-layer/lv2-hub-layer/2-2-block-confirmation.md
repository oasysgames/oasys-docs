---
---

# Block Confirmation

## Mining
Hub-Layer stores the data gathered on Oasys securely and in a stable manner, not to run applications directly. To ensure stable propagation of information to globally distributed nodes, blocks are generated every 15 seconds to avoid excessively short block generation times and get stability. Also, to avoid meaningless transaction execution, we will avoid excessively low gas costs and set an appropriate minimum gas cost. The goal is to achieve a minimum gas cost of approximately 1 cent per transfer, depending on the prevailing market price.

Block generation is performed by a node called the validator, which is selected by PoS (weighted random shuffling) based on the number of OAS tokens staked. A period of time called epoch is set every 5760 blocks (about one day). At the time the last block of each epoch is executed, the staking reward for the epoch is determined and the next validator is determined (incorporation of a new validator or withdrawal of an existing validator). Validator information is managed by a special validator contract.

There are two types of rewards for validators: commission fees and gas fees. The staking reward is calculated based on the target ARR, of which the validator earns a fee based on the commission rate. Gas fee is handled in the same way as EIP-1559, following Ethereum.