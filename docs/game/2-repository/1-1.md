---
---

# index.html and index.js

The **index.html** file is the starting point for our application and only does a few things.

- Link to the stylesheet **styles.css**
- Link to the favicon in **./assets/favicon.ico**
- Import the script file **index.js**

``` html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="./assets/favicon.ico"> 
    <script type="module" src="./index.js"></script>
  </head>
  <body>
  </body>
</html>
```

The **styles.css** file also only does very few things and is simple to understand.

- Import style from toastify which is an npm package we use to show toasts when executing requests
- Set the height and width of the canvas
- Set the color and layout for the body

``` css
@import "/node_modules/toastify-js/src/toastify.css";

canvas {
  max-width: 100%;
  max-height: 100vh;

  /* Fix height issue for mobile browsers */
  max-height: calc(var(--vh, 1vh) * 100);
}

html,
body {
  background-color: #2d2d2d;
  height: 100%;
  margin: 0;
  padding: 0;
}
```

The **index.js** file has a lot of responsibilities and helps us set up both **phaser** and our **web3 connection**.
Check the comments in the code for more details on what each line does.

``` javascript
import Menu from "./scenes/Menu.js"
import Runner from "./scenes/Runner.js"
import Web3Connection from "./classes/utility/Web3Connection.js"
import * as constants from "./constants.js"
import Phaser from 'phaser'

// This file acts as the starting point and initializes phaser and the web3 connection

var config = {
  type: Phaser.AUTO,
  width: constants.GAME.CANVAS_WIDTH,
  height: constants.GAME.CANVAS_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: constants.GAME.GRAVITY_Y },
      // Turn debug on to see collision boxes
      // debug: true,
    }
  },
  // Initializes both the menu and runner scene
  scene: [Menu, Runner],

  // Center canvas element on website
  autoCenter: Phaser.Scale.CENTER_BOTH,
}

// Creates new instance of phaser game
const game = new Phaser.Game(config)

// Nav bar height fix for mobile browsers
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
let vh = window.innerHeight
window.addEventListener('resize', () => {
  if (vh === window.innerHeight) {
    return
  }

  vh = window.innerHeight
  setFillHeight()
})
setFillHeight()

// Initialize web3 connection
const web3Connection = new Web3Connection(game)
web3Connection.initWeb3()

export { game, web3Connection }
```