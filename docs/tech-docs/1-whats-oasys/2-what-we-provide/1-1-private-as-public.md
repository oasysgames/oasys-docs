# Generate Your Own Verse

## Issue

When you make a game, there's much interaction. Games requires much processing on the network, and game servers requires cloud computing or good scalability. 
When designing Oasys, we first and foremost wanted to concentrate on optimizing it for games.
We found that many chains were designed with general purpose usage in mind, but not optimized for gaming. 

Commonly designed chains are suitable for a wide variety of purposes, use a variety of networks and suit the needs of many users.
However they don't use a dedicated network wich has many disadvantages for game operators.

<!-- TRANSLATION: Not sure what is meant here by 'need to stand together' -->
Especially when using networks with bot transactions and arbitrage trading, which is common in Defi, game operators need to stand together when unwanted parts are included on a chain.

## Solution 

1. Simple Public chain with Infrastructure 

Game companies often have their own servers, and even if they use the cloud, they need to connect that service with their games. Using Oasys makes this simple through a dedicated chain. 

2. Dedicated TPS for Builders

<!-- TRANSLATION: Not quite sure if I got the right meaning here about single and multi core rendering -->
The limit of 'Transactions Per Second' on common EVM chains is 3000 to 4000. Therefore, the limitation of single-core rendering, and even multi-core rendering, can result in a less stable network.
From the builder's point of view, if you monopolize transactions that occur in one version of Oasys or combine multiple versions into a single model, you can match 100,000 TPS compared to the 3000-4000 TPS of other chains. 

3. Decentralized with a Fast module 

The L2 deployed by Oasys is supplied with dispersibility from the Hub Layer, which is the most critical layer in the blockchain and responsible for safety.