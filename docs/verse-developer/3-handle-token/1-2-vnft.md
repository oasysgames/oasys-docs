# vNFT

## Create an ERC-721 on Oasys Sand Verse
We will explain how to create an ERC-721 token from Oasys Sand Verse network.

This token is a vNFT that cannot be bridged to the Oasys hub.
Also, to deploy a vNFT to the main network of each verse, the deployer must be authorized by the verse operator.
However, anyone can deploy token in Oasys Sand Verse.

To perform this tutorial, use the following tools:
1. Remix IDE : Remix IDE allows you to edit smart contracts and deploy.
2. OpenZepplin Contract Wizard : You can easily create an ERC-721 smart contract using OpenZeppelin Contract Wizard.
3. Metamask (browser extension) : Process transactions and deploy smart contracts through the Metamask browser extension.
* Oasys Sand Verse network is layer-2, and the faucet does not exist because gas is **free** when processing transactions.

### Add Oasys Sand Verse network on metamask
![Add Oasys Sand Verse network on metamask](/img/docs/techdocs/smart-contract/add-network-1.png)
When you click the Add network button, a web page is called where you can add a new network to your metamask. You can add the Oasys Sand Verse network on this web page by entering each item according to the instructions below.

#### Oasys Sand Verse
|                 |                                            |
|-----------------|--------------------------------------------|
| ChainID         | 20197                                      |
| Currency Symbol | OAS                                        |
| RPC             | https://rpc.sandverse.oasys.games/         |
| Explorer        | https://explorer.sandverse.oasys.games/    |
| Web Socket      | wss://ws.sandverse.oasys.games             |

### Create a mintable ERC-721 smart contract using the Openzepplin contracts wizard
We will create a simple mintable ERC-721 smart contract using the [Openzepplin contracts wizard](https://docs.openzeppelin.com/contracts/4.x/wizard) instead of writing a smart contract directly.

![Smart Contract Wizard](/img/docs/techdocs/smart-contract/contract-wizard-ERC721.png)

1. Click the `ERC721` button because we need the Smart Contract of the ERC-721.
2. To add a method of minting ERC-721s to the Smart Contract, change the `Mintable` check box to Active.
3. Click the `Copy to Clipboard` button to copy the smart contract automatically created by the Openzepplin contracts wizard.

* The Mintable ERC-721 Smart Contract was easily created through the Openzepplin contracts wizard. Now it's time to deploy the copied smart contract.

* You can modify `ERC721("MyToken", "MTK")` to set the token name and symbol.

### Deploy the smart contract using Remix IDE
Remix IDE is an integrated development environment that allows you to develop, deploy, and manage smart contracts. We will deploy smart contracts created with the Openzepplin contracts wizard using the Remix IDE web browser.

![Deploy Smart Contract](/img/docs/techdocs/smart-contract/deploy-contract-ERC721-1.png)
1. Visit [Remix IDE](https://remix.ethereum.org/) and right-click the Contract folder in the workspace on the left.
2. Select the `New File` menu from the drop-down menu to create a smart contract file.
3. Name the file `MyToken.sol` and paste the copied smart contract into MyToken.sol file.
4. Compile your contract.

* Once you have pasted the smart contract and saved the file, download the Openzepplin library to Remix IDE automatically using the declared import statement.

![Deploy Smart Contract](/img/docs/techdocs/smart-contract/deploy-contract-ERC721-2.png)
1. Select the fourth menu on the left to navigate the `DEPLOY & RUN TRANSACTIONS` window.
2. Set the Provider environment to `Injected Provider - Metamask`.

After setting up Provider Environment, check the following.
* Ensure your account matches your metamask wallet address.
* Ensure your network matches network you want to deploy.

3. Check that the Smart Contract file you want to deploy is the MyToken.sol file that you created. 
4. When ready, click the `Deploy` button to deploy the smart contract.

- When you click the Deploy button, your metamask prompts you to sign the transaction.

![Deploy Smart Contract](/img/docs/techdocs/smart-contract/deploy-contract-ERC721-3.png)
- If Deploy is successful, you can check the transaction status for your account in Explorer, and view information about the smart contract you created.

### Mint ERC-721
![Mint ERC-721](/img/docs/techdocs/smart-contract/mint-erc721-token-sandverse-1.png)
- If Deploy is successful, you can see that Deployed Contract has been added.

1. You should click on the `safeMint` function created in MyToken.sol to set the address to send the token.

2. When ready, click the `transact` button and approve the transaction for token transfer.

* Please refer to [this](/docs/verse-developer/handle-token/1-1-vft-oft#metamask-gas-fee-settings) section for gas fee modification.

![Mint ERC-721](/img/docs/techdocs/smart-contract/mint-erc721-token-sandverse-2.png)
- If token minting is successful, go to your account page in Oasys Sand Verse Explorer. You can then click on the `Tokens` menu to view tokens you own.
