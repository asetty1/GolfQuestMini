class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.path = "./assets/";

        // images
        this.load.image('dbox', 'dialogbox.png');
        this.load.image('dace', 'ace-dialog.png');
        this.load.image('dwedge', 'wedge-dialog.png');
        this.load.image('dlina', 'lina-dialog.png');

        // backgrounds
        this.load.image('loadscreen', 'loadscreen.png'); // Corrected file extension
    }

    create() {
        this.add.image(0, 0, 'loadscreen').setOrigin(0);
    }

    update() {
        // You can add logic for updates here if needed
    }
}
