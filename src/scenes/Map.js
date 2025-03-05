class Map extends Phaser.Scene {
    constructor() {
        super("mapscene");
    }

    preload() {
        this.load.path = "./assets/";

        // map assets
        this.map = this.load.image('map', 'mapbase.png')
        this.load.image('mapCollision', 'mapcollision.png')

        // character assets
        this.load.spritesheet("ace-walkf", "ace-walkf.png", {
            frameWidth: 64,
            frameHeight: 91
        });
        this.load.image("ace-front", "ace-front.png");
    }

    create() {
        this.add.image(0, 0, 'map').setOrigin(0)
        let course = this.physics.add.sprite(0, 0, 'mapCollision').setOrigin(0)

        course.body.debugShowBody = true;
        course.body.debugBodyColor = 0x00ff00;

        // Add player to the map scene`
        this.lina = new Guy(this, 1000, 1100, 'hero', 0, 'down', false)
        this.ace = new Guy(this, 1500, 1000, 'hero', 0, 'down', true)

        console.log("Ace created:", this.ace);
        console.log("Lina created:", this.lina);
        this.ace.play('walk-down');
        this.lina.play('walk-down');
        //this.physics.add.sprite(1000, 1100, 'hero', 0)
        //this.lina = this.physics.add.sprite(1000, 1100, 'hero', 0)
        //this.lina.body.setVelocity(90, 90)
        //

        this.physics.add.collider(this.ace, course, this.handleCollision, null, this)
        
        
        this.guyFSM = this.ace.scene.guyFSM

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

        // this.physics.add.collider(this.lina, this.ace, (lina, ace) => {
        //     lina.body.setVelocity(0, 0);
        //     ace.body.setVelocity(0, 0);
        // })
    }

    handleCollision(player, obstacle) {
        //console.log('Collision detected between player and obstacle!');

    }

    update() {
        this.guyFSM.step()
    
        //LET LINA FOLLOW ME
        if (!this.physics.overlap(this.lina, this.ace)) {
            this.physics.moveToObject(this.lina, this.ace, 90, 1000);
        } else {
            this.lina.body.setVelocity(0, 0);
        }
    }
}
