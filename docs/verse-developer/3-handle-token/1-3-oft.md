# oFT
oFT is a Fungible Token created on Oasys Staking.
oFT can be bridged between the Verse layer(L2) and the Hub layer(L1).

When creating an oFT, it is necessary to create an ERC20 for each Hub (L1) and Verse (L2).

## How to create oFT
From here on out, We will explain how to create an oFT, using [the code](https://github.com/oasysgames/l1-l2-bridge-tutorial/blob/main/scripts/bridge-oft.ts) in [the bride tutorial](https://github.com/oasysgames/l1-l2-bridge-tutorial) as a reference.
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

If you want to create an oFT, please refer to this tutorial to generate the code to create an oFT.

When you  generate the code to create an oFT, please also do the following.
* Set the name or symbol of the oFT
* Set network you want to create oFT at `hardhat.config.ts` (Both L1 and L2)


### Create contract required for creating ERC20
* Switch to the Hub network where you want to create the oFT
* Create a factory contract to create L1StandardERC20

```typescript
// Get Hub-Layer pre-deployed contracts.
switchNetwork('l1')
const [signer] = await hre.ethers.getSigners()

const l1ERC20Factory = (
  await hre.ethers.getContractFactory('L1StandardERC20Factory')
).attach(addresses.l1.L1StandardERC20Factory)
```

* Switch to the Verse network where you want to create the oFT
* Create a factory contract to create L2StandardERC20

```typescript
// Get Verse-Layer pre-deployed contracts.
switchNetwork('l2')

const l2ERC20Factory = await hre.ethers.getContractAt(
  'L2StandardTokenFactory',
  addresses.l2.L2StandardTokenFactory,
)
```

### Create L1StandardERC20 at Oasys Staking
* Switch to the Hub network where you want to create the oFT
* Create L1StandardERC20 with oFT_NAME, oFT_SYMBOL
* Get L1StandardERC20 contact

```typescript
switchNetwork('l1')
const tx1 = await l1ERC20Factory.createStandardERC20(oFT_NAME, oFT_SYMBOL)
const receipt1 = await tx1.wait()
const l1oft = await hre.ethers.getContractAt(
  'L1StandardERC20',
  getL1ERC20AddressFromReceipt(receipt1),
)
```

### Create L2StandardERC20 at Verse
* Switch to the Verse network where you want to create the oFT
* Create L2StandardERC20 with L1StandardERC20 contact, oFT_NAME, oFT_SYMBOL
* Get L2StandardERC20 contact

```typescript
switchNetwork('l2')
const tx2 = await l2ERC20Factory.createStandardL2Token(
  l1oft.address, // Need to pass token address on Hub-Layer.
  oFT_NAME,
  oFT_SYMBOL,
)
const receipt2 = await tx2.wait()
const l2oft = await hre.ethers.getContractAt(
  'L2StandardERC20',
  getL2ERC20AddressFromReceipt(receipt2),
)
```

### Mint oFT at Hub
* Switch to the Hub network where you want to create the oFT
* l1oft Mint with , l1oft_owner_address, oFT_AMOUNT

```typescript
switchNetwork('l1')
const tx3 = await l1oft.mint(signer.address, oFT_AMOUNT)
const receipt3 = await tx3.wait()
```

### Import token to metamask
The token has been created but is not visible on the metamask. In this case, you must import tokens from the metamask according to how it was written in [this](/docs/verse-developer/handle-token/1-1-vft#import-token-to-metamask) section.

Import `l1oft` address at Hub, `l2oft` address at Verse.

## How to bridge oFT between Hub and Verse
If you want to know about bridge oFT between Hub and Verse, please refer [bridge tutorial](/docs/verse-developer/bridge/hub-verse) and [the code](https://github.com/oasysgames/l1-l2-bridge-tutorial/blob/main/scripts/bridge-oft.ts) in the bride tutorial.

