import { Dino } from "../Objects/Dino"
export class GamePlayScene extends Phaser.Scene {
  dino: Dino
  ground: Phaser.GameObjects.TileSprite;
  scoreText: Phaser.GameObjects.BitmapText;
  timer: Phaser.Time.TimerEvent;
  gameSpeed: number;
  score: number;
  height: any;
  width: any;
  isRunning: boolean;
  obsticles: Phaser.Physics.Arcade.Group;
  hurtSound: Phaser.Sound.BaseSound;
  milestoneSound: Phaser.Sound.BaseSound;
  constructor() {
    super({
      key: 'GamePlayScene'
    });
  }

  create() {
    this.height = this.game.config.height;
    this.width = this.game.config.width;

    this.hurtSound = this.sound.add('hurt', { volume: 0.2 });
    this.milestoneSound = this.sound.add('milestone', { volume: 0.2 });

    this.isRunning = true;
    this.score = 0;
    this.gameSpeed = 1000;
    this.ground = this.add
      .tileSprite(0, this.height, this.width, 26, 'ground') //later
      .setOrigin(0, 1);
    this.dino = new Dino({
      scene: this,
      x: 0,
      y: this.height, //later
      texture: 'dino_idle'
    })

    this.obsticles = this.physics.add.group();
    this.addNewObstacle();

    this.timer = this.time.addEvent({
      delay: 1500,
      callback: this.addNewObstacle,
      callbackScope: this,
      loop: true
    });
    this.initAnimation();
    this.initCollider();
  }

  initAnimation() {
    this.anims.create({
      key: 'bird_anim',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    })
  }

  initCollider() {
    this.physics.add.collider(this.dino, this.obsticles, () => {
      //this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

      //const highScore = this.highScoreText.text.substr(this.highScoreText.text.length - 5);
      //const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;

      //this.highScoreText.setText('HI ' + newScore);
      //this.highScoreText.setAlpha(1);

      this.physics.pause();
      this.isRunning = false;
      this.anims.pauseAll();
      this.dino.play('dino_hurt_anim')
      //this.respawnTime = 0;
      this.gameSpeed = 10;
      //this.gameOverScreen.setAlpha(1);
      this.score = 0;
      this.hurtSound.play();
    }, undefined, this);
  }

  addNewObstacle() {
    const type = Math.round(Math.random() * 8);
    const distance = Phaser.Math.Between(600, 900);

    let obsticle: any;
    const birdHeight = [20, 50, 100]//later
    switch (type) {
      case 0:
        obsticle = this.obsticles.create(this.width + distance, this.height, 'cactus_small_1')
          .setOrigin(0, 1)
          .setImmovable()
          .body.offset.y = +10;
        break;
      case 1:
        obsticle = this.obsticles.create(this.width + distance, this.height, 'cactus_small_2')
          .setOrigin(0, 1)
          .setImmovable()
          .body.offset.y = +10;
        break;
      case 2:
        obsticle = this.obsticles.create(this.width + distance, this.height, 'cactus_small_3')
          .setOrigin(0, 1)
          .setImmovable()
          .body.offset.y = +10;
        break;
      case 3:
        obsticle = this.obsticles.create(this.width + distance, this.height, 'cactus_big_1')
          .setOrigin(0, 1)
          .setImmovable()
          .body.offset.y = +10;
        break;
      case 4:
        obsticle = this.obsticles.create(this.width + distance, this.height, 'cactus_big_2')
          .setOrigin(0, 1)
          .setImmovable()
          .body.offset.y = +10;
        break;
      case 5:
        obsticle = this.obsticles.create(this.width + distance, this.height, 'cactus_big_3')
          .setOrigin(0, 1)
          .setImmovable()
          .body.offset.y = +10;
        break;
      case 6:
        obsticle = this.obsticles.create(this.width + distance, this.height - birdHeight[0], 'bird')
          .setOrigin(0, 1)
          .setImmovable()
          .play('bird_anim')
        obsticle.body.height = obsticle.body.height / 1.5
        break;
      case 7:
        obsticle = this.obsticles.create(this.width + distance, this.height - birdHeight[1], 'bird')
          .setOrigin(0, 1)
          .setImmovable()
          .play('bird_anim')
        obsticle.body.height = obsticle.body.height / 1.5
        break;
      case 8:
        obsticle = this.obsticles.create(this.width + distance, this.height - birdHeight[2], 'bird')
          .setOrigin(0, 1)
          .setImmovable()
          .play('bird_anim')
        obsticle.body.height = obsticle.body.height / 1.5
        break;
    }
  }

  update(time: number, delta: number) {
    if (!this.isRunning) return;
    this.ground.tilePositionX += this.gameSpeed * delta / 1000;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed * delta / 1000)
    this.dino.update();
  }
}
