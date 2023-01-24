# 2 Layer System, Hub & Verse

Oasys has two layers. The Hub Layer and the Verse Layer, since adopting a two layers design overcomes scalability limitations. 
When designing the system with two layers in mind, the most important part was compatibility with Ethereum.

## ## Hub Layer

When considering a multi-chain environment, EVM compatibility is essential.
If the code you write cannot be used elsewhere, it causes a lot of inconvenience for developers.
If you can't use well established tools or new tools which change the industry standard, it forces you to stop and think about even the simplest things and this is a big problem for developers.

To create a structure that synergizes with and is most similar to Ethereum, we decided to fork geth(Go ethereum) and base Oasys on it. When a new version update or completely new technology manifests itself, we'll take a deep look and adopt it into Oasys. 
Also, In order to provide a stable environment for blockchain use, application execution is left to the Verse-Layer, and the Hub-Layer is restricted to limited uses for recording rollup information, managing FT/NFT, and managing bridge information. **Smart contracts cannot be deployed directly on the Hub-Layer**.


## ## Verse Layer

Using only Ethereum might be very inconvenient for playing games. Games usually execute many transactions, so there's a need for a network that can handle a large amount of transactions in a short time. 
In terms of compatibility, we had two main focuses while making the Verse Layer. 

1. Creating Verses needs to be simple and familiar. 

When thinking about the Verse Layer, we need to consider the teams coming into the Oasys ecosystem and how having a very different structure from other EVM based projects would make design and development harder for them.
So to solve this problem, we have made the verse building contract as simple as possible.

2. Verses need to be safe. 

Since users play games on the Verse Layer, we need to be able to prevent scams and unwanted behavior.
Bots will also harm network stability, so to prevent that we implemented some scam resistent solutions.