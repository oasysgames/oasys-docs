---
---

# Block Confirmation

## Mining
Hub-Layer stores the data gathered on Oasys securely and in a stable manner, not to run applications directly. To ensure stable information propagation to globally distributed nodes, blocks are generated every 15 seconds to avoid short block generation times and stability. Also, to avoid meaningless transaction execution, we will prevent meagre gas costs and set a reasonable minimum gas cost. The goal is to achieve a minimum gas cost of approximately 1 cent per transfer, depending on the prevailing market price.

Block generation is performed by a node called the validator, selected by PoS (weighted random shuffling) based on the number of OAS tokens staked. An epoch period is every 5760 blocks (about one day). When the last block of each epoch is executed, the staking reward for the epoch is determined, and the next validator is determined (incorporation of a new validator or withdrawal of an existing validator). A particular validator contract manages validator information.

There are two rewards for validators: commission fees and gas fees. The staking reward is calculated based on the target ARR, of which the validator earns a fee based on the commission rate. A gas fee is handled similarly to EIP-1559, following Ethereum.


## How block reward is made 

Block Reward have two different details. 

### 1. Gas used on Block

Gas used on Block means if you are a Validator and you have created Block, you will receive a gas fee used on Block. 
If 50OAS used gas fee on Block, you would receive approx 50OAS(Subject to EIP-1559 Standard). 
[Validator operator](/docs/techdocs/wallet/1-1-about-validator-account) receive gas fee on block. 

### 2. Validation Reward(Operation Reward)

Since Gas used on Block can not stimulate the ecosystem and motivate validators to secure our network, we have a reward for validators who participated in each epoch. 
Delegator and Validator Owner receives reward. 
Validation Reward(Operation Reward) is calculated at the end of each epoch, and you can see a timer in [oasys hub](https://hub.oasys.games)

## Jail 

Low-performance Validators make the network unstable, so we made temporary jail for validators who are on low performance.
If a validator doesn't make successful block sealing for a day, we exclude it from the POS system and change it to Jailed status. 
While Jailed status, the validator can't receive a Validation Reward(Operation Reward) for one epoch(approx one day).
On the Current status, without the Low-performance ban, you can claim a Validation Reward(Operation Reward) of approx 10% APY for validating on Oasys.
