# Monitoring
Verse monitoring shares many similarities with [Validator Node monitoring](/docs/hub-validator/operate-validator/monitor). Although Verse blocks are not generated at regular intervals like the validator's 15-second block generation, monitoring whether the block height is correctly incrementing remains a simple and reliable way to confirm that the Verse node is functioning properly.

Please refer to the corresponding [section](/docs/hub-validator/operate-validator/monitor#how-to-check-block-height). Take note that if the block height increases at a very high speed, it might be a sign that your Verse is under attack. We recommend setting up alerts for two scenarios: one for when blocks are created too infrequently and another for when blocks are created too frequently.

Just like any other server, it's beneficial to monitor error logs on your validator node. If you see the following error repeated, it indicates that the L2->L1 bridge has been suspended. This mainly happens due to a delay with the Instant Verifier.
```sh
{"level":30,"time":1690367657588,"msg":"checking L2 block 5744"}
{"level":30,"time":1690367657799,"msg":"tx not yet finalized, waiting: 5744"}
{"level":30,"time":1690367658800,"msg":"checking L2 block 5744"}
{"level":30,"time":1690367690553,"msg":"tx not yet finalized, waiting: 5744"}
{"level":30,"time":1690367691555,"msg":"checking L2 block 5744"}
{"level":30,"time":1690367691708,"msg":"tx not yet finalized, waiting: 5744"}
{"level":30,"time":1690367692710,"msg":"checking L2 block 5744"}
{"level":30,"time":1690367692859,"msg":"tx not yet finalized, waiting: 5744"}
```

Finally, we will provide several tips that we believe will facilitate your monitoring tasks, depending on your various requirements.

### Wallets whose OAS Balances You Should Monitor
We highly recommend monitoring the remaining OAS balance of the several wallets. In most cases, the root cause of issues on Verse is insufficient OAS funding.

The following wallets are required on the Verse Node, and you can find their exact addresses in the environment (env) file. For example, in [.env.sample.mainnet](https://github.com/oasysgames/verse-layer-optimism/blob/c0f7b4795ba94da8a56083d65660ca8a2ac661b9/.env.sample.mainnet#L19-L26):
- Proposer Wallet
- Sequencer Wallet
- Message-Relayer Wallet

The bellow should also be monitored. You can find its address in the config.yml file.For example, in [config.yml](https://github.com/oasysgames/verse-verifier/blob/678f8dff0fe529e8a86a60d24413c6a96711d562/readme/config.yml#L14-L15).
- Submitter Wallet

### Monitoring the Delay of Rollup/Instant Verifier
To check if the rollup is functioning or suspended, you can observe the value returned by the `getTotalElements` function of the L1 (Oasys Hub) contract. This function provides the number of transactions already submitted from L2 (Verse). If this value remains unchanged for an extended period, even though transactions on L2 are being updated, it indicates that the rollup has ceased functioning.
- [getTotalElements](https://github.com/oasysgames/oasys-optimism/blob/067ae176836bd3a7bdc1f16617a5b73f51cfa733/packages/contracts/contracts/L1/rollup/CanonicalTransactionChain.sol#L128-L131)

### How to Check if the Validator Node is Running in Mining Mode
Please refer to the [this section](/docs/hub-validator/operate-validator/monitor#how-to-check-if-the-validator-node-is-running-in-mining-mode) in Validator monitoring.

### Monitoring Alert Assistance
We offer a helpful script designed to ensure your Verse is operating smoothly. Should any issues arise, notifications will be sent via Slack or Discord. Please refer to the following link.
- For users of the previous optimism version of Verse: [L2 Monitoring Alert (For Verse v0)](https://github.com/oasysgames/oasys-optimism/wiki/L2-Monitoring-Alert#for-verse-v0)
- For users of the opstack version of Verse: [L2 Monitoring Alert (For Verse v1)](https://github.com/oasysgames/oasys-optimism/wiki/L2-Monitoring-Alert#for-verse-v1)

### Troubleshooting Assistance
We offer a helpful script designed to assist in resolving any issues that may arise with your verse. Please refer to the following link.
- For users of the previous optimism version of Verse: [L2 Troubleshooting (For Verse v0)](https://github.com/oasysgames/oasys-optimism/wiki/L2-Troubleshooting#for-verse-v0)
- For users of the opstack version of Verse: [L2 Troubleshooting (For Verse v1)](https://github.com/oasysgames/oasys-optimism/wiki/L2-Troubleshooting#for-verse-v1)
