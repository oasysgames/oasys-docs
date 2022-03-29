---
sidebar_position: 2
---
# 4-2. FT / NFT Design
## 自由度の高いトークンデザイン
Fungible Token(以下FT), Non-Fungible Token(以下NFT)は、エコシステムのTokenomicsに欠かせないアセットです。Oasysでは独自のLayer構造により3種類のFT/NFTを活用したトークンデザインが可能です。
![Token Design](/img/docs/solution/toekn-design.png)
### 1. 利用制限を加えたFT / NFT(vFT / vNFT)
vFT / vNFTはOasys Verse-Layer上でMintされるFT / NFTであり、特定のVerse-Layerでしか使用できない制約を加えることができます。これを用いることでクロスチェーンブリッジさせたくないFT（ゲーム内通貨等）やNFT（IP等）をデザイン可能です。
### 2.インターオペラブルなFT / NFT(oFT / oNFT)
oFT/ oNFTはOasys Hub-Layer上でMintされるFT / NFTであり、全てのVerse-Layerで利用可能なだけでなく、クロスチェーンブリッジを用いることで別のブロックチェーンに送ることができるインターオペラビリティの高いトークンです。
### 3. 外部チェーンでmintしたFT / NFT(exFT / exNFT)
exFT / exNFTはOasys外のネットワークでMintされたトークンです。クロスチェーンブリッジによりOasysのHub-Layer及びVerse-Layer上で利用可能です。
## FT / NFTのCross-Chain Bridge
FT / NFTのBridgeは、FTならvFT, exFT、NFTならvNFT, exNFTのみが利用可能です。
Oasys純正のNFT Bridge
NFTVerse間転送については、Oasysが純正Bridgeを開発・提供します。
純正Bridgeでは、Lock & Mint方式を用いており、Bridgeの際にBridgeする前のチェーンでTokenをLockし、Bridgeした後のチェーンでMintするという技術を用います。
高セキュリティのクロスチェーンブリッジ
多くのクロスチェーンブリッジは流動性として大量の資金を準備金として保有するためハッカーに狙われやすく、一度エクスプロイトをしてしまうとエコシステム全体に問題が波及するので大きなリスクをはらんでいます。

Oasysでは「Hub-LayerとVerse-Layerの間」及び「Verse-Layer間」でのBridgeには中央集権的な3rd Partyのブリッジ事業者を介在させないことでセキュアなブリッジを可能にします。
![Token Bridge](/img/docs/solution/bridge.png)