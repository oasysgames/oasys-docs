# Staking

## Validator

Anyone can become a validator if they have at least 10 million OAS staking through the validator contract. First, the validator candidate registers their address with the validator contract. Then the OAS token holders may stake any validator or validator candidate address or unstake at any time. Stake and unstake are reflected in the last block of this Epoch. A validator candidate can become a validator from the next Epoch by declaring itself a validator with its address staking 10 million OAS or more. Conversely, if the total amount of staking falls below 10 million OAS, the Validator will be automatically dropped from the next Epoch.

The validator signs signatures using the registered address for block signing. If a validator is out of service for some reason, the next Validator performs the block generation work that the Validator has failed to do. The staking reward is determined at each Epoch based on the operation time of the Validator. For example, if the Validator has been inactive for a long time, the inactive Validator cannot earn the staking reward. However, the staked OAS will not be harmed. If a validator fails to generate blocks more than a threshold number of times, it will be considered inactive and excluded from block generation(jail).

## Epoch

Epoch typically means the number of times the entire dataset has been learned. In every Epoch, Staker(Delegator) and Validator will take the stake reward. 
**Every Epoch is calculated with 5760 blocks** in the Oasys chain, and **each block creation time on Hub Layer is fixed at 15 seconds**, so it takes almost 1 day. 
Block creation time may be delayed a little by network delay for block creation, and at the end of this Epoch, the settlement will be made with Staking Contract. 
If more than the amount of your token is needed for the Validator, one Staking person should leave it to the Validator because validating is impossible. 
We've decided to call it the Delegator, and by delegating it to the Validator, the Validator will belly-date the token and receive the Staking Reward instead. 
Staking Reward is available from Staking Contract, which requires a direct claim. 
In the case of a Delegator, you can choose whomever you want to Delegate. Delegation is also possible to one or more Validators. A validator can take a commission from Staking Reward by validating with a delegation from Delegator.

## Easy Staking 

You can participate in staking with [Oasys Staking](https://hub.oasys.games)

