class Map extends Phaser.Scene {
    constructor() {
        super("mapscene");
    }

    preload() {
        this.load.path = "./assets/";

        // map assets
        this.map = this.load.image('map', 'mapbase.png')
        this.extras = this.load.image('extra', 'mapextra.png')

        this.load.image('textbox', 'textbox-01.png')

        // character assets
        this.load.spritesheet("ace-walkf", "ace-walkf.png", {
            frameWidth: 64,
            frameHeight: 91
        });
        this.load.image("ace-front", "ace-front.png");
    }

    create() {
        this.add.image(0, 0, 'map').setOrigin(0)
        this.add.image(0, 0, 'extra').setOrigin(0)

        // Add player to the map scene`
        this.lina = new Follow(this, 1250, 210, 'ace', 0, 'down', true)
        this.ace = new Guy(this, 1100, 220, 'ace', 0, 'down', true)
        this.lina.setTint(0xff0000)

        //ADDING COLLIDERS
        let lineA = this.add.rectangle(866, 407, 41, 10, 0xAF5F5D).setAngle(-27.57)
        this.physics.add.existing(lineA, true)

        if (lineA.body) {
           //lineA.body.setImmovable(true)
            lineA.body.rotation = Phaser.Math.DegToRad(-27.57)
        }
        
        
        this.guyFSM = this.ace.scene.guyFSM
        this.followFSM = this.lina.scene.followFSM

        //camera
        this.cameras.main.setBounds(100, 100, 1300, 800)
        this.cameras.main.startFollow(this.ace, false, 0.5, 0.5)
        this.physics.world.setBounds(100, 100, 1300, 800) //HARDCODED VALUES HERE ------------------


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

    handleCollision(player, obstacle) {
        //console.log('Collision detected between player and obstacle!');

    }

    update() {
        this.guyFSM.step()
        this.followFSM.step()
    
        //LET LINA FOLLOW ME
        if (!this.physics.overlap(this.lina, this.ace)) {
            this.physics.moveToObject(this.lina, this.ace, 90, 1000);
        } else {
            this.lina.body.setVelocity(0, 0);
        }

        if(this.physics.overlap(this.ace, this.lineA)) {
            console.log("HES STANDING RIGHT THERE")
            this.add.sprite(741, 480, 'textbox')
        }

        if(Phaser.Input.Keyboard.JustDown(this.keys.FKey)) {
            this.scene.start("fightscene")
        }
    }
}
