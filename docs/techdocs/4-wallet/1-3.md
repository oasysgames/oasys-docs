---
---

# sOAS

OAS is our native token, and sOAS means Stakeable Oasys Token.
Since it's Delegated Proof of stake, and we need a locked-up token, we have made sOAS.

## Purpose of sOAS

sOAS is, for better participating in our ecosystem, and thanks for early support with us, we are sending tokens that can stake, which makes an opportunity to participate in our ecosystem.
sOAS can use Hub layer staking and verse deposit, which can substantially support verse builders or operators. 

### Contract of sOAS

0x5200000000000000000000000000000000000002

And you can see the contract on `Mainnet` or `Testnet`.


### OAS & sOAS compare

| Type | OAS | sOAS |
|-----------|-----------|-----------|
| Stake on Hub Layer| O | O |
| Verse Layer Deposit (1M Deposit to build a verse) | O | O |
| Claim Staking Reward on Hub Layer | O | O | 
| CLI Staking (Hub/Verse Layer) | O | O |
| Bridge onto another chain | O | X |
| Move Token to other address | O | Permissive |

**Permissive** means you need authorization from the foundation to move token, which can take around 1 month. 
Please reach out to the Oasys foundation if you need to move a token.


### How is sOAS made? 

[sOAS Contract](https://github.com/ironbeer/oasys-genesis-contract/blob/main/contracts/token/SOAS.sol)

First, look at this code if you are familiar with it. 

sOAS can be minted by anyone, but the minter can move it only with the minter's permission.
While we mint a token from a contract, 

Address
Since (Vesting Start period,Lockup end period) 
Until (Vesting Ends) 

Time itself is calculated by a UNIX timestamp. The Calculation formula is : 

```
(now - since) ÷ (until - since) × sOAS holding amount
```

For example, 

If token is minted 1,000 sOAS
Since is Jan 1, 2024
Until is Dec 31, 2024

And you can retrieve locked up token like this.

| Time | Total OAS Claim(convert sOAS to OAS) |
|----------------|-------------|
| 2023 Jan 1~2023 Dec 31| 0 | 
| 2024 Jan 1 | 2.7 sOAS → 2.7 OAS| 
| 2024 Jan 31 | 84.9 sOAS → 84.9 OAS| 
| 2024 Feb 28 | 161.6 sOAS → 161.6 OAS| 
| 2024 Mar 31 | 246.5 sOAS → 246.5 OAS|
| 2024 Jun 30 | 495.8 sOAS → 495.8 OAS|  
| 2024 Dec 31 | 1000 sOAS → 1000 OAS|  


**Please remind all example token claims are approximate numbers. Therefore, it might not be accurate.**

### How to claim sOAS onto OAS​
We will prepare a web page after the mainnet launch that can convert sOAS onto OAS when the cliff is over.

