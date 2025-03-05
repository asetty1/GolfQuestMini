class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.path = "./assets/";

        // dialogue assests
        this.load.image('dbox', 'dialogbox.png');
        this.load.image('dace', 'ace-dialog.png');
        this.load.image('dwedge', 'wedge-dialog.png');
        this.load.image('dlina', 'lina-dialog.png');

        // backgrounds
        this.load.image('loadscreen', 'loadscreen.png'); // Corrected file extension
    }

    create() {
        this.add.image(0, 0, 'loadscreen').setOrigin(0);
        //this.add.Text(centerX, centerY, 'arial', 'Press SPACE to start', 16).setOrigin(0.5)
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start("mapscene")
        }
    }
}
