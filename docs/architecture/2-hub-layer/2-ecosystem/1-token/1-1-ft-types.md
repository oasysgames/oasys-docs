# Flexibility of Fungible Token(FT) & Non Fungible Token(NFT)

For basic concepts, you can read the [Whitepaper](/docs/whitepaper/solution/ft-nft-design).

## oFT

oFT means Oasys Fungible Token. 
Deploying contracts on the Hub Layer(L1) is highly restricted. The primary purpose is to use the Hub Layer as a data availability layer. 
It would be best to ask the Oasys Foundation to deploy new contracts, but you can deploy an ERC-20 with the Factory contract.
Using [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol), You can make your tokens with Factory Contract. 


## vFT

<!-- TRANSLATION: Not sure what is meant by 'if you still need to get your Verse....'  -->
vFT means Verse Fungible Token. 
You can freely deploy ERC-20 contracts on your Verse. However, if you still need to get your Verse, you may ask verse operators to request permission to deploy your contract.
A vFT is minted on the Verse. At the same time, when bridging from the Hub Layer to the Verse Layer, it remembers the dataset of a token. The bridge contract rejects transactions if a dataset is unavailable and a bridge request is sent from the Verse Layer. vFTs can not be cross-chain bridged.

## exFT

exFT means External Fungible Token.
An exFT is the same as an oFT, mainly created by [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol) or Bridges. So you can bring your ERC-20 contract from an external chain onto Oasys.


## oNFT

oNFT means Oasys Non Fungible Token. 
Deploying contracts on Hub Layer(L1) is highly restricted. The primary purpose is to use Hub Layer as a data availability layer. 
It would be best to ask Oasys Foundation to bring a new contract deployment, but you can deploy ERC-721 with a Factory contract.
Using [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol), You can make your tokens with Factory Contract. 


## vNFT

vNFT means Verse Non Fungible Token. 
You can freely deploy ERC-721 contracts on your Verse.For deploying vNFT, you may ask verse operators to request permission to deploy your contract.
A vNFT is minted on the Verse. At the same time, when bridging from the Hub Layer to the Verse Layer, it remembers the dataset of a token. The bridge contract rejects transactions if a dataset is unavailable and a bridge request is sent from the Verse Layer. vNFTs can not be cross-chain bridged.

## exNFT

exNFT means External Non Fungible Token.
An exNFT is the same as an oNFT, mainly created by [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol) or Bridges. So you can bring your ERC-20 contract from the external chain onto Oasys.
