import 'phaser';
import { totalScore } from './main';

export default class GameOverScene extends Phaser.Scene {

  private text!: Phaser.GameObjects.Text;
  private totalScoreText!: Phaser.GameObjects.Text;
  private continueText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'gameOverScene'});
  }

  init() {
    this.text;
    this.totalScoreText;
    this.continueText;
  }

  preload() {}

  create() {
    this.text = this.add.text(280, 200, 'Game Over', { backgroundColor: "#880000", color: "#AAAAAA", fontSize: '42px' });

    this.totalScoreText = this.add.text(280, 250, `your score: ${totalScore}pt`, { color: "#00CCFF", fontSize: '22px' });
    this.continueText = this.add.text(320, 350, 'CONTINUE?', { color: "#AAAAAA", fontSize: '30px' });
    this.continueText = this.add.text(270, 400, 'YES!!', { color: "#AAAAAA", fontSize: '22px' });
    this.continueText = this.add.text(470, 400, 'NO…', { color: "#AAAAAA", fontSize: '22px' });

    const yes = this.add.zone(290, 400, 70, 30);
    yes.setInteractive({
      useHandCursor: true
    });

    const no = this.add.zone(480, 400, 60, 30);
    no.setInteractive({
      useHandCursor: true
    });

    yes.on('pointerdown', () => {
      this.scene.transition({ target: "mainScene", duration: 10});
    });

    no.on('pointerdown', () => {
      window.location.reload();
    });
  }
}