---
---

# Wallet Connection

To connect to MetaMask and other wallet providers we will use [Web3Modal](https://github.com/WalletConnect/web3modal) in this tutorial, which is available as an npm package.
This package will allow us to easily connect to MetaMask, but can also connect to other providers by just changing a few settings.

If you followed along with the previous steps and ran `npm install`, the package is already installed for you.
Most of our blockchain related functionality is in our `src/classes/utility/Web3Connection.js` file and so is the code for initializing our web3Modal. 
`initWeb3` is called from index.js when we set up the game.

``` javascript
import { ethers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal'
import Toastify from 'toastify-js'

export default class Web3Connection {
//....

  // Init web3 modal
  initWeb3 = async() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            40875: "https://rpc.testnet.oasys.homeverse.games/",
            19011: "https://rpc.mainnet.oasys.homeverse.games/",
          },
        }
      },
    }

    this.web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    })

    try {
      this.provider = await this.web3Modal.connect()
      await this.setEthers()
     
      // Update network text on menu scene
      this.game.scene.scenes[0].updateNetworkText(this.web3Network)
      this.game.scene.scenes[0].setConnectWalletButtonVisibility(false)
    } catch (e) {
      console.log(e)
      console.log("Couldn't initialize Web3")
      Toastify({
        text: "Couldn't initialize Web3",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #790909, #ff5e00)",
        },
      }).showToast();
    }

    this.provider.on("chainChanged", this.handleNetworkSwitch)
  }

  // Initialize web3 settings through ethers
  setEthers = async() => {
    this.web3Provider = new ethers.providers.Web3Provider(this.provider)
    this.web3Signer = this.web3Provider.getSigner()
    this.web3Address = await this.web3Signer.getAddress()
    this.web3Network = await this.web3Provider.getNetwork()
  }
//...
}
```

We use MetaMask as our main wallet and the desktop version of MetaMask is activated by default without adding a provider. However we also want to make the game playable to some extend on the mobile MetaMask app. To make this possible we also want add **WalletConnect** as a provider and set up our custom rpcs for homeverse testnet and mainnet.

``` javascript
import WalletConnectProvider from "@walletconnect/web3-provider";

//....

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        40875: "https://rpc.testnet.oasys.homeverse.games/",
        19011: "https://rpc.mainnet.oasys.homeverse.games/",
      },
    }
  },
}

//...
```

In our custom function called `setEthers` we save our provider, wallet address and connected network in the instance of our Web3Connection class.

``` javascript
//...

await this.setEthers()

//...

// Initialize web3 settings through ethers
setEthers = async() => {
  this.web3Provider = new ethers.providers.Web3Provider(this.provider)
  this.web3Signer = this.web3Provider.getSigner()
  this.web3Address = await this.web3Signer.getAddress()
  this.web3Network = await this.web3Provider.getNetwork()
}

//...
```

We'll use this data in the next chapter to display it for the user.