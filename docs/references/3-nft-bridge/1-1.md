---
---

# NFT Bridge

## Outline
The NFT's ownership information is messaged between Oasys Hub-Layer (Layer 1) and other networks (Ethereum, Astar, etc.) via a PoS bridge. NFT makers can add various functions to the NFT. However, the ownership information specified on ERC-721 cab be bridged. NFT is bridged via bridge contracts deployed on each network.

## Handling of NFTs
The idea is that the NFT is minted on the Genuine Chain first and used on the Main Chain. Therefore, regarding NFT information, the ownership information defined on the ERC-721 resides on the Genuine Chain, while the other information resides on the Main Chain. In this situation, only the ownership information of the ERC-721 is subject to the NFT Bridge, and the status of the bridge destination is considered to be Cache until the ownership information is reflected on the Genuine Chain.

## Bridge Contract
- Genuine Chain to Other Chain

Locking an NFT by transferring it to the Bridge Contract with approval for multiple signatures on PoS, the NFT is minted on the Other Chain as the bridge destination.

- Other Chain to Genuine Chain

Burning an NFT on the Bridge Contract with approval for multiple signatures on PoS, the NFT is transferred to the Genuine Chain as the bridge destination.

- Other Chain to Other Chain

Burning an NFT on the Bridge Contract with approval for multiple signatures on PoS, the NFT is transferred to the Other Chain as the bridge destination.