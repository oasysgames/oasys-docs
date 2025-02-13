# oFT
oFT is a Fungible Token created on Oasys Hub.
oFT can be bridged between the Verse Layer(L2) and the Hub Layer(L1).

When creating an oFT, it is necessary to create an ERC20 for each Hub (L1) and Verse (L2).

## How to create oFT
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

If you want to create an oFT, please refer to this tutorial to generate the code to create an oFT.

When you create an oFT, please also do the following.
* Set the name or symbol of the oFT
* Set network you want to create oFT at `hardhat.config.ts` (Both L1 and L2)
* Please refer to the `Address` and `Reference Code` of [Hub Layer’s Preset Contracts](/docs/architecture/hub-layer/contract#preset-contracts) for L1StandardERC20Factory and [Verse’s Preset Contracts](/docs/architecture/verse-layer/contract#preset-contracts) for L2StandardTokenFactory.
* For L1StandardERC20, please refer [here](https://github.com/oasysgames/oasys-optimism/blob/v0.1.7/packages/contracts/contracts/oasys/L1/token/L1StandardERC20.sol), and for L2StandardERC20, please refer [here](https://github.com/oasysgames/oasys-optimism/blob/v0.1.7/packages/contracts/contracts/standards/L2StandardERC20.sol).

### Create L1StandardERC20 at Oasys Hub
* Switch to the Hub network where you want to create the oFT

```sh
npx hardhat console --network l1
```

* Create L1StandardERC20 with oFT_NAME, oFT_SYMBOL

```typescript
const oFT_NAME = "MyToken"
const oFT_SYMBOL = "MTK"
const l1ERC20FactoryAbi = [ "function createStandardERC20(string memory _name, string memory _symbol) external" ]
const l1ERC20FactoryAddress = "0x5200000000000000000000000000000000000004"
const l1ERC20Factory = await ethers.getContractAt( l1ERC20FactoryAbi , l1ERC20FactoryAddress )
const tx1 = await l1ERC20Factory.createStandardERC20( oFT_NAME , oFT_SYMBOL )
const receipt1 = await tx1.wait()
const l1ERC20Address = "0x" + receipt1.logs.find((log) => log.topics[0] == '0xd714a43f627528ad95fc3dcf6c453cf595be2f4d75c58c4273f17208ed899f44').topics[2].slice(-40)
console.log(l1ERC20Address)
```

### Mint oFT at Hub
* l1oft Mint with oFT_RECIPIENT_ADDRESS, oFT_AMOUNT

```typescript
const [ signer ] = await ethers.getSigners()
const oFT_RECIPIENT_ADDRESS = signer.address
const oFT_AMOUNT = ethers.parseEther('1000')
const l1ERC20Abi = [ "function mint(address to, uint256 amount) external", "function balanceOf(address account) external view returns (uint256)" ]
const l1oft = await ethers.getContractAt( l1ERC20Abi , l1ERC20Address )
const tx2 = await l1oft.mint( oFT_RECIPIENT_ADDRESS, oFT_AMOUNT )
const receipt2 = await tx2.wait()
console.log(await l1oft.balanceOf(oFT_RECIPIENT_ADDRESS))
// 1000000000000000000000n
```

If token minting is successful, go to your account page in Oasys Hub Explorer. You can then click on the `Tokens` menu to view tokens you own.

### Create L2StandardERC20 at Verse
* Switch to the Verse network where you want to create the oFT

```sh
npx hardhat console --network l2
```

* Create L2StandardERC20 with L1_oFT_ADDRESS, oFT_NAME, oFT_SYMBOL

```typescript
const L1_oFT_ADDRESS = "0xYourL1oFTAddress" // l1oft.target
const oFT_NAME = "MyToken"
const oFT_SYMBOL = "MTK"
const l2ERC20FactoryAbi = [ "function createStandardL2Token(address _l1Token, string memory _name, string memory _symbol) external" ]
const l2ERC20FactoryAddress = "0x4200000000000000000000000000000000000012"
const l2ERC20Factory = await ethers.getContractAt( l2ERC20FactoryAbi , l2ERC20FactoryAddress )
const tx3 = await l2ERC20Factory.createStandardL2Token( L1_oFT_ADDRESS, oFT_NAME, oFT_SYMBOL )
const receipt3 = await tx3.wait()
const l2ERC20Address = "0x" + receipt3.logs.find((log) => log.topics[0] == '0xceeb8e7d520d7f3b65fc11a262b91066940193b05d4f93df07cfdced0eb551cf').topics[2].slice(-40)
console.log(l2ERC20Address)
```

### Import token to metamask
The token has been created but is not visible on the metamask. In this case, you must import tokens from the metamask according to how it was written in [this](/docs/verse-developer/handle-token/1-1-vft#import-token-to-metamask) section.

Import `l1oft` address at Hub, `l2oft` address at Verse.

## How to bridge oFT between Hub and Verse
If you want to know about bridge oFT between Hub and Verse, please refer [bridge tutorial](/docs/verse-developer/bridge/hub-verse) and [the code](https://github.com/oasysgames/l1-l2-bridge-tutorial/blob/v1.1.0/front/src/sdk.ts) in the bridge tutorial.

## How to create oFT with non-standard decimals
The decimals for oFTs created by the L1StandardERC20Factory and L2StandardTokenFactory, namely L1StandardERC20 and L2StandardERC20, default to 18.  
If you wish to create a special oFT token with decimals other than 18, we recommend inheriting from L1StandardERC20 and L2StandardERC20 and overriding the decimals.  
Below is an example of creating a USDC.e contract with 6 decimals on Verse.
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./L2StandardERC20.sol";

contract USDCe is L2StandardERC20 {
    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) L2StandardERC20(_l2Bridge, _l1Token, _name, _symbol) {
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
```
