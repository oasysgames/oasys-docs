---
---

# Web3.js
[Web3.js](https://github.com/web3/web3.js) is a Javascript based library that allows Web3 developers to interact with the Ethereum blockchain ecosystem.

## Web3.js Features
Web3.js is supported by many developers and has been used in many blockchain projects since 2015, and the community involved is well organized. In addition, because the API documentation is well-equipped, developers can easily understand the API and apply it.

## Install web3.js

### node.js
```
npm install web3
```

### yarn
```
yarn add web3
```

### browser (CDN)
```
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

### broswer (UNPKG)
```
<script src="https://unpkg.com/web3@latest/dist/web3.min.js"></script>
```

## The core modules of web3.js
Among the modules in web3.js, we introduce the four core modules that comprise the API.

## Web3.js Provider
Web3.js can set up a provider for each module.

Please check [Web3.js Provider](https://web3js.readthedocs.io/en/v1.8.0/web3-eth.html#setprovider) for additional provider information.

```
web3.setProvider(myProvider)
web3.eth.setProvider(myProvider)
web3.shh.setProvider(myProvider)
web3.bzz.setProvider(myProvider)
```

- Local Geth Node
```
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
// or
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// change provider
web3.setProvider('ws://localhost:8546');
// or
web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// Using the IPC provider in node.js
var net = require('net');
var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
// or
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

- Remote Node Provider
```
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
var Web3 = require('web3');
var web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/your-api-key");
```

- web3.*.providers

: Contains the current available providers.

```
var Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
var web3 = new Web3(Web3.givenProvider || 'ws://remotenode.com:8546');
// or
var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://remotenode.com:8546'));

// Using the IPC provider in node.js
var net = require('net');

var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
// or
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

## Web3.eth
The `Web3.eth` module is used to interact with the Ethereum network and provides several submodules. These modules allow you to interact with smart contracts, nodes, external accounts, blocks, and transactions.

### Web3.eth Methods
Here are some of the methods of Web3.eth and submodules.

Please check [Web3.eth](https://web3js.readthedocs.io/en/v1.8.0/web3-eth.html) for additional method information.

### Account Methods
The web3.eth.accounts provide several methods to create new Ethereum accounts or sign transactions and data.

Please check [Web3.eth.accounts](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-accounts.html) for additional method information.

- web3.eth.accounts.create([entropy])

: Generates an account object with private key and public key.

```
web3.eth.accounts.create();
> {
    address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
    privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}

web3.eth.accounts.create('2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567');
> {
    address: "0xF2CD2AA0c7926743B1D4310b2BC984a0a453c3d4",
    privateKey: "0xd7325de5c2c1cf0009fac77d3d04a9c004b038883446b065871bc3e831dcd098",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}

web3.eth.accounts.create(web3.utils.randomHex(32));
> {
    address: "0xe78150FaCD36E8EB00291e251424a0515AA1FF05",
    privateKey: "0xcc505ee6067fba3f6fc2050643379e190e087aeffe5d958ab9f2f3ed3800fa4e",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

- web3.eth.accounts.privateKeyToAccount(privateKey[,ignoreLength])

: Creates an account object from a private key.

For more advanced hierarchial address derivation, see [truffle-hd-wallet-provider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) package.

```
web3.eth.accounts.privateKeyToAccount('0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709');
> {
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

- web3.eth.accounts.signTransaction(tx,privateKey[,callback])

: Signs an Ethereum transaction with a given private key.

```
web3.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: 2000000
}, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
.then(console.log);
> {
    messageHash: '0x31c2f03766b36f0346a850e78d4f7db2d9f4d7d54d5f272a750ba44271e370b1',
    v: '0x25',
    r: '0xc9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895',
    s: '0x727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68',
    rawTransaction: '0xf869808504e3b29200831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a0c9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895a0727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68'
    transactionHash: '0xde8db924885b0803d2edc335f745b2b8750c8848744905684c20b987443a9593'
}

web3.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: 2000000,
    gasPrice: '234567897654321',
    nonce: 0,
    chainId: 1
}, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
.then(console.log);
> {
    messageHash: '0x6893a6ee8df79b0f5d64a180cd1ef35d030f3e296a5361cf04d02ce720d32ec5',
    r: '0x9ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9c',
    s: '0x440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
    v: '0x25',
    rawTransaction: '0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428'
    transactionHash: '0xd8f64a42b57be0d565f385378db2f6bf324ce14a594afc05de90436e9ce01f60'
}

