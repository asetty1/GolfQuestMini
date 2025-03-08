class Fight extends Phaser.Scene {
    constructor() {
        super("fightscene");
    }

    preload() {
        this.load.path = "./assets/";

        // map assets
        this.load.image('bg', 'fightbg.png');
        this.load.image('windmill', 'windmill.png');

        this.load.spritesheet('xmash', 'xmash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        });
        
        this.load.spritesheet('amash', 'amash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        });

        this.load.spritesheet('tmash', 'tmash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        });

        this.load.spritesheet('hmash', 'hmash.png', {
            frameWidth: 100,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        });
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0);

        let windmill = this.add.image(-150, 220, 'windmill');
        let windmillTween = this.tweens.add({
            delay: 125,
            targets: windmill,
            x: 220,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            paused: false
        });

        windmillTween.play();

        // Create animations
        this.anims.create({
            key: 'xmash',
            frames: this.anims.generateFrameNumbers('xmash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'amash',
            frames: this.anims.generateFrameNumbers('amash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'tmash',
            frames: this.anims.generateFrameNumbers('tmash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'hmash',
            frames: this.anims.generateFrameNumbers('hmash', {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1
        });

        this.mashCount = 0;
        this.target = 2;
        this.mashTimer = 3000;

        this.keys = [
            Phaser.Input.Keyboard.KeyCodes.X,
            Phaser.Input.Keyboard.KeyCodes.A,
            Phaser.Input.Keyboard.KeyCodes.H,
            Phaser.Input.Keyboard.KeyCodes.T
        ];

        this.currentKey = null;
        this.mashSprite = null;

        this.startButtonMashing();
    }

    startButtonMashing() {
        this.time.delayedCall(1000, this.pickRandomFunction, [], this);
    }

    pickRandomFunction() {
        let functions = [this.functionX, this.functionA, this.functionH, this.functionT];
        let randomIndex = Phaser.Math.Between(0, functions.length - 1);
        functions[randomIndex].call(this);
    }

    functionX() {
        this.handleMash('X', 'xmash');
    }

    functionA() {
        this.handleMash('A', 'amash');
    }

    functionH() {
        this.handleMash('H', 'hmash');
    }

    functionT() {
        this.handleMash('T', 'tmash');
    }

    handleMash(key, anim) {
        this.currentKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]);
        this.mashCount = 0;
        console.log(`Start mashing the ${key} key!`);

        if (this.mashSprite) {
            this.mashSprite.destroy();
        }

        this.mashSprite = this.add.sprite(400, 300, anim);
        this.mashSprite.play(anim);

        this.input.keyboard.on('keydown-' + key, this.countMash, this);
        this.time.delayedCall(this.mashTimer, this.checkMashCount, [], this);
    }

    countMash() {
        this.mashCount++;
    }

    checkMashCount() {
        if (this.currentKey) {
            this.input.keyboard.off('keydown-' + this.currentKey.keyCode, this.countMash, this);
        }

        if (this.mashCount >= this.target) {
            console.log("Yay, you did it!!");
        } else {
            console.log("You Lost :(((");
        }

        this.time.delayedCall(5000, this.pickRandomFunction, [], this);
    }

    getKeyCharacter(keyCode) {
        const keyMap = {
            88: 'X', // Key code for 'X'
            65: 'A', // Key code for 'A'
            72: 'H', // Key code for 'H'
            84: 'T'  // Key code for 'T'
        };
        return keyMap[keyCode] || 'Unknown Key';
    }
}
