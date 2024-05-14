# oNFT
oNFT is a Fungible Token created by Oasys Staking.
oNFT can be bridged between the Verse layer(L2) and the Hub layer(L1).

When creating an oNFT, it is necessary to create an ERC721 for each Hub (L1) and Verse (L2).

## How to create oNFT
From here on out, We will explain how to create an oFT, using [the code](https://github.com/oasysgames/l1-l2-bridge-tutorial/blob/main/scripts/bridge-oNFT.ts) in [the bride tutorial](https://github.com/oasysgames/l1-l2-bridge-tutorial) as a reference.
This tutorial actually implements [the contract](https://github.com/oasysgames/oasys-optimism/tree/develop/packages/contracts) used in Verse and Hub.

In this tutorial, L1 is set to Oasys testnetwok and L2 to Oasys SAND Verse.
```typescript
// hardhat.config.ts
networks: {
  l1: {
    url: 'https://rpc.testnet.oasys.games/',
    chainId: 9372,
    accounts: [process.env.PRIVATE_KEY],
  },
  l2: {
    url: 'https://rpc.sandverse.oasys.games/',
    chainId: 20197,
    accounts: [process.env.PRIVATE_KEY],
    gasPrice: 0,
  },
},
```

If you want to create an oNFT, please refer to this tutorial to generate the code to create an oNFT.

When you  generate the code to create an oNFT, please also do the following.
* Set the name or symbol of the oNFT
* Set network you want to create oNFT at `hardhat.config.ts` (Both L1 and L2)


### Create contract required for creating ERC721
* Switch to the Hub network where you want to create the oNFT
* Create a factory contract to create L1StandardERC721

```typescript
// Get Hub-Layer pre-deployed contracts.
switchNetwork('l1')
const [signer] = await hre.ethers.getSigners()

const l1StandardERC721Factory = (
  await hre.ethers.getContractFactory('L1StandardERC721Factory')
).attach(addresses.l1.L1StandardERC721Factory)
```

* Switch to the Verse network where you want to create the oNFT
* Create a factory contract to create L2StandardERC721
* Create a bridge contract to bridge L2StandardERC721

```typescript
// Get Verse-Layer pre-deployed contracts.
switchNetwork('l2')
const L2StandardERC721 = await hre.ethers.getContractFactory(
  'L2StandardERC721',
) // Note: This is not pre-deployed contract.

const l2ERC721Bridge = await hre.ethers.getContractAt(
  'IL2ERC721Bridge',
  addresses.l2.L2ERC721Bridge,
)
```

### Create L1StandardERC721 at Oasys Staking
* Switch to the Hub network where you want to create the oNFT
* Create L1StandardERC721 with oNFT_NAME, oNFT_SYMBOL, oNFT_BASE_TOKEN_URI
* Get L1StandardERC721 contact

```typescript
switchNetwork('l1')
const tx1 = await l1StandardERC721Factory.createStandardERC721(
  oNFT_NAME,
  oNFT_SYMBOL,
  oNFT_BASE_TOKEN_URI,
)
const receipt1 = await tx1.wait()
const l1onft = await hre.ethers.getContractAt(
  'L1StandardERC721',
  getL1ERC721AddressFromReceipt(receipt1),
)
```

### Create L2StandardERC721 at Verse
* Switch to the Verse network where you want to create the oNFT
* Create L2StandardERC721 with l2ERC721Bridge.address, L1StandardERC721 contact, oNFT_NAME, oNFT_SYMBOL
* Get L2StandardERC721 contact

```typescript
switchNetwork('l2')
const l2onft = await L2StandardERC721.deploy(
  l2ERC721Bridge.address,
  l1onft.address,
  oNFT_NAME,
  oNFT_SYMBOL,
)
await l2onft.deployed()
const receipt2 = await l2onft.deployTransaction.wait()
```

### Mint oNFT at Hub
* Switch to the Hub network where you want to create the oNFT
* l1onft Mint with , l1onft_owner_address, oNFT_TOKEN_ID

```typescript
switchNetwork('l1')
const tx3 = await l1onft.mint(signer.address, oNFT_TOKEN_ID)
const receipt3 = await tx3.wait()
```

If token minting is successful, go to your account page in Oasys Hub Explorer. You can then click on the `Tokens` menu to view tokens you own.

## How to bridge oNFT between Hub and Verse
If you want to know about bridge oNFT between Hub and Verse, please refer [bridge tutorial](/docs/verse-developer/bridge/hub-verse) and [the code](https://github.com/oasysgames/l1-l2-bridge-tutorial/blob/main/scripts/bridge-oNFT.ts) in the bride tutorial.

