# Staking

Epochとは何か
Epoch単位でStakerとValidatorにそれぞれ報酬が出ることを解説
報酬の原資は新規発行であることも明記
DelegatorとStakerが同一であることも解説
Delegatorに対するValidatorの選定アドバイス
OASYS Hubへの誘導も行う

## Validator

Anyone can become a validator as long as they have at least 10 million OAS staking through the validator contract. First, the validator candidate registers his or her address with the validator contract. Then the OAS token holders may stake any validator or validator candidate address, or unstake at any time. Stake and unstake are reflected in the last block of this epoch. A validator candidate can become a validator from the next epoch by declaring itself as a validator with its address staking 10 million OAS or more. Conversely, if the total amount of staking falls below 10 million OAS, the validator will be automatically dropped from the next epoch.

The validator signs signatures using the registered address for block signing. If a validator is out of service for some reason, the next validator performs the block generation work that the validator has failed to do. The staking reward is determined at each epoch based on the operation time of the validator. For example, if the validator has been inactive for a long time, the staking reward cannot be earned. However, the staked OAS will not be harmed. If a validator fails to generate blocks more than a threshold number of times, it will be considered inactive and excluded from block generation(jail).

## Epoch

Epoch normally means the number of times the entire dataset has been learned. In every Epoch, Staker(Delegator), and Validator will take the stake reward. 
**Every Epoch is calculated with 5760 blocks** in the Oasys chain, and **each block creation time on Hub layer is fixed at 15 seconds**, so it takes almost 1 day. 
This may be delayed little by little depending on the network delay, and at the end of this Epoch, the settlement will be made with Staking Contract. 
If more than the amount of your token is needed for the Validator, one Staking person should leave it to the Validator because validating is not possible. 
We've decided to call it the Delegator, and by delegating it to the Validator, the Validator will instead belly-date the token and receive the Staking Reward. 
Staking Reward is available from Staking Contract, which requires a direct claim. 
In the case of Delegator, you can choose whomever you want to Delegate. Delegation is also possible to one or more Validators. A validator can take a commission from Staking Reward by validating with a delegation from Delegator.

## Easy Staking 

You can participate staking with [oasys hub](https://hub.oasys.games)
