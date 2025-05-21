# Token in Oasys (OAS/LOAS/SOAS/WOAS/pOAS)

## OAS

Native Token. OAS does not have a contract address. 

## WOAS

The Wrapped Oasys Token is an ERC-20 standard token designed for simplicity of token swapping.

### Contract of WOAS

WOAS contract address is `0x5200000000000000000000000000000000000001`

- [WOAS on GitHub](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/WOAS.sol)

## SOAS
OAS is our native token, and SOAS means Stakeable Oasys Token. Since we need a locked-up token but PoS needs staking for validators, we have made SOAS. Although SOAS tokens are locked and consequently non-circulating, holders of SOAS, as well as validators, can earn rewards through staking activities.

### Purpose of SOAS
SOAS is, for better participating in our ecosystem, and thanks for early support with us, we are sending tokens that can stake, which makes an opportunity to participate in our ecosystem. SOAS can use Hub layer staking and verse deposit, which can substantially support verse builders or operators.

### Contract of SOAS

SOAS contract address is `0x5200000000000000000000000000000000000002`

- [SOAS on GitHub](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/SOAS.sol)

If you're familiar with solidity, take a look at this code first.
<!-- TRANSLATION: Is 'the minter can move it only with the minter's permission' really correct? -->
SOAS can be minted by anyone, but the receiver can move it only with the minter's permission.

||  |
|----------------|----------------|
|Mint|Anyone can mint|
|Receive|Anyone|
|Move token|Only by minter|

### Vesting period

While we mint a token from a contract, Since (Vesting Start) and Until (Vesting Ends)  is calculated by a UNIX timestamp. 

The Calculation formula is: 

```bash
ClaimableOAS = (now - Since) ÷ (Until - Since) × SOAS holding amount
# If (now - Since) ÷ (Until - Since) is over 1, You can claim the total SOAS holding amount.
```

For example, 

If 1,000 SOAS tokens are minted:
<!-- TRANSLATION: Since is Jan 1, 2023? Instead of 2024? -->
Since is Jan 1, 2024
Until is Dec 31, 2024

And you can retrieve locked up token like this.

| Time | Total OAS Claim(convert SOAS to OAS) |
|----------------|-------------|
| 2023 Jan 1~2023 Dec 31| 0 | 
| 2024 Jan 1 | 2.7 SOAS → 2.7 OAS| 
| 2024 Jan 31 | 84.9 SOAS → 84.9 OAS| 
| 2024 Feb 28 | 161.6 SOAS → 161.6 OAS| 
| 2024 Mar 31 | 246.5 SOAS → 246.5 OAS|
| 2024 Jun 30 | 495.8 SOAS → 495.8 OAS|  
| 2024 Dec 31 | 1000 SOAS → 1000 OAS|  

**Please keep in mind that all example token claims are approximate numbers. Therefore, they might not be accurate.**

### How to claim SOAS into OAS​
You can claim SOAS into OAS​ at [tools-fe](https://tools-fe.oasys.games/sOAS)

## LOAS

OAS is our native token, and LOAS means Locked Oasys Token.

### Purpose of LOAS

On a normal chain, even during the Lock-up period, sometimes you can not claim your token despite having the right to do so. 
You can claim the same as SOAS during the vesting period. LOAS would be mainly sent for our contributors. 

### Contract of LOAS

LOAS contract address is `0x5200000000000000000000000000000000000023`

- [LOAS on GitHub](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/LOAS.sol)

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

## OAS & SOAS & LOAS compare

| Type | OAS | SOAS | LOAS |
|-----------|-----------|-----------|-----------|
| Stake on Hub Layer| O | O | X |
| Verse Layer Deposit (1M Deposit to build a verse) | O | O | X |
| Claim Staking Reward on Hub Layer | O | O | X | 
| CLI Staking (Hub/Verse Layer) | O | O | X |
| Bridge onto another chain | O | X | X |
| Move Token to other address | O | Permissive | X |

**Permissive** means you need authorization from the foundation to move token, which can take around 1 month. 
Please reach out to the Oasys foundation if you need to move a token.

## pOAS

pOAS is a token exclusively for payments. It cannot be transferred or exchanged, so it has no cash-out value*. pOAS is designed to function like a “point” system, as commonly seen in Japan, acting as a payment-specific version of OAS. It is granted irregularly to loyal users who are committed to Oasys or blockchain games on Oasys, in order to encourage further use of Oasys Network via their wallets. Although pOAS is non-transferable, it can be used for payments at a fixed rate of 1 pOAS = 1 OAS.

*Since it has no cash-out value, pOAS does not fall under the legal definition of a crypto asset under Japanese law.

### Purpose of pOAS

#### i. Promote OAS payments to users

- The goal is to encourage the use of OAS Tokens not just for trading on CEXs, but for payments within services on Oasys. To achieve this, it is necessary to increase the number of dApps that support OAS payments. pOAS is a payment-specific token designed to realize this goal
- By issuing pOAS as part of on-chain cashback programs, it is possible to incentivize users to reinvest rather than take profits through market sales.

#### ii. Additional revenue for dApp developers (Grant)

pOAS payments received by dApps are converted into OAS on the dApp side. This becomes revenue for the dApp. The source of funds for this conversion is primarily supplied by the Oasys Foundation. In other words, by actively accepting pOAS, dApp developers have the potential to increase their revenue not only through market-circulating OAS, but also through additional income corresponding to the amount of pOAS accepted.

### Contract of pOAS

pOAS contract address is `0xFA5D573d70fCEfBa19cC0e48d1371CbEa1C147ba`

- [pOAS on GitHub](https://github.com/oasysgames/p-oas-contract/blob/main/src/POAS.sol)

### RECIPIENT_ROLE

A role that grants the same amount of OAS when accepting payments via pOAS

- In order for a dApp’s payment contract to receive pOAS, the payment contract must be assigned the `RECIPIENT_ROLE`. This role is assigned by the Oasys core team.
    - [RECIPIENT_ROLE application form](https://docs.google.com/forms/d/e/1FAIpQLSeXtrcuWdaJlX4EhcE10GXjMwmF0NbXcTlQjgB659F2GVTycA/viewform?usp=header)

### Minter contract

A contract that allows the sender to grant the same amount of pOAS to any address by sending OAS. This can be used for dApp-driven campaigns.
