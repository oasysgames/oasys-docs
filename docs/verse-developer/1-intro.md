# Introduction
Firstly, I would like to address the issue of migration costs from Ethereum, Polygon, or other EVM chains for developers who are considering migrating to or selecting Oasys as their gaming development platform.

**The migration costs in our ecosystem are minimal**. Our verses are EVM compatible, meaning any smart contract written in Solidity can be migrated without any modifications. Moreover, all the developer tools for the Ethereum ecosystem can also be used in Oasys. In most cases, all that's required is to change the chain ID and the RPC endpoint URL.

Our architecture is divided into two layers. The first layer is the Hub layer, which manages the security of the entire ecosystem, and this is where the validators reside. The second layer is the Verse layer, which serves as the home for each game. The Verse is the primary concern for game developers. If you're interested in learning more, please refer to the architecture section of this document: [Verse Layer
](/docs/architecture/verse-layer/verse-layer).

# Selecting as a builder in Oasys

The games on Oasys will only be on L2, which means it will require a place, an L2, Verse-Layer, to deploy games. As a result, game companies will have to decide between two options: 
1. Deploy solely game titles
2. Become a verse builder and deploy their own games and/or games sourced from 3rd-parties.

## Build a Game

### 1. Deploying a game on Oasys

In order to deploy a game on Oasys, it is required to have a verse-layer (L2 of Oasys), either one of existing ones, or a new verse-layer built by a game company. Below flow chart describes the steps required to deploy your game. 

![deploy](/img/docs/techdocs/verse/game.png)

### 2. Selecting a verse partner

If a game company is looking to deploy a game title without building its own verse, a game company needs to get in touch with respective verse builders. Oasys team can also help respective game companies to be connected with respective verse builders. 

You can navigate onto [Verse Contact List](/docs/verse-developer/contact-list)

### 3. Registering your game and verse on Oasys Hub

There are two types of registration for builders to make in order to be displayed on [Oasys Hub](https://hub.oasys.games/). 
After building a verse, a new verse builder needs to register necessary information through the below registration form. 

#### ✅Oasys Verse Registration for Oasys Hub
https://forms.gle/9WM2ffqBpG4y1bGE9

 Another registration is game title registration, which is recommended to be aligned with verse builders for game registration. 

#### ✅Game Title Registration for Oasys Hub
https://forms.gle/ALtAsFpx8rq3XMcA8

In case any confirmation for registration through either forms is needed, please reach out to the Oasys team for support. 

## Build a Verse

In principle, anyone with a deposit of 1 million OAS tokens can create an L2 on Oasys.

The rest of this document describes the technical manual in order for game companies to deploy a verse layer. In order to deploy a L2 contract, potential verse builders are required to deposit 1,000,000 OAS tokens as a minimum requirement, which will be returned to the depositor(s) after approximately 180 days. 

### Onboarding (migrating)

In the case of onboarding games on existing verses, direct contact is recommended for the smooth onboarding of game titles. 

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

[Oasys Passport Official Site](https://www.oasys-wallet.com/)

#### 4. Built-in Bridge UI
We believe that incorporating a bridging UI into your game can enhance the user experience. Typical gamers might not be familiar with crypto-friendly bridging UIs. Therefore, seamlessly integrating a bridging function into games can be beneficial. We are considering providing something like an SDK to facilitate the built-in bridge UI if there's high demand.
