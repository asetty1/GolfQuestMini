class Map extends Phaser.Scene {
    constructor() {
        super("mapscene");
    }

    preload() {
        this.load.path = "./assets/";

        this.load.audio('bgmusic', 'sound/cigarette-boat.wav')
        this.load.audio('boss', 'sound/bossappears.wav')
        this.load.audio('overlap', 'sound/boss.wav')

        // map assets
        this.map = this.load.image('map', 'mapbase.png')
        this.extras = this.load.image('extra', 'mapextra-01.png')
        this.flowers = this.load.image('flowers', 'flower.png')
        this.load.spritesheet('lake', 'fountainanimation.png', {
            frameWidth: 1400,
            frameHeight: 1000,
            startFrame: 0,
            endFrame: 1
        })

        //textboxes
        this.load.image('windfight', 'windmill-fight.png')
        this.load.image('waterfight', 'waterfountain-fight.png')
        this.load.image('credits', 'credits-textbox.png')
        this.load.image('instructions', 'instructions.png')
    }

    create() {
        this.musicStarted = false

        this.add.image(0, 0, 'map').setOrigin(0).setDepth(1)
        this.add.image(0, 0, 'extra').setOrigin(0).setDepth(10)
        this.add.image(0, 0, 'flowers').setOrigin(0).setDepth(2)
        this.anims.create({
            key: 'fountain',
            frames: this.anims.generateFrameNumbers('lake', {
                start: 0,
                end: 1
            }),
            frameRate: 1,
            repeat: -1
        })
        this.fountain = this.add.sprite(0, 0, 'lake').setOrigin(0).setDepth(3)
        this.fountain.play('fountain')
        

        // Add player to the map scene`
        this.lina = new Follow(this, 1250, 210, 'lina', 0, 'down', true)
        this.ace = new Guy(this, 1100, 220, 'ace', 0, 'down', true)
        this.ace.setDepth(5)
        this.lina.setDepth(5)

        //ADDING COLLIDERS 
        //line a - windmill
        let lineA = this.add.rectangle(866, 407, 41, 10, 0xAF5F5D).setAngle(-27.57)
        this.lineA = lineA
        this.physics.add.existing(this.lineA, true)

        //line b - credits
        let lineB = this.add.rectangle(446, 176, 10, 45, 0xAF5F5D)
        this.lineB = lineB
        this.physics.add.existing(this.lineB, true)

        //line c - water fountain
        let lineC = this.add.rectangle(407, 398, 10, 45, 0xAF5F5D).setAngle(123)
        this.lineC = lineC
        this.physics.add.existing(this.lineC, true)

        //colliders for water
        this.circle1 = this.add.circle(169, 690, 204, 0xffffff).setOrigin(0).setAlpha(0)
        this.physics.add.existing(this.circle1, true)
        this.circle1.body.setCircle(102)

        this.circle2 = this.add.circle(312, 639, 65, 0xffffff).setOrigin(0).setAlpha(0)
        this.physics.add.existing(this.circle2, true)
        this.circle2.body.setCircle(65)

        this.circle3 = this.add.circle(395, 441, 65, 0xffffff).setOrigin(0).setAlpha(0)
        this.physics.add.existing(this.circle3, true)
        this.circle3.body.setCircle(65)

        this.rectangle1 = this.add.rectangle(395, 502, 48, 200).setOrigin(0).setAlpha(0)
        this.physics.add.existing(this.rectangle1, true)

        //collider for instuctions
        this.rectangle2 = this.add.rectangle(970, 190, 110, 64).setOrigin(0).setAlpha(0)
        this.physics.add.existing(this.rectangle2, true)

        this.physics.add.collider(this.ace, this.circle1)
        this.physics.add.collider(this.ace, this.circle2)
        this.physics.add.collider(this.ace, this.circle3)
        this.physics.add.collider(this.ace, this.rectangle1)

        this.physics.add.collider(this.lina, this.circle1)
        this.physics.add.collider(this.lina, this.circle2)
        this.physics.add.collider(this.lina, this.circle3)
        this.physics.add.collider(this.lina, this.rectangle1)
        
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
        this.keys.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keys.Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        //textboxes
        let camera = this.cameras.main;
        let textboxX = camera.width / 2;
        let textboxY = camera.height - 100;
        this.windfight = this.add.image(textboxX, textboxY, 'windfight')
                            .setScrollFactor(0)
                            .setDepth(100)
                            .setOrigin(0.5, 0.5)
        this.windfight.setVisible(false);

        this.waterfight = this.add.image(textboxX, textboxY, 'waterfight')
                            .setScrollFactor(0)
                            .setDepth(100)
                            .setOrigin(0.5, 0.5)
        this.waterfight.setVisible(false);

        this.instructions = this.add.image(textboxX, textboxY, 'instructions')
                            .setScrollFactor(0)
                            .setDepth(100)
                            .setOrigin(0.5, 0.5)

        this.creditsbox = this.add.image(textboxX, textboxY, 'credits')
                            .setScrollFactor(0)
                            .setDepth(100)
                            .setOrigin(0.5, 0.5)
        this.creditsbox.setVisible(false);

        //poopoopeepeepoopoopeepee
        if (!this.sound.get('bgmusic')) {
            this.bgMusic = this.sound.add('bgmusic', { volume: 0.3, loop: true });
            this.bgMusic.play();
        }

        this.bossTheme = false
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

        if (this.physics.overlap(this.ace, this.lineA)) {
            console.log("windmill");
            this.windfight.setVisible(true)
            if (!this.bossTheme) {
                this.bossTheme = true
                this.bgMusic.setVolume(0.1)
                this.overlapSound = this.sound.add('overlap', { volume: 0.3, loop: false });
                this.overlapSound.play()
            }
            
            if(Phaser.Input.Keyboard.JustDown(this.keys.FKey)) {
                this.sound.add('boss')
                this.time.delayedCall(0, () => {this.scene.start("windmill")})
                
            }

        } else if (this.physics.overlap(this.ace, this.lineC)) {
            console.log("water fountain");
            this.waterfight.setVisible(true)
            if (!this.bossTheme) {
                this.bossTheme = true
                this.bgMusic.setVolume(0.1)
                this.overlapSound = this.sound.add('overlap', { volume: 0.3, loop: false });
                this.overlapSound.play()
            }

            if(Phaser.Input.Keyboard.JustDown(this.keys.FKey)) {
                this.sound.play('boss')
                this.scene.start("waterfountain")
            }

        } else if (this.physics.overlap(this.ace, this.lineB)) {
            this.creditsbox.setVisible(true)
            if(Phaser.Input.Keyboard.JustDown(this.keys.CKey)) {
                this.scene.start("credits")
            }

        }else if (this.physics.overlap(this.ace, this.rectangle2)) {
             this.instructions.setVisible(true)
        
        } else {
            this.windfight.setVisible(false)
            this.waterfight.setVisible(false)
            this.instructions.setVisible(false)
            this.creditsbox.setVisible(false)

            if (this.overlapSound && this.overlapSound.isPlaying) {
                this.overlapSound.stop()
            }

            this.bossTheme = false
            this.bgMusic.setVolume(0.3)
        }
    }
}
