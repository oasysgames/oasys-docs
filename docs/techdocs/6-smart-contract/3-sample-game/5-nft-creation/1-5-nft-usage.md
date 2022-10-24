---
---

# NFT Usage
<!-- TODO: Update link -->
To use the nft we created by ourselves we need to start up our development server for dino runner client again or just use the [version hosted by us](https://hmv-dino-run-client.vercel.app/).

Click on Customize.

![Customization](/img/docs/techdocs/sample-game/game-customize.png)

Clicking on the **HomeVerse** network switch button will connect us to the main net, so instead we'll add the HomeVerse test net manually to our MetaMask.
Click on the Networks drop down and then select **Add Network**.

![Add Oasys Network](/img/docs/techdocs/sample-game/game-add-oasys.png)

Input the following data for HomeVerse Testnet here.

**Network Name: HomeVerse Testnet**

**RPC URL:** [https://rpc.testnet.oasys.homeverse.games/](https://rpc.testnet.oasys.homeverse.games/)

**Chain ID: 40875**

**Currency Symbol: OAS**

**Block Explorer URL:** [https://explorer.testnet.oasys.homeverse.games/](https://explorer.testnet.oasys.homeverse.games/)

![Network Info](/img/docs/techdocs/sample-game/game-network-info.png)

After inputting the data, switch the active network in your MetaMask to HomeVerse Testnet.
Now copy and paste the address you deployed your contract at and the tokenId of 0 in this menu.
When you click fetch you'll get a pop up in MetaMask you need to sign to fetch the image data.

![Fetch Signature](/img/docs/techdocs/sample-game/game-fetch-signature.png)

The image of your token can now be applied as a player, obstacle or cloud.

![Fetch Signature](/img/docs/techdocs/sample-game/game-fetch-signature.png)
![Apply NFT](/img/docs/techdocs/sample-game/game-apply-nft.png)