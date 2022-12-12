# 2 Layer System, Hub & Verse

Oasys has two layers. Hub Layer / Verse Layer. 
Adopting two layers overcomes scalability limitations and allows the design to be based on where it needs to be. 
When designing two layers, the most thoughtful part is compatibility with Ethereum. 

## ## Hub Layer

When thinking about various chains, the compatibility of chains is essential. If the code is not used elsewhere, it causes much inconvenience for developers. 
If you can't use new and existing tools and have to think about simple things, it's a big problem for developers. 

To create a structure that is most similar to Ethereum and creates synergy, We decided to fork geth(Go ethereum). Of course, when a new version update or new technology reveals, we will look deeply and adopt on to new technology. 
Also, In order to provide a stable environment for blockchain use, application execution is left to the Verse-Layer, and the Hub-Layer is restricted to limited uses for recording rollup information, managing FT/NFT, and managing bridge information. **Smart contracts cannot be deployed directly on Hub-Layer**.


## ## Verse Layer

Using Ethereum only might inconvenient for playing games. In a game with many transactions, there is a need for a network that can handle many transactions. 
In terms of compatibility, we had two idea while making verse. 

1. Verse's method of making is simple and similar. 

In the case of Verse, if you think about the teams that come into the ecosystem, if the structure is very different, it will interfere with the design. So to solve this problem, we have made verse building contract simple as possible.

2. Safe Verse. 

In Verse, you have to be able to prevent scams because user have to play real games. Bots harms network stability, to prevent bots, we have scam resistance solution.