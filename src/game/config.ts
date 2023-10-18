import GameOverScene from "./gameOverScene";
import MainScene from "./main";
import StartScene from "./startScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#696969',
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    }
  },
  scene: [StartScene, MainScene, GameOverScene]
};

export default config;