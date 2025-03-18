class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.path = "./assets/";

        //audio
        this.load.audio('sfx-beep', 'sound/title.wav')

        // backgrounds
        this.load.image('loadscreen', 'loadscreen.png')
        this.load.image('button', 'start_button.png')
        this.load.image('credit', 'creditsbutton.png')
    }

    create() {
        this.add.image(0, 0, 'loadscreen').setOrigin(0).setScale(0.5);
        this.button = this.add.image(378, 460, 'button').setVisible(false).setScale(0.85)
        this.add.image(787, 670, 'credit').setOrigin(1, 1).setScale(1)
        //this.add.Text(centerX, centerY, 'arial', 'Press SPACE to start', 16).setOrigin(0.5)
        this.cursors = this.input.keyboard.createCursorKeys()

        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.sound.play('sfx-beep')
                this.button.setVisible(true)

                this.time.delayedCall(500, () => {
                    this.button.setVisible(false);
                })
            },
            loop: true
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start("mapscene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.scene.start("credits")
        }
    }
}
