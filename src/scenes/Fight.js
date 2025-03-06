class Fight extends Phaser.Scene {
    constructor() {
        super("fightscene");
    }

    preload() {
        this.load.path = "./assets/";

        // map assets
        this.map = this.load.image('bg', 'fightbg.png')

    }
}