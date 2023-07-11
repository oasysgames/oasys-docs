---
---

# Contracts
The Hub Layer is EVM compatible. Therefore, any contract in the Ethereum ecosystem can be migrated to the Oasys without any additional modifications. Furthermore, any existing developer tools such as Truffle or web3.js are also compatible. Thus, there is no friction for developers. The development experience is the same as with Ethereum.

## Preset Contracts
The Hub Layer includes a set of preset contracts that are essential to our ecosystem. Here is the list:

| Name | Description | Address |
|----------------|-------------| ------------- |
| StakeManager | The core contract of the proof-of-stake |0x0000000000000000000000000000000000001001 | 
| OASMultiTransfer | A utility contract to transfer multiple OAS tokens in a single transaction | 0x520000000000000000000000000000000000002c |
| WOAS | Wrapped Oasys Token. An ERC-20 standard token designed for easy bridging | 0x5200000000000000000000000000000000000001 |
| SOAS | Stakeable Oasys Token | 0x5200000000000000000000000000000000000002 |
| LOAS | Locked Oasys Token | 0x5200000000000000000000000000000000000023 |
| L1StandardERC20Factory | Contract that deploys the Oasys Standard ERC20 | 0x5200000000000000000000000000000000000004 |
| L1StandardERC721Factory | Contract that deploys the Oasys Standard ERC721 | 0x5200000000000000000000000000000000000005 |
