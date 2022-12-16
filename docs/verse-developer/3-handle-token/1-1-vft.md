# vFT

## Create an ERC-20 on Oasys SAND Verse
Based on how to create an ERC-20 from the goerli test network created above, we will explain how to create an ERC-20 from Oasys Sand Verse network.

This token is a vFT that cannot be bridged to the Oasys hub.
Also, to deploy a vFT to the main network of each verse, the deployer must be authorized by the verse operator.
However, anyone can deploy token in Oasys SAND Verse.

To perform this tutorial, use the following tools:
1. Remix IDE : Remix IDE allows you to edit smart contracts and deploy.
2. OpenZepplin Contract Wizard : You can easily create an ERC-20 smart contract using OpenZeppelin Contract Wizard.
3. Metamask (browser extension) : Process transactions and deploy smart contracts through the Metamask browser extension.
* Oasys SAND Verse network is layer-2, and the faucet does not exist because gas is **free** when processing transactions.

### Add Oasys SAND Verse network on metamask
![Add Oasys SAND Verse network on metamask](/img/docs/techdocs/smart-contract/add-network-1.png)
When you click the Add network button, a web page is called where you can add a new network to your metamask. You can add the Oasys SAND Verse network on this web page by entering each item according to the instructions below.

#### Oasys SAND Verse
|                 |                                            |
|-----------------|--------------------------------------------|
| ChainID         | 20197                                      |
| Currency Symbol | OAS                                        |
| RPC             | https://rpc.sandverse.oasys.games/         |
| Explorer        | https://scan.sandverse.oasys.games/    |
| Web Socket      | wss://ws.sandverse.oasys.games             |

### Create a mintable ERC-20 smart contract using the Openzepplin contracts wizard
Please refer to [this](#create-a-mintable-erc-20-smart-contract-using-the-openzepplin-contracts-wizard) section because the Openzepplin contracts wizard uses the same method of creating a Smart Contract.

### Deploy the smart contract using Remix IDE
Create the MyToken.sol file in Remix IDE, as shown in [this](#deploy-the-smart-contract-using-remix-ide) section.
![Deploy Smart Contract - Sand Verse](/img/docs/techdocs/smart-contract/deploy-contract-sandverse-1.png)


#### Metamask gas fee settings
When the MyToken.sol file is ready, and Smart Contract is deployed; due to a chronic problem with the Metamask, the transaction cannot be accepted with a message that the gas-free Oasys Sand Verse consumes the gas bill.
![Deploy Smart Contract - Sand Verse](/img/docs/techdocs/smart-contract/deploy-contract-sandverse-2.png)

In this case, you can do the following to approve the transaction.
- First, click `EDIT` in the Estimated gas feed section.
- If you have moved to the Edit priority window, click the `Edit suggested gas fee` button at the bottom of the window.
- Now you can modify the gas price yourself. Enter `0.0000000001` in the `Gas price (GWEI)` input window and click the `Save` button to save the set gas price.
- Now you can approve the transaction without paying the gas fee.

![Deploy Smart Contract - Sand Verse](/img/docs/techdocs/smart-contract/deploy-contract-sandverse-3.png)
- If Deploy is successful, you can click the `View Account in Explorer` menu on the metamask to navigate to the Explorer you set up when you added the Oasys Sand Version network.
- In Explorer, you can check the transaction status for your account and view information about the smart contract you created.

### Mint ERC-20
![Mint ERC-20](/img/docs/techdocs/smart-contract/mint-erc20-token-sandverse-1.png)
- If Deploy is successful, you can see that Deployed Contract has been added.

1. You should click on the `mint` function created in MyToken.sol to set the address to send the token and the amount of tokens to send.
2. When ready, click the `transact` button and approve the transaction for token transfer.

* Please refer to [this](#metamask-gas-fee-settings) section for gas fee modification.

![Mint ERC-20](/img/docs/techdocs/smart-contract/mint-erc20-token-sandverse-2.png)
- If token minting is successful, go to Oasys Sand Verse Explorer. You can then click on the `Token Transfers` menu to view transactions for token minting.

### Import token to metamask
The token has been received but is not visible on the metamask. In this case, you must import tokens from the metamask.

![Import ERC-20](/img/docs/techdocs/smart-contract/import-token-sandverse-1.png)
- Visit Oasys Sandverse to view information about the minted token. You can copy the token's smart contract address and import it into the meta mask according to how it was written in [this](#import-token-to-metamask) section.