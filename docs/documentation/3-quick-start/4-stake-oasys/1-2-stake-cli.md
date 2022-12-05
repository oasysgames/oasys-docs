# Staking with Client.


---
---

# Staking(Delegating)

![delegate](/img/docs/techdocs/validator/delegate.png)

## Intro

There is three ways to stake.

1. [Staking using CLI](/docs/techdocs/validator/hub-layer-client-join/1-1)

On staking using CLI, you need to export private key while staking.

2. Staking with Oasys Hub. 

You can use [Oasys Hub](https://hub.oasys.games) for a staking. 

3. Direct contract call 

We currently do not support the official way, but we will provide web for a claim if you are an owner on a validator.

## Staking Contract 

0x0000000000000000000000000000000000001001


## Staking with Oasys Hub.


### CLI and Oasys Hub Compare

| Type | Oasys Hub | CLI |
|-----------|-----------|-----------|
| Stake | O | O |
| Stake using Hard wallet (ex.Ledger) | O | O (Need to export private key) | 
| Claim staking Reward | O | O |
| Unstake | O | O |

### Supported Hardware Wallet on Oasys Hub

You can use all wallets supported by metamask. Also, Please Make sure the Ethereum wallet is installed on a hardware wallet.

**For staking, you require 1 epoch to be finalized(Approx 1 Day)**