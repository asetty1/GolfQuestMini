'use strict'

let config = {
    type: Phaser.AUTO,
    width: 757,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            debugShowStaticBody: true
        }
    },
    scene: [ Load, Title, Map, Fight ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null