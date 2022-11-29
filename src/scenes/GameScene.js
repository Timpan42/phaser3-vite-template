import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel'


const GROUND_KEY = 'ground'
const DUDE_KEY = 'dude'
const BULLET = 'bullet'

class Bullet extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x, y) {
		super(scene, x, y, BULLET);
	}
}

class BulletGrup extends Phaser.Physics.Arcade.Group{
	constructor(scene){
		super(scene.physics.world, scene);

		this.createMultiple({
			classType: Bullet,
			frameQuantity: 30,
			active: false,
			visible: true,
			key: BULLET
		})
	}
}

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
		super('game-scene')

        this.player = undefined
		this.cursors = undefined
		this.scoreLabel = undefined
		this.gameOver = false

		this.bulletGrupe;


	}

	preload()
	{
        this.load.image('sky', 'assets/sky.png')
		this.load.image(GROUND_KEY, 'assets/platform.png')
		this.load.image('star', 'assets/star.png')
		this.load.image(BULLET, 'assets/bomb.png')

		this.load.spritesheet(DUDE_KEY, 
			'assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }

	)
}

	create()
	{
        this.add.image(400, 300, 'sky')	

        const platforms = this.createPlatforms()
        this.player = this.createPlayer()

		this.bulletGrupe = new BulletGrup(this)

		this.scoreLabel = this.createScoreLabel(16, 16, 0)

		
        this.physics.add.collider(this.player, platforms)
		



		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		
		
	}

    createPlatforms(){
        const platforms = this.physics.add.staticGroup()

		platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()
	
		platforms.create(600, 400, GROUND_KEY)
		platforms.create(50, 250, GROUND_KEY)
		platforms.create(750, 220, GROUND_KEY)

        return platforms
    }

	createScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#000' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}

    createPlayer(){
        
        const player = this.physics.add.sprite(100, 450, DUDE_KEY)
		player.setBounce(0.2)
		player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: DUDE_KEY, frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})

        return player
    }

	update(){

		if(this.gameOver){
			return
		}

		
		//input keys A 
		if (this.keyA.isDown)
		{
			this.player.setVelocityX(-160)

			this.player.anims.play('left', true)
		}
		//input keys D
		else if (
			this.keyD.isDown)
		{
			this.player.setVelocityX(160)

			this.player.anims.play('right', true)
		}
		else
		{
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}

		//input keys W och space 
		if (
			this.keyW.isDown && this.player.body.touching.down  
			|| this.cursors.space.isDown && this.player.body.touching.down
			)
		{
			this.player.setVelocityY(-330)
		}
	}
}