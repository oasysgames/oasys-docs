# Flexibility of Fungible Token


vFT / oFT / exFT

vFTとoFTを具体的にどのように発行できるかのHow To


You can look at [Whitepaper](/docs/whitepaper/solution/ft-nft-design) for basic concepts.

## oFT

oFT means, Oasys Fungible Token. 
Deploying contract on Hub Layer(L1) is highly restricted, main purpose is to use Hub Layer as a data avability layer. 
You need to ask Oasys Foundation to bring a new contract deployment, but you can deploy ERC-20 contract with Factory contract.
Using [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol), You can simply make your tokens with Factory Contract. 


## vFT

vFT means, Verse Fungible Token. 
You can freely deploy ERC-20 Contracts on your own verse. If you not have own verse, you may need to ask verse operators to request permissons to deploy your contract.

## exFT

exFT means, External Fungible Token.
exFT is same with oFT, malnly created by [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/04f77a5c03fd5888716c0d9d5e8d68a674b92e5b/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol) or Bridges.You can bring your ERC-20 contract from external chain, onto Oasys.

