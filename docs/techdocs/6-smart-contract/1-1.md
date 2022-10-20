---
---

# Smart Contract

Smart Contracts for Oasys Blockchain.

## Oasys FT / NFT available on all layers
The advantage of using the Oasys blockchain is that the minted FT / NFT can be used at all layers.

The contracts that can use the Oasys NFT can be found in [nft-bridge](https://github.com/oasysgames/oasys-genesis-contract/tree/main/contracts/nft-bridge) and the main contracts are as follows.

|Contract|Functions|
|--|---------|
|`NFTBridgeMainchain.sol`|1. Enable the transfer target NFT can be deposit from Mainchain(layer-1) to Sidechain(layer-2). <br/> 2. Enable to reject the deposit by the relayer. <br/> 3. Enable to finalize the withdrawal by the relayer.|
|`NFTBridgeSidechain.sol`|1. Enable the transfer target NFT can be withdraw from Sidechain(layer-2) to Mainchain(layer-1) <br/> 2. Enable to reject the withdrawal by the relayer. <br/> 3. Enable to finalize the deposit by the relayer. <br/> 4. Enable to create new Sidechain(ERC721) corresponding to the Mainchain.|

You can check the test code in [test](https://github.com/oasysgames/oasys-genesis-contract/tree/main/test) and proceed with the test according to the following process.

## Install dependencies

```
npm install
```

## Build contracts

```
npm run build
```

## Run tests

```
npm run test
```