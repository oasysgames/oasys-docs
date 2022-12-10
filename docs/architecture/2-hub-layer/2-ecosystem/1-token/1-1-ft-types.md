# Flexibility of Fungible Token(FT) & Non Fungible Token(NFT)

You can look at [Whitepaper](/docs/whitepaper/solution/ft-nft-design) for basic concepts.

## oFT

oFT means, Oasys Fungible Token. 
Deploying contract on Hub Layer(L1) is highly restricted, main purpose is to use Hub Layer as a data avability layer. 
You need to ask Oasys Foundation to bring a new contract deployment, but you can deploy ERC-20 contract with Factory contract.
Using [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol), You can simply make your tokens with Factory Contract. 


## vFT

vFT means, Verse Fungible Token. 
You can freely deploy ERC-20 Contracts on your Verse. However, if you still need to get your Verse, you may need to ask verse operators to request permission to deploy your contract.
vFT is considered by minted on Verse. While bridging the Hub Layer to Verse Layer, it memories the dataset of a token. The bridge contract rejects transaction if a dataset is unavailable and a bridge request is sent from the verse layer. vFTs can not be cross-chain bridged.

## exFT

exFT means, External Fungible Token.
exFT is same with oFT, malnly created by [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol) or Bridges.You can bring your ERC-20 contract from external chain, onto Oasys.


## oNFT

oNFT means, Oasys Fungible Token. 
Deploying contract on Hub Layer(L1) is highly restricted, main purpose is to use Hub Layer as a data avability layer. 
You need to ask Oasys Foundation to bring a new contract deployment, but you can deploy ERC-20 contract with Factory contract.
Using [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol), You can simply make your tokens with Factory Contract. 


## vNFT

vNFT means, Verse Fungible Token. 
You can freely deploy ERC-20 Contracts on your Verse. However, if you still need to get your Verse, you may need to ask verse operators to request permission to deploy your contract.
vNFT is considered by minted on Verse. While bridging the Hub Layer to Verse Layer, it memories the dataset of a token. The bridge contract rejects transaction if a dataset is unavailable and a bridge request is sent from the verse layer. vFTs can not be cross-chain bridged.

## exNFT

exNFT means, External Fungible Token.
exNFT is same with oNFT, malnly created by [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol) or Bridges.You can bring your ERC-20 contract from external chain, onto Oasys.