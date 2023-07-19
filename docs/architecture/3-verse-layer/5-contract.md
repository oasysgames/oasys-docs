---
---

# Contract on Verse
Th Verse Layer is also EVM compatible. Therefore, any contract in the Ethereum ecosystem can be migrated to the Oasys without any additional modifications. Furthermore, any existing developer tools such as Truffle or web3.js are also compatible. Thus, there is no friction for developers. The development experience is the same as with Ethereum.

## Preset Contracts
The Verse layer is under the control of each Verse's builders. Therefore, contracts deployed on the Verse are also under their control.

However, there is a set of preset contracts that are common across all Verses. These contracts are used to facilitate the bridging process. They help establish a standardized ecosystem across all Verses. Here is the list:

| Name | Description | Address | Referenced Code |
|----------------|-------------| ------------- | ------------- |
| L2CrossDomainMessenger | The L2 Cross Domain Messenger contract sends messages from L2 to L1, and is the entry point | 0x4200000000000000000000000000000000000007 | [L2CrossDomainMessenger.sol](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/L2/messaging/L2CrossDomainMessenger.sol) |
| L2StandardBridge | The L2 Standard bridge is a contract which works together with the L1 Standard bridge to enable OAS and ERC20 transitions between L1 and L2 |0x4200000000000000000000000000000000000010 | [L2StandardBridge.sol](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol) |
| L2ERC721Bridge | The L2 ERC721 bridge is a contract which works together with the L1 Standard bridge to enable NFT transitions between L1 and L2 |0x6200000000000000000000000000000000000001 | [L2ERC721Bridge.sol](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/oasys/L2/messaging/L2ERC721Bridge.sol)
| L2StandardTokenFactory | Factory contract for creating standard L2 token representations of L1 ERC20s compatible with and working on the standard bridge | 0x4200000000000000000000000000000000000012 | [L2StandardTokenFactory.sol](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/L2/messaging/L2StandardTokenFactory.sol)
