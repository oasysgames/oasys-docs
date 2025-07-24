# FAQ

### Q. How much gas is consumed when rolling up a transaction to Hub Layer(L1)?
In our experiment of rolling up 1000 ERC20 transfer transactions, the total gas consumed was 2.7 million. If the gas price is 1.5 Gwei, the total gas cost is 0.004 OAS (calculated as 2.7M gas * 1.5 Gwei).

:::note Note
The consumed gas is the sum of 2 rollups
- Transaction data rollup = 1.3 M
- StateRoot rollup = 1.4 M
:::

---
### Q. How to Replace an Old Verse Node with a New Verse Node?
We highly recommend migrating to a new node by switching from the old writable node to an already synced read-only node.

If you want to create a new Verse node, you first have to set up the new node as a read-only full node. Once it's caught up with the new block, you can stop the old node and then change the read-only node to writable (making it the New Verse node).

Please refer to [this section](/docs/verse-developer/how-to-build-verse/read-node#promoting-replica-node) for instructions on promoting a replica node.

---
### Q. How to Change the State Root Adding Interval?
By default, the StateCommitmentChain (SCC) appends the state root every 4 bridge transactions. You can alter this default setting using either an environment variable or a command-line option:
```sh
# Using an environment variable
export MIN_STATE_ROOT_ELEMENTS=X

# Using a command-line option
--min-state-root-elements X
```
Reference Code:
- [The appendStateBatch function in the SCC (StateCommitmentChain) contract](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/packages/contracts/contracts/L1/rollup/StateCommitmentChain.sol#L87)
- [Settings within the Optimism](https://github.com/oasysgames/oasys-optimism/blob/v0.1.5/go/batch-submitter/flags/flags.go#L74)

---
### Q. What is the maximum TPS of Verse?
Based on our tests, the current peak TPS for Verse stands at approximately `100`. The primary constraints are not tied to hardware capabilities but are attributed to the transaction size and middleware.

#### Bottleneck of Transaction Size:
As you may know, the L2 batch transactions, which are periodically submitted to L1, contain all the transactions that occur on L2, making them relatively large. The maximum allowed transaction size is 128K byte. We can bundle approximately 1750 L2 transactions into a single L1 batch transactions. This results in a TPS of 1750/15s = 116.

#### Bottleneck of Middleware:
The L2 batch transaction is dispatched by the `batch-submitter` for every block on L1. This means that batches can only be submitted at 15-second intervals. By updating the batch-submitter logic, we believe we can reduce this interval. Our estimate is that the shortest possible interval is 1 second, leading to a theoretical maximum TPS of around `2000`. We'll consider implementing these changes as any verse growth.

---
### Q. How to Update Sequencer/Proposer Address
If you need to rotate or have lost your Sequencer/Proposer, there's no need to worry as you can update the address. However, keep in mind that if you lose your builder key, it cannot be recovered.

First, ensure that the current address matches your expectations. To check this, call the `getAddress` function of the [Lib_AddressManager](https://github.com/oasysgames/oasys-optimism/blob/44655464537249ea8d9e045240e787144cdcb80f/packages/contracts/contracts/libraries/resolver/Lib_AddressManager.sol) contract:

- name: This is the name of the target address. For updating the Sequencer, set it as `OVM_Sequencer`; for the Proposer, set as `OVM_Proposer`.
```solidity
function getAddress(string memory _name) external view returns (address);
```

Upgrading is performed by calling the `setAddress` function of the same contract. Note that only the transaction sender who is the builder is allowed to execute this.

- name: This should be the same as in the `getAddress` function above.
- address: This is the new address to be set, either for the sequencer or proposer.
```solidity
function setAddress(
    string memory name,
    address address
) external onlyOwner;
```

Once completed, confirm the address has been updated by calling `getAddress` again.

---
### Q.How to Verify a Contract Using the Explore API?
Please refer to the [Contract Verification](https://docs.oasys.games/docs/staking/explore/1-3-verify) section of the explorer in this documentation.

---
### Q. Does the fact that The Verse is run by a single node mean it's not decentralized?
Discussing the decentralization of L2 cannot be done in the same manner as with L1. For L1, decentralization is a primary concern because if it is centralized, the central authority could engage in fraudulent behaviors, such as double-spending. On the other hand, L2 incorporates mechanisms to correct fraudulent behavior (our Verse uses Optimistic Rollup, and this correction is facilitated through fraud proof submissions). Therefore, decentralization is not as critical in the security context for L2.

However, censorship resistance and MEV (maximal extractable value) present more significant challenges. Since our Verse is operated by a single party, this means that the party can select transactions based on their preferences, implying that the Verse lacks censorship resistance. Examples of MEV issues include front-running, back-running, and DEX arbitrage, which are concerns.

---
### Q. Is there any security risk in making the explorer API publicly accessible?
There is no risk. Please refer to the [API documentation](https://docs.blockscout.com/devs/apis/rpc/eth-rpc). Users can only access several eth namespace APIs through the explorer API. Even though the explorer connects to an L2geth with the debug namespace activated, end users cannot make dangerous calls to the debug namespace through the Explorer.

---
### Q.What else is important to understand about the Oasys ecosystem?
[This link](https://holistic-chill-aeb.notion.site/Ecosystem-List-22a4a535a09080d695a5ece37bddaeb0) lists useful ecosystem related information for developing on Oasys, so please take a look.
