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

The contract for depositing OAS is [L1BuildDeposit](https://github.com/oasysgames/oasys-opstack/blob/feat/l1-migrate/packages/contracts-bedrock/src/oasys/L1/build/L1BuildDeposit.sol), deployed at 0x00....
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

For those who prefer a UI, please visit [the website here](https://tools-fe.oasys.games/build-verse). The process is straightforward.
For users who opt for contract method calls, like Nsuite users, follow the steps below.

The contract to deploy the contract sets is [L1BuildAgent](https://github.com/oasysgames/oasys-opstack/blob/feat/l1-migrate/packages/contracts-bedrock/src/oasys/L1/build/L1BuildAgent.sol), deployed at 0x00....
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

As an optional setting, we highly recommend executing the previously mentioned script on a periodic basis. This script focuses on L2-specific topics and ensures the overall functionality of your Verse. As the above script lacks notification functionality, we offer an [alternative shell script](/docs/verse-developer/how-to-build-verse/monitor#monitoring-alert-assistance). By executing this script at regular intervals, for instance through cron, This script allows for notifications via Slack or Discord in case of any issues with your Verse installation. It is important to note that this script does not monitor CPU usage or memory consumption, so general infrastructure monitoring will need to be managed through other familiar means.


## Validator Build Steps

![verse build](/img/docs/techdocs/verse/versebuild.png)

For more detailed information about [Verse Architecture](/docs/architecture/verse-layer/verse-accounts), you can take a look at it before deploying a Verse.

### Constructing Verse as a Permissioned Chain
If safeguarding against scams or hacks is a paramount concern for your business, you can configure Verse as a permissioned chain using the Verse-Proxy.

Allowing unrestricted transactions on the Verse could expose you to unforeseen gas attacks. However, by using the proxy, such threats can be managed and limited. For a deeper understanding, please refer to the [Verse-Proxy](/docs/verse-developer/how-to-build-verse/verse-proxy) section.

## 1. Requirements

[Docker Engine v20.10.0 or later](https://docs.docker.com/engine/install/) and [docker compose v2.0 or later](https://docs.docker.com/compose/install/standalone/) are required.Please Check [Hardware_Requirements](/docs/verse-developer/how-to-build-verse/requirement) Prior to setup.

## 2. Clone verse-layer-optimism repository
Clone the [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism) repository provided by the Oasys Foundation.

```shell
$ git clone https://github.com/oasysgames/verse-layer-optimism.git /path/to/verse-layer-optimism

$ cd /path/to/verse-layer-optimism
```
## 3. Create .env file

Create an environment variable configuration file for containers.

Sample for mainnet :

```shell
$ cp .env.sample.mainnet .env
```

Sample for testnet :
```shell
$ cp .env.sample.testnet .env
```

The following settings should be changed.

```shell
# Your Verse-Layer chain ID
L2_CHAIN_ID=

# Created wallet address and key
SEQUENCER_ADDRESS=
SEQUENCER_KEY=

PROPOSER_ADDRESS=
PROPOSER_KEY=

MESSAGE_RELAYER_ADDRESS=
MESSAGE_RELAYER_KEY=
```

:::warning
Do not change `BLOCK_SIGNER_ADDRESS` and `BLOCK_SIGNER_KEY`. If you change them, the Oasys team will not be able to run replica nodes for the Verse-Layer. Furthermore, if the replica node does not exist, the verifier cannot verify the rollup from your Verse-Layer. As a result, the latency of token withdrawal from the Verse-Layer to Hub-Layer increases from about 2 minutes to 7 days, resulting in bad UX of the bridge.
:::

## 4. Create Wallets

Create Ethereum wallets (address and private key) to be used by Builder, Sequencer, and Proposer.

```shell
$ docker-compose run --rm wallet
```

The created wallets will be saved to `./data/wallet/keys.txt`.

Notes:
**1. These wallets require some tokens to run the Verse-Layer. For the testnet, you can get tokens from [Faucet](https://faucet.testnet.oasys.games/).**
**2. Be sure to back up this file!**

```text:./data/wallet/keys.txt
- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!

---- builder ----
Address: 0x0123456789abcdef0123456789abcdef
key:     0x0123456789abcdef0123456789abcdef0123456789abcdef

---- sequencer ----
Address: 0x0123456789abcdef0123456789abcdef
key:     0x0123456789abcdef0123456789abcdef0123456789abcdef

---- proposer ----
Address: 0x0123456789abcdef0123456789abcdef
key:     0x0123456789abcdef0123456789abcdef0123456789abcdef

---- message-relayer ----
Address: 0x0123456789abcdef0123456789abcdef
key:     0x0123456789abcdef0123456789abcdef0123456789abcdef
```

## 5-1. Deploy contracts for Verse-Layer to Hub-Layer.

If you've already built the Verse, skip this procedure.
And you can check VerseInfo with build_transaction at [check-verse-page](#5-2-check-verse-information-from-verse_build-transaction).

For users wishing to build using Multisig like Nsuite, detailed instructions are provided at the [end](/docs/verse-developer/how-to-build-verse/manual#construct-verse-through-direct-contract-function-calls) of this page.

### Connect wallet
Access [tools-fe](https://tools-fe.oasys.games) and switch to the oasys network.

Connect the wallet using metamask.
Upon successful connection, the connected account address and the network will be displayed.

![Connect wallet](/img/docs/techdocs/tools-fe/connect_wallet.png)

Account connected to [tools-fe](https://tools-fe.oasys.games) have the following capabilities:

- Deposit OAS for verse builder as a depositor
- Build a verse as a verse builder.

### Deposit OAS
You can deposit OAS for verse builder as a depositor at `Change Deposit Amount`.

![Deposit](/img/docs/techdocs/tools-fe/deposit1.png)

For the mainnet, deposit 1000000 OAS, for the testnet, deposit 0.000000001 OAS.
The amount of OAS is required for the depositor in advance. If you use the testnet, please reserve OAS in [Faucet](https://faucet.testnet.oasys.games).

:::warning
Please don't set any values for the second verse builder address option and set amount(sOAS).
:::


### Check Your Deposit
You can check deposited OAS for a specific verse builder at `Check Deposit Amount`.

![Check-Deposit](/img/docs/techdocs/tools-fe/check-deposit.png)

### Build verse
It is recommended to secure the chainId with [EVM-based Chains](https://github.com/ethereum-lists/chains) before building a Verse.
(e.g. [Register Oasys mainnet chainId](https://github.com/fromreto/chains/commit/00aa7728b1b1180f9e2f6f284ccb585be956d524))

:::warning Ensure that your chain ID is globally unique
Please remember that the chain ID acts as a unique identifier for a blockchain. Altering it is akin to launching an entirely new blockchain. Once a chain is launched with a specific chain ID, it cannot be replaced, regardless of reasons such as duplicate chain IDs.
:::

You can build a Verse at [Build Verse](https://tools-fe.oasys.games/build-verse).

To build a Verse, set the following
- chainId to be set in the Verse
- address of the sequencer
- address of the proposer

![Build](/img/docs/techdocs/tools-fe/build.png)


If the Verse build is successful, the following will be displayed. You can get verse info with build_tx_hash at [check-verse-page](#5-2-check-verse-information-from-verse_build-transaction).

![Verse build Success](/img/docs/techdocs/tools-fe/verse_build_success.png)

Download address.json and genesis.json.
When you build new verse node, please use latest version genesis.json.
![Build](/img/docs/techdocs/tools-fe/build_complete.png)

Copy the generated configuration files to the `assets` directory of the `verse-layer-optimism` repository.

```shell
$ cp ./Downloads/addresses.json /path/to/verse-layer-optimism/assets/

$ cp ./Downloads/genesis.json /path/to/verse-layer-optimism/assets/
```

After completing this step, return to the `verse-layer-optimism` repository.

```shell
$ cd /path/to/verse-layer-optimism
```

## 5-2. Check verse information
You can check verse information from verse-build_tx_hash or verse_chain_id or verse_builder_address at [check-verse-page](https://tools-fe.oasys.games/check-verse).

![Check verse info](/img/docs/techdocs/tools-fe/check_verse_info.png)

You can also download address.json and genesis.json as well as [Build verse](#build-verse).
If the verse has already been created and you want to check genesis.json version of the verse, you can check that with your verse rpc url at `Check Genesis Version `.
![Build](/img/docs/techdocs/tools-fe/build_complete.png)
![Check Genesis Version](/img/docs/techdocs/tools-fe/check_genesis_version.png)

Copy the generated configuration files to the `assets` directory of the `verse-layer-optimism` repository and [Build verse](#build-verse).

## 6. Run Containers

Before running the containers, you need to check latest release version at [oasys-optimism packages](https://github.com/orgs/oasysgames/packages?repo_name=oasys-optimism).
If it need, please update container version at `docker-compose.yml`.

```shell
$ docker-compose up -d data-transport-layer
$ docker-compose up -d l2geth
$ docker-compose up -d batch-submitter
$ docker-compose up -d message-relayer
```

- data-transport-layer : Data-transport between L1 and L2
- l2geth : L2 geth. Core component on Verse.
- message-relayer : Message relayer, sending message between L1 and L2
- batch-submitter : submit L2 tx for sending L1. You must run only one container for Verse.

## 7. Set Instant Verifier
Oasys L2 is a fork of Optimistic Rollup. A significant limitation is **the extended delay in bridge** transactions from L2 to L1, which often takes up to 7 days. To bypass this lengthy waiting period, we highly recommend using our **Verse Submitter, which enables instant bridge** transactions from L2 to L1.

For instructions on how to set up the Verse Submitter, please refer to the [this section](/docs/verse-developer/how-to-build-verse/build-verse-submitter).

For users interested in our instant verification mechanism, please visit [this page](/docs/architecture/verse-layer/rollup/2-1-instant-verifier).


## 8. Confirming Building Success
To verify whether your building process was successful, execute the [troubleshooting script](/docs/verse-developer/how-to-build-verse/monitor#troubleshooting-assistance). If it passes, your build should be considered successful.

---

## Construct Verse Through Direct Contract Function Calls
Particularly for Multisig users, such as Nsuite, we've detailed the interfaces of the deposit and build functions within the contract.

### Deposit
The contract for depositing is named [L1BuildDeposit](https://github.com/oasysgames/oasys-optimism/blob/4d667a169296f37422ffaa4901e8d149e84abe5a/packages/contracts/contracts/oasys/L1/build/L1BuildDeposit.sol), and it's deployed at `0x5200000000000000000000000000000000000007`. You can deposit either OAS or sOAS. Here's how it's done for OAS:
- builder: Address of the Verse builder
```solidity
function deposit(address builder) external payable;
```
For sOAS, the process is as follows:
- builder: Address of the Verse builder
- token: sOAS address
- amount: Amount to deposit
```solidity
function depositERC20(
    address builder,
    address token,
    uint256 amount
) external;
```
After making your deposit, please verify the outcome in the [Check Your Deposit](/docs/verse-developer/how-to-build-verse/manual#check-your-deposit) section above.

### Build
The build contract is named [L1BuildAgent](https://github.com/oasysgames/oasys-optimism/blob/4d667a169296f37422ffaa4901e8d149e84abe5a/packages/contracts/contracts/oasys/L1/build/L1BuildAgent.sol), and its address is `0x5200000000000000000000000000000000000008`.

- chainId: Chain ID of the Verse
- sequencer: Address of the sequencer
- proposer: Address of the proposer
```solidity
function build(
    uint256 chainId,
    address sequencer,
    address proposer
) external;
```
After completing the build, please verify the newly deployed contract addresses, such as the bridge, and download the JSON file. For additional details, refer to the [Build Verse](/docs/verse-developer/how-to-build-verse/manual#build-verse) section above.
