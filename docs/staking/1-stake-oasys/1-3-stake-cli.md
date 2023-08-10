# Stake via CLI
[oasys-pos-cli](https://github.com/oasysgames/oasys-pos-cli) is the tool to process staking/unstaking. To install it, please follow the instructions in the Github repository.

Before you begin, you'll need to export your private key as an environment variable. You can do this with the following command:
```sh
$ export PRIVATE_KEY=0x0123456789abcdef0123456789abcdef...
```

## 1. Staking
Below is an example command line for staking:
- network: Supports 2 networks, either mainnet or testnet.
- validator:  The validator address you're trying to stake with.
- oas: The amount of tokens you wish to stake, noting that the unit is wei (1 OAS = 1000000000000000000).
```sh
$ oaspos staker:stake \
  --network mainnet \
  --validator "Owner Account Address" \
  --oas 10000000 # Alternatively, you can use `--woas` or `--soas`
```

## 2. Unstake
Below is an example command line for unstaking. Please note that you must perform a claim (described in the next section) to actually withdraw staked OAS, and you must wait 10 days to be able to claim OAS. The interface parameters are the same as for staking.
```sh
$ oaspos staker:unstake \
  --network mainnet \
  --validator "Owner Account Address" \
  --oas 10000000
```

## 3. Claim
Below is an example command line for claiming unstaked OAS. You can call this function after 10 days have passed since you initiated the unstake.
```solidity
$ oaspos staker:claim-unstakes \
  --network mainnet
```
