---
---

# Contracts
The Hub Layer is EVM compatible. Therefore, any contract in the Ethereum ecosystem can be migrated to the Oasys without any additional modifications. Furthermore, any existing developer tools such as Truffle or web3.js are also compatible. Thus, there is no friction for developers. The development experience is the same as with Ethereum.

## Preset Contracts
The Hub Layer includes a set of preset contracts that are essential to our ecosystem. Here is the list:

| Name | Description | Address | Referenced Code |
|----------------|-------------| ------------- | ------------- |
| StakeManager | The core contract of the proof-of-stake. | 0x0000000000000000000000000000000000001001 | [StakeManager.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/StakeManager.sol) |
| OASMultiTransfer | A utility contract to transfer multiple OAS tokens in a single transaction. | 0x520000000000000000000000000000000000002c | [OASMultiTransfer.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/util/OASMultiTransfer.sol) |
| WOAS | Wrapped Oasys Token. An ERC-20 standard token designed for easy token swaping. | 0x5200000000000000000000000000000000000001 | [WOAS.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/WOAS.sol) |
| SOAS | Stakeable Oasys Token. | 0x5200000000000000000000000000000000000002 | [SOAS.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/SOAS.sol) |
| LOAS | Locked Oasys Token. | 0x5200000000000000000000000000000000000023 | [LOAS.sol](https://github.com/oasysgames/oasys-genesis-contract/blob/main/contracts/token/LOAS.sol) |
| L1StandardERC20Factory | Contract that deploys the Oasys Standard ERC20. | 0x5200000000000000000000000000000000000004 | [L1StandardERC20Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/oasys/L1/token/L1StandardERC20Factory.sol) |
| L1StandardERC721Factory | Contract that deploys the Oasys Standard ERC721. | 0x5200000000000000000000000000000000000005 | [L1StandardERC721Factory.sol](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/oasys/L1/token/L1StandardERC721Factory.sol) |