// or with a common
web3.eth.accounts.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: 2000000
    common: {
      baseChain: 'mainnet',
      hardfork: 'petersburg',
      customChain: {
        name: 'custom-chain',
        chainId: 1,
        networkId: 1
      }
    }
}, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
.then(console.log);
```

- web3.eth.accounts.recoverTransaction(rawTransaction);

: Recovers the Ethereum address which was used to sign the given RLP encoded transaction.

```
web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

- web3.eth.accounts.encrypt(privateKey,password)

: Encrypts a private key to the web3 keystore v3 standard.

```
web3.eth.accounts.encrypt('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318', 'test!')
> {
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}
```

- web3.eth.accounts.decrypt(keystoreJsonV3, password)

: Decrypts a keystore v3 JSON, and creates the account.

```
web3.eth.accounts.decrypt({
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}, 'test!');
> {
    address: "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23",
    privateKey: "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

- web3.eth.accounts.wallet

: Contains an in memory wallet with multiple accounts. These accounts can be used when using [web3.eth.sendTransaction()](https://web3js.readthedocs.io/en/v1.8.0/web3-eth.html#eth-sendtransaction).

```
web3.eth.accounts.wallet;
> Wallet {
    0: {...}, // account by index
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},  // same account by address
    "0xf0109fc8df283027b6285cc889f5aa624eac1f55": {...},  // same account by address lowercase
    1: {...},
    "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...},
    "0xd0122fc8df283027b6285cc889f5aa624eac1d23": {...},

    add: function(){},
    remove: function(){},
    save: function(){},
    load: function(){},
    clear: function(){},

    length: 2,
}
```

- web3.eth.accounts.wallet.create(numberOfAccounts[,entropy])

: Generates one or more accounts in the wallet. If wallets already exist they will not be overridden.

```
web3.eth.accounts.wallet.create(2, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
> Wallet {
    0: {...},
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
    "0xf0109fc8df283027b6285cc889f5aa624eac1f55": {...},
    ...
}
```

- web3.eth.accounts.wallet.add(account)

: Adds an account using a private key or account object to the wallet.

```
web3.eth.accounts.wallet.add('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
> {
    index: 0,
    address: '0x2c7536E3605D9C16a7a3D7b1898e529396a65c23',
    privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}

web3.eth.accounts.wallet.add({
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
});
> {
    index: 0,
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

### Contract Methods
The `web3.eth.Contract` object provides several methods to help interact with smart contracts in the Ethereum blockchain.

It also provides the JSON interface for each smart contract when creating a new web3.eth.Contract object and automatically converts all calls to low-level ABI calls over RPC.

Please check [Web3.eth.Contract](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-contract.html#eth-contract) for additional method information.

- new web3.eth.Contract(jsonInterface[, address][, options])

: Creates a new contract instance with all its methods and events defined in its [json interface](https://web3js.readthedocs.io/en/v1.8.0/glossary.html#glossary-json-interface) object.

```
var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
    from: '0x1234567890123456789012345678901234567891', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});
```
- contract.clone()

: Clones the current contract instance.

```
var contract1 = new eth.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});

var contract2 = contract1.clone();
contract2.options.address = address2;

(contract1.options.address !== contract2.options.address);
> true
```

- contract.deploy(options)

: Call this function to deploy the contract to the blockchain. After successful deployment the promise will resolve with a new contract instance.

- Parameters :
`options` - Object : The options used for deployment.
- data - String : The byte code of the contract.
- arguments - Array (optional): The arguments which get passed to the constructor on deployment.

```
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.send({
    from: '0x1234567890123456789012345678901234567891',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){ ... })
.on('error', function(error){ ... })
.on('transactionHash', function(transactionHash){ ... })
.on('receipt', function(receipt){
   console.log(receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){ ... })
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});


// When the data is already set as an option to the contract itself
myContract.options.data = '0x12345...';

myContract.deploy({
    arguments: [123, 'My String']
})
.send({
    from: '0x1234567890123456789012345678901234567891',
    gas: 1500000,
    gasPrice: '30000000000000'
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});


// Simply encoding
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.encodeABI();
> '0x12345...0000012345678765432'


// Gas estimation
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.estimateGas(function(err, gas){
    console.log(gas);
});
```

- contract.methods.myMethod([param1[,param2[, ...]]])

: Creates a transaction object for that method, which then can be [called](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-contract.html#contract-call), [send](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-contract.html#contract-send), [estimated](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-contract.html#contract-estimategas), [createAccessList](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-contract.html#contract-createaccesslist), or [ABI encoded](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-contract.html#contract-encodeabi).

```
// calling a method

myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
    ...
});

// or sending and using a promise
myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(receipt){
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
});

// or sending and using the events

myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('confirmation', function(confirmationNumber, receipt){
    ...
})
.on('error', function(error, receipt) {
    ...
});
```

- contract.methods.myMethod([param1[,param2[, ...]]]).call(options[,defaultBlock][,callback])

: Will call a “constant” method and execute its smart contract method in the EVM without sending any transaction. Note calling cannot alter the smart contract state.

```
// using the callback
myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
    ...
});

// using the promise
myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(result){
    ...
});


// MULTI-ARGUMENT RETURN:

// Solidity
contract MyContract {
    function myFunction() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
    }
}

// web3.js
var MyContract = new web3.eth.Contract(abi, address);
MyContract.methods.myFunction().call()
.then(console.log);
> Result {
    myNumber: '23456',
    myString: 'Hello!%',
    0: '23456', // these are here as fallbacks if the name is not know or given
    1: 'Hello!%'
}


// SINGLE-ARGUMENT RETURN:

// Solidity
contract MyContract {
    function myFunction() returns(string myString) {
        return "Hello!%";
    }
}

// web3.js
var MyContract = new web3.eth.Contract(abi, address);
MyContract.methods.myFunction().call()
.then(console.log);
> "Hello!%"
```

- contract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])

: Will send a transaction to the smart contract and execute its method. Note this can alter the smart contract state.

```
// using the callback
myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, transactionHash){
    ...
});

// using the promise
myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(receipt){
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
});


// using the event emitter
myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.on('transactionHash', function(hash){
    ...
})
.on('confirmation', function(confirmationNumber, receipt){
    ...
})
.on('receipt', function(receipt){
    // receipt example
    console.log(receipt);
    > {
        "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
        "transactionIndex": 0,
        "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
        "blockNumber": 3,
        "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        "cumulativeGasUsed": 314159,
        "gasUsed": 30234,
        "events": {
            "MyEvent": {
                returnValues: {
                    myIndexedParam: 20,
                    myOtherIndexedParam: '0x123456789...',
                    myNonIndexParam: 'My String'
                },
                raw: {
                    data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                    topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
                },
                event: 'MyEvent',
                signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
                logIndex: 0,
                transactionIndex: 0,
                transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
                blockNumber: 1234,
                address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
            },
            "MyOtherEvent": {
                ...
            },
            "MyMultipleEvent":[{...}, {...}] // If there are multiple of the same event, they will be in an array
        }
    }
})
.on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    ...
});
```

- contract.methods.myMethod([param1[, param2[, ...]]]).estimateGas(options[, callback])

: Returns the amount of gas consumed by executing the method locally without creating a new transaction on the blockchain. The returned amount can be used as a gas estimate for executing the transaction publicly. The actual gas used can be different when sending the transaction later, as the state of the smart contract can be different at that time.

```
// using the callback
myContract.methods.myMethod(123).estimateGas({gas: 5000000}, function(error, gasAmount){
    if(gasAmount == 5000000)
        console.log('Method ran out of gas');
});

// using the promise
myContract.methods.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(gasAmount){
    ...
})
.catch(function(error){
    ...
});
```

- contract.methods.myMethod([param1[,param2[, ...]]]).encodeABI()

: Encodes the ABI for this method. The resulting hex string is 32-bit function signature hash plus the passed parameters in Solidity tightly packed format. This can be used to send a transaction, call a method, or pass it into another smart contract’s method as arguments. Set the data field on web3.eth.sendTransaction options as the encodeABI() result and it is the same as calling the contract method with contract.myMethod.send().

Some use cases for encodeABI() include: preparing a smart contract transaction for a multisignature wallet, working with offline wallets and cold storage and creating transaction payload for complex smart contract proxy calls.

```
myContract.methods.myMethod(123).encodeABI();
> '0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

### Subscribe Methods
The web3.eth.subscribe function lets you subscribe to specific events in the blockchain.

Please check [Web3.eth.subscribe](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-subscribe.html) for additional method information.

- web3.eth.subscribe(type[,options][,callback])

```
var subscription = web3.eth.subscribe('logs', {
    address: '0x123456..',
    topics: ['0x12345...']
}, function(error, result){
    if (!error)
        console.log(result);
});

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});
```

- web3.eth.clearSubscriptions()

: Resets subscriptions.

```
web3.eth.subscribe('logs', {} ,function(){ ... });

...

web3.eth.clearSubscriptions();
```

- web3.eth.subscribe('pendingTransactions'[,callback])

: Subscribes to incoming pending transactions.

```
var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
    if (!error)
        console.log(result);
})
.on("data", function(transaction){
    console.log(transaction);
});

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});
```

- web3.eth.subscribe('newBlockHeaders'[,callback])

: Subscribes to incoming block headers. This can be used as timer to check for changes on the blockchain.

```
var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log(result);

        return;
    }

    console.error(error);
})
.on("connected", function(subscriptionId){
    console.log(subscriptionId);
})
.on("data", function(blockHeader){
    console.log(blockHeader);
})
.on("error", console.error);

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});
```

- web3.eth.subscribe('syncing'[,callback])

: Subscribe to syncing events. This will return an object when the node is syncing and when it’s finished syncing will return FALSE.

```
var subscription = web3.eth.subscribe('syncing', function(error, sync){
    if (!error)
        console.log(sync);
})
.on("data", function(sync){
    // show some syncing stats
})
.on("changed", function(isSyncing){
    if(isSyncing) {
        // stop app operation
    } else {
        // regain app operation
    }
});

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});
```

- web3.eth.subscribe('logs',options[,callback])

: Subscribes to incoming logs, filtered by the given options. If a valid numerical fromBlock options property is set, Web3 will retrieve logs beginning from this point, backfilling the response as necessary.

```
var subscription = web3.eth.subscribe('logs', {
    address: '0x123456..',
    topics: ['0x12345...']
}, function(error, result){
    if (!error)
        console.log(result);
})
.on("connected", function(subscriptionId){
    console.log(subscriptionId);
})
.on("data", function(log){
    console.log(log);
})
.on("changed", function(log){
});

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});
```

## Web3.bzz
The `Web3.bzz` module provides methods for interacting with Swarm. This allows for storing files such as photos and videos and can be used for a decentralized storage platform or content distribution service.

### Web3.bzz Methods
Here are some of the methods of Web3.bzz.

Please check [Web3.bzz](https://web3js.readthedocs.io/en/v1.8.0/web3-bzz.html) for additional method information.

- web3.bzz.upload(mixed)

: Uploads files, folders or raw data to swarm.

```
var bzz = web3.bzz;

