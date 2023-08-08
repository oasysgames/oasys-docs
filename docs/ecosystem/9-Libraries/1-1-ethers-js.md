---
---

# Ethers.js

Ethers.js is a Javascript based library that allows Web3 developers to interact with the Ethereum blockchain ecosystem.

## Ethers.js Features

- Ethers.js gives developers more flexibility.
Ethers.js separated nodes into a `wallet` that holds keys and signs transactions and a `provider` that anonymously connects to Ethereum networks to check the status and send transactions.

- A micro library.
Ethers.js is a small-size library with fast load speeds. This gives the Ethers.js library an advantage if the amount of data affects the application, so Ethers.js is a good fit for creating dapps in the form of web pages.

- Well documented.
[Ethers.js](https://docs.ethers.io/v5/) provides users with a wide range of documents, from Tutorial documents for first-time users to API documents for each module in Ethers.js, and library test documents.

## Install Ethers.js

### node.js
```
/home/username/projectname > npm install --save ethers
```

### browser (UMD)
```
<script src="https://cdn.ethers.io/lib/ethers-5.6.umd.min.js" type="text/javascript">
</script>
```

### browser (ESM)
```
<script type="module">
    import { ethers } from "https://cdn.ethers.io/lib/ethers-5.6.esm.min.js";
</script>
```

## The core modules of Ethers.js
Among the modules in Ethers.js, we introduce the four core modules that comprise the API.

## Ethers.Provider
You can use the `Ethers.Provider` module to establish a connection to the Ethereum blockchain, run queries, and send signed transactions. The `Ethers.Provider` module and the `Ethers.Signer` module, described later, separates their work, allowing developers to develop more flexible developments.

The Providers available in Ethers.js can be set as follows :

### Default Provider
The Default Provider is the easiest and most common way to start development in Ethereum.

Returns a new provider supported by multiple services connected to the network. If the network is not provided, the mainnet is used.

```
ethers.getDefaultProvider([network,[options])
```

- Option Properties

|Property|Description|
|--|---------|
|alchemy|[Alchemy](https://alchemyapi.io/) API Token|
|etherscan|[Etherscan](https://etherscan.io/) API Token|
|infura|[INFURA](https://infura.io/) Project ID or {projectId, projectSeceret}|
|pocket|[Pocket Network](https://pokt.network/) Application ID or {applicationId, applicationSeceretKey}|
|quorum|The number of backends that must agree (default: 2 for mainnet, 1 for testnets)|

### Other Providers
- [JsonRpcProvider](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/)
- [API Providers](https://docs.ethers.io/v5/api/providers/api-providers/)
- [Others](https://docs.ethers.io/v5/api/providers/other/)
* Please check the link to see how to set up other providers.

## Ethers.Provider Methods
Here are some of the methods in Ethers.Provider. 

Please check [Ethers.Provider](https://docs.ethers.io/v5/api/providers/provider/) for additional method information.

### Account Methods 

- provider.getBalance(address[ ,blockTag=latest])

: Returns the balance of address as of the blockTag block height.

```
await provider.getBalance("ricmoo.eth");
// { BigNumber: "36427874538635857147" }
```

- provider.getCode(address[,blockTag=latest])

: Returns the contract code of address as of the blockTag block height. If there is no contract currently deployed, the result is 0x.

```
await provider.getCode("registrar.firefly.eth");
// '0x606060405236156100885763ffffffff60e060020a60003504166369...'
```

- provider.getStorageAt(addr,pos[ ,blockTag=latest])

: Returns the Bytes32 value of the position pos at address addr, as of the blockTag.

```
await provider.getStorageAt("registrar.firefly.eth", 0)
// '0x000000000000000000000000314159265dd8dbb310642f98f50c066173c1259b'
```

- provider.getTransactionCount(address[,blockTag=latest])

: Returns the number of transactions address has ever sent, as of blockTag. This value is required to be the nonce for the next transaction from address sent to the network.

```
await provider.getTransactionCount("ricmoo.eth");
// 45
```

### Blocks Methods

- provider.getBlock(block)

: Get the block from the network, where the result.transactions is a list of transaction hashes.

```
await provider.getBlock(100004)
// {
//   _difficulty: { BigNumber: "3849295379889" },
//   difficulty: 3849295379889,
//   extraData: '0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34',
//   gasLimit: { BigNumber: "3141592" },
//   gasUsed: { BigNumber: "21000" },
//   hash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//   miner: '0x909755D480A27911cB7EeeB5edB918fae50883c0',
//   nonce: '0x1a455280001cc3f8',
//   number: 100004,
//   parentHash: '0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781',
//   timestamp: 1439799168,
//   transactions: [
//     '0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c'
//   ]
// }
```

- provider.getBlockWithTransactions(block)

: Get the block from the network, where the result.transactions is an Array of [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) objects.

```
await provider.getBlockWithTransactions(100004)
// {
//   _difficulty: { BigNumber: "3849295379889" },
//   difficulty: 3849295379889,
//   extraData: '0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34',
//   gasLimit: { BigNumber: "3141592" },
//   gasUsed: { BigNumber: "21000" },
//   hash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//   miner: '0x909755D480A27911cB7EeeB5edB918fae50883c0',
//   nonce: '0x1a455280001cc3f8',
//   number: 100004,
//   parentHash: '0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781',
//   timestamp: 1439799168,
//   transactions: [
//     {
//       accessList: null,
//       blockHash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//       blockNumber: 100004,
//       chainId: 0,
//       confirmations: 15685487,
//       creates: null,
//       data: '0x',
//       from: '0xcf00A85f3826941e7A25BFcF9Aac575d40410852',
//       gasLimit: { BigNumber: "90000" },
//       gasPrice: { BigNumber: "54588778004" },
//       hash: '0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c',
//       nonce: 25,
//       r: '0xb23adc880d3735e4389698dddc953fb02f1fa9b57e84d3510a2a4b3597ac2486',
//       s: '0x4e856f95c4e2828933246fb4765a5bfd2ca5959840643bef0e80b4e3a243d064',
//       to: '0xD9666150A9dA92d9108198a4072970805a8B3428',
//       transactionIndex: 0,
//       type: 0,
//       v: 27,
//       value: { BigNumber: "5000000000000000000" },
//       wait: [Function (anonymous)]
//     }
//   ]
// }
```

### Network Status Methods

- provider.getNetwork()

: Returns the [Network](https://docs.ethers.io/v5/api/providers/types/#providers-Network) this Provider is connected to.

```
await provider.getNetwork()
// 
// {
//   chainId: 1,
//   ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
//   name: 'homestead'
// }
```

- provider.getBlockNumber()

: Returns the block number (or height) of the most recently mined block.

```
await provider.getBlockNumber()
// 15785491
```

- provider.getGasPrice()

: Returns a best guess of the [Gas Price](https://docs.ethers.io/v5/concepts/gas/#gas-price) to use in a transaction.

```
// The gas price (in wei)...
gasPrice = await provider.getGasPrice()
// { BigNumber: "21971214174" }

// ...often this gas price is easier to understand or
// display to the user in gwei
utils.formatUnits(gasPrice, "gwei")
// '21.971214174'
```

- provider.getFeeData()

: Returns the current recommended [FeeData](https://docs.ethers.io/v5/api/providers/types/#providers-FeeData) to use in a transaction.

For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas should be used.

For legacy transactions and networks which do not support EIP-1559, the gasPrice should be used.

```
// The gas price (in wei)...
feeData = await provider.getFeeData()
// {
//   gasPrice: { BigNumber: "21971214174" },
//   lastBaseFeePerGas: { BigNumber: "21761034090" },
//   maxFeePerGas: { BigNumber: "45022068180" },
//   maxPriorityFeePerGas: { BigNumber: "1500000000" }
// }

// ...often these values are easier to understand or
// display to the user in gwei
utils.formatUnits(feeData.maxFeePerGas, "gwei")
// '45.02206818'
```

## Ethers.Contract
Use the Ethers.Contract module to deploy and interact with smart contracts. 

This module allows you to receive events that occur on your smart contract and to obtain information about your smart contract.

Here are some of the example codes in Ethers.Contract.

Please check [Ethers.Contract](https://docs.ethers.io/v5/api/contract/contract/),[Ethers.ContractFactory](https://docs.ethers.io/v5/api/contract/contract-factory/) and [Ethers.Contract Example](https://docs.ethers.io/v5/api/contract/example/) for additional method information.

### Deploy a ERC-20 Contract

- new ethers.ContractFactory(abi,bytecode,signer)

: Create a new [ContractFactory](https://docs.ethers.io/v5/api/contract/contract-factory/) which can deploy a contract to the blockchain.

```
const bytecode = "0x608060405234801561001057600080fd5b506040516103bc3803806103bc83398101604081905261002f9161007c565b60405181815233906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a333600090815260208190526040902055610094565b60006020828403121561008d578081fd5b5051919050565b610319806100a36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063313ce5671461005157806370a082311461006557806395d89b411461009c578063a9059cbb146100c5575b600080fd5b604051601281526020015b60405180910390f35b61008e610073366004610201565b6001600160a01b031660009081526020819052604090205490565b60405190815260200161005c565b604080518082018252600781526626bcaa37b5b2b760c91b6020820152905161005c919061024b565b6100d86100d3366004610222565b6100e8565b604051901515815260200161005c565b3360009081526020819052604081205482111561014b5760405162461bcd60e51b815260206004820152601a60248201527f696e73756666696369656e7420746f6b656e2062616c616e6365000000000000604482015260640160405180910390fd5b336000908152602081905260408120805484929061016a9084906102b6565b90915550506001600160a01b0383166000908152602081905260408120805484929061019790849061029e565b90915550506040518281526001600160a01b0384169033907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a350600192915050565b80356001600160a01b03811681146101fc57600080fd5b919050565b600060208284031215610212578081fd5b61021b826101e5565b9392505050565b60008060408385031215610234578081fd5b61023d836101e5565b946020939093013593505050565b6000602080835283518082850152825b818110156102775785810183015185820160400152820161025b565b818111156102885783604083870101525b50601f01601f1916929092016040019392505050565b600082198211156102b1576102b16102cd565b500190565b6000828210156102c8576102c86102cd565b500390565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220d80384ce584e101c5b92e4ee9b7871262285070dbcd2d71f99601f0f4fcecd2364736f6c63430008040033";

// A Human-Readable ABI; we only need to specify relevant fragments,
// in the case of deployment this means the constructor
const abi = [
    "constructor(uint totalSupply)"
];

const factory = new ethers.ContractFactory(abi, bytecode, signer)

// Deploy, setting total supply to 100 tokens (assigned to the deployer)
const contract = await factory.deploy(parseUnits("100"));

// The contract is not currentl live on the network yet, however
// its address is ready for us
contract.address
// '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B'

// Wait until the contract has been deployed before interacting
// with it; returns the receipt for the deployemnt transaction
await contract.deployTransaction.wait();
// {
//   blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//   blockNumber: 23,
//   byzantium: true,
//   confirmations: 1,
//   contractAddress: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   cumulativeGasUsed: { BigNumber: "250842" },
//   effectiveGasPrice: { BigNumber: "1549195017" },
//   events: [
//     {
//       address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//       blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//       blockNumber: 23,
//       data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
//       getBlock: [Function (anonymous)],
//       getTransaction: [Function (anonymous)],
//       getTransactionReceipt: [Function (anonymous)],
//       logIndex: 0,
//       removeListener: [Function (anonymous)],
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x0000000000000000000000000000000000000000000000000000000000000000',
//         '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//       ],
//       transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//       transactionIndex: 0
//     }
//   ],
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasUsed: { BigNumber: "250842" },
//   logs: [
//     {
//       address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//       blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//       blockNumber: 23,
//       data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
//       logIndex: 0,
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x0000000000000000000000000000000000000000000000000000000000000000',
//         '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//       ],
//       transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//       transactionIndex: 0
//     }
//   ],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008001000000000000000000000000400000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000002000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000020000000000000000000',
//   status: 1,
//   to: null,
//   transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//   transactionIndex: 0,
//   type: 2
// }
```

### Connecting to a ERC-20 Contract

- new ethers.Contract(address,abi,providerOrSigner)

: Creating a new instance of a Contract connects to an existing contract by specifying its address on the blockchain, its abi (used to populate the class' methods) a providerOrSigner.

If a (Provider)[https://docs.ethers.io/v5/api/providers/provider/] is given, the contract has only read-only access, while a (Signer)[https://docs.ethers.io/v5/api/signer/#Signer] offers access to state manipulating methods.

```
// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

// This can be an address or an ENS name
const address = "0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B";

// Read-Only; By connecting to a Provider, allows:
// - Any constant function
// - Querying Filters
// - Populating Unsigned Transactions for non-constant methods
// - Estimating Gas for non-constant (as an anonymous sender)
// - Static Calling non-constant methods (as anonymous sender)
const erc20 = new ethers.Contract(address, abi, provider);

// Read-Write; By connecting to a Signer, allows:
// - Everything from Read-Only (except as Signer, not anonymous)
// - Sending transactions for non-constant functions
const erc20_rw = new ethers.Contract(address, abi, signer);
```

- Contract Properties (inheritted from [Contract](https://docs.ethers.io/v5/api/contract/contract/))

|Property|Description|
|--|---------|
|erc20.address|This is the address (or ENS name) the contract was constructed with.|
|erc20.resolvedAddress|This is a promise that will resolve to the address the Contract object is attached to. If an [Address](https://docs.ethers.io/v5/api/utils/address/#address) was provided to the constructor, it will be equal to this; if an ENS name was provided, this will be the resolved address.|
|erc20.deployTransaction|If the Contract object is the result of a ContractFactory deployment, this is the transaction which was used to deploy the contract.|
|erc20.interface|This is the ABI as an [Interface.](https://docs.ethers.io/v5/api/utils/abi/interface/)|
|erc20.provider|If a provider was provided to the constructor, this is that provider. If a signer was provided that had a [Provider](https://docs.ethers.io/v5/api/providers/provider/), this is that provider.|
|erc20.signer|If a signer was provided to the constructor, this is that signer.|

## Ethers.Utils
Ethers.Utils is a module that formats data when creating smart contracts and provides utility functions for processing user input, making it easier to develop dapps.

## Ethers.Utils Methods
The Ethers.Utils module has a wide range of utility methods. 
Let me introduce a specific method for each utility.

Please check [Ethers.Utils](https://docs.ethers.io/v5/api/utils/) for additional method information.

### Utilities - AbiCoder
The AbiCoder is a collection of Coders which can be used to encode and decode the binary data formats used to interoperate between the EVM and higher level libraries.

- abiCoder.encode(types,values)

: Encode the array values according to the array of types, each of which may be a string or a [ParamType](https://docs.ethers.io/v5/api/utils/abi/fragments/#ParamType).

```
// Encoding simple types
abiCoder.encode([ "uint", "string" ], [ 1234, "Hello World" ]);
// '0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000'

// Encoding with arrays types
abiCoder.encode([ "uint[]", "string" ], [ [ 1234, 5678 ] , "Hello World" ]);
// '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000000000162e000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000'

// Encoding complex structs (using positional properties)
abiCoder.encode(
  [ "uint", "tuple(uint256, string)" ],
  [
    1234,
    [ 5678, "Hello World" ]
  ]
);
// '0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000162e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000'

// Encoding complex structs (using keyword properties)
abiCoder.encode(
  [ "uint a", "tuple(uint256 b, string c) d" ],
  [
    1234,
    { b: 5678, c: "Hello World" }
  ]
);
// '0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000162e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000'
```

- abiCoder.decode(types,data)

: Decode the data according to the array of types, each of which may be a string or [ParamType](https://docs.ethers.io/v5/api/utils/abi/fragments/#ParamType).

```
// Decoding simple types
data = "0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000";
abiCoder.decode([ "uint", "string" ], data);
// [
//   { BigNumber: "1234" },
//   'Hello World'
// ]

// Decoding with arrays types
data = "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000000000162e000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000";
abiCoder.decode([ "uint[]", "string" ], data);
// [
//   [
//     { BigNumber: "1234" },
//     { BigNumber: "5678" }
//   ],
//   'Hello World'
// ]

// Decoding complex structs; unnamed parameters allows ONLY
// positional access to values
data = "0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000162e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000";
abiCoder.decode([ "uint", "tuple(uint256, string)" ], data);
// [
//   { BigNumber: "1234" },
//   [
//     { BigNumber: "5678" },
//     'Hello World'
//   ]
// ]

// Decoding complex structs; named parameters allows positional
// or keyword access to values
abiCoder.decode([ "uint a", "tuple(uint256 b, string c) d" ], data);
// 
// [
//   { BigNumber: "1234" },
//   [
//     { BigNumber: "5678" },
//     'Hello World',
//     b: { BigNumber: "5678" },
//     c: 'Hello World'
//   ],
//   a: { BigNumber: "1234" },
//   d: [
//     { BigNumber: "5678" },
//     'Hello World',
//     b: { BigNumber: "5678" },
//     c: 'Hello World'
//   ]
// ]
```

### Utilities - Addresses

- ethers.utils.getAddress(address)

: Returns address as a Checksum Address.

If address is an invalid 40-nibble [HexString](https://docs.ethers.io/v5/api/utils/bytes/#HexString) or if it contains mixed case and the checksum is invalid, an [INVALID_ARGUMENT](https://docs.ethers.io/v5/api/utils/logger/#errors--invalid-argument) Error is thrown.

The value of address may be any supported address format.

```
// Injects the checksum (via upper-casing specific letters)
getAddress("0x8ba1f109551bd432803012645ac136ddd64dba72");
// '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

// Converts and injects the checksum
getAddress("XE65GB6LDNXYOFTX0NSV3FUWKOWIXAMJK36");
// '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

// Throws if a checksummed address is provided, but a
// letter is the wrong case
// ------------v (should be lower-case)
getAddress("0x8Ba1f109551bD432803012645Ac136ddd64DBA72")
// [Error: bad address checksum] {
//   argument: 'address',
//   code: 'INVALID_ARGUMENT',
//   reason: 'bad address checksum',
//   value: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72'
// }

// Throws if the ICAP/IBAN checksum fails
getIcapAddress("XE65GB6LDNXYOFTX0NSV3FUWKOWIXAMJK37");
// Error: getIcapAddress is not defined

// Throws if the address is invalid, in general
getIcapAddress("I like turtles!");
// Error: getIcapAddress is not defined
```

- ethers.utils.isAddress(address)

: Returns true if address is valid (in any supported format).

```
isAddress("0x8ba1f109551bd432803012645ac136ddd64dba72");
// true

isAddress("XE65GB6LDNXYOFTX0NSV3FUWKOWIXAMJK36");
// true

isAddress("I like turtles.");
// false
```

- ethers.utils.getContractAddress(transaction)

: Returns the contract address that would result if transaction was used to deploy a contract.

```
const from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
const nonce = 5;

getContractAddress({ from, nonce });
// '0x082B6aC9e47d7D83ea3FaBbD1eC7DAba9D687b36'
```

- ethers.utils.getCreate2Address(from,salt,initCodeHash)
: Returns the contract address that would result from the given [CREATE2](https://eips.ethereum.org/EIPS/eip-1014) call.

```
const from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
const salt = "0x7c5ea36004851c764c44143b1dcb59679b11c9a68e5f41497f6cf3d480715331";
const initCode = "0x6394198df16000526103ff60206004601c335afa6040516060f3";
const initCodeHash = keccak256(initCode);

getCreate2Address(from, salt, initCodeHash);
// '0x533ae9d683B10C02EbDb05471642F85230071FC3'
```

## Ethers.Wallet
Ethers.Wallet is a module that provides a way to create a new wallet, link it to an existing wallet, and sign a transaction.

Please check [Ethers.Wallets](https://docs.ethers.io/v5/api/signer/#Wallet) for additional method information.

## Ethers.Wallet Methods
The Wallet class inherits [Signer](https://docs.ethers.io/v5/api/signer/#Signer) and can sign transactions and messages using a private key as a standard Externally Owned Account (EOA).

- new ethers.Wallet(privateKey[,provider])

: Create a new Wallet instance for privateKey and optionally connected to the provider.

- ethers.Wallet.createRandom([options={}])

: Returns a new Wallet with a random private key, generated from cryptographically secure entropy sources. If the current environment does not have a secure entropy source, an error is thrown.

Wallets created using this method will have a mnemonic.

- ethers.Wallet.fromEncryptedJson( json , password [ , progress ] )

: Create an instance by decrypting an encrypted JSON wallet.

If progress is provided it will be called during decryption with a value between 0 and 1 indicating the progress towards completion.

- ethers.Wallet.fromEncryptedJsonSync(json,password)

: Create an instance from an encrypted JSON wallet.

This operation will operate synchronously which will lock up the user interface, possibly for a non-trivial duration. Most applications should use the asynchronous fromEncryptedJson instead.

- ethers.Wallet.fromMnemonic(mnemonic[,path,[wordlist]])

: Create an instance from a mnemonic phrase.

If path is not specified, the Ethereum default path is used (i.e. m/44'/60'/0'/0/0).

If wordlist is not specified, the English Wordlist is used.

- wallet.encrypt(password,[options={},[progress]])

: Encrypt the wallet using password returning a Promise which resolves to a JSON wallet.

If progress is provided it will be called during decryption with a value between 0 and 1 indicating the progress towards completion.

```
// Create a wallet instance from a mnemonic...
mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...or from a private key
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// The address as a Promise per the Signer API
await walletMnemonic.getAddress()
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// A Wallet address is also available synchronously
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: "m/44'/60'/0'/0/0",
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Note: A wallet created with a private key does not
//       have a mnemonic (the derivation prevents it)
walletPrivateKey.mnemonic
// null

// Signing a message
await walletMnemonic.signMessage("Hello World")
// '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0")
}

// Signing a transaction
await walletMnemonic.signTransaction(tx)
// '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'

// The connect method returns a new instance of the
// Wallet connected to a provider
wallet = walletMnemonic.connect(provider)

// Querying the network
await wallet.getBalance();
// { BigNumber: "42" }
await wallet.getTransactionCount();
// 2

// Sending ether
await wallet.sendTransaction(tx)
// {
//   accessList: [],
//   chainId: 1337,
//   confirmations: 0,
//   data: '0x',
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasLimit: { BigNumber: "21000" },
//   gasPrice: null,
//   hash: '0x02689501b27c23268ea7e1dc5bb1c2236043b62fcc701d4e146ac381ebfa065a',
//   maxFeePerGas: { BigNumber: "1566432088" },
//   maxPriorityFeePerGas: { BigNumber: "1500000000" },
//   nonce: 5,
//   r: '0xab08278ee22ddf886f8c654cbe6ac44c10eda2a7d80c23bff70d0b818deaf94d',
//   s: '0x3ab7c00b050209bfaf0247ef64ec8e48bb413bd49694b1832e1aefe2d8607594',
//   to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//   type: 2,
//   v: 1,
//   value: { BigNumber: "1000000000000000000" },
//   wait: [Function (anonymous)]
// }
```

