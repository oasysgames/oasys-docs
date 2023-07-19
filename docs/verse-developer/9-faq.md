# FAQ

### Q. How much gas is consumed when rolling up a transaction to Hub Layer(L1)?
In our experiment of rolling up 1000 ERC20 transfer transactions, the total gas consumed was 2.7 million. If the gas price is 1.5 Gwei, the total gas cost is 0.004 OAS (calculated as 2.7M gas * 1.5 Gwei).

:::note Note
The consumed gas is the sum of 2 rollups
- Transaction data rollup = 1.3 M
- StateRoot rollup = 1.4 M
:::

