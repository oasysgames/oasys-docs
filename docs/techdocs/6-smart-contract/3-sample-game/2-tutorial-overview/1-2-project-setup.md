---
---

# Project Setup

<!-- TODO: Update repository link -->
If you just want a conceptual overview, feel free to skip this page and just read through the remaining chapters.
But if you want to set up the project on your own machine so you can experiment with the code yourself, please clone the [repository](https://github.com/doublejumptokyo/dino-runner-client/tree/main) from GitHub.

```bash
git clone https://github.com/doublejumptokyo/hmv-dino-run-client
```

Once the repository is cloned to our machine we will need a text editor to open up the files and make changes to them. For the sake of this tutorial we recommend using [Visual Studio Code](https://code.visualstudio.com/).

Before we start up the project we need to have an Ethereum wallet installed to access all the features of the game. A popular choice is [MetaMask](https://metamask.io/), which we will be using in this tutorial.

After you've installed MetaMask, open up the Dino Runner project folder in visual studio code. Then open up the terminal of your choice within that folder. We will need to run `npm install` to install all the packages our project depends upon.

``` bash
npm install
```

To start up the development server and package our project we rely on a bundler called [Parcel](https://parceljs.org/) which is recommended for phaser projects.
We added two scripts to the **package.json** file to make working with parcel easier.


``` json
"scripts": {
    "dev": "parcel src/index.html --open --no-cache",
    "build": "parcel build src/index.html"
}
```

`npm run build` will create a file package in the **dist** folder which we can upload to a hosting service like [Vercel](https://vercel.com/dashboard) to host the website.

`npm run dev` will start up the local development server and allow us to quickly test changes to the code. After typing in the command, the website should automatically open in your browser.

The dev server that starts with the `npm run dev` command should automatically look for changes in the code and apply them instantly to your page when reloading, however in some cases the watcher might be unable to pickup changes to the code. In that case you will first need to use `npm run build` and then `npm run dev` to see your changes reflected.

Now the game is running locally on our machine to allow us to quickly test changes to the code and develop the game further.

![Dino Runner Main Menu](/img/docs/techdocs/sample-game/game-main-menu.png)