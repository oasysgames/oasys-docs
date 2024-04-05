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

Please note that a blockchain cannot be horizontally scaled (you cannot create redundant infrastructure by creating multiple nodes). A blockchain node must be standalone (although [read-only nodes](/docs/verse-developer/how-to-build-verse/read-node) can be created).

In terms of CPU, the consensus-making workload is computation-intensive. However, this is a sequential task, so simply increasing the number of cores will not solve the problem. The only solution is to use a CPU with a higher single-core performance.

Verse generally uses more CPU power. Using a CPU with a higher frequency can increase the Verse transaction processing speed, especially when dealing with a large number of pending transactions.

## Firewall Settings
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

## Registering Your Verse ChainId on Chainlist
To ensure global uniqueness, it's crucial that your Verse's ChainId is distinct. Verify its uniqueness by consulting [Chainlist](https://chainid.network/), a platform that facilitates the addition of new chains for users. We strongly recommend that all Verse instances be registered on Chainlist to maintain a globally unique ChainId.

Example of Oasys Mainnet Registration: [github.com/fromreto/chains/commit](https://github.com/fromreto/chains/commit/00aa7728b1b1180f9e2f6f284ccb585be956d524)

### Procedure for adding Chainlist
1. Navigate onto [Chainlist github](https://github.com/ethereum-lists/chains).
2. Fork the repo, add `_data/chains/eip155-your_verse_chain_no.json` & `_data/icons/your_chain_name.json`
3. Submit a pull request.

#### `_data/chains/eip155-your_verse_chain_no.json`

On `your_verse_chain_no`, you need to add a chain number not taken from other chain numbers.

Here is an example.

```json
{
  "name": "Oasys Mainnet",
  "chain": "Oasys", //Your O
  "icon": "oasys", //icon for your_chain_name.json
  "rpc": ["https://rpc-mainnet.oasys.games"], // RPC address
  "faucets": [],
  "nativeCurrency": {
    "name": "OAS", // Your Verse Currency name. If it does not have a currency, the default is OAS.
    "symbol": "OAS", // Your symbol
    "decimals": 18  // 18 Decimal is default on Oasys.
  },
  "infoURL": "https://oasys.games", // URL of your landing page.
  "shortName": "OAS",
  "chainId": 248, // Your chain ID
  "networkid": 248, // Your Network ID (you can select same as chain ID)
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://explorer.oasys.games", // URL of your explorer.
      "standard": "EIP3091" // Default is EIP3091
    }
  ]
}
```

#### `_data/icons/your_chain_name.json`

On `your_chain_name`, you need to add a chain name.

On the `icons` directory, you can add icon using the ipfs path.

```json
[
  {
    "url": "", // Your IPFS path of logo.
    "width": 3600, // IPFS icon's width in pixels.
    "height": 3600, // IPFS icon's height in pixels.
    "format": "png" // IPFS icon's format.
  }
]
```