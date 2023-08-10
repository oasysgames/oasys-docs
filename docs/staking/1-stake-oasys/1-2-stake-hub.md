# Stake via Oasys Hub

## 1. Staking

### 1. Visit [Oasys Hub](https://hub.oasys.games/) and click Staking

![staking1](/img/docs/techdocs/oasys-hub/staking_page.png)

### 2. Select the wallet you want to connect. Currently, Metamask is supported, but more wallets will be added soon.

![staking2](/img/docs/techdocs/oasys-hub/switch_network.png)

### 3. If you have no wallet, you can add a network.

![staking13](/img/docs/techdocs/oasys-hub/add_network.png)

### 4. Select a validator and click the stake button.

![staking3](/img/docs/techdocs/oasys-hub/staking_stake.png)

### 5. Input the stake amount, select the token you wish to stake and click the stake button.

**It requires 10 days to unstake.**

**If you press the max button, (max - gas fee) will be displayed.**

![staking4](/img/docs/techdocs/oasys-hub/stake.png)

If you have successfully staked, the following message appears.

![staking6](/img/docs/techdocs/oasys-hub/success.png)

You can see the transaction activity in metamask.

## 2. Unstaking

### 1. Go to the staking Page.

![staking14](/img/docs/techdocs/oasys-hub/staking_page.png)

### 2. Select the validator you have previously staked.

![staking15](/img/docs/techdocs/oasys-hub/staking_stake.png)

### 3. You can unstake by selecting your staked validator and pressing unstake. 

“Withdraw” button is added to the Staking page.

For the OAS that you have unstaked from each validator page, you can withdraw them 10 days after the unstaking process.

**If you press max button, (max - gas fee) will be displayed.**

![staking16](/img/docs/techdocs/oasys-hub/unstake.png)

### 4. Press “Withdraw” button to check the status of unstaked OAS. 

![staking17](/img/docs/techdocs/oasys-hub/withdraw_select.png)

### 5. If 10 days have passed, you can withdraw your tokens by pressing the withdraw button. 

You can check how much time is left until the tokens are withdrawable. 

While unstaking, you can not receive staking rewards. 

![staking18](/img/docs/techdocs/oasys-hub/withdraw.png)


## 3. Claim Staking Reward 

### 1. Go to the staking Page.

![staking1](/img/docs/techdocs/oasys-hub/staking_page.png)

### 2. Select the validator you have previously staked into.

![staking5](/img/docs/techdocs/oasys-hub/staking_stake.png)

### 3. You can claim by selecting your staked validator and pressing the claim button. 

![staking12](/img/docs/techdocs/oasys-hub/claim.png)

## How to Stake / Unstake / Claim via Contract call
[StakeManager.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/StakeManager.sol) is the contract that you interract with.
This contract is deploied at `0x0000000000000000000000000000000000001001`.


## 1. Staking
The interface of staking function is bellow.
- validator: validator address you are trying to stake
- token: case you stake OAS=0, case you stake wOAS=1, case you stake sOAS=2
- amount: The amout of token you stake, please not the unit is wei(1 OAS= 1000000000000000000).
```solidity
function stake(
    address validator,
    Token.Type token,
    uint256 amount
) external;
```

## 2. Unstake
The interface of staking function is bellow. Please note that the bellow claim is needed to acutally witdaraw staked OAS. you have to wait 10 days to be able to claim OAS. The interface paramaters are same as staking.
```solidity
function unstakeV2(
    address validator,
    Token.Type token,
    uint256 amount
) external;
```

## 3. Claim
The interface of staking function is bellow. After 10 days past when you call unstake, you be able to call this function.
- lockedUnstake: the id of unstake. this id is incrementally assigned every you unstake process start from 0. you can know the total number of your locked unstake via calling `getLockedUnstakeCount` function in bellow. The lockedUnstake is substract one from the total
- 
```solidity
function claimLockedUnstake(
    uint256 lockedUnstake
) external;
```
- staker: the address of staker
```solidity
function getLockedUnstakeCount(
    address staker
) external;
``` 
