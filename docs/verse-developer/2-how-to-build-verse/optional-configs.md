# Optional Configurations
Optional configurations are primarily achieved by modifying parameters in the settings files. Accordingly, we will mainly focus on explaining the purposes of these configuration files.

## Verse Contracts Build Configuration
The configuration for deploying Verse contract sets is defined as [BuildConfig](https://github.com/oasysgames/oasys-opstack/blob/feat/l1-migrate/packages/contracts-bedrock/src/oasys/L1/build/interfaces/IL1BuildAgent.sol#L5-L51) in `L1BuildAgent.sol`. The meanings of each configuration item are as follows:

| Name | Default Value | Description |
|-----------|------------|------------|
|finalSystemOwner| - |The owner of L1 contract set.|
|l2OutputOracleProposer| - |The address of proposer|
|l2OutputOracleChallenger| - |The address of challenger. usually same as finalSystemOwner |
|batchSenderAddress| - |The address of the l2 transaction batch sender|
|p2pSequencerAddress| - |The address of the p2p sequencer.|
|messageRelayer| - |The address of messager relayer|
|l2BlockTime| 2 |The block time of l2 chain.|
|l2GasLimit|30000000|The gas limit of l2 chain|
|l2OutputOracleSubmissionInterval|80|Determines the block number interval for submitting the next L2 state root.|
|finalizationPeriodSeconds|604800(7days)|FinalizationPeriodSeconds represents the number of seconds before an output is considered.|

#### Which Block Time Should I Choose?
You can select a block time within the 1s to 7s range. Since the default block time for OP Stack is 2s, it's recommended to choose 2 seconds if you have no specific preference. If transaction speed is a priority, choosing 1 second may be beneficial. Setting a 1-second block time means that, on average, an end user will wait about 500ms until their transaction is included in a block (more specifically, until a transaction receipt is received). However, a drawback of this setting is the rapid increase in block numbers, as a new block is produced every second, even if there are no transactions.

#### Why have we set the default value of l2OutputOracleSubmissionInterval to 80?
The submission interval significantly impacts both the waiting time for L2->L1 withdrawals and the speed at which the L2 state proposer operates. If the interval is short, the waiting time for L2 withdrawals decreases. Conversely, if the interval is too short, the state proposer may fail to keep pace with the growth speed of the L2 block height.

Assumptions:
- The L2 block time is 1s.
- The operational proposer (op-proposer) confirms 4 blocks.
- The op-proposer cannot send multiple rollups to a single block.

The op-proposer submits the L2 state every 5 L1 block intervals. During this period, the L2 block grows by 75 blocks. Therefore, 80 was selected as the default value.

## Parameters in addresses.json
`addresses.json` contains a list of addresses for the Verse contract sets deployed and configured L1.

| Name | Description |
|-----------|------------|
|ProxyAdmin|The address of ProxyAdmin.sol|
|SystemConfigProxy|The address of the proxy contract whose implementation contract is SystemConfig.sol.|
|L1StandardBridgeProxy|The address of the proxy contract whose implementation contract is L1StandardBridge.sol.|
|L1ERC721BridgeProxy|The address of the proxy contract whose implementation contract is **OasysL1ERC721Bridge.sol**.|
|L1CrossDomainMessengerProxy|The address of the proxy contract whose implementation contract is L1CrossDomainMessenger.sol.|
|L2OutputOracleProxy|The address of the proxy contract whose implementation contract is **OasysL2OutputOracle.sol**.|
|OptimismPortalProxy|The address of the proxy contract whose implementation contract is **OasysPortal.sol**.|
|ProtocolVersions|The address of the **proxy contract** whose implementation contract is ProtocolVersions.sol.|
|BatchInbox|The address of the batch inbox, to which L2 batch transactions are sent.|
|AddressManager|The address of AddressManager.sol, applicable only to the Verse upgrade from Verse v0.|
|P2PSequencer|The address of `p2pSequencerAddress` as specified during deployment.|
|FinalSystemOwner|The address of `finalSystemOwner` as specified during deployment.|
|L2OutputOracleProposer|The address of `l2OutputOracleProposer` as specified during deployment.|
|L2OutputOracleChallenger|The address of `l2OutputOracleChallenger` as specified during deployment.|
|BatchSender|The address of `batchSenderAddress` as specified during deployment.|

The `messageRelayer` specified during deployment is not recorded in the addresses.json file.

## Parameters in deploy-config.json
The `deploy-config.json` file is used by the `op-node` to generate initial configuration files (such as `genesis.json` and `rollup.json`). It contains numerous parameters; we will focus on explaining few paramaters.

| Name | Description |
|-----------|------------|
|l2ZeroFeeTime|The timestamp for enabling the L2 zero-fee mode. [To enable gas fees](/docs/verse-developer/how-to-build-verse/optional-configs#enabling-gas-fees), remove this.|
|enableGovernance|Configures whether or not include governance token predeploy.|
|governanceTokenOwner|The owner of the GovernanceToken. Has the ability to mint and burn tokens.|
|governanceTokenName|The ERC20 name of the GovernanceToken.|
|governanceTokenSymbol|The ERC20 symbol of the GovernanceToken.|

## Gas Fee
By default configuration, the verse operates gas-free. However, if you wish, you can implement a gas fee system. Concerning the gas currency, the default choice is the bridged OAS, which is the native token of the Hub layer (L1). This choice isn't mandatory, but if you want to use a different token as the gas fee, such as your verse's native token, it would require additional development on the Verse.

#### Enabling Gas Fees
To enable gas fees, remove `l2ZeroFeeTime` parameter from `deploy-config.json`.
