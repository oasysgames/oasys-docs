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

There are two types of registration for builders to make in order to be displayed on Oasys Hub (https://hub.oasys.games/). 
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
