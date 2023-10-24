# Introduction
Oasys ecosystem consists of two major parts by structure: Hub Layer and Verse Layer. Hub Layer is responsible for data availability, security, and stability of the entire ecosystem, with the backing of trustworthy validators. Verse Layer is the contents layer and its the home for all the games. The primary concern of every verse layer is gamers and game developers. Please see the separate document to learn more about the Oasys architecture: [Verse Layer](/docs/architecture/verse-layer/verse-layer).

Oasys being an EVM compatible, offers the most available dev resources in most EVM chains without much modification. Most EVM developer tools can also be used in Oasys. This also gives another benefit of the migration of your games with minimal costs. In most cases, all you need is to change the chain ID, and RPC endpoint URL.

## Selecting as a builder in Oasys
The games on Oasys will only be on L2, which means game developers need a place, an L2, Verse-Layer, to deploy games. As a result, game companies will have to decide between the two options:
1. Deploy solely game titles on any existing Verse
2. Become a verse builder and deploy their own games and/or games sourced from 3rd-parties on their own Verse.

Below flow chart describes the steps required to deploy your game.

![selecting](/img/docs/techdocs/verse/selecting.png)


## Selecting a verse partner
If a game company is looking to deploy a game title without building its own verse, a game company needs to get in touch with respective verse builders. Oasys team can also help respective game companies to be connected with respective verse builders.
- Contact directly
  - You can navigate onto [Verse Contact List](/docs/verse-developer/contact-list)
- Leverage verse matching opportunities
  - Introduce the most suitable verse for you on [Oasys Discord](https://discord.gg/oasysgames). Please create a ticket in the `#verse-matching` channel under the Developer category and provide the necessary details. The Verse Builder will review it and take action accordingly.

## Build a Own Verse
In principle, anyone with a deposit of 1 million OAS tokens can create an L2 on Oasys.

The rest of this document describes the technical manual in order for game companies to deploy a verse layer. In order to deploy a L2 contract, potential verse builders are required to deposit 1,000,000 OAS tokens as a minimum requirement, which will be returned to the depositor(s) after approximately 180 days.

### Connect to the Oasys Ecosystem Integration
We will integrate with the Oasys ecosystem. Listing on the [Dashboard](/docs/ecosystem/Dashboard) and [DeFi](/docs/ecosystem/Defi) (especially cross-chain bridges and Hub↔︎Verse Layer bridges) is crucial.

### Onboarding
Oasys provides onboarding for Verse Builders. We support Verse Builders in their endeavors and assist with integration into the ecosystem.

### Set of Sub-Components
We highly recommend integrating these sub-components with your verse building. They can significantly enhance your end user's experience.

#### 1. Explore
End users typically use an explorer to interact with the blockchain, such as checking the balance of a specific address or the status of a transaction. Therefore, having an explorer is essential. Below is the guideline to build an Explorer. You can apply your brand theme by customizing its colors.

[Guide to Build Explorer](/docs/verse-developer/how-to-build-verse/explorer)

Please be aware that if end users intend to use the exported CSV for tax calculations or accounting purposes, refer to the [CSV Download](/docs/staking/explore/1-2-csv-download) section for more details.

While a gaming-specialized explorer with a unique user experience hasn't emerged yet, we currently use the reputable open-source explorer, Blockscout. We've made minor modifications to fit our architecture while retaining its original functions.

#### 2. Indexer
The indexer is used to query blockchain data in a more conventional manner, similar to web2. Given that gaming queries tend to be complex, we believe it's beneficial to provide an indexer for game builders. Consider exposing the indexer endpoint to game developers in your verse to facilitate game development.

[Guide to Build Indexer Manually](/docs/verse-developer/how-to-build-verse/the-graph)

We use The Graph as our standard option for the indexer because we believe it's the de facto standard in the web3 industry.

Alternatively, you can request indexing services from providers like [Footprint](https://www.footprint.network/) or [Web3 Cloud(Ginco)](https://web3cloud.ginco.co.jp/). These providers generally have higher fees, so they might be a secondary choice once your verse user ecosystem expands or if you're concerned about the costs associated with operating an indexing node.

#### 3. Wallet
Oasys is compatible with any wallet in the Ethereum ecosystem. We especially feature the Oasys Passport, which is developed for gaming purposes. Please check the official site below.

[Oasys Passport Official Site](https://www.oasys-wallet.com/en)

#### 4. Built-in Bridge UI
We believe that incorporating a bridging UI into your game can enhance the user experience. Typical gamers might not be familiar with crypto-friendly bridging UIs. Therefore, seamlessly integrating a bridging function into games can be beneficial. We are considering providing something like an SDK to facilitate the built-in bridge UI if there's high demand.

