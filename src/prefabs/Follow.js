class Follow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, isFollow = true) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.isFollow = isFollow

        this.setScale(0.5)

        this.body.setSize(this.width/2, this.height/2)
        this.body.setCollideWorldBounds(true)

        //character properties
        this.direction = direction
        this.velo = 100
        this.shotCooldown = 300

        scene.followFSM = new StateMachine('idle', {
            idle: new Idle(),
            move: new Move()
        }, [scene, this])
    }
}

class Idle extends State {
    enter(scene, follow) {
        follow.setVelocity(0)
        follow.anims.play(`walk-${follow.direction}`)
        follow.anims.stop()
    }

    execute(scene, follow) {
        //console.log(`follow: ${follow.texture.key}, isFollow: ${follow.isFollow}`);
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown || up.isDown || down.isDown ) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class Move extends State {
    execute(scene, follow) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            follow.direction = 'up'
        } else if(down.isDown) {
            follow.direction = 'down'
        }
        if(left.isDown) {
            follow.direction = 'left'
        } else if(right.isDown) {
            follow.direction = 'right'
        }

        follow.anims.play(`walk-${follow.direction}`, true)
    }
}

