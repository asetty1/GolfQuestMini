/*  Ananya Setty
    Golf Quest Mini
    March 2025

    Phaser Components: physics through collision, cameras, text objects, tweens, timers
    Restart the game by going to the credits from either the Title or Map scene 
    and then restarting by returning to the Title screen

    Controls: Steven uses a game controller with the standard stick and 4 buttons
    so I let the player have movement through arrow keys as well as 4 randomized 
    buttons for the button mashing in the Fight scenes.
*/

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 757,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            debugShowStaticBody: false
        }
    },
    scene: [ Load, Title, Map, WindmillFight, WaterFight, Credits ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null