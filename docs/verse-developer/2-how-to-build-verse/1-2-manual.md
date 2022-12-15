# Manual for Building Verse


## Faucet

1,000,000 OAS is required to validate the Verse-Layer node. It have 180days lockup on first deployment for a builder wallet.
But on Testnet, it's free, You can try Verse Testnet with [faucet](https://faucet.testnet.oasys.games)(10OAS is sufficient to deploy contract) and build Verse-Layer node.

---
---

## Validator Build Steps

![verse build](/img/docs/techdocs/verse/versebuild.png)

For more detailed information about [Verse Architecture](/docs/architecture/verse-layer/1-1-verse-layer),you can see before deploying verse. 

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
**1. These wallets requires some tokens to run Verse-Layer. For testnet, you can get a token from [Faucet](https://faucet.testnet.oasys.games/).**  
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
```

## 4. Deploy contracts for Verse-Layer to Hub-Layer(WEB).

### Connect wallet
Access to [oasys-pos-fe](https://oasys-pos-fe.vercel.app/verse) and switch to the oasys network where you want to build the verse.

Connect the wallet using the builder in the metamask.
If you successfully connect the wallet, the builder's address will appear next to "Owner Address:".
![Connect wallet](/img/docs/techdocs/oasys-pos-fe/connect_wallet.png)

### Deposit OAS to build Verse.
For mainnet, deposit 1000000 OAS, for testnet, deposit 0.000000001 OAS.

The amount of OAS required for the builder in advance. If you use testnet, please reserve OAS in [faucet](https://faucet.testnet.oasys.games).

If the deposit is successful, you will see the amount of OAS deposited next to "Deposit amount:".
![Deposit](/img/docs/techdocs/oasys-pos-fe/deposit.png)

### Build verse
To build Verse, set the following
・chainId to be set in the Verse
・address of the sequencer
・address of the proposer

It is recommended to secure the chainId with [EVM-based Chains](https://github.com/ethereum-lists/chains) beforehand.
![Build](/img/docs/techdocs/oasys-pos-fe/build.png)


If the Verse build is successful, the following will be displayed. You have to memo build_transaction to check VerseInfo at [check-verse-page](#check-verse-information-from-verse_build-transaction).

![Verse build Success](/img/docs/techdocs/oasys-pos-fe/verse_build_success.png)

Download address.json and genesis.json.
![Build](/img/docs/techdocs/oasys-pos-fe/build_complete.png)

Copy the generated configuration filess to `assets` directory of the `verse-layer-optimism` repository.

```shell
cp ./Downloads/addresses.json /path/to/verse-layer-optimism/assets/

cp ./Downloads/genesis.json /path/to/verse-layer-optimism/assets/ 
```

When you have completed this step, return to the `verse-layer-optimism` repository.

```shell
cd /path/to/verse-layer-optimism
```

### Check verse information from verse_build transaction
You can check verse information from verse_build transaction at [check-verse-page](https://oasys-pos-fe.vercel.app/check-verse).
![Check verse info](/img/docs/techdocs/oasys-pos-fe/check_verse_info.png)

You can also download address.json and genesis.json as well as [Build verse](#build-verse).
![Build](/img/docs/techdocs/oasys-pos-fe/build_complete.png)

Copy the generated configuration filess to `assets` directory of the `verse-layer-optimism` repository as well as [Build verse](#build-verse).

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
```

> **Warning**  
> Do not change `BLOCK_SIGNER_ADDRESS` and `BLOCK_SIGNER_KEY`. If you change them, the Oasys team will not be able to run replica nodes for Verse-Layer. Furthermore, if the replica node does not exist, the verifier cannot verify the rollup from your Verse-Layer. As a result, the latency of token withdrawal from Verse-Layer to Hub-Layer increases from about 2 minutes to 7 days, resulting in bad UX of the bridge.

## 6. Run Containers

```shell
docker-compose up -d data-transport-layer
docker-compose up -d l2geth
docker-compose up -d batch-submitter
docker-compose up -d message-relayer
```
## Permissioned chain

For running verse builder, by considering follwing parameter on permissioned chain may help: 

By deploying permission-less makes scam or non-approved contract, which makes user unsafe. 
By approving transaction freely on verse, you may attacked by unexpected gas attack, which can be controled by [limiting proxy](docs\documentation\4-build-dapps\1-how-to-build-verse\1-4-verse-proxy). 

