---
sidebar_position: 3
---
# 5-3. NFT Bridge
## Outline
The NFT's ownership information is passed between Oasys Hub-Layer (Layer 1) and other networks (Ethereum, Astar Network, etc.) via a PoS bridge. Various functions can be added to the NFT, however, the ownership information specified on ERC-721 can be bridged. NFTs are bridged via the bridge contracts deployed on each network.
## Handling of NFTs
![Handling of NFTs](/img/docs/whitepaper/technologies/nft-handlings.png)
The idea is that the NFT is minted on the Genuine Chain first and actually used on the Main Chain. In terms of NFT information, the ownership information defined on the ERC-721 resides on the Genuine Chain, while the other information resides on the Main Chain. In this situation, only the ownership information of the ERC-721 is subject to the NFT Bridge, and the status of the bridge destination is considered to be Cache until the ownership information is reflected on the Genuine Chain.
## Bridge Contract
### 1. Genuine Chain to Other Chain
Initially, consensus bridge by Council Members will be used, and in the future, PoS bridge will be used. In the PoS bridge, Locking an NFT by transferring it to the Bridge Contract with approval for multiple signatures on PoS, the NFT is minted on the Other Chain as the bridge destination.
### 2. Other Chain to Genuine Chain
Initially, consensus bridge by Council Members will be used, and in the future, PoS bridge will be used. In the PoS bridge, Burning an NFT on the Bridge Contract with approval for multiple signatures on PoS, the NFT is transferred to the Genuine Chain as the bridge destination.
### 3. Other Chain to Other Chain
Initially, consensus bridge by Council Members will be used, and in the future, PoS bridge will be used. In the PoS bridge, Burning an NFT on the Bridge Contract with approval for multiple signatures on PoS, the NFT is transferred to the Other Chain as the bridge destination.

