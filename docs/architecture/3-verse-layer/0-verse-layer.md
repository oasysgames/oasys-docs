---
---

# Verse Layer

## Outline
The Verse-Layer is Oasys' Layer 2 Blockchain. While we believe there are several optimal Layer 2 solutions that meet Oasys' requirements, the only implementation we currently support is Optimism. Optimism's node implementation was forked, and only minimal necessary modifications have been added. The Verse-Layer is expected to be operated as a Permissioned Layer 2 in most cases.

![Verse Architecture](/img/docs/tech/verse/versearchitecture.png)

## Fraud Proof on Permissioned Layer 2
It takes 7 days for decentralized fraud-proof for Optimistic rollups. However, we believe that the 7-day challenge period can be minimized because any fraud on a permissioned Layer 2 can become a reputational risk for the entity that operates the verse. Occurred events can be verifiable as the transaction data on Layer 2 is reflected on Layer 1 for data availability.

## Verse Builder
Anyone can build a verse if they deposit more than 1 million OAS on the verse contract. On the Verse-Layer, a Verse Builder takes care of node operations and is required to operate the server properly. Also, you can configure what smart contracts can be deployed and what transactions can be executed without using any gas.

## Free Gas For Users
On Oasys verse,users don't have to pay gas fees, which is paid by verse operators. 
By taking transacation fees from verse builders, it can maintain sustainablity.
