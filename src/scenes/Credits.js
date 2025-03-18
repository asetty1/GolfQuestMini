class Credits extends Phaser.Scene {
    constructor() {
        super('credits')
    }

    preload() {
        this.load.path = './assets/'

        this.load.image('bg', 'creditsbg.png')
        this.load.audio('writing', 'sound/writing.wav')
        this.load.image('me', 'credits-textbox.png')
        this.load.audio('music', 'sound/cigarette-boat.wav')
        this.load.audio('intro', '/sound/me.wav')
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0)
        const thisisme = this.add.image(757/2, 460, 'me').setOrigin(0.5, 0.5).setAlpha(0)

        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        
        this.meee = this.tweens.add({
            targets: thisisme,
            alpha: 1,
            duration: 4000,
            ease: 'Linear',
            paused: true,
        })

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        let menuConfig = {
            fontFamily: 'moonflower',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let textLines = [
            'Hello! This is my recreation of the game Golf Quest Mini',
            'shown on Steven Universe Season 1 Episode 19.',
            'All art is done by me based on the concept art provided on the Steven Universe Wiki.',
            'The background music you hear is Cigarette Boat by Marc Torch',
            'and the other sound assets are through itch.io or made by me.',
            'I used the fonts A Day Without Sun from Zetafont',
            'and Moon Flower by Denise Bentulan on Fontspace.',
            'For the code, I referenced in class coding examples as well as my old project code!',
            'I hope you enjoy the game :)',
            'Press (M) to return back to the title screen!'
        ]

        // Call typewriteText for each line
        this.typewriteTextLines(757 / 2, 400 / 7, textLines, menuConfig)
    }

    typewriteTextLines(x, y, lines, config) {
        let lineIndex = 0
        let charIndex = 0
        let displayText = ''
        let textObject = this.add.text(x, y, '', config).setOrigin(0.5)

        this.time.addEvent({
            delay: 50,
            callback: () => {
                if (charIndex < lines[lineIndex].length) {
                    this.sound.play('writing', 0, 0.5)
                    displayText += lines[lineIndex][charIndex]
                    textObject.setText(displayText)
                    charIndex++
                } else {
                    lineIndex++
                    charIndex = 0
                    displayText = ''

                    if (lineIndex < lines.length) {
                        textObject = this.add.text(x, y + 30 * lineIndex, '', config).setOrigin(0.5)
                    } else {
                        this.meee.play()
                        this.sound.play('intro')
                        this.time.removeAllEvents()
                    }
                }
            },
            loop: true
        })

        this.bgMusic = this.sound.add('music', {volume: 0.1, loop: true})
        this.bgMusic.play()

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start("titleScene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.scene.restart()
        }
    }
}