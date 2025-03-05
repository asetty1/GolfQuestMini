class Map extends Phaser.Scene {
    constructor() {
        super("mapscene");
    }

    preload() {
        this.load.path = "./assets/";

        // map assets
        this.load.image('map', 'mapbase.png');

        // character assets
        this.load.spritesheet("ace-walkf", "ace-walkf.png", {
            frameWidth: 64,
            frameHeight: 91
        });
        this.load.image("ace-front", "ace-front.png");
    }

    create() {
        this.add.image(0, 0, 'map').setOrigin(0);

        // Add player to the map scene
        this.player = this.physics.add.sprite(100, 100, "ace-front");

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("ace-walkf", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("walk", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("walk", true);
        } else {
            this.player.setVelocityX(0);
            this.player.setTexture("ace-front");
        }
    }
}
