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
        this.ace = new Guy(this, 1000, 1000, 'hero', 0, 'down')
        this.lina = this.physics.add.sprite(1000, 1100, 'hero', 0)
        //this.lina.body.setVelocity(90, 90)
        //new Guy(this, 1000, 1100, 'hero', 0, 'down')
        
        this.lina.setTint(0xff0000)

        this.guyFSM = this.ace.scene.guyFSM;

        // set up camera
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.ace, false, 0.5, 0.5)
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

        this.physics.add.collider(this.lina, this.ace, (lina, ace) => {
            lina.body.setVelocity(0, 0);
            ace.body.setVelocity(0, 0);
        })
    }

    update() {
        this.guyFSM.step();
    
        // Check if Lina and Ace are overlapping
        if (!this.physics.overlap(this.lina, this.ace)) {
            this.physics.moveToObject(this.lina, this.ace, 90, 1000);
        } else {
            this.lina.body.setVelocity(0, 0);
        }
    }
}
