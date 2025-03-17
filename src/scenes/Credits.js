class Credits extends Phaser.Scene {
    constructor() {
        super('credits')
    }

    preload() {
        this.load.path = './assets/'

        this.load.image('bg', 'creditsbg.png')
        this.load.audio('writing', 'sound/writing.wav')
        this.load.audio('music', 'sound/cigarette-boat.wav')
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0)

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
            'Into The Distance',
            'Use the arrow keys to move!',
            'Make sure to avoid the trees to keep riding.',
            'Press an arrow key to start!',
            'You have 60 seconds!'
        ]

        // Call typewriteText for each line
        this.typewriteTextLines(757 / 2, 640 / 5, textLines, menuConfig)
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
                        textObject = this.add.text(x, y + 64 * lineIndex, '', config).setOrigin(0.5)
                    } else {
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
    }
}