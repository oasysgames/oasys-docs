# Staking with Client


![delegate](/img/docs/techdocs/validator/delegate.png)

## Intro

There are three ways to stake.

1. [Staking using CLI](/docs/hub-validator/operate-validator/1-3-join-validator-cli)

When staking using the CLI, you need to export the private key while staking.

2. Staking with Oasys Hub. 

You can use [Oasys Hub](https://hub.oasys.games) for staking. 

3. Direct contract call 

We currently do not support the official way, but we'll provide web for a claim if you are an owner on a validator.

## Staking Contract 

```
0x0000000000000000000000000000000000001001
```

## Staking with Oasys Hub.


### CLI and Oasys Hub Compare

| Type | Oasys Hub | CLI |
|-----------|-----------|-----------|
| Stake | O | O |
| Stake using Hardware wallet (ex.Ledger) | O | O (Need to export private key) | 
| Claim staking Reward | O | O |
| Unstake | O | O |

### Supported Hardware Wallet on Oasys Hub

You can use all wallets supported by metamask. Also, please ensure the Ethereum wallet is installed on a hardware wallet.

**Staaking requires 1 epoch to be finalized(Approx 1 Day)**