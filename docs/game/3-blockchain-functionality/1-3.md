---
---

# Network Switching

For Dino Runner we wanted to allow players to use the data of their NFTs from 3 different chains: Homeverse, Ethereum and Polygon.
Of course a user can add these networks to their wallet themselves and switch them manually, however this does require some technical knowledge and is quite cumbersome.

![Add Network](/img/docs/techdocs/sample-game/game-add-network.png)
![Network Switch](/img/docs/techdocs/sample-game/game-network-switch.png)

To create a better user experience we can prepare some buttons in our game that will add the chain information to the wallet for the player.

![Network Buttons](/img/docs/techdocs/sample-game/game-network-buttons.png)

Pressing one of these buttons will execute the `suggestNetworkSwitch` function on our web3Connection instance.

**Menu.js**

``` javascript
  const homeverseButton = new CustomContainerButton(this, leftColumnPos, 400, 'buttonHomeverseUp', 'buttonHomeverseDown', 1)
  this.add.existing(homeverseButton)
  homeverseButton.setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      web3Connection.suggestNetworkSwitch("homeverse")
      this.selectSFX.play()
    })
```

Here we have a switch case that will feed the correct chainId, rpcUrls, currency, etc. to the wallet in order to set up the new network. The chainId needs to be passed as a hexadecimal value for this to work.
In the case of **ethereum mainnet** or a **default test network** we need to make a request to the wallet with `method: "wallet_switchEthereumChain"`.
For any **other network** we use `method: "wallet_addEthereumChain"`.

**Web3Connection.js**

``` javascript
  // Pop up window suggesting to the user to switch active network
  // Network can be "homeverse", "ethereum" or "polygon"
  suggestNetworkSwitch = async(network) => {
    if(!window || !window.ethereum) { return }

    try{
      // For eth mainnet we use "wallet_switchEthereumChain" instead of "wallet_addEthereumChain"
      switch(network) {
        case "homeverse":
          window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x4A43",
                rpcUrls: ["https://rpc.mainnet.oasys.homeverse.games/"],
                chainName: "Homeverse",
                nativeCurrency: {
                    name: "OAS",
                    symbol: "OAS",
                    decimals: 18
                },
                blockExplorerUrls: ["https://explorer.mainnet.oasys.homeverse.games/"]
            }]
          })
          break
        case "ethereum":
          window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: "0x1",
            }]
          })
          break
        case "polygon":
          window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x89",
              rpcUrls: ["https://polygon-rpc.com"],
              chainName: "POLYGON",
              nativeCurrency: {
                  name: "Matic",
                  symbol: "MATIC",
                  decimals: 18
              },
              blockExplorerUrls: ["https://polygonscan.com/"]
            }]
          })
          break 
      }  
    } catch (e) {
      Toastify({
        text: "Could not switch network. You might already be connected to this network or your browser only support manual network switching.",
        duration: 5000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #790909, #ff5e00)",
        },
      }).showToast()
      console.log("Could not switch network. You might already be connected to this network or your browser only support manual network switching.")
      throw 'Could not switch network. You might already be connected to this network or your browser only support manual network switching.'
    }
  }
```

If the user doesn't already have the network registered in their wallet, they are asked to allow the site to add the network.

![Allow Network](/img/docs/techdocs/sample-game/game-allow-network.png)

If it is already registered, they will be asked to allow the site to switch the network instead.

![Homeverse Switch](/img/docs/techdocs/sample-game/game-switch-homeverse.png)
