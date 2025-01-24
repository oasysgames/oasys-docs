# Optional Configurations

## Address List

After the set up, you may configure files in the: 

```
/oasys/addresses.json
```

After you open it, You may see a few addresses. This is because contract updates may change those addresses. 
You need to send your tokens to the `sequencer address` for sending gas and Use L1 bridge address from `addresses.json` to use the bridge.

```JSON
{
    "Lib_AddressManager": "0x158b3E793bc212F5fC0A91de13B6C764fb8D436D",
    "OVM_Sequencer": "0x900AcdE2455D0791F2AC9220ab700Be9B88886c2",
    "OVM_Proposer": "0xA9ea09F28Cc491eB92337A7AC243FaB4017509FA",
    "CanonicalTransactionChain": "0x905554Aa5511C4FE1131bB8Cc7626fC4CC86E7e0",
    "ChainStorageContainer-CTC-batches": "0x4018839b2bAF87E69cf0d83d8A5bA0553E750417",
    "StateCommitmentChain": "0x30DF12C6Ba5e44b1cfe9ecdc987184A0ea34Da49",
    "ChainStorageContainer-SCC-batches": "0xde4121E8dB9B29fCF9354274a6726B176EC8a545",
    "BondManager": "0x121b3E44dDD0a3E55620346436Ef8C93a51eD1dd",
    "OVM_L1CrossDomainMessenger": "0x4957BeA0F36d41327a0E8c17B79A98A8B76c3eF7",
    "Proxy__OVM_L1CrossDomainMessenger": "0x533d078614527c97219F53BB90E72c3a7A400a1d",
    "Proxy__OVM_L1StandardBridge": "0x0C13f0299DD6B51D547d27C547DA14077Ad4BfFE",
    "Proxy__OVM_L1ERC721Bridge": "0x1B479728F2EF8c74eFe0e1596f46e2F9b1f11529",
    "L2CrossDomainMessenger": "0x4200000000000000000000000000000000000007"
}
```

#### OVM_Sequencer 

It works as L2 Sequencer. 

#### OVM_Proposer

It works as L2 Proposer. Mainly handles messaging.

#### CanonicalTransactionChain

Works as a sequencer. 

#### StateCommitmentChain

Works as a proposer. 

#### navigating on L1 deposit address
 
You can take [L1 deposit address](https://github.com/oasysgames/oasys-optimism/blob/8f1467bf973a6587fb7482e60cecaf7c50ee78f9/packages/contracts/contracts/oasys/L1/build/L1BuildDeposit.sol#L37) from following the event. 

Or you can see `0x5200000000000000000000000000000000000009` 's log on verse building. 


## Related Factory Contract 


### Hub Layer 

#### Factory Contract

Factory contract deployed by validator helps deploy some tokens or verse on Oasys or bridging tokens on Oasys.
You can check [factory contract](https://github.com/oasysgames/oasys-validator/blob/e33f9c71d4c2bb2ba62f94c979c3d293979904d9/contracts/oasys/contracts.go) for list of factory contract. 


```JSON
L1StandardERC20Factory: '0x5200000000000000000000000000000000000004'
```
Standard ERC20 Factory contract is a tool for deploying ERC-20 tokens on Hub Layer.

```JSON
L1StandardERC721Factory: '0x5200000000000000000000000000000000000005'
```

Standard ERC 721 Factory contract is a tool for deploying ERC-721 tokens on Hub Layer.

#### Bridge Contract
L1_Bridge_Contract address is different for each Verse-Layer.

```JSON
"Proxy__OVM_L1CrossDomainMessenger": "0x6D544390Eb535d61e196c87d6B9c80dCD8628Acd",
"Proxy__OVM_L1StandardBridge": "0xB1eDe3F5AC8654124Cb5124aDf0Fd3885CbDD1F7",
"Proxy__OVM_L1ERC721Bridge": "0xA6D6d7c556ce6Ada136ba32Dbe530993f128CA44",
```


### Verse Layer 

Pre-Deployed contracts. All Verse Layer Contracts are the same. 

```json
L2CrossDomainMessenger: '0x4200000000000000000000000000000000000007',
```

```JSON
L2StandardBridge: '0x4200000000000000000000000000000000000010',
```

```json
L2StandardTokenFactory: '0x4200000000000000000000000000000000000012',
```

```JSON
L2ERC721Bridge: '0x6200000000000000000000000000000000000001',
```

Because the L2StandardERC721 contract is not pre-deployed, if you use ERC721, you have to deploy [L2StandardERC721](https://github.com/oasysgames/oasys-optimism/blob/develop/packages/contracts/contracts/oasys/L2/token/L2StandardERC721.sol).

## Adding Chainlist 

Chainlist is a web that provides an easy way to add a chain for users. It is recommended for all verses to add a verse on Chainlist. 

:::caution
If you are on dev mode for verse, adding chainlist will open your verse information to public.
::::::

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

## Gas Fee

By default configuration, the verse operates gas-free. However, if you wish, you can implement a gas fee system. Concerning the gas currency, the default choice is the bridged OAS, which is the native token of the Hub layer (L1). This choice isn't mandatory, but if you want to use a different token as the gas fee, such as your verse's native token, it would require additional development on the [oasys-optimism](https://github.com/oasysgames/oasys-optimism).



### How is the gas fee implemented?
In reality, whether a gas fee is applied or not depends on the user's choice. If a user sends a transaction with a non-zero gas price, the calculated gas cost (gas used * gas price) is automatically deducted.

The gas-free environment on a Verse is achieved by setting the minimum gas price. By default, the minimum gas price is set to zero. If the price is zero, no gas fee is deducted because the calculated gas cost will always be zero.

:::info Note

The fee mechanism on a Verse does not support [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), despite the Verse being originally forked from Geth, which is an implementation of the Ethereum protocol.

:::

### How to set a non-zero gas price?

You have two options. The first is through the `miner.gasprice` flag when you start your verse. The other one is via the `GASPRICE` environment variable.

#### For users who have followed the [previous steps](/docs/archive/verse-v0/manual#2-clone-verse-layer-optimism-repository), specifically those using [verse-layer-optimism](https://github.com/oasysgames/verse-layer-optimism).

You can set the GASPRICE setting in the `docker-compose.yml` to your desired value. Please note that the unit is `wei`.

Here is an example of setting the gas price to 1 Gwei:
```yml
x-l2geth-environment: &l2geth-environment
  # ...
  GASPRICE: 1000000000
  # ...
```

#### For users who want to run their verse with an option flag

Please just append the flag in your command line.

Here is an example of setting the gas price to 1 Gwei:
```sh
geth \
  --miner.gasprice 1000000000 \
  # ...
```
