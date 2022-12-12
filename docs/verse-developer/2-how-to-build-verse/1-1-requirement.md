# Requirement

## Verse-Layer Hardware Requirements

### Recommended Environment
|||
|--|---------|
|OS|Linux|
|CPU|4 Core / 2/5GHz / x86_64|
|RAM|8GB DISK|
|DISK|500GB SSD|
|Network|100Mbps|
Verse uses more CPU. Using Higher Frequency for CPU when having much pending transaction in Verse can have a higher verse transaction processing speed for Verse.


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
- Secure Domain to set EXPLORE_URL
(e.g. `verse1.com`)
- After building Verse explore, set EXPLORE_URL to Verse explore IPaddress by DNS
(e.g. `explore.mainnet.verse1.com`)

## ChainId Register
It is recommended to secure the chainId with [EVM-based Chains](https://github.com/ethereum-lists/chains) beforehand.

e.g. [Register oasys mainnet chainId](https://github.com/fromreto/chains/commit/00aa7728b1b1180f9e2f6f284ccb585be956d524)

