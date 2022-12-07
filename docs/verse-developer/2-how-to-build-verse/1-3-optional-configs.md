# Optional Configrations


## Address List

After you setup, you may configure files in : 

```
/oasys/addresses.json
```

After you open, You may See Few addresses. Those address may changed by contract update. 
You many need to send your tokens onto `sequencer address` from `addresses.json` to use bridge.

```
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

### OVM_Sequencer 

It works as L2 Sequencer. 

### OVM_Proposer

It works as L2 Proposer. Mainly handles with messaging.

### CanonicalTransactionChain

Works as a sequencer. 

## Related Factory Contract 


### Hub Layer 

```
L1StandardERC20Factory: '0x5200000000000000000000000000000000000004'
```
Standard ERC 20 Factory contract for Making ERC-20.

```
L1StandardERC721Factory: '0x5200000000000000000000000000000000000005'
```

Standard ERC 721 Factory contract for Making ERC-20.

### Verse Layer 

Pre-Deployed contracts. All Verse Layer Contracts are same. 

```
L2CrossDomainMessenger: '0x4200000000000000000000000000000000000007',
```

```
L2StandardBridge: '0x4200000000000000000000000000000000000010',
```

```
L2StandardTokenFactory: '0x4200000000000000000000000000000000000012',
```

```
L2ERC721Bridge: '0x6200000000000000000000000000000000000001',
```