---
sidebar_position: 1
---
# 4-1. Ecosystem Design
## Overview
Oasys is a multi-layered EVM-Compatible PoS public blockchain that solves some of the pain-points game developers experience on other blockchains. Oasys blockchain consists of a highly scalable Layer 1 called Hub-Layer and a Layer 2 called Verse-Layer.
![Ecosystem Design](/img/docs/whitepaper/solution/ecosystem-design.png)
## Verse-Layer (Layer 2)
### High-Speed Optimistic Rollups
![Optimistic Rollups](/img/docs/whitepaper/solution/high-speed-or.png)
Normal Optimistic rollups establish the network through trust in a mechanism to verify fraudulent transactions by fraud-proof from an unspecified number of parties. In contrast, Oasys' Optimistic rollups establish the network through trust in two factors: the Verse Builder that operates the Verse-Layer (Layer 2); and fraud-proof by the Appointed Verifier.

First, users need to trust that content providers will develop and operate content sustainably and soundly. At Oasys, the Verse Builder plays that role, winning the users’ trust through sustainable and sound content operations. Since all transactions are verifiable, a Verse Builder cannot easily cheat. Therefore, the more trustworthy the Verse Builder is, the more resistant the Verse will be to tampering. Verse Builders can also appoint one or more Appointed Verifier(s) when building a Verse, who will verify Rollups in return for financial incentives and their own trust as a 3rd party.

Oasys eliminates the 7-day challenge period from Optimistic rollups and allows transactions to be approved instantly at the same level as Web2 products. This is faster than any other blockchain and Layer 2.

In addition, since all data on Oasys is stored in the Hub-Layer, high data availability is achieved, and even if the Verse-Layer is lost, it can be completely restored.

### Private Layer 2, Not Private Blockchain
![Private Layer2](/img/docs/whitepaper/solution/private-l2.png)
In order to achieve a multi-layered structure that can solve the Web3 dilemma, we concluded that using Layer 2 technology in blockchain games is the best solution in terms of Data Availability, Scalability, and Transaction Speed, rather than implementing a Private Sidechain.
Since the permanent existence of game assets is crucial for blockchain games, Layer 2 technology is suitable for these games. By using rollups, all data on Layer 2 is reflected on Layer 1. This means that even if Layer 2 is down, the data is technically guaranteed to be restored as long as Layer 1 is running (high data availability). However, in the case of a private sidechain, it is not technically guaranteed.

Thanks to private Layer 2 transaction speed, users can experience the same seamless experience as traditional online games on Web2, which existing blockchain solutions cannot provide.

### Support for ZK-rollups and New Technologies
We believe that several Layer 2 solutions would be optimal for Oasys, but at this moment, we only support Optimistic rollups. As the development of Ethereum scaling solutions continues to progress, we will launch other suitable technologies at the right time.
![Optimitc to ZK](/img/docs/whitepaper/solution/zk-support.png)
### Scam Resistance
The Hub-Lyer specializes in storing and exchanging data securely and in a stable manner, so it does not allow applications to run directly. Since Verse Builders manage the Verse-Layer, each can be designed to be permissioned, semi-permissioned or permissionless, with limited or no restrictions on dApps deployed. Through their authority, the Verse Builders can reduce scam projects and encourage high quality dApps allowing them to confidently invite a wide variety of users into their Verse Layer.

## Hub-Layer (Layer 1)
### High Network Stability
Block time is set to 15 seconds, the same as Ethereum, which is enough time to transfer data to globally distributed nodes. The Hub-Layer has enough resilience to operate with thousands of Verse-Layers connected, without the risk of network failure due to trouble with nodes.
### High Scalability
In principle, the Hub-Layer can only be used for FT, NFT, Bridge, and Rollup contracts, only the Verse Layer will experience heavy traffic. Exceptionally, some contracts may be deployed on the Hub-Layer from Oasys-approved EOAs (Externally Owned Account), but these have been vetted by Oasys, so the stability of the blockchain remains unaffected. Also, when posting Verse-Layer transactions to the Hub-Layer, rollups are used to minimize the number of transactions onto the Hub-Layer. This enables scalability that does not depend on an increase of Verse-Layer transactions.
### High Data Availability
Transaction data on the Verse-Layer (Layer 2) is reflected on the Hub-Layer (Layer 1), so any event in the Verse-Layer is verifiable.
### Eco-Friendly
Oasys is an environmentally friendly blockchain that doesn’t consume energy unnecessarily because of its PoS-based consensus mechanism, so the cost of gas fees for developers will be minimal.
