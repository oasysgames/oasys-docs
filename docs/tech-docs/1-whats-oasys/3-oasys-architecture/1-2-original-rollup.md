# Oasys Optimistic Rollup


## Multiple Optimistic Rollup

Oasys is always looking for and validating new technologies.
First we need to explain why Oasys is using Optimistic Roll-up: 
In Ethereum's Layer 1 structure, there were many scalability problems.
Even though many users and developers have a need for quick transactions, Ethreum is unable to meet those expectations due to the overall slow transaction speeds.
Solving this issue was a high priority for us when designing Oasys and Optimistic Roll-Ups were deemed the most reliable scaling solution at this point.

In the case of the existing Layer 2 solutions, the second layer is greatly affected by Ethereum's status. 
And this causes issues because Ethereum is a multi purpose chain and not optimized for games.

To address this and ensure the verses' independence, Oasys has formed a Multiple Optimistic Rollup structure. 
The architecture of multiple Optimistic Rollups is different from the common idea that many transactions occur at Layer 1.
Games require fast transactions and features like the Verse Layer provide stability to the Hub Layer, which makes Oasys unique. 

## Overcoming EVM 

Of course, EVMs have limitations in their design. 

The compatibility with Ethereum is an opportunity to use many tools and libraries in development, but in the case of EVM, the VM model is defined in a single core, which creates performance issues. 
Due to the model of EVMs they'll always have scalability issue and a TPS limitation when playing games makes them disadvantageous for game designers.

In the case of Oasys, you can avoid TPS limitations by organically connecting various Verses through Multiple Optimistic Rollups. 
It's possible to put together several machines to achieve the desired level of performance and elasticity. 
This organic connection is possible by opening a WebSocket between Verses, which becomes a scaling solution for high-speed transactions.