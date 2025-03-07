class Fight extends Phaser.Scene {
    constructor() {
        super("fightscene")
    }

    preload() {
        this.load.path = "./assets/"

        // map assets
        this.load.image('bg', 'fightbg.png')
        this.load.image('windmill', 'windmill.png')
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0)

        let windmill = this.add.image(-150, 220, 'windmill')
        let windmillTween = this.tweens.add({
            delay: 125,
            targets: windmill,
            x: 220,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            paused: false
        })

        windmillTween.play()

        //button  mashing! (based of of yakuza)
        this.mashCount = 0
        this.target = 20
        this.mashTimer = 3000

        this.mashKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.mashKey.on('down', () => {
            this.mashCount++;
        })
        console.log("Press the A key!")
        this.add.text(400, 100, 'Mash the A key!', {font: '30px damascus'})
        this.time.delayedCall(this.mashTimer, this.checkMashCount, [], this)

    }

    checkMashCount() {
        if (this.mashCount >= this.target) {
            console.log("Yay yuou did it!!")
        } else {
            console.log("You Lost :(((")
        }
    }
}
