class Map extends Phaser.Scene {
    constructor() {
        super("mapscene");
    }

    preload() {
        this.load.path = "./assets/";

        // map assets
        this.map = this.load.image('map', 'mapbase.png');

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
        this.hero = new Guy(this, 200, 150, 'hero', 0, 'down')
        this.guyFSM = this.hero.scene.guyFSM;

        // set up camera
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, 1733, 1158) //HARDCODED VALUES HERE ------------------

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        this.guyFSM.step()
    }
}
