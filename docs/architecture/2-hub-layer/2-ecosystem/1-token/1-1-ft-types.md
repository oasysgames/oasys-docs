# Flexibility of Fungible Token(FT) & Non Fungible Token(NFT)

For basic concepts, you can look at [Whitepaper](/docs/whitepaper/solution/ft-nft-design).

## oFT

oFT means Oasys Fungible Token. 
Deploying contracts on Hub Layer(L1) is highly restricted. The primary purpose is to use Hub Layer as a data availability layer. 
It would be best to ask Oasys Foundation to bring a new contract deployment, but you can deploy ERC-20 with a Factory contract.
Using [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol), You can make your tokens with Factory Contract. 


## vFT

vFT means Verse Fungible Token. 
You can freely deploy ERC-20 Contracts on your Verse. However, if you still need to get your Verse, you may ask verse operators to request permission to deploy your contract.
vFT is considered by minted on Verse. At the same time, when bridging the Hub Layer to Verse Layer, it memories the dataset of a token. The bridge contract rejects transactions if a dataset is unavailable and a bridge request is sent from the verse layer. vFTs can not be cross-chain bridged.

## exFT

exFT means External Fungible Token.
exFT is the same as oFT, mainly created by [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol) or Bridges. So you can bring your ERC-20 contract from the external chain onto Oasys.


## oNFT

oNFT means Oasys Fungible Token. 
Deploying contracts on Hub Layer(L1) is highly restricted. The primary purpose is to use Hub Layer as a data availability layer. 
It would be best to ask Oasys Foundation to bring a new contract deployment, but you can deploy ERC-20 with a Factory contract.
Using [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol), You can make your tokens with Factory Contract. 


## vNFT

vNFT means Verse Fungible Token. 
You can freely deploy ERC-20 Contracts on your Verse. However, if you still need to get your Verse, you may ask verse operators to request permission to deploy your contract.
vNFT is considered by minted on Verse. At the same time, when bridging the Hub Layer to Verse Layer, it memories the dataset of a token. The bridge contract rejects transactions if a dataset is unavailable and a bridge request is sent from the verse layer. vFTs can not be cross-chain bridged.

## exNFT

exNFT means External Fungible Token.
exNFT is the same as oNFT, mainly created by [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol) or Bridges. So you can bring your ERC-20 contract from the external chain onto Oasys.