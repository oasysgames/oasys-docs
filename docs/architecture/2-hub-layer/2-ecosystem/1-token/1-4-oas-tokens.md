# Token in Oasys(OAS/LOAS/SOAS/WOAS) 

## OAS

Native Token. OAS does not have a contract address. 

## WOAS

Wrapped Oasys Token. ERC-20 Standard token with easy use for bridging. 

# sOAS & LOAS


## sOAS

OAS is our native token, and sOAS means Stakeable Oasys Token. Since we need a locked-up token but POS needs staking for validators, we have made sOAS.

### Purpose of sOAS

sOAS is, for better participating in our ecosystem, and thanks for early support with us, we are sending tokens that can stake, which makes an opportunity to participate in our ecosystem. sOAS can use Hub layer staking and verse deposit, which can substantially support verse builders or operators.

### Contract of sOAS

sOAS contract address is `0x5200000000000000000000000000000000000002`

- [sOAS on Github](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/SOAS.sol)


### How is sOAS made? 

- [sOAS on Github](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/SOAS.sol)

If you're familiar with solidity, take a look at this code first.
<!-- TRANSLATION: Is 'the minter can move it only with the minter's permission' really correct? -->
sOAS can be minted by anyone, but the receiver can move it only with the minter's permission.

||  |
|----------------|----------------|
|Mint|Anyone can mint|
|Receive|Anyone|
|Move token|Only by minter|


### Vesting period

While we mint a token from a contract, Since (Vesting Start) and Until (Vesting Ends)  is calculated by a UNIX timestamp. 

The Calculation formula is: 

```bash
ClaimableOAS = (now - Since) ÷ (Until - Since) × sOAS holding amount
# If (now - Since) ÷ (Until - Since) is over 1, You can claim the total sOAS holding amount.
```

For example, 

If 1,000 sOAS tokens are minted:
<!-- TRANSLATION: Since is Jan 1, 2023? Instead of 2024? -->
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


**Please keep in mind that all example token claims are approximate numbers. Therefore, they might not be accurate.**

### How to claim sOAS into OAS​
You can claim sOAS into OAS​ at [tools-fe](https://tools-fe.oasys.games/sOAS)

## LOAS

OAS is our native token, and LOAS means Locked Oasys Token.

### Purpose of LOAS

On a normal chain, even during the Lock-up period, sometimes you can not claim your token despite having the right to do so. 
You can claim the same as sOAS during the vesting period. LOAS would be mainly sent for our contributors. 

### Contract of LOAS

LOAS contract address is `0x5200000000000000000000000000000000000023`

- [LOAS on Github](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/LOAS.sol)

### Vesting period

While we mint a token from a contract, Since (Vesting Start) and Until (Vesting Ends)  is calculated by a UNIX timestamp. 

The Calculation formula is : 

```bash
ClaimableOAS = (now - Since) ÷ (Until - Since) × LOAS holding amount
# If (now - Since) ÷ (Until - Since) is over 1, You can claim the total LOAS holding amount.
```

For example, 
<!-- TRANSLATION: Since is Jan 1, 2023? Instead of 2024? -->

When 1,000 LOAS are minted:
Since is Jan 1, 2024
Until is Dec 31, 2024

And you can retrieve locked up token like this.

| Time | Total OAS Claim(convert LOAS to OAS) |
|----------------|-------------|
| 2023 Jan 1~2023 Dec 31| 0 | 
| 2024 Jan 1 | 2.7 LOAS → 2.7 OAS| 
| 2024 Jan 31 | 84.9 LOAS → 84.9 OAS| 
| 2024 Feb 28 | 161.6 LOAS → 161.6 OAS| 
| 2024 Mar 31 | 246.5 LOAS → 246.5 OAS|
| 2024 Jun 30 | 495.8 LOAS → 495.8 OAS|  
| 2024 Dec 31 | 1000 LOAS → 1000 OAS|  


**Please keep in mind that all example token claims are approximate numbers. Therefore, they might not be accurate.**

### How to claim LOAS into OAS​
You can claim LOAS into OAS​ at [tools-fe](https://tools-fe.oasys.games/lOAS)

## OAS & sOAS & LOAS compare

| Type | OAS | sOAS | LOAS |
|-----------|-----------|-----------|-----------|
| Stake on Hub Layer| O | O | X |
| Verse Layer Deposit (1M Deposit to build a verse) | O | O | X |
| Claim Staking Reward on Hub Layer | O | O | X | 
| CLI Staking (Hub/Verse Layer) | O | O | X |
| Bridge onto another chain | O | X | X |
| Move Token to other address | O | Permissive | X |

**Permissive** means you need authorization from the foundation to move token, which can take around 1 month. 
Please reach out to the Oasys foundation if you need to move a token.
