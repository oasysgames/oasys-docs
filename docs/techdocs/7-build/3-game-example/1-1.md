---
---

# Sample Game 🦖

![Dino Runner Top Banner](/img/docs/techdocs/sample-game/game-top-banner.png)

This tutorial will teach you how to create a simple browser game using blockchain functionality on HOME verse or any other Oasys sub-verse that you have access to.

<!-- TODO: Replace dino runner link -->
<!-- TODO: Replace github link -->
We created [Dino Runner](https://hmv-dino-run-client.vercel.app/) as an example project and will look at important parts of the code that is publicly available [here](https://github.com/doublejumptokyo/hmv-dino-run-client) on GitHub to gain a better understanding of how to create a blockchain game and connect it to the Oasys network.

Dino Runner is a simple endless runner created with [Phaser 3](https://phaser.io/phaser3), which allows you to use the image data from your NFTs as the playable character, obstacle or background elements. NFT image data can be loaded from Homeverse, Ethereum or Polygon.

![Dino Runner NFT usage example](/img/docs/techdocs/sample-game/game-nft-example.png)

We will only briefly cover the gameplay implementation with Phaser and will mostly focus on explaining blockchain and NFT related functionality such as setting up a connection to a browser wallet and fetching NFT image data in this tutorial.

## Link Overview
<!-- TODO: Replace all link-->
[Playble build of the game](https://hmv-dino-run-client.vercel.app/)

[Game Github repository](https://github.com/doublejumptokyo/hmv-dino-run-client)

[Smart Contract Github repository](https://github.com/doublejumptokyo/dino-runner-solidity)