# Verify Contract

Verifying a contract makes the code of the deployed contract accessible for public verification. 
With Blockscout, it is possible to verify contracts deployed via an API using Hardhat.

# Setting hardhat.config.js  

## 1.Add networks
```
  networks: {
    "network-name": {
      url: "(rpc-url-of-chain)",
    },
  },
```

## 2.Add the following to etherscan.customChains[]
```
{
  network: "network-name", // have to match apiKey key
  chainId: (network-chain-id),
  urls: {
    apiURL: "https://your-blockscout-host/api",
    browserURL: "https://your-blockscout-host",
  },
}
```

## 3. Add the following to etherscan.apiKey
Create a key with any value
```
   etherscan: {
     apiKey: {
       'network-name': 'foo',
     },
```

## 4.Verify
```
npx hardhat verify --network network-name (deployed contract address)
```
