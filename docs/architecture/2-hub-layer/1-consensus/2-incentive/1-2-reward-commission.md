# Reward / Commission

## How block reward is made
Block Reward have two different details.

1. Gas used on Block
Gas used on Block means if you are a Validator and you have created Block, you will receive a gas fee used on Block. For example, if 50OAS used gas fee on Block, you would receive approx 50OAS(Subject to EIP-1559 Standard). Therefore, the Validator operator receives a gas fee on Block.

2. Validation Reward(Operation Reward)
Since Gas used on Block can not stimulate the ecosystem and motivate validators to secure our network, we have a reward for validators who participated in each epoch. In addition, Delegator and Validator Owner receive a reward. Validation Reward(Operation Reward) is calculated at the end of each epoch, and you can see a timer in the Oasys Staking.

## Staking Reward & Commission

Staking reward is to stimulate user staking and reward for contributing stabilisation in a network.

||staking reward| Staking commission|
|-----------|-----------|-----------|
|Receiver| Delegator | Validator Owner|
|Details| Receives amount after paying interest to Validator owner | Receives commission for operating nodes |

A reward is calculated daily basis.

## Jail 

Low-performance Validators make the network unstable, so we made temporary jail for validators who are on low performance.
If a validator doesn't make successful block sealing for a day, we exclude it from the POS system and change it to Jailed status. 
While Jailed status, the validator can't receive a Validation Reward(Operation Reward) for one epoch(approx one day).
On the Current status, without the Low-performance ban, you can claim a Validation Reward(Operation Reward) of approx 10% APY for validating on Oasys.

Example: 
- Operation ratio is bad on epoch 20, 
- Jail since : 21
- Jail Until : 22

Validator can not claim or participate validator for approx 2 days.
