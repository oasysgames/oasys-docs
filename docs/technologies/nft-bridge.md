---
sidebar_position: 3
---
# 5-3. NFT Bridge
## Outline
Oasys Hub-Layer(Layer 1)と他のnetwork(EthereumやAstarなど)の間で、NFTの所有情報をPoSブリッジで受け渡します。NFTには様々な機能を付与することができますが、ブリッジする情報はERC-721に規定された所有情報のみになります。それぞれのnetworkにデプロイされたbridge contract経由でNFTがブリッジされます。
## NFTの取り扱い
![NFT Bridge](/img/docs/technologies/nft-bridge.png)
NFT
NFTには最初にmintされるGenuine Chainと、実際に利用されるMain Chainが存在すると考えます。NFTの情報において、ERC-721に定義された所有情報の正情報はGenuin Chainに存在し、それ以外の情報はMain Chainに存在するという考え方です。その中でNFT Bridge対象となるのはERC-721の所有情報だけで、bridge先の状態はGenuin Chainに所有情報が反映されるまでのCacheであると考えます。
## Bridge Contract
Genuine Chain to Other Chain Bridge Contractにtransferする形でNFTをlockし、PoSでの複数署名の承認を受けた上で、bridge先のOther Chain上で該当NFTをmintします。
Other Chain to Genuine Chain Bridge ContractでNFTをburnし、PoSでの複数署名の承認を受けた上で、bridge先のGenuine Chain上で該当NFTをtransferします。
