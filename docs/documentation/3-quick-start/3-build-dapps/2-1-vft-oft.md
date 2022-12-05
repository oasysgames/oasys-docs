# Handle Fungible Tokens

---
---

# Create an ERC-20 Token
ERC-20 is a token standard for replaceable tokens in the Ethereum blockchain. Tokens created in the ERC-20 standard can transfer tokens from one account to another, get the token balance for the current account, and get the total supply of tokens available on the network.

This tutorial has been written easily for developers who have never made ERC-20 tokens, and we will try to make ERC-20 tokens in the [goerli test network](https://goerli.net/).

To perform this tutorial, use the following tools:
1. Remix IDE : Remix IDE allows you to edit smart contracts and deploy.
2. OpenZepplin Contract Wizard : You can easily create an ERC-20 smart contract using OpenZeppelin Contract Wizard.
3. Metamask (browser extension) : Process transactions and deploy smart contracts through the Metamask browser extension.
4. Goerli test network Faucet : You can receive a Testnet Ethereum token from the faucet for transaction processing during the tutorial.

## Set up Metamask

Please refer to [Install Metamask](/docs/techdocs/wallet/1-4) document for basic installation instructions.

### Add Goerli test network on metamask
Metamask allows you to add goeril test network using settings within the metamask, even if you do not add a new network. In this guide, we will add a testnet using metamask settings.

![Setting testnet set option1](/img/docs/techdocs/smart-contract/add-testnet-1.png)

1. Open your metamask. Then click the Profile button to the right of the network select button. 
2. Click the Setting menu among the drop-down menus.
3. Click the Advanced menu to set the advanced settings.

![Setting testnet set option2](/img/docs/techdocs/smart-contract/add-testnet-2.png)

1. When you click the Advanced menu to enter the advanced Settings window, search the `Show test networks` item.
2. Set `Show test networks` from off to on.

![Setting testnet set option3](/img/docs/techdocs/smart-contract/add-testnet-3.png)

1. Click the Network select button and select `Goerli test network` to change the active network.

* Now your metamask active network is switched to the goerli test network.

## Funding goerli test network token (GoerliETH)
A certain amount of tokens are required to process transactions by Smart Contract deployment. We can get the token of the Goerli test network from the faucet.

1. Visit [Alchemy](https://www.alchemy.com/) and create an alchemy account.
2. If you have created an Alchemy account, visit the alchemy goerli faucet.
3. Copy and paste the wallet address of the meta mask to receive the Goerli test network token into the wallet address text box, and click the `Send Me Eth` button.

## Create a mintable ERC-20 token smart contract using the Openzepplin contracts wizard
We will create a simple mintable ERC-20 token smart contract using the [Openzepplin contracts wizard](https://docs.openzeppelin.com/contracts/4.x/wizard) instead of writing a smart contract directly.

![Smart Contract Wizard](/img/docs/techdocs/smart-contract/contract-wizard.png)

1. Click the `ERC20` button because we need the Smart Contract of the ERC-20 token.
2. To add a method of minting ERC-20 tokens to the Smart Contract, change the `Mintable` check box to Active.
3. Click the `Copy to Clipboard` button to copy the smart contract automatically created by the Openzepplin contracts wizard.

* The Mintable ERC-20 Smart Contract was easily created through the Openzepplin contracts wizard. Now it's time to deploy the copied smart contract.

* You can modify `ERC20("MyToken", "MTK")` to set the token name and symbol.

## Deploy the smart contract using Remix IDE
Remix IDE is an integrated development environment that allows you to develop, deploy, and manage smart contracts. We will deploy smart contracts created with the Openzepplin contracts wizard using the Remix IDE web browser.

![Deploy Smart Contract](/img/docs/techdocs/smart-contract/deploy-contract-1.png)
1. Visit [Remix IDE](https://remix.ethereum.org/) and right-click the Contract folder in the workspace on the left.
2. Select the `New File` menu from the drop-down menu to create a smart contract file.
3. Name the file `MyToken.sol` and paste the copied smart contract into MyToken.sol file.

* Once you have pasted the smart contract and saved the file, download the Openzepplin library to Remix IDE automatically using the declared import statement.

![Deploy Smart Contract](/img/docs/techdocs/smart-contract/deploy-contract-2.png)
1. Select the fourth menu on the left to navigate the `DEPLOY & RUN TRANSACTIONS` window.
2. Set the Provider environment to `Injected Provider - Metamask`.
* After setting up Provider Environment, ensure your account matches your metamask wallet address.
3. Check that the Smart Contract file you want to deploy is the MyToken.sol file that you created. 
4. When ready, click the `Deploy` button to deploy the smart contract.

- When you click the Deploy button, your metamask prompts you to sign the transaction. We can process the transaction because we received the test token from faucet.

![Deploy Smart Contract](/img/docs/techdocs/smart-contract/deploy-contract-3.png)
- If Deploy is successful, the console of the Remix IDE contains information about the transaction and a link to `view on etherscan` that lets you navigate to Explorer in etherscan. Use this link to view more detailed transaction information in etherscan.
- You can use etherscan to check the transaction information and that the smart contract you created has been successfully deployed.

## Mint ERC-20 token
![Mint ERC-20 Token](/img/docs/techdocs/smart-contract/mint-erc20-token-1.png)
- If Deploy is successful, you can see that Deployed Contract has been added.

1. You should click on the `mint` function created in MyToken.sol to set the address to send the token and the amount of tokens to send.
2. When ready, click the `transact` button and approve the transaction for token transfer.

![Mint ERC-20 Token](/img/docs/techdocs/smart-contract/mint-erc20-token-2.png)
1. If token minting is successful, go to etherscan, where you can view the transaction details through the transaction tracking link provided by the console of Remix IDE.
2. Click MyToken (MTK) to go to the page where you can view information about the token you created.
3. You can check the total supply of tokens, the number of holders, and the transaction information on the page.

## Import token to metamask
The token has been received but is not visible on the metamask. In this case, you must import tokens from the metamask.

![Import ERC-20 Token](/img/docs/techdocs/smart-contract/import-token-1.png)
1. Open your metamask. Then click the Import tokens link.
2. If you enter the Import tokens window, submit the contract of the token you created in the `Token contract address`.
* The remaining items are automatically populated if you enter the Token contract address.

![Import ERC-20 Token](/img/docs/techdocs/smart-contract/import-token-2.png)
1. The symbol and quantity of tokens to be imported are printed, and click the `Import tokens` button to add tokens to the metamask.
2. Once the token import is completed, you can see that the token has been successfully added to your metamask.

## Create an ERC-20 Token on Oasys Sand Verse network
Based on how to create an ERC-20 token from the goerli test network created above, we will explain how to create an ERC-20 token from Oasys Sand Verse network.

To perform this tutorial, use the following tools:
1. Remix IDE : Remix IDE allows you to edit smart contracts and deploy.
2. OpenZepplin Contract Wizard : You can easily create an ERC-20 smart contract using OpenZeppelin Contract Wizard.
3. Metamask (browser extension) : Process transactions and deploy smart contracts through the Metamask browser extension.
* Oasys Sand Verse network is layer-2, and the faucet does not exist because gas is **free** when processing transactions.

## Add Oasys Sand Verse network network on metamask
![Add Oasys Sand Verse network on metamask](/img/docs/techdocs/smart-contract/add-network-1.png)
When you click the Add network button, a web page is called where you can add a new network to your metamask. You can add the Oasys Sand Verse network on this web page by entering each item according to the instructions below.

### Oasys Sand Verse
|                 |                                            |
|-----------------|--------------------------------------------|
| ChainID         | 20197                                      |
| Currency Symbol | OAS                                        |
| RPC             | https://rpc.sandverse.oasys.games/         |
| Explorer        | https://explorer.sandverse.oasys.games/    |
| Web Socket      | wss://ws.sandverse.oasys.games             |

## Create a mintable ERC-20 token smart contract using the Openzepplin contracts wizard
Please refer to [this](/docs/techdocs/build/erc-token/1-2#create-a-mintable-erc-20-token-smart-contract-using-the-openzepplin-contracts-wizard) section because the Openzepplin contracts wizard uses the same method of creating a Smart Contract.

## Deploy the smart contract using Remix IDE
![Deploy Smart Contract - Sand Verse](/img/docs/techdocs/smart-contract/deploy-contract-sandverse-1.png)
Create the MyToken.sol file in Remix IDE, as shown in [this](/docs/techdocs/build/erc-token/1-2#deploy-the-smart-contract-using-remix-ide) section.

![Deploy Smart Contract - Sand Verse](/img/docs/techdocs/smart-contract/deploy-contract-sandverse-2.png)
When the MyToken.sol file is ready, and Smart Contract is deployed; due to a chronic problem with the Metamask, the transaction cannot be accepted with a message that the gas-free Oasys Sand Verse consumes the gas bill.

### Metamask gas fee settings
In this case, you can do the following to approve the transaction.
- First, click `EDIT` in the Estimated gas feed section.
- If you have moved to the Edit priority window, click the `Edit suggested gas fee` button at the bottom of the window.
- Now you can modify the gas price yourself. Enter `0.0000000001` in the `Gas price (GWEI)` input window and click the `Save` button to save the set gas price.
- Now you can approve the transaction without paying the gas fee.

![Deploy Smart Contract - Sand Verse](/img/docs/techdocs/smart-contract/deploy-contract-sandverse-3.png)
- If Deploy is successful, you can click the `View Account in Explorer` menu on the metamask to navigate to the Explorer you set up when you added the Oasys Sand Version network.
- In Explorer, you can check the transaction status for your account and view information about the smart contract you created.

## Mint ERC-20 token
![Mint ERC-20 Token](/img/docs/techdocs/smart-contract/mint-erc20-token-sandverse-1.png)
- If Deploy is successful, you can see that Deployed Contract has been added.

1. You should click on the `mint` function created in MyToken.sol to set the address to send the token and the amount of tokens to send.
2. When ready, click the `transact` button and approve the transaction for token transfer.

* Please refer to [this](/docs/techdocs/build/erc-token/1-2#metamask-gas-fee-settings) section for gas fee modification.

![Mint ERC-20 Token](/img/docs/techdocs/smart-contract/mint-erc20-token-sandverse-2.png)
- If token minting is successful, go to Oasys Sand Verse Explorer. You can then click on the `Token Transfers` menu to view transactions for token minting.

## Import token to metamask
The token has been received but is not visible on the metamask. In this case, you must import tokens from the metamask.

![Import ERC-20 Token](/img/docs/techdocs/smart-contract/import-token-sandverse-1.png)
- Visit Oasys Sandverse to view information about the minted token. You can copy the token's smart contract address and import it into the meta mask according to how it was written in [this](/docs/techdocs/smart-contract/build/erc-token/1-2#import-token-to-metamask) section.