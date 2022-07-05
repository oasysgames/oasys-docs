---
sidebar_position: 3
sidebar_label: Verse-Layer node build (Optimism)
---

# Verse-Layer Node Build (Optimism)

## Validator Build Steps
### Prepare
Clone the [Optimism repository](https://github.com/oasysgames/verse-layer-optimism) provided by the Oasys Foundation.

## 1. Requirements
Docker Engine v20.10.0 or later and docker-compose v2.0 or later are required.

## 2. Create Wallets
Create Ethereum wallets (address and private key) to be used by Verse-Builder, OVM Sequencer, and OVM Proposer.
```
docker-compose run --rm wallet
```
The created wallets will be saved to `./data/wallet/keys.txt`.

Notes:  
1. These wallets requires some tokens to run Verse-Layer. For testnet, you can get a token from [Faucet](https://faucet.testnet.oasys.games/).
2. Be sure to back up this file!

- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!

```
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
## 3. Deploy contracts for Verse-Layer to Hub-Layer.
### Clone oasys-optimism repository
```
git clone https://github.com/oasysgames/oasys-optimism.git /path/to/oasys-optimism

cd /path/to/oasys-optimism/packages/contracts/

git checkout v1.0.0-alpha0
```
### Install dependencies and Build contracts  
```
npm install  # or "yarn install"

npx hardhat run scripts/generate-artifacts.ts
```
### Set environment variables
```
export CONTRACTS_TARGET_NETWORK=oasys
```

### Verse-Layer chain ID. Can't change it later, please decide carefully.
export CHAIN_ID=12345

### Created wallet addresses
```
export BUILDER_ADDRESS=0x...
export SEQUENCER_ADDRESS=0x...
export PROPOSER_ADDRESS=0x...
```

For mainnet : 
```
export CONTRACTS_RPC_URL=https://rpc.mainnet.oasys.games/
export DEPOSIT_AMOUNT=1000000000000000000000000
```

For testnet :
```
export CONTRACTS_RPC_URL=https://rpc.testnet.oasys.games/
export DEPOSIT_AMOUNT=0
```

### Deposit OAS token

Private key of the depositor : 
```
export CONTRACTS_DEPLOYER_KEY=0x...
```

```
npx hardhat verse:deposit \
  --network $CONTRACTS_TARGET_NETWORK \
  --builder $BUILDER_ADDRESS \
  --amount $DEPOSIT_AMOUNT
```
Then, Output would be like this : 

```
depositing (tx: 0x2faa04c92222133e83eb350f03ec698a4b0d2cfe0a549a118401cdc8c1f5efb8)...: success with 70490 gas
```
### Deploy contracts

First, you need to export Private key of the "builder" wallet:

```
export CONTRACTS_DEPLOYER_KEY=0x...

npx hardhat verse:build \
  --network $CONTRACTS_TARGET_NETWORK \
  --chain-id $CHAIN_ID \
  --sequencer $SEQUENCER_ADDRESS \
  --proposer $PROPOSER_ADDRESS \
  --block-signer $SEQUENCER_ADDRESS \
  --fee-wallet $BUILDER_ADDRESS \
  --gpo-owner $BUILDER_ADDRESS

```
Then, Output would be like this : 

```
building (tx: 0xc4800ef3dc40a79a10378bf109d192c90b66b6e64a1987ddc6cdbf628d0d7d59)...: success with 17673168 gas
Success writing contract addresses to ./oasys/addresses.json
Success writing genesis block configuration to ./oasys/genesis.json
```
### Copy files to verse-layer  
Copy the configuration filess to `assets` directory of the `verse-layer` repository.
```
cp ./oasys/addresses.json /path/to/verse-layer/assets/

cp ./oasys/genesis.json /path/to/verse-layer/assets/ 
```
When you have completed this step, return to the `reverse-layer` repository.

## 4. Create .env
Create an environment variable configuration file for containers.
Sample for mainnet : 

```
cp .env.sample.mainnet .env
```
Sample for testnet :
```
cp .env.sample.testnet .env
```
The following settings should be changed.

### Verse-Layer chain ID
```
L2_CHAIN_ID=
```
### First created wallet address and key
```
SEQUENCER_ADDRESS=
SEQUENCER_KEY=
PROPOSER_ADDRESS=
PROPOSER_KEY=
```

### 5. Run Containers
```
docker-compose up -d data-transport-layer
docker-compose up -d l2geth
docker-compose up -d verifier
docker-compose up -d batch-submitter
docker-compose up -d message-relayer
```
