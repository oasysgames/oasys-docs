# Building Verse Procedure
Building Verse is divided into 3 main steps, which we will explain individually. We strongly recommend **trying the entire process on a testnet first**.
1. Deposit OAS
2. Deploy Verse contracts on the Hub Layer (L1)
3. Run Verse services (L2)
4. Verify the Build

## 1. Deposit OAS
To build a Verse, builders are required to deposit `1 million OAS`. This deposit is not permanently locked while operating your Verse; it is only locked for `180 days`. After this period, you can withdraw the OAS for any purpose, such as constructing another Verse, without the need for an additional 1 million OAS purchase.

Building on the mainnet requires 1 million OAS, whereas building on the testnet requires just `1 OAS`. Please obtain test OAS from the [Faucet](https://faucet.testnet.oasys.games/).

:::warning Management of the Builder Key
The builder key holds the privilege to withdraw the deposited OAS and deploy the Verse contract set on L1 (step 2). As the builder key cannot be replaced, please manage it with utmost care. Loss of this key means you cannot withdraw OAS and complete the building steps.
:::

There are two methods for depositing OAS: through a UI or by directly calling contract methods.
For those who prefer using a UI, please visit [the website here](https://tools-fe.oasys.games/). The process is straightforward.
For those who prefer calling contract methods, such as Nsuite users, follow the steps below.

The contract for depositing OAS is [L1BuildDeposit](https://github.com/oasysgames/oasys-opstack/blob/develop/packages/contracts-bedrock/src/oasys/L1/build/L1BuildDeposit.sol), deployed at `0xBE75a2769B312269FF945f9cF714eEA8ed8B01A9`.
Use the deposit function as shown below. Please call this function:

- builder: the address of builder
```solidity
function deposit(address builder) external payable;
```

Then, confirm the balance by calling the `getDepositTotal` function below:
```solidity
function getDepositTotal(address builder) public view returns (uint256);
```

## 2. Deploy Verse contracts on the Hub Layer (L1)
Since L2 relies on L1 for security, it doesn't operate in isolation. L2 interacts with L1, and as part of these interactions, you'll deploy a set of contracts on L1. These contracts are crucial for maintaining the security of your Verse.

When deploying, you'll register 5 keys and the l2BlockTime as follows:

| Name | Description |
|--|--|
|finalSystemOwner|This key has privileges across all the contract sets deployed on L1 and is hence called the owner key. It's required for modifying settings and upgrading contracts. "Store this key in a secure location"; without it, you cannot replace the other keys.|
|l2OutputOracleProposer|Used to propose the L2 state root, this key is set to the `op-proposer`.|
|batchSenderAddress|Utilized to submit all L2 transaction batches to L1, this key is set to the `op-batcher`.|
|p2pSequencerAddress|Employed for P2P syncing with multiple operation nodes. Currently, this key is not in use. Keep it for future application.|
|messageRelayer|This key finalizes the L2->L1 withdrawal bridge messages and is set to the `message-relayer`.|
|l2BlockTime|The block time for L2. Choose within the 1 to 7 seconds range. Please refer [link here](/docs/verse-developer/how-to-build-verse/optional-configs#which-block-time-should-i-choose) for guidance on selection.|

If you're unfamiliar with creating a private key, consider using [oasys-pos-cli](https://github.com/oasysgames/oasys-pos-cli). Download the binary from the [release page](https://github.com/oasysgames/oasys-pos-cli/releases) and follow the instructions to execute the key generation command.
```shell
$ oaspos crypto:create-account
Address : 0xabcd1234...
Key     : 0xabcd1234...
```

:::info fund OAS
Please fund at least 10 OAS to the following address. This address will send transactions to our L1 to cover the required gas fees:
- l2OutputOracleProposer
- batchSenderAddress
- messageRelayer
:::

For those who prefer a UI, please visit [the website here](https://tools-fe.oasys.games/build-verse). The process is straightforward.
For users who opt for contract method calls, like Nsuite users, follow the steps below.

The contract to deploy the contract sets is [L1BuildAgent](https://github.com/oasysgames/oasys-opstack/blob/develop/packages/contracts-bedrock/src/oasys/L1/build/L1BuildAgent.sol), deployed at `0x85D92cD5d9b7942f2Ed0d02C6b5120E9D43C52aA`.
- chainId: The chain ID of your Verse. Ensure this chain ID is unique globally.
- cfg: A tuple of the configuration. Please refer to [the optional configuration page](/docs/verse-developer/how-to-build-verse/optional-configs#verse-contracts-deployment-configuration).
```solidity
function build(
    uint256 chainId,
    BuildConfig calldata cfg
) external returns (BuiltAddressList memory, address[7] memory);
```

Then, verify the results by calling the `builtLists` function below. As long as it returns a non-zero address, your build was successful.
```solidity
function builtLists(uint256 chainId) external returns(BuiltAddressList memory)
```

## 3. Run Verse services (L2)
Verse comprises 6 distinct services, each with a specific role, ensuring their correct operation is crucial for the system's functionality. Below is a brief overview of these services and their functions:

| Name | Description |
|--|--|
|op-node|Directs L2 block creation and derives L2 chain from L1.|
|op-geth|Executes L2 transactions and constructs blocks.|
|op-propoer|Proposes L2 state updates to L1.|
|op-batcher|Submits all L2 transactions to L1.|
|messager-relayer|Relays L2->L1 withdrawal bridge transactions to L1.|
|verse-submitter|Handles instant verification processes.|

### 1. Download Configuration Files
The initial step is to download the necessary configuration files. You can find these files through [the web site here](https://tools-fe.oasys.games/check-verse). These configuration files are crucial as they serve as one of the inputs for initializing and applying settings to the services.

### 2. Configure and Start Services
The simplest method to start the services is by using Docker. We provide a docker-compose file to simplify the process of building and starting the services as much as possible. Please adhere to the instructions found in the README.md within the [verse-layer-opstack](https://github.com/oasysgames/verse-layer-opstack) directory.

For those who prefer to build the services from the source code, please consult the corresponding repositories for each service as listed below:

| Service | Repository |
|--|--|
|op-node|[oasys-opstack](https://github.com/oasysgames/oasys-opstack)|
|op-geth|[oasys-op-geth](https://github.com/oasysgames/oasys-op-geth)|
|op-propoer|[oasys-opstack](https://github.com/oasysgames/oasys-opstack)|
|op-batcher|[oasys-opstack](https://github.com/oasysgames/oasys-opstack)|
|messager-relayer|[opstack-message-relayer](https://github.com/oasysgames/opstack-message-relayer)|
|verse-submitter|[verse-verifier](https://github.com/oasysgames/verse-verifier)|

## 4. Verify the Build
To confirm the success of your build process, run the [troubleshooting shell script](/docs/verse-developer/how-to-build-verse/monitor#troubleshooting-assistance). A successful execution of this script indicates that your build process has completed successfully.

As an optional setting, **we highly recommend executing the previously mentioned script on a periodic basis**. This script focuses on L2-specific topics and ensures the overall functionality of your Verse. As the above script lacks notification functionality, we offer an [alternative shell script](/docs/verse-developer/how-to-build-verse/monitor#monitoring-alert-assistance). By executing this script at regular intervals, for instance through cron, This script allows for notifications via Slack or Discord in case of any issues with your Verse installation.

As an example of the risks this script can help mitigate, it monitors the L2 safe head. If the op-batcher is stopped for more than 3600 L1 blocks (the default sequencing window), **the safety of your chain could be compromised**, potentially leading to risks such as reorgs. For more details, please refer to [this section](https://github.com/oasysgames/verse-layer-opstack?tab=readme-ov-file#l2-reorged-what-happens-when-the-op-batcher-stops-for-more-than-6-hours).

It is important to note that this script does not monitor CPU usage or memory consumption, so general infrastructure monitoring will need to be managed through other familiar means.
