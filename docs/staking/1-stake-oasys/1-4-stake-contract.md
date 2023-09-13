# Stake via Contract Call
[StakeManager.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/StakeManager.sol) is the contract with which you will interact. This contract has been deployed at the address `0x0000000000000000000000000000000000001001` in both mainnet and testnet. Make sure to refer to the appropriate functions within this contract for staking, unstaking, and claiming, as detailed in the corresponding documentation.

## 1. Staking
The interface for the staking function is as follows:
- validator: Address of the validator owner you are trying to stake with.
- token: Case when you stake OAS=0, stake wOAS=1, or stake sOAS=2.
- amount: The amount of tokens you want to stake; please note that the unit is in wei (1 OAS = 1000000000000000000).
```solidity
function stake(
    address validator,
    Token.Type token,
    uint256 amount
) external;
```

To ensure your staking amount, use the `getValidatorInfo` function. Staking changes will take effect from the next epoch, so you first need to identify the current epoch.

To find out the latest epoch, you can call the Environment contract, which is deployed at `0x0000000000000000000000000000000000001000` on both the mainnet and testnet.

The read-only `epoch` function will return the latest epoch.
```solidity
function epoch() external returns (uint256);
```

When calling `getValidatorInfo`, specify the latest `epoch + 1` as the function call parameter. The last parameter in the response will be the accumulated staking amount.

- validator: Address of the validator owner you are trying to stake with.
- epoch: The target epoch you are inquiring about.
```solidity
function getValidatorInfo(
    address validator,
    uint256 epoch
) external returns (
    address operator,
    bool active,
    bool jailed,
    bool candidate,
    uint256 stakes
);
```

## 2. Unstake
The interface for the unstaking function is as follows. Please note that a claim (described in the next section) is required to actually withdraw staked OAS, and you have to wait 10 days to be able to claim OAS. The interface parameters are the same as for staking.
```solidity
function unstakeV2(
    address validator,
    Token.Type token,
    uint256 amount
) external;
```

## 3. Claim
The interface for the claiming function is as follows. After 10 days have passed since you initiated the unstake, you will be able to call this function.
- lockedUnstake:  The ID of the unstake. This ID is incrementally assigned each time you begin the unstake process, starting from 0. You can know the total number of your locked unstakes by calling the `getLockedUnstakeCount` function below. The `lockedUnstake` value is one less than the total.
```solidity
function claimLockedUnstake(
    uint256 lockedUnstake
) external;
```
- staker: The address of the staker.
```solidity
function getLockedUnstakeCount(
    address staker
) external;
``` 
