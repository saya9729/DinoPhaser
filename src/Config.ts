import { GameOverScene } from './Scenes/GameOverScene';
import { GamePlayScene } from './Scenes/GamePlayScene';
import { WaitingScene } from './Scenes/WaitingScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Dino',
  width: 1000,
  height: 340,
  type: Phaser.AUTO,
  scene: [
    WaitingScene, 
    GamePlayScene, 
    GameOverScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug:true
    }
  },
  pixelArt: true,
  transparent: true
};
