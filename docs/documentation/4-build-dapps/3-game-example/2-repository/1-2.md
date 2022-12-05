---
---

# Constants

The **constants.js** file holds many constants we want to easily be able to change on the fly without having to dig through our code in multiple files.
Here we can easily change things such as the run speed or jump height of the player character.
We can affect things such as the spawn rate of obstacles or the scroll speed of our parallax background.

``` javascript
// This file contains constant data that is used throghout the game to make it easy to update

const GAME = {
  START_POS: 200,
  START_HEIGHT: 400,
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 600,
  GRAVITY_Y: 3000,
  SCORE_MULTIPLIER: 0.01,
  DIFFICULTY_INCREASE_THRESHOLD: 100,
  CUSTOM_IMG_MAX_SIZE: 150,
  CUSTOM_IMG_MAX_SIZE_ROCK: 130,
  HMV_TEST_CHAINID: 40875,
  HMV_MAIN_CHAINID: 19011,
  CUSTOM_ART_KEY: "customArtNfts",
  SOURCE_CODE_URL: "https://github.com/doublejumptokyo/dino-runner-client/tree/main",
}

const PLAYER = {
  BASE_RUN_SPEED: 850,
  MAX_RUN_SPEED: 1800,
  RUN_SPEED_STEP_MULTIPLIER: 1.08,
  JUMP_STRENGTH: 1200,
  RENDER_DEPTH: 1000,
  BOUNCE: 0,
}

const ENVIRONMENT = {
  PARALLAX_INSTANCE_MAX: 3,
  CLOUD_LAYER_SCROLL_SPEED: 0.05,
  BACK_LAYER_SCROLL_SPEED: 0.01,
  FRONT_CLOUDS: {
    SCROLL_SPEED: 0.13,
    MIN_SPAWN_DELAY: 6000,
    MAX_SPAWN_DELAY: 15000,
    Y_POS_MIN: 50,
    Y_POS_MAX: 250,
  },
}

const GROUND = {
  IMAGE_LENGTH: 1920,
  FIRST_PLATFORM_OFFSET: 400,
  Y_POS: 668,
  MAX_INSTANCE_AMOUNT: 4,

  // FIRST_PLATFORM_POS = GROUND.IMAGE_LENGTH - GAME.CANVAS_WIDTH + GROUND.FIRST_PLATFORM_OFFSET
  // Can't use these const values during initialization so if any of those values changes we need to change it here as well
  FIRST_PLATFORM_POS: 1920 - 1280 + 400,
}

const OBSTACLES = {
  POS_TOLERANCE_MIN: 700,
  POS_TOLERANCE_MAX: 200,
  FIRST_SPAWN_POSITION: 1000,
  MAX_INSTANCES: 3,

  // Adjusts chance of a hard obstacle spawning
  // Only applies when not using custom art
  HARD_SPAWN_CHANCE_BASE: 10,
  HARD_SPAWN_CHANCE_STEP: 2,
  HARD_SPAWN_CHANCE_MAX: 50,
}

const INTERFACE = {
  HUD_RENDER_DEPTH: 1001,
  ACTIVE_ALPHA: 1,
  INACTIVE_ALPHA: 0.5,
}

export { GAME, PLAYER, ENVIRONMENT, GROUND, OBSTACLES, INTERFACE }
```