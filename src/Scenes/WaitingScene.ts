import { Dino } from "../Objects/Dino";

export class WaitingScene extends Phaser.Scene {
    dino: Dino;
    constructor() {
        super('WatingScene');
    }

    preload() {
        this.load.audio('jump', 'assets/sounds/jump.m4a')
            .audio('hurt', 'assets/sounds/hurt.m4a')
            .audio('milestone', 'assets/sounds/milestone.m4a')

            .image('ground','assets/sprites/ground.png')
            .image('cloud','assets/sprites/cloud.png')
            .image('restart_button','assets/images/restart_button.png')
            .image('game_over','assets/images/game_over.png')

            .image('cactus_small_1','assets/sprites/cactus_small_1.png')
            .image('cactus_small_2','assets/sprites/cactus_small_2.png')
            .image('cactus_small_3','assets/sprites/cactus_small_3.png')
            .image('cactus_big_1','assets/sprites/cactus_big_1.png')
            .image('cactus_big_2','assets/sprites/cactus_big_2.png')
            .image('cactus_big_3','assets/sprites/cactus_big_3.png')

            .image('dino_idle','assets/sprites/dino_idle.png')

            .spritesheet('dino_duck','assets/sprites/dino_duck.png', {
                frameWidth: 118, 
                frameHeight: 60
              })
            .spritesheet('dino_hurt','assets/sprites/dino_hurt.png', {
                frameWidth: 88, 
                frameHeight: 94
              })
            .spritesheet('dino_jump','assets/sprites/dino_jump.png', {
                frameWidth: 88, 
                frameHeight: 94
              })
            .spritesheet('dino_run','assets/sprites/dino_run.png', {
                frameWidth: 88, 
                frameHeight: 94
              })
            .spritesheet('bird','assets/sprites/bird.png', {
                frameWidth: 92, 
                frameHeight: 77
              })
            .spritesheet('moon','assets/sprites/moon.png', {
                frameWidth: 20, 
                frameHeight: 40
              })
            .spritesheet('star','assets/sprites/star.png', {
                frameWidth: 9, 
                frameHeight: 9
              })
    }

    create() {
        this.scene.start('GamePlayScene')
    }
}