// raw data
bzz.upload("test file").then(function(hash) {
    console.log("Uploaded file. Address:", hash);
})

// raw directory
var dir = {
    "/foo.txt": {type: "text/plain", data: "sample file"},
    "/bar.txt": {type: "text/plain", data: "another file"}
};
bzz.upload(dir).then(function(hash) {
    console.log("Uploaded directory. Address:", hash);
});

// upload from disk in node.js
bzz.upload({
    path: "/path/to/thing",      // path to data / file / directory
    kind: "directory",           // could also be "file" or "data"
    defaultFile: "/index.html"   // optional, and only for kind === "directory"
})
.then(console.log)
.catch(console.log);

// upload from disk in the browser
bzz.upload({pick: "file"}) // could also be "directory" or "data"
.then(console.log);
```

- web3.bzz.download(bzzHash[,localpath])

: Downloads files and folders from swarm as buffer or to disk (only node.js).


```
var bzz = web3.bzz;

// download raw file
var fileHash = "a5c10851ef054c268a2438f10a21f6efe3dc3dcdcc2ea0e6a1a7a38bf8c91e23";
bzz.download(fileHash).then(function(buffer) {
    console.log("Downloaded file:", buffer.toString());
});

// download directory, if the hash is manifest file.
var dirHash = "7e980476df218c05ecfcb0a2ca73597193a34c5a9d6da84d54e295ecd8e0c641";
bzz.download(dirHash).then(function(dir) {
    console.log("Downloaded directory:");
    > {
        'bar.txt': { type: 'text/plain', data: <Buffer 61 6e 6f 74 68 65 72 20 66 69 6c 65> },
        'foo.txt': { type: 'text/plain', data: <Buffer 73 61 6d 70 6c 65 20 66 69 6c 65> }
    }
});

