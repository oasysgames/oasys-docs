# Staking/Unstaking
We offer 3 options for processing staking/unstaking:

1. [Oasy Hub](/docs/staking/stake-oasys/1-2-stake-hub)
    - Ideal for those who prefer a user-friendly UI.
2. [CLI Tool](/docs/staking/stake-oasys/1-3-stake-cli)
    - Suitable for those who prefer using the command-line interface.
    - Note that the Oasys hub above currently supports only a limited number of wallets, such as MetaMask. If you have an unsupported wallet, but it can extract your wallet details, you can process using this tool.
3. [Contract Direct Calling](/docs/staking/stake-oasys/1-4-stake-contract)
    - For those who use NSuite or prefer to use bare-bone contract direct calling, please refer to the bottom section on this page.

:::warning Warn
**About Staking**
Please note that staking requires 1 epoch to be finalized (Approximately 1 Day). Once you initiate the staking process, the generation of rewards will start after 1 day.

**About Unstake**
Please be aware that unstaking takes 10 days. Once you initiate the unstaking process, you must wait 10 days to be able to actually withdraw the staked OAS. The withdrawal process is equivalent to a `claim`.
:::

### Supported Hardware Wallet on Oasys Hub
You can use all wallets that are supported by MetaMask. Also, ensure that the Ethereum wallet is installed on a hardware wallet.

### Export historical data
You can use the oasfi CLI tool to export historical CSV data for Staker and Validator Rewards

[Export historical data](/docs/staking/stake-oasys/1-5-export-csv)
