class WindmillFight extends Phaser.Scene {
    constructor() {
        super("windmill")
    }

    preload() {
        this.load.path = "./assets/"

        // map assets
        this.load.image('bg', 'fightbg.png')
        this.load.image('introbox', 'fighttextbox.png')
        this.load.image('success', 'success-textbox.png')
        this.load.image('aceandlina', 'acelinafight.png')
        this.load.image('win', 'winshot.png')
        this.load.image('lose', 'loseshot.png')

        this.load.audio('yay', 'sound/win.wav')
        this.load.audio('ohno', 'sound/lose.wav')


        this.load.spritesheet('windmill', 'spritesheet-windmill.png', {
            frameWidth: 1265,
            frameHeight: 1250,
            startFrame: 0,
            endFrame: 3,
        })

        this.load.spritesheet('xmash', 'buttons/xmash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        })
        
        this.load.spritesheet('amash', 'buttons/amash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        })

        this.load.spritesheet('tmash', 'buttons/tmash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        })

        this.load.spritesheet('hmash', 'buttons/hmash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        })
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0)

        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('windmill', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        let windmill = this.add.sprite(-150, 220, 'windmill')
        windmill.setScale(0.25)
        let windmillTween = this.tweens.add({
            delay: 125,
            targets: windmill,
            x: 220,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            paused: true,
            onComplete: () => {
                windmill.play('spin')
            }
        })

        let acelina = this.add.sprite(900, 440, 'aceandlina')
        acelina.setScale(0.75)
        let acelinaTween = this.tweens.add({
            delay: 125,
            targets: acelina,
            x: 600,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            paused: true
        })

        ///--------------------------------------------------

        // Create animations
        this.anims.create({
            key: 'xmash',
            frames: this.anims.generateFrameNumbers('xmash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        })

        this.anims.create({
            key: 'amash',
            frames: this.anims.generateFrameNumbers('amash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        })

        this.anims.create({
            key: 'tmash',
            frames: this.anims.generateFrameNumbers('tmash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        })

        this.anims.create({
            key: 'hmash',
            frames: this.anims.generateFrameNumbers('hmash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        })

        this.mashCount = 0
        this.target = 20
        this.mashTimer = 4000
        this.successCount = 0

        this.popupImage = this.add.sprite(400, 300, 'success').setVisible(false)
        this.startUp = this.add.sprite(400, 300, 'introbox')

        this.keys = [
            Phaser.Input.Keyboard.KeyCodes.X,
            Phaser.Input.Keyboard.KeyCodes.A,
            Phaser.Input.Keyboard.KeyCodes.H,
            Phaser.Input.Keyboard.KeyCodes.T,
            Phaser.Input.Keyboard.KeyCodes.M
        ]

        this.currentKey = null
        this.mashSprite = null

        this.time.delayedCall(3000, () => {
            this.startUp.setVisible(false)
            windmillTween.play()
            acelinaTween.play()
            this.startButtonMashing()
        }, [], this)
    }

    startButtonMashing() {
        if (this.successCount < 4) {
            this.time.delayedCall(1000, this.pickRandomFunction, [], this)
        }
    }

    pickRandomFunction() {
        let functions = [this.functionX, this.functionA, this.functionH, this.functionT]
        let randomIndex = Phaser.Math.Between(0, functions.length - 1)
        functions[randomIndex].call(this)
    }

    functionX() {
        this.handleMash('X', 'xmash')
    }

    functionA() {
        this.handleMash('A', 'amash')
    }

    functionH() {
        this.handleMash('H', 'hmash')
    }

    functionT() {
        this.handleMash('T', 'tmash')
    }

    handleMash(key, anim) {
        this.currentKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key])
        this.mashCount = 0
        console.log(`Start mashing the ${key} key!`)

        if (this.mashSprite) {
            this.mashSprite.destroy()
        }

        this.mashSprite = this.add.sprite(400, 300, anim)
        this.mashSprite.play(anim)

        this.input.keyboard.on('keydown-' + key, this.countMash, this)
        this.time.delayedCall(this.mashTimer, () => {
            this.checkMashCount(anim),
            this.stopAnimation(anim)
         }, [], this)
        
    }

    countMash() {
        this.mashCount++
    }

    checkMashCount(anim) {
        this.winshot = this.add.sprite(1500, 300, 'win').setScale(0.4)
        this.winshotTween = this.tweens.add({
            delay: 125,
            targets: this.winshot,
            x: 400,
            ease: 'Linear',
            duration: 300,
            hold: 2000,
            repeat: 0,
            paused: true,
            yoyo: true
        })

        this.loseshot = this.add.sprite(1500, 300, 'lose').setScale(0.4)
        this.loseshotTween = this.tweens.add({
            delay: 125,
            targets: this.loseshot,
            x: 400,
            ease: 'Linear',
            duration: 450,
            hold: 2000,
            repeat: 0,
            paused: true,
            yoyo: true
        })


        if (this.currentKey) {
            this.input.keyboard.off('keydown-' + this.currentKey.keyCode, this.countMash, this)
        }

        if (this.mashCount >= this.target) {
            console.log("Yay, you did it!!")
            console.log("mash count: ", this.mashCount)
            this.sound.play('yay')
            this.winshotTween.play()
            this.successCount++
        } else {
            console.log("You Lost :(((")
            this.sound.play('ohno')
            this.loseshotTween.play()
        }

        if (this.successCount >= 4) {
            this.popupImage.setVisible(true)
            console.log("You won!") // Debugging message
        } else {
            this.time.delayedCall(4000, this.pickRandomFunction, [], this)
        }
    }

    stopAnimation (anim) {
        if (this.mashSprite) {
            this.mashSprite.anims.stop()
            this.mashSprite.destroy()
        }
    }

    //this is just for console output
    getKeyCharacter(keyCode) {
        const keyMap = {
            88: 'X',
            65: 'A',
            72: 'H',
            84: 'T'
        }
        return keyMap[keyCode] || 'Unknown Key'
    }

    update() {
        if (this.successCount >= 4) {
            this.popupImage.setVisible(true)
            console.log("You won!")

            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M))) {
                this.scene.start("mapscene")
            }
        }
    }
}
