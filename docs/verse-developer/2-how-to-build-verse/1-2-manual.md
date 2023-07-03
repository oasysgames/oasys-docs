# Manual for Building Verse

1,000,000 OAS is required to validate the Verse-Layer node.
There's a 180 days lockup period on the first deployment for a builder wallet.
But on the Testnet, it's free; You can try the Verse Testnet with [Faucet](https://faucet.testnet.oasys.games)(10OAS is sufficient to deploy contract) and build Verse-Layer node.

If you want to test deploying contracts and execute transactions on the Verse, please use [SAND Verse](/docs/verse-developer/how-to-build-verse/1-10-sandverse).

## Validator Build Steps

![verse build](/img/docs/techdocs/verse/versebuild.png)

For more detailed information about [Verse Architecture](/docs/architecture/verse-layer/verse-accounts), you can take a look at it before deploying a Verse. 

## 1. Requirements

Docker Engine v20.10.0 or later and docker-compose v2.0 or later are required.
Please Check [Hardware_Requirements](/docs/verse-developer/how-to-build-verse/1-1-requirement) Prior to setup. 

## 2. Clone verse-layer-optimism repository
Clone the [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism) repository provided by the Oasys Foundation.

```shell
git clone https://github.com/oasysgames/verse-layer-optimism.git /path/to/verse-layer-optimism

cd /path/to/verse-layer-optimism
```

## 3. Create Wallets

Create Ethereum wallets (address and private key) to be used by Builder, Sequencer, and Proposer.

```shell
docker-compose run --rm wallet
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

## 4-1. Deploy contracts for Verse-Layer to Hub-Layer.

If you've already built the Verse, skip this procedure.
And you can check VerseInfo with build_transaction at [check-verse-page](#4-2-check-verse-information-from-verse_build-transaction).

### Connect wallet
Access [tools-fe](https://tools-fe.oasys.games) and switch to the oasys network where you want to build the Verse.

Connect the wallet using the builder in metamask.
If you successfully connect the wallet, the builder's address and connected network will appear.

![Connect wallet](/img/docs/techdocs/tools-fe/connect_wallet.png)

### Deposit OAS to build Verse.
For the mainnet, deposit 1000000 OAS, for the testnet, deposit 0.000000001 OAS.

The amount of OAS is required for the builder in advance. If you use the testnet, please reserve OAS in [Faucet](https://faucet.testnet.oasys.games).

If the deposit is successful, you will see the OAS deposited next to "Deposit amount:".
![Deposit](/img/docs/techdocs/tools-fe/deposit.png)

### Build verse
It is recommended to secure the chainId with [EVM-based Chains](https://github.com/ethereum-lists/chains) before building a Verse.

e.g. [Register Oasys mainnet chainId](https://github.com/fromreto/chains/commit/00aa7728b1b1180f9e2f6f284ccb585be956d524)

To build a Verse, set the following
- chainId to be set in the Verse
- address of the sequencer
- address of the proposer

![Build](/img/docs/techdocs/tools-fe/build.png)


If the Verse build is successful, the following will be displayed. You can get verse info with build_tx_hash at [check-verse-page](#4-2-check-verse-information-from-verse_build-transaction).

![Verse build Success](/img/docs/techdocs/tools-fe/verse_build_success.png)

Download address.json and genesis.json.
When you build new verse node, please use latest version genesis.json.
![Build](/img/docs/techdocs/tools-fe/build_complete.png)

Copy the generated configuration files to the `assets` directory of the `verse-layer-optimism` repository.

```shell
cp ./Downloads/addresses.json /path/to/verse-layer-optimism/assets/

cp ./Downloads/genesis.json /path/to/verse-layer-optimism/assets/ 
```

After completing this step, return to the `verse-layer-optimism` repository.

```shell
cd /path/to/verse-layer-optimism
```

## 4-2. Check verse information
You can check verse information from verse-build_tx_hash or verse_chain_id or verse_builder_address at [check-verse-page](https://tools-fe.oasys.games/check-verse).

![Check verse info](/img/docs/techdocs/tools-fe/check_verse_info.png)

You can also download address.json and genesis.json as well as [Build verse](#build-verse).
If the verse has already been created and you want to check genesis.json version of the verse, you can check that with your verse rpc url at `Check Genesis Version `.
![Build](/img/docs/techdocs/tools-fe/build_complete.png)
![Check Genesis Version](/img/docs/techdocs/tools-fe/check_genesis_version.png)

Copy the generated configuration files to the `assets` directory of the `verse-layer-optimism` repository and [Build verse](#build-verse).

## 5. Create .env file

Create an environment variable configuration file for containers.

Sample for mainnet : 

```shell
cp .env.sample.mainnet .env
```

Sample for testnet :
```shell
cp .env.sample.testnet .env
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

> **Warning**  
> Do not change `BLOCK_SIGNER_ADDRESS` and `BLOCK_SIGNER_KEY`. If you change them, the Oasys team will not be able to run replica nodes for the Verse-Layer. Furthermore, if the replica node does not exist, the verifier cannot verify the rollup from your Verse-Layer. As a result, the latency of token withdrawal from the Verse-Layer to Hub-Layer increases from about 2 minutes to 7 days, resulting in bad UX of the bridge.

## 6. Run Containers

```shell
docker-compose up -d data-transport-layer
docker-compose up -d l2geth
docker-compose up -d batch-submitter
docker-compose up -d message-relayer
```

- data-transport-layer : Data-transport between L1 and L2
- l2geth : L2 geth. Core component on Verse. 
- message-relayer : Message relayer, sending message between L1 and L2
- batch-submitter : submit L2 tx for sending L1. You must run only one container for Verse.

## 7. Set Instant Verifier(For Mainnet only)
The Verse Builder can set [Instant Verifier](/docs/architecture/verse-layer/rollup/2-1-instant-verifier) by building [verse submitter](/docs/verse-developer/how-to-build-verse/1-8-build-verse-submitter).


Please follow these pages if you want to set [Instant Verifier](/docs/architecture/verse-layer/rollup/2-1-instant-verifier).
- [Verse Submitter](/docs/verse-developer/how-to-build-verse/1-8-build-verse-submitter)

## Permissioned chain

For running the verse builder, considering the following parameter on the permissioned chain may help: 

Deploying permission-less creates scam or non-approved contracts, which makes users unsafe. 
By approving transaction freely on the Verse, you may be attacked by an unexpected gas attack, which can be controlled by [limiting proxy](/docs/verse-developer/how-to-build-verse/1-4-verse-proxy). 




