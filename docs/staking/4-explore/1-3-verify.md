# Contract Verification
Verifying a contract enables public access to the code of the deployed contract. Oasys utilizes [Blockscout](https://github.com/blockscout/blockscout), which is a prominent open-source explorer. Therefore, it's essential to follow its specifications. Please refer to the [Blockscout documentation](https://docs.blockscout.com/devs/verification) for guidance. We will provide you with an exact example of the configuration.

## Hardhat
### Configuring the Hardhat Settings File
Here is a practical example of the config file (`hardhat.config.js`) for our mainnet case. Please note that it's not necessary to login and generate an apiKey; any value is acceptable.

```javascript
const config = {
  ...
  networks: {
    oasysmainnet: {
      url: "https://rpc.mainnet.oasys.games",
    },
  },
  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      oasysmainnet: "abc"
    },
    customChains: [
      {
        network: "oasysmainnet",
        chainId: 248,
        urls: {
          apiURL: "https://explorer.oasys.games/api",
          browserURL: "https://explorer.oasys.games/"
        }
      }
    ]
  },
  ...
}
```

For more details, please refer to the Blockscout [Hardhat Verification Plugin](https://docs.blockscout.com/devs/verification/hardhat-verification-plugin).

## Foundry
For verification using Foundry, please refer to Blockscout [Foundry Verification](https://docs.blockscout.com/devs/verification/foundry-verification).
