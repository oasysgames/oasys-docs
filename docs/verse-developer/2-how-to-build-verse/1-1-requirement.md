# Requirement

## Verse-Layer Hardware Requirements

### Recommended Environment
These are standard requirements, but of course, they can vary depending on the expected amount of on-chain activity on your Verse. We highly recommend you to start your Verse with the provided specifications, and then adjust them as needed, based on usage.

|OS|Spec|
|--|---------|
|OS|Linux|
|CPU|4 Core / 2/5GHz / x86_64|
|RAM|16GB|
|DISK|500GB SSD|
|Network|100Mbps|

Please note that a blockchain cannot be horizontally scaled (you cannot create redundant infrastructure by creating multiple nodes). A blockchain node must be standalone (although [read-only nodes](/docs/verse-developer/how-to-build-verse/1-8-read-node) can be created).

In terms of CPU, the consensus-making workload is computation-intensive. However, this is a sequential task, so simply increasing the number of cores will not solve the problem. The only solution is to use a CPU with a higher single-core performance.

Verse generally uses more CPU power. Using a CPU with a higher frequency can increase the Verse transaction processing speed, especially when dealing with a large number of pending transactions.

## Firewall Settings
- TCP/UDP port 30303 allowed (for P2P between nodes)
- TCP port 8545 allowed (for RPC)
- TCP/UDP port 4101 allowed (for Verse Verifier)

## RPC Settings
- Secure Domain to set RPC_URL
(e.g. `verse1.com`)

- After building Verse, set RPC_URL to Verse IPaddress by DNS
(e.g. `rpc.mainnet.verse1.com`)

## Explore Settings
- Secure Domain to set EXPLORER_URL
(e.g. `verse1.com`)
- After building Verse explorer, set EXPLORER_URL to Verse explorer IPaddress by DNS
(e.g. `explorer.mainnet.verse1.com`)

## ChainId Register
It is recommended to secure the chainId with [EVM-based Chains](https://github.com/ethereum-lists/chains) beforehand.

e.g. [Register oasys mainnet chainId](https://github.com/fromreto/chains/commit/00aa7728b1b1180f9e2f6f284ccb585be956d524)

