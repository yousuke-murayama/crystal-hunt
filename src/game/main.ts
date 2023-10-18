import 'phaser';

export type Physics = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export type GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;

export let currentScore = 0;
export let totalScore = 0;

export default class MainScene extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Physics;
  private gemGroup!: Phaser.Physics.Arcade.StaticGroup;
  private light!: Physics;
  private scoreText!: Phaser.GameObjects.Text;
  private gameOver!: boolean;
  private animsNum!: number;

  constructor() {
    super({ key: 'mainScene'});
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.gemGroup = this.physics.add.staticGroup();
    this.scoreText;
    this.gameOver = false;
    this.animsNum = 0;
  }

  preload() {
    this.load.spritesheet('kabocha', 'assets/pipo-halloweenchara2016_09.png',
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet('gem', 'assets/pipo-etcchara002.png',
      {  frameWidth: 32, frameHeight: 32, startFrame: 8 }
    );
    this.load.spritesheet('light', 'assets/pipo-hikarimono001.png', {
      frameWidth: 32, frameHeight: 32, startFrame: 9
    });
  }

  create() {

    this.player = this.physics.add.sprite(400,300,'kabocha');

    this.scoreText = this.add.text(16, 16, `score: ${currentScore}pt`, { fontSize: '22px', color: '#f5f5f5' })

    for(let i = 0; i <= 4; i++) {
      const x = Phaser.Math.Between(15, 750);
      const y = Phaser.Math.Between(15, 550);
      this.gemGroup.create(x, y, 'gem');
    }

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    this.gemGroup.refresh();
    
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('kabocha', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });
    
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('kabocha', { start: 3, end: 5}),
      frameRate: 5,
      repeat: -1
    });
    
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('kabocha', { start: 6, end: 8 }),
      frameRate: 5,
      repeat: -1
    }); 
    
    setTimeout(() => {
      for(let i = 0; i <= 2; i++) {
        this.createLight();
      }
    }, 3000);
    
    this.physics.add.overlap(this.player, this.gemGroup, this.playerHitGem, undefined, this);
    
    this.player.anims.play('left', false);
  }

  update() {
      if(this.gameOver) {
        totalScore = currentScore;
        currentScore = 0;
        this.scene.transition({ target: "gameOverScene", duration: 10});
      }

      if(this.cursors?.left.isDown) {
        this.player.setVelocityX(-250);
        this.player.anims.play('left', true);
      } else if(this.cursors?.right.isDown) {
        this.player.setVelocityX(250);
        this.player.anims.play('right', true);
      } else if(this.player) {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
      }
      
      if(this.cursors?.up.isDown) {
        this.player.setVelocityY(-250);
      }
      
      if(this.cursors?.down.isDown) {
        this.player.setVelocityY(250);
      }
    }
  
    playerHitGem(
      _player: GameObjectWithBody | Phaser.Tilemaps.Tile,
      gems: GameObjectWithBody | Phaser.Tilemaps.Tile,
    ) {
      this.gemGroup.killAndHide(gems as GameObjectWithBody);
      (gems as GameObjectWithBody).body.enable = false;

      currentScore += 100;
      this.scoreText.setText(`score: ${currentScore}pt`);

      if(this.gemGroup.countActive(true) === 0) {
        for(let i = 0; i <= 4; i++) {
          const x = Phaser.Math.Between(15, 750);
          const y = Phaser.Math.Between(15, 550);
          this.gemGroup.create(x, y, 'gem');
        }
      }

      if(currentScore  === 2000 
        || currentScore === 4000 
        || currentScore === 6000 
        || currentScore === 8000
      ) {
        this.createLight();
      }
    }

    createLight() {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);

      this.animsNum += 1;

      const velocityX = Phaser.Math.Between(200, 300);
      const velocityY = Phaser.Math.Between(200, 300);
      
  
      this.light = this.physics.add.sprite(x, y, 'light');

      this.light.setCollideWorldBounds(true);
      this.light.setBounce(1);
      
      this.light.setVelocity(velocityX, velocityY);

      this.anims.create({
        key: `lightRepeat${this.animsNum}`,
        frames: this.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1,
      });

      this.physics.add.overlap(this.player, this.light, this.playerHitLight, undefined, this);
      this.light.anims.play(`lightRepeat${this.animsNum}`);
    }

    playerHitLight(
      player: GameObjectWithBody | Phaser.Tilemaps.Tile,
      _light: GameObjectWithBody | Phaser.Tilemaps.Tile,
    ) {
      this.physics.pause();
      _light;
      (player as GameObjectWithBody).body.enable = false;

      this.gameOver = true;
      this.scoreText.setText('Game Over');
    }
}