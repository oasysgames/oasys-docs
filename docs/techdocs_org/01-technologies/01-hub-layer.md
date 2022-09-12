---
sidebar_position: 1
---

# Hub-Layer

## Outline
The Hub-Layer is an EVM-compatible public blockchain of Layer 1 in Oasys. The node implementation is based on a forked version of geth (Go Ethereum) with minimal modifications, and adopts PoS (Proof of Stake) as the consensus algorithm. The public nature of blockchain operation is ensured by allowing users to become node operators (validators). In order to provide a stable environment for blockchain use, application execution is left to the Verse-Layer, and the Hub-Layer is restricted to limited uses for recording rollup information, managing FT/NFT, and managing bridge information. Smart contracts cannot be deployed directly on Hub-Layer.

## Mining
Hub-Layer stores the data gathered on Oasys securely and in a stable manner, not to run applications directly. To ensure stable propagation of information to globally distributed nodes, blocks are generated every 15 seconds to avoid excessively short block generation times. Also, to avoid meaningless transaction execution, we will avoid excessively low gas costs and set an appropriate minimum gas cost. The goal is to achieve a minimum gas cost of approximately 1 cent per transfer, depending on the prevailing market price.

Block generation is performed by a node called the validator, which is selected by PoS (weighted random shuffling) based on the number of OAS tokens staked. A period of time called epoch is set every 5760 blocks (about one day). At the time the last block of each epoch is executed, the staking reward for the epoch is determined and the next validator is determined (incorporation of a new validator or withdrawal of an existing validator). Validator information is managed by a special validator contract.

There are two types of rewards for validators: commission fees and gas fees. The staking reward is calculated based on the target ARR, of which the validator earns a fee based on the commission rate. Gas fee is handled in the same way as EIP-1559, following Ethereum.

## Validator
Anyone can become a validator as long as they have at least 10 million OAS staking through the validator contract. First, the validator candidate registers his or her address with the validator contract. Then the OAS token holders may stake any validator or validator candidate address, or unstake at any time. Stake and unstake are reflected in the last block of this epoch. A validator candidate can become a validator from the next epoch by declaring itself as a validator with its address staking 10 million OAS or more. Conversely, if the total amount of staking falls below 10 million OAS, the validator will be automatically dropped from the next epoch.

The validator signs signatures using the registered address for block signing. If a validator is out of service for some reason, the next validator performs the block generation work that the validator has failed to do. The staking reward is determined at each epoch based on the operation time of the validator. For example, if the validator has been inactive for a long time, the staking reward cannot be earned. However, the staked OAS will not be harmed. If a validator fails to generate blocks more than a threshold number of times, it will be considered inactive and excluded from block generation.

## Smart Contract
Deployment of new smart contracts is not allowed. Only smart contracts approved by Oasys will be deployed. Transaction execution can be done by paying gas at OAS. Accepted smart contracts are those related to FT/NFT, Rollup, and Bridge.