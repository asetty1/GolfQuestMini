class Guy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, isAce = true) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.isAce = isAce

        this.setScale(0.5)

        this.body.setSize(this.width/2, this.height/2)
        this.body.setCollideWorldBounds(true)

        //character properties
        this.direction = direction
        this.velo = 100
        this.shotCooldown = 300

        scene.guyFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState()
        }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, guy) {
        guy.setVelocity(0)
        guy.anims.play(`walk-${guy.direction}`)
        guy.anims.stop()
    }

    execute(scene, guy) {
        console.log(`Guy: ${guy.texture.key}, isAce: ${guy.isAce}`);
        if(!guy.isAce) return
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing')
            return
        }

        //circular swing
        if(Phaser.Input.Keyboard.JustDown(FKey)) {
            this.stateMachine.transition('circular')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown || up.isDown || down.isDown ) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, guy) {
        if(!guy.isAce) return
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing')
            return
        }

        //circular swing
        if(Phaser.Input.Keyboard.JustDown(FKey)) {
            this.stateMachine.transition('circular')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            moveDirection.y = -1
            guy.direction = 'up'
        } else if(down.isDown) {
            moveDirection.y = 1
            guy.direction = 'down'
        }
        if(left.isDown) {
            moveDirection.x = -1
            guy.direction = 'left'
        } else if(right.isDown) {
            moveDirection.x = 1
            guy.direction = 'right'
        }
        // normalize movement vector, update guy position, and play proper animation
        moveDirection.normalize()
        guy.setVelocity(guy.velo * moveDirection.x, guy.velo * moveDirection.y)
        guy.anims.play(`walk-${guy.direction}`, true)
    }
}

class SwingState extends State {
    enter(scene, guy) {
        if(!guy.isAce) return
        guy.setVelocity(0)
        guy.anims.play(`swing-${guy.direction}`)
        guy.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}

