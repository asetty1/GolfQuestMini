'use strict'

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [ Title ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config