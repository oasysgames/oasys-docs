---
sidebar_position: 1
---
# 5-1. Hub- Layer
## Outline
The Hub-Layer is an EVM-Compatible public blockchain of Layer 1 in Oasys. The node implementation is based on a forked version of geth (Go Ethereum) with minimal modifications and adopts PoS (Proof of Stake) as the consensus algorithm. The public nature of blockchain operation is ensured by allowing users to become node operators (validators). In order to provide a stable blockchain network, in principle, application execution is left to the Verse-Layer. The Hub-Layer is restricted to limited uses for rolling up batches of transactions, FT/NFT management, managing bridge information, and so on. Exceptionally, some contracts may be deployed on the Hub-layer by Oasys-approved EOAs. However, these EOAs are limited to partners vetted by Oasys, thereby ensuring the stability of the blockchain.

![L1&L2](/img/docs/techdocs/intro/l1.png)

## Mining
The Hub-Layer stores the data gathered on Oasys securely and in a stable manner, but doesn’t run applications directly. To ensure stable propagation of information to globally distributed nodes, blocks are generated every 15 seconds to avoid excessively short block times. Also, to avoid meaningless transaction execution, we will avoid excessively low gas costs and set an appropriate minimum gas cost. The goal is to achieve a minimum gas cost of approximately 1 cent per transfer, depending on the prevailing market price.

Block generation is performed by a node called the validator, which is selected by PoS (weighted random shuffling) based on the number of OAS tokens staked. A period of time called epoch is set every 5760 blocks (about one day). When the last block of each epoch is executed, the staking reward for the epoch is determined, and the next validator is determined (incorporation of a new validator or withdrawal of an existing validator). Validator information is managed by a special validator contract.

![Mining](/img/docs/whitepaper/technologies/mining.png)

## Validator
Anyone can become a validator as long as they have at least 10 million OAS staked through the validator contract. First, the validator candidate registers their address with the validator contract. Then the OAS token holders may stake towards any validator or validator candidate’s address, and will also be able to unstake at any time. Staking and unstaking are reflected in the last block of this epoch. A validator candidate can become a validator from the next epoch by declaring itself as a validator and having 10 million OAS or more staked to its address. Conversely, if the total amount of staking falls below 10 million OAS, the validator will be automatically dropped from the next epoch.

The validator signs signatures using the registered address for block signing. If a validator is out of service for some reason, the next validator performs the block generation work that the validator has failed to do. The staking reward is determined at each epoch based on the operation time of the validator. For example, if the validator has been inactive for a long time, it will not be eligible to earn staking rewards. However, the staked OAS will not be harmed. If a validator fails to generate blocks more than a threshold number of times, it will be considered inactive and excluded from block generation.

## Smart Contract
Arbitrary deployment of new smart contracts to the Hub-Layer is not allowed by design. Instead, only the Oasys and Oasys-approved EOAs are permitted to deploy new smart contracts. Transaction execution can be done by paying gas in OAS.
