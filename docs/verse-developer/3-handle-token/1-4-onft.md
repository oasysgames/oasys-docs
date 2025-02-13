# oNFT
oNFT is a Non-Fungible Token created by Oasys Hub.
oNFT can be bridged between the Verse Layer(L2) and the Hub Layer(L1).

When creating an oNFT, it is necessary to create an ERC721 for each Hub (L1) and Verse (L2).

## How to create oNFT
In this tutorial, L1 is set to Oasys Testnet and L2 to Oasys SAND Verse.
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
    initialBaseFeePerGas: 0,
    gasPrice: 0,
  },
},
```

If you want to create an oNFT, please refer to this tutorial to generate the code to create an oNFT.

When you create an oNFT, please also do the following.
* Set the name or symbol of the oNFT
* Set network you want to create oNFT at `hardhat.config.ts` (Both L1 and L2)
* Please refer to the `Address` and `Reference Code` of [Hub Layer’s Preset Contracts](/docs/architecture/hub-layer/contract#preset-contracts) for L1StandardERC721Factory.
* For the ERC721 factory on L2 in Verse v1, you can use [OptimismMintableERC721Factory](https://github.com/oasysgames/oasys-opstack/blob/v1.1.0/packages/contracts-bedrock/src/universal/OptimismMintableERC721Factory.sol) at `0x4200000000000000000000000000000000000017`.
* For L1StandardERC721, please refer [here](https://github.com/oasysgames/oasys-optimism/blob/v0.1.7/packages/contracts/contracts/oasys/L1/token/L1StandardERC721.sol), and for L2StandardERC721, please refer [here](https://github.com/oasysgames/oasys-optimism/blob/v0.1.7/packages/contracts/contracts/oasys/L2/token/L2StandardERC721.sol).

### Create L1StandardERC721 at Oasys Hub
* Switch to the Hub network where you want to create the oNFT

```sh
npx hardhat console --network l1
```

* Create L1StandardERC721 with oNFT_NAME, oNFT_SYMBOL, oNFT_BASE_TOKEN_URI

```typescript
const oNFT_NAME = "MyNFT"
const oNFT_SYMBOL = "MNFT"
const oNFT_BASE_TOKEN_URI = ""
const l1ERC721FactoryAbi = [ "function createStandardERC721(string memory _name, string memory _symbol, string memory _baseTokenURI) external" ]
const l1ERC721FactoryAddress = "0x5200000000000000000000000000000000000005"
const l1ERC721Factory = await ethers.getContractAt( l1ERC721FactoryAbi , l1ERC721FactoryAddress )
const tx1 = await l1ERC721Factory.createStandardERC721( oNFT_NAME , oNFT_SYMBOL, oNFT_BASE_TOKEN_URI )
const receipt1 = await tx1.wait()
const l1ERC721Address = "0x" + receipt1.logs.find((log) => log.topics[0] == '0xbda470470721b5a2c56d61dc0aa9496dd02d39170f9dff803c35efbab6736522').topics[2].slice(-40)
console.log(l1ERC721Address)
```

### Mint oNFT at Hub
* l1onft Mint with oNFT_RECIPIENT_ADDRESS, oNFT_TOKEN_ID

```typescript
const [ signer ] = await ethers.getSigners()
const oNFT_RECIPIENT_ADDRESS = signer.address
const oNFT_TOKEN_ID = 0
const l1ERC721Abi = [ "function mint(address to, uint256 tokenId) external", "function balanceOf(address account) external view returns (uint256)" ]
const l1onft = await ethers.getContractAt( l1ERC721Abi , l1ERC721Address )
const tx2 = await l1onft.mint( oNFT_RECIPIENT_ADDRESS, oNFT_TOKEN_ID )
const receipt2 = await tx2.wait()
console.log(await l1onft.balanceOf(oNFT_RECIPIENT_ADDRESS))
// 1n
```

If token minting is successful, go to your account page in Oasys Hub Explorer. You can then click on the `Tokens` menu to view tokens you own.

### Create L2StandardERC721 at Verse (Verse v1)
* Switch to the Verse network where you want to create the oNFT

```sh
npx hardhat console --network l2
```

* Create L2StandardERC721 with L1_oNFT_ADDRESS, oNFT_NAME, oNFT_SYMBOL

```typescript
const L1_oNFT_ADDRESS = "0xYourL1oNFTAddress" // l1onft.target
const oNFT_NAME = "MyNFT"
const oNFT_SYMBOL = "MNFT"
const l2ERC721FactoryAbi = [ "function createOptimismMintableERC721(address _remoteToken, string memory _name, string memory _symbol) external returns (address)" ]
const l2ERC721FactoryAddress = "0x4200000000000000000000000000000000000017"
const l2ERC721Factory = await ethers.getContractAt( l2ERC721FactoryAbi , l2ERC721FactoryAddress )
const tx3 = await l2ERC721Factory.createOptimismMintableERC721( L1_oNFT_ADDRESS, oNFT_NAME, oNFT_SYMBOL )
const receipt3 = await tx3.wait()
const l2ERC721Address = "0x" + receipt3.logs.find((log) => log.topics[0] == '0xe72783bb8e0ca31286b85278da59684dd814df9762a52f0837f89edd1483b299').topics[1].slice(-40)
console.log(l2ERC721Address)
```