// download file/directory to disk (only node.js)
var dirHash = "a5c10851ef054c268a2438f10a21f6efe3dc3dcdcc2ea0e6a1a7a38bf8c91e23";
bzz.download(dirHash, "/target/dir")
.then(path => console.log(`Downloaded directory to ${path}.`))
.catch(console.log);
```

## Web3.shh
The `Web3.shh` module provides a method to interact with the Whisper protocol.

### Web3.shh Methods
Here are some of the methods of Web3.shh.

Please check [Web3.shh](https://web3js.readthedocs.io/en/v1.8.0/web3-shh.html) for additional method information.

- web3.shh.getVersion([callback])

: Returns the version of the running whisper.

```
web3.shh.getVersion()
.then(console.log);
> "5.0"
```

- web3.shh.getInfo([callback])

: Gets information about the current whisper node.

```
web3.shh.getInfo()
.then(console.log);
> {
    "minPow": 0.8,
    "maxMessageSize": 12345,
    "memory": 1234335,
    "messages": 20
}
```

- web3.shh.post(object[,callback])

: This method should be called, when we want to post whisper a message to the network.

```
var identities = {};
var subscription = null;

Promise.all([
    web3.shh.newSymKey().then((id) => {identities.symKey = id;}),
    web3.shh.newKeyPair().then((id) => {identities.keyPair = id;})

]).then(() => {

    // will receive also its own message send, below
    subscription = web3.shh.subscribe("messages", {
        symKeyID: identities.symKey,
        topics: ['0xffaadd11']
    }).on('data', console.log);

}).then(() => {
   web3.shh.post({
        symKeyID: identities.symKey, // encrypts using the sym key ID
        sig: identities.keyPair, // signs the message using the keyPair ID
        ttl: 10,
        topic: '0xffaadd11',
        payload: '0xffffffdddddd1122',
        powTime: 3,
        powTarget: 0.5
    }).then(h => console.log(`Message with hash ${h} was successfuly sent`))
    .catch(err => console.log("Error: ", err));
});
```

- web3.shh.subscribe('messages',options[,callback])

: Subscribe for incoming whisper messages.

```
web3.shh.subscribe('messages', {
    symKeyID: 'bf31b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f',
    sig: '0x04d1574d4eab8f3dde4d2dc7ed2c4d699d77cbbdd09167b8fffa099652ce4df00c4c6e0263eafe05007a46fdf0c8d32b11aeabcd3abbc7b2bc2bb967368a68e9c6',
    ttl: 20,
    topics: ['0xffddaa11'],
    minPow: 0.8,
}, function(error, message, subscription){

    console.log(message);
    > {
        "hash": "0x4158eb81ad8e30cfcee67f20b1372983d388f1243a96e39f94fd2797b1e9c78e",
        "padding": "0xc15f786f34e5cef0fef6ce7c1185d799ecdb5ebca72b3310648c5588db2e99a0d73301c7a8d90115a91213f0bc9c72295fbaf584bf14dc97800550ea53577c9fb57c0249caeb081733b4e605cdb1a6011cee8b6d8fddb972c2b90157e23ba3baae6c68d4f0b5822242bb2c4cd821b9568d3033f10ec1114f641668fc1083bf79ebb9f5c15457b538249a97b22a4bcc4f02f06dec7318c16758f7c008001c2e14eba67d26218ec7502ad6ba81b2402159d7c29b068b8937892e3d4f0d4ad1fb9be5e66fb61d3d21a1c3163bce74c0a9d16891e2573146aa92ecd7b91ea96a6987ece052edc5ffb620a8987a83ac5b8b6140d8df6e92e64251bf3a2cec0cca",
        "payload": "0xdeadbeaf",
        "pow": 0.5371803278688525,
        "recipientPublicKey": null,
        "sig": null,
        "timestamp": 1496991876,
        "topic": "0x01020304",
        "ttl": 50
    }
})
// or
.on('data', function(message){ ... });
```

## Web3.utils
`Web3.utils` is a module that provides utility functions to help create smart contracts, making it easier for developers to develop dapps.

### Web3.utils Methods
Here are some of the methods of Web3.utils.

Please check [Web3.utils](https://web3js.readthedocs.io/en/v1.8.0/web3-utils.html) for additional method information.

- web3.utils.isAddress(address)

: Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.

```
web3.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d');
> true

