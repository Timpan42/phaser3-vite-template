import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel'

const GROUND_KEY = 'ground'
const RAT_IDEL_KEY = 'rat1_idel'
const RAT_WALK_KEY = 'rat1_walk'
const BULLET = 'bullet'

class Bullet extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x, y) {
		super(scene, x, y, BULLET);
	}

	preUpdate(time, delta){
		super.preUpdate(time, delta)

		if (this.y <= 0){
			this.setActive(false)
			this.setVisible(false)
		}
		if (this.x <= 0 || this.x >= 800){
			this.setActive(false)
			this.setVisible(false)
		}
	}

	fireLeft(x, y){
		this.body.reset(x, y)

		this.setActive(true)
		this.setVisible(true)

		this.setVelocityX(-1000)
	}

	fireRight(x, y){
		this.body.reset(x, y)

		this.setActive(true)
		this.setVisible(true)

		this.setVelocityX(+1000)
	}


	fireUp(x, y){
		this.body.reset(x, y)

		this.setActive(true)
		this.setVisible(true)

		this.setVelocityY(-1000)
	}
	fireUpLeft(x, y){
		this.body.reset(x, y)

		this.setActive(true)
		this.setVisible(true)

		this.setVelocityX(-1000)
		this.setVelocityY(-1000)
	}

	fireUpRight(x, y){
		this.body.reset(x, y)

		this.setActive(true)
		this.setVisible(true)

		this.setVelocityX(+1000)
		this.setVelocityY(-1000)
	}
}

class BulletGrup extends Phaser.Physics.Arcade.Group{
	constructor(scene){
		super(scene.physics.world, scene);

		this.createMultiple({
			classType: Bullet,
			frameQuantity: 1,
			active: false,
			visible: false,
			key: BULLET
		})
	}

	fireGunRight(x, y){
		const bullet = this.getFirstDead(false)
		if(bullet){
			bullet.fireRight(x, y)
		}
	}
	
	fireGunLeft(x, y){
		const bullet = this.getFirstDead(false)
		if(bullet){
			bullet.fireLeft(x, y)
		}
	}

	
	fireGunUp(x, y){
		const bullet = this.getFirstDead(false)
		if(bullet){
			bullet.fireUp(x, y)
		}
	}

	fireGunUpLeft(x, y){
		const bullet = this.getFirstDead(false)
		if(bullet){
			bullet.fireUpLeft(x, y)
		}
	}
	fireGunUpRight(x, y){
		const bullet = this.getFirstDead(false)
		if(bullet){
			bullet.fireUpRight(x, y)
		}
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
        this.load.image('sky', 'assets/legitjag.png')
		this.load.image(GROUND_KEY, 'assets/platform.png')
		this.load.image('star', 'assets/star.png')
		this.load.image(BULLET, 'assets/bomb.png')

		this.load.spritesheet(RAT_IDEL_KEY, 
			'assets/rat/idle.png',
			{ frameWidth: 32, frameHeight: 11 })

		this.load.spritesheet(RAT_WALK_KEY, 
			'assets/rat/walk.png',
			{ frameWidth: 32, frameHeight: 11 })
	}

	create()
	{
        this.add.image(400, 300, 'sky').setScale(4,3)	
		
        const platforms = this.addPlatforms()
        this.player = this.addPlayer()

		this.bulletGrupe = new BulletGrup(this)

		this.scoreLabel = this.addScoreLabel(16, 16, 0)

		
        this.physics.add.collider(this.player, platforms)
		



		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		
		
	}

    addPlatforms(){
        const platforms = this.physics.add.staticGroup()

		platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()
	
		platforms.create(600, 400, GROUND_KEY)
		platforms.create(50, 250, GROUND_KEY)
		platforms.create(750, 220, GROUND_KEY)

        return platforms
    }

	addScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#000' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}

    addPlayer(){
        
        const player = this.physics.add.sprite(100, 450, RAT_IDEL_KEY).setScale(2)
		player.setBounce(0)
		player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(RAT_WALK_KEY, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: RAT_IDEL_KEY, frame: 3 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(RAT_WALK_KEY, { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		})

        return player
    }


	gunLeft(){
		this.bulletGrupe.fireGunLeft(this.player.x - 20, this.player.y)
	}

	gunRight(){
		this.bulletGrupe.fireGunRight(this.player.x + 20, this.player.y)
	}
	
	gunUp(){
		this.bulletGrupe.fireGunUp(this.player.x, this.player.y - 20)
	}

	gunUpLeft(){
		this.bulletGrupe.fireGunUpLeft(this.player.x - 20, this.player.y - 20)
	}

	gunUpRight(){
		this.bulletGrupe.fireGunUpRight(this.player.x + 20, this.player.y - 20)
	}

	update(){

		if(this.gameOver){
			return
		}

		if (this.cursors.left.isDown){
			if (this.cursors.up.isDown && this.cursors.left.isDown){
				this.gunUpLeft()
			} else this.gunLeft()
		}
		
		if (this.cursors.right.isDown){
			if (this.cursors.up.isDown && this.cursors.right.isDown){
			this.gunUpRight()
		
			} else this.gunRight()
		}

		if (this.cursors.up.isDown)
		{
			if (this.cursors.up.isDown && this.cursors.left.isDown){
				this.gunUpLeft()
			}
			else if (this.cursors.up.isDown && this.cursors.right.isDown){
				this.gunUpRight()
			} else 
			this.gunUp()
		}
		//input keys A 
		if (this.keyA.isDown)
		{
			this.player.setVelocityX(-160)

			this.player.anims.play('right', true)
		} 
		//input keys D
		else if (
			this.keyD.isDown)
		{
			this.player.setVelocityX(160)

			this.player.anims.play('left', true)
		} else
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