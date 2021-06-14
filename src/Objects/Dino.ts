import { SpriteConstructor } from '../Constructor/SpriteConstructor';

export class Dino extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    isDead: boolean;
    isDucking: boolean;
    isJumping: boolean;
    jumpKey: Phaser.Input.Keyboard.Key;
    duckKey: Phaser.Input.Keyboard.Key;

    constructor(params: SpriteConstructor) {
        super(params.scene, params.x, params.y, params.texture, params.frame);

        // image
        this.setOrigin(0, 1);
        this.setDepth(1)

        // variables
        this.isDucking = false;
        this.isJumping = false;

        // physics
        this.scene.physics.world.enable(this);
        this.body
            .setGravityY(1000)
            .setCollideWorldBounds(true)


        // input
        this.jumpKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.duckKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        )

        this.scene.add.existing(this);

        this.anims.create({
            key: 'dino_run_anim',
            frames: this.anims.generateFrameNumbers('dino_run', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'dino_duck_anim',
            frames: this.anims.generateFrameNumbers('dino_duck', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'dino_jump_anim',
            frames: this.anims.generateFrameNumbers('dino_jump', { start: 0, end: 1 }),
            frameRate: 0.2,
            repeat: -1
        })
        this.anims.create({
            key: 'dino_hurt_anim',
            frames: this.anims.generateFrameNumbers('dino_hurt', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: 3
        })
    }

    update() {
        //handle input
        if (this.body.onFloor()) {//check if landed
            this.isJumping = false;
        }
        if (!this.isJumping && !this.isDucking)
            this.play('dino_run_anim', true);
        if (!this.isJumping && this.jumpKey.isDown) {//jump priority
            this.jump();
        }
        else if (this.isDucking && this.duckKey.isUp) {
            this.unDuck();
        }
        else if (!this.isDucking && this.duckKey.isDown) {//let duck in the air
            this.duck();
        }
    }

    jump() {//later
        this.isJumping = true;
        this.body.setVelocityY(-500);
        if (!this.isDucking)
            this.play('dino_jump_anim', true);
        this.body.setSize();
    }

    duck() {
        this.isDucking = true;
        this.play('dino_duck_anim', true);
        this.body.setSize();
    }

    unDuck() {
        this.isDucking = false;
        this.play('dino_run_anim', true);
        this.body.setSize();
    }
}
