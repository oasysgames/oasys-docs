---
---
# Hub- Layer
## Outline
The Hub-Layer is an EVM-Compatible public blockchain of Layer 1 in Oasys. The node implementation is based on a forked version of geth (Go Ethereum) with minimal modifications and adopts PoS (Proof of Stake) as the consensus algorithm. The public nature of blockchain operation is ensured by allowing users to become node operators (validators). In order to provide a stable blockchain network, in principle, application execution is left to the Verse-Layer. The Hub-Layer is restricted to limited uses for rolling up batches of transactions, FT/NFT management, managing bridge information, and so on. Exceptionally, some contracts may be deployed on the Hub-Layer via governance approval, but these are controlled by the governance, so the stability of the blockchain remains unaffected.

![L1&L2](/img/docs/techdocs/intro/l1.png)

## Mining
The Hub-Layer stores the data gathered on Oasys securely and in a stable manner, but doesn’t run applications directly. To ensure stable propagation of information to globally distributed nodes, blocks are generated every 6 seconds (Changed from 15s in Aug 2024) to avoid excessively short block times. Also, to avoid meaningless transaction execution, we will avoid excessively low gas costs and set an appropriate minimum gas cost. The goal is to achieve a minimum gas cost of approximately 1 cent per transfer, depending on the prevailing market price.

Block generation is performed by a node called the validator, which is selected by PoS (weighted random shuffling) based on the number of OAS tokens staked. A period of time called epoch is set every 5760 blocks (about one day). When the last block of each epoch is executed, the staking reward for the epoch is determined, and the next validator is determined (incorporation of a new validator or withdrawal of an existing validator). Validator information is managed by a special validator contract.

![Mining](/img/docs/whitepaper/technologies/mining.png)

## Validator
Anyone can become a validator as long as they have at least 10 million OAS staked through the validator contract. First, the validator candidate registers their address with the validator contract. Then the OAS token holders may stake towards any validator or validator candidate’s address, and will also be able to unstake at any time. Staking and unstaking are reflected in the last block of this epoch. A validator candidate can become a validator from the next epoch by declaring itself as a validator and having 10 million OAS or more staked to its address. Conversely, if the total amount of staking falls below 10 million OAS, the validator will be automatically dropped from the next epoch.

The validator signs signatures using the registered address for block signing. If a validator is out of service for some reason, the next validator performs the block generation work that the validator has failed to do. The staking reward is determined at each epoch based on the operation time of the validator. For example, if the validator has been inactive for a long time, it will not be eligible to earn staking rewards. However, the staked OAS will not be harmed. If a validator fails to generate blocks more than a threshold number of times, it will be considered inactive and excluded from block generation.

### Double Signing
Double signing (i.e., signing two different blocks at the same height) is a critical malicious behavior by validators. Validators caught doing this are penalized and jailed for 3 slots (=3 days).

#### Detection
To detect double signing, use the [--monitor.doublesign](https://github.com/oasysgames/oasys-validator/blob/v1.7.6/cmd/utils/flags.go#L1138-L1142) flag on the oasys-validator node. When enabled, and a double sign is detected, the following log entry will be printed:

```log
2025-06-19 10:58:47.388 | WARN [06-19|01:58:47.388] found a double sign header               number=484 first_hash=c200cd..30f26b first_miner=0xXX.. second_hash=e61beb..d9db65 second_miner=0xXX..
2025-06-19 10:58:47.388 | WARN [06-19|01:58:47.388] double sign header content               header1=0xXX.. header2=0xXX..
```

#### Slashing a Malicious Validator
To slash a malicious validator, submit the evidence to the on-chain contract.

Specifically, call the [submitDoubleSignEvidence](https://github.com/oasysgames/oasys-genesis-contract/blob/v1.8.0/contracts/SlashIndicator.sol#L47) function of the SlashIndicator contract using the data captured in the log.

## Smart Contract
Deployment of new smart contracts to the Hub-Layer is not allowed by design. Only smart contracts accepted by Oasys will be deployed. Transaction execution can be done by paying gas in OAS. Accepted smart contracts are those related to FT/NFT, Rollup, and Bridge.

## Fast Finality
Unlike Ethereum, where finality can take up to 15 minutes, our finality is achieved in just 30 seconds. This means developers and users no longer need to rely on deep block depth confirmations; simply check if the block is finalized. We've integrated this [finalizer mechanism from BSC](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md) to deliver this enhanced performance.

### Malicious Vote
Validators who submit malicious votes are subject to sanctions. Any misbehaving validator will be jailed for 1 slot (=1 day).

#### Detection
To detect malicious voting behavior, enable the [--monitor.maliciousvote](https://github.com/oasysgames/oasys-validator/blob/v1.7.6/cmd/utils/flags.go#L1156-L1160) flag on the oasys-validator node. When such behavior is detected, the following log will be printed:
```log
2025-06-19 10:59:20.030 | WARN [06-19|01:59:20.029] MaliciousVote                            evidence="{\"VoteA\":{\"SrcNum\":490,\"SrcHash\":\"XX..\",\"TarNum\":491,\"TarHash\":\"XX..\",\"Sig\":\"XX..\"},\"VoteB\":{\"SrcNum\":490,\"SrcHash\":\"XX..\",\"TarNum\":491,\"TarHash\":\"XX..\",\"Sig\":\"XX..\"},\"VoteAddr\":\"XX..\"}"
```

#### Slashing a Malicious Validator
To slash a malicious validator, submit the evidence to the on-chain contract.

Specifically, call the [submitFinalityViolationEvidence](https://github.com/oasysgames/oasys-genesis-contract/blob/v1.8.0/contracts/SlashIndicator.sol#L94) function of the SlashIndicator contract using the data captured in the log.
