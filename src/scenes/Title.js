class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.path = "./assets/";

        //audio
        this.load.audio('sfx-beep', 'sound/title.wav')

        // backgrounds
        this.load.image('loadscreen', 'loadscreen.png'); // Corrected file extension
    }

    create() {
        this.add.image(0, 0, 'loadscreen').setOrigin(0).setScale(0.5);
        //this.add.Text(centerX, centerY, 'arial', 'Press SPACE to start', 16).setOrigin(0.5)
        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.sound.play('sfx-beep');
            },
            loop: true
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start("mapscene")
        }
    }
}