web3.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d');
> true

web3.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
> true // as all is uppercase, no checksum will be checked

web3.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
> true

web3.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
> false // wrong checksum
```

- web3.utils.isHex(hex)

: Checks if a given string is a HEX string.

```
web3.utils.isHex('0xc1912');
> true

web3.utils.isHex(0xc1912);
> true

web3.utils.isHex('c1912');
> true

web3.utils.isHex(345);
> true // this is tricky, as 345 can be a a HEX representation or a number, be careful when not having a 0x in front!

web3.utils.isHex('0xZ1912');
> false

web3.utils.isHex('Hello');
> false
```

- web3.utils.hexToNumberString(hex)

: Returns the number representation of a given HEX value as a string.

```
web3.utils.hexToNumberString('0xea');
> "234"
```

- web3.utils.toWei(number[,unit])

: Converts any ether value value into wei.

```
web3.utils.toWei('1', 'ether');
> "1000000000000000000"

web3.utils.toWei('1', 'finney');
> "1000000000000000"

web3.utils.toWei('1', 'szabo');
> "1000000000000"

web3.utils.toWei('1', 'shannon');
> "1000000000"
```

- web3.utils.fromWei(number[,unit])

: Converts any wei value into an ether value.

```
web3.utils.fromWei('1', 'ether');
> "0.000000000000000001"

web3.utils.fromWei('1', 'finney');
> "0.000000000000001"

web3.utils.fromWei('1', 'szabo');
> "0.000000000001"

web3.utils.fromWei('1', 'shannon');
> "0.000000001"
```
