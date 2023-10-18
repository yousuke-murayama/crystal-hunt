import 'phaser';
import { Physics } from './main';

export default class StartScene extends Phaser.Scene {
  private text!: Phaser.GameObjects.Text;
  private startGemGroup!: Phaser.Physics.Arcade.StaticGroup;
  private kabocha!: Physics;

  constructor() {
    super({ key: 'startScene'});
  }

  init() {
    this.text;
    this.startGemGroup = this.physics.add.staticGroup();
  }

  preload() {
    this.load.spritesheet('blueGem', 'assets/pipo-etcchara002.png',
      {  frameWidth: 32, frameHeight: 32, startFrame: 8 }
    );
    this.load.spritesheet('greenGem', 'assets/pipo-etcchara002b.png',
      {  frameWidth: 32, frameHeight: 32, startFrame: 8 }
    );
    this.load.spritesheet('yellowGem', 'assets/pipo-etcchara002c.png',
      {  frameWidth: 32, frameHeight: 32, startFrame: 8 }
    );
    this.load.spritesheet('startKabocha', 'assets/pipo-halloweenchara2016_09.png',
      { frameWidth: 32, frameHeight: 32 } 
    )
  }

  create() {
    this.startGemGroup.create(100, 100, 'blueGem');
    this.startGemGroup.create(150, 150, 'greenGem');
    this.startGemGroup.create(200, 200, 'yellowGem');

    this.startGemGroup.create(100, 400, 'blueGem');
    this.startGemGroup.create(150, 450, 'greenGem');
    this.startGemGroup.create(200, 500, 'yellowGem');

    this.startGemGroup.create(700, 100, 'blueGem');
    this.startGemGroup.create(650, 150, 'greenGem');
    this.startGemGroup.create(600, 200, 'yellowGem');

    this.startGemGroup.create(700, 400, 'blueGem');
    this.startGemGroup.create(650, 450, 'greenGem');
    this.startGemGroup.create(600, 500, 'yellowGem');
    
    this.kabocha = this.physics.add.sprite(520, 260, 'startKabocha');

    this.text = this.add.text(270, 250, 'CRYSTAL HUNT', { color: "#00CCFF", fontSize: '32px' });
    this.text = this.add.text(245, 320, 'Click to Start!!', { color: "#00CCFF", fontSize: '32px', backgroundColor: "" });

    this.anims.create({
      key: 'startLeft',
      frames: this.anims.generateFrameNumbers('startKabocha', { start: 0, end: 2}),
      frameRate: 5,
      repeat: -1
    });
    
    this.kabocha.anims.play('startLeft', false);

    const zone = this.add.zone(380, 320, 380, 30);
    zone.setInteractive({
      useHandCursor: true
    });

    zone.on('pointerdown', () => {
      this.scene.transition({ target: "mainScene", duration: 10});
    })
  }

  update() {}

}