import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel'

const GROUND_KEY = 'ground'
const RAT_IDEL_KEY = 'rat1_idel'
const RAT_WALK_KEY = 'rat1_walk'
const BULLET = 'bullet'
const CAT = 'Cat'


class Bullet extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x, y) {
		super(scene, x, y, BULLET);
	}

	preUpdate(time, delta){
		super.preUpdate(time, delta)
		
		//reseta pistolens skot 
		if (this.y <= 0 || this.y >= 5000){
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

	// hur skotet ska fara vid input 
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

// skotens skapas
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

// spelet
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
	// ladar in först t.ex sprits
	preload()
	{
        this.load.image('sky', 'assets/legitjag.png')
		this.load.image(GROUND_KEY, 'assets/platform.png')
		this.load.image('star', 'assets/star.png')
		this.load.image(BULLET, 'assets/bomb.png')
		this.load.spritesheet(CAT,'assets/Cat/Idle.png',{
			frameWidth: 48, frameHeight:48})

		this.load.spritesheet(RAT_IDEL_KEY, 
			'assets/rat/idle.png',
			{ frameWidth: 32, frameHeight: 11 })

		this.load.spritesheet(RAT_WALK_KEY, 
			'assets/rat/walk.png',
			{ frameWidth: 32, frameHeight: 11 })
	}
	
	// ladar spel
	create()
	{
		// cameras physics
        this.cameras.main.setBounds(0, 20, 800, 5000);
        this.physics.world.setBounds(0, 0, 800, 5000);

		//spana backgrund
        this.img = this.add.image(400, 300, 'sky').setScale(0)
		
		//spana mark
        const platforms = this.addPlatforms()
        
		//spana player och NPC
		this.player = this.addPlayer()
		this.player.setScale(2)

		this.cat = this.addCat()
		this.cat.setScale(1.7)

		// pistol 
		this.bulletGrupe = new BulletGrup(this)

		// score 
		this.scoreLabel = this.addScoreLabel(16, 16, 0)

		//colider med mark
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.cat, platforms)

		// inportera inputs
		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		
		// kamra start position
		this.cameras.main.centerOn(0,5000)

		// game over text

		//camera ska följa splerare 
		//this.cameras.main.startFollow(this.player, true, 0.05, 0.05);		
	}
	
	// skapar platforms function
    addPlatforms(){
        const platforms = this.physics.add.staticGroup()
		
		platforms.create(400, 5000, GROUND_KEY).setScale(2).refreshBody()
		platforms.create(700, 4800, GROUND_KEY)
		platforms.create(40, 4610, GROUND_KEY)
		platforms.create(60, 4450, GROUND_KEY)
		platforms.create(90, 4250, GROUND_KEY)
		platforms.create(150, 4050, GROUND_KEY)
		platforms.create(500, 3850, GROUND_KEY)
		platforms.create(700, 3650, GROUND_KEY)
		platforms.create(90, 3450, GROUND_KEY)
		platforms.create(90, 3250, GROUND_KEY)
		platforms.create(500, 3050, GROUND_KEY)
		platforms.create(-130, 2890, GROUND_KEY)
        platforms.create(600, 2750, GROUND_KEY)
        platforms.create(900, 2550, GROUND_KEY)
        platforms.create(950, 2350, GROUND_KEY)
        platforms.create(970, 2150, GROUND_KEY)
        platforms.create(20, 2220, GROUND_KEY)

        platforms.create(430, 2050, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(230, 1850, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(430, 1650, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(130, 1630, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(30, 1430, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(530, 1260, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(700, 1060, GROUND_KEY).setScale(0.25,1).refreshBody()
        platforms.create(80, 960, GROUND_KEY).setScale(0.25,1).refreshBody()

        platforms.create(150, 760, GROUND_KEY).setScale(0.03,1).refreshBody()
        platforms.create(550, 580, GROUND_KEY).setScale(0.03,1).refreshBody()
        platforms.create(250, 380, GROUND_KEY).setScale(0.02,1).refreshBody()
        platforms.create(650, 200, GROUND_KEY).setScale(0.01,1).refreshBody()

        platforms.create(180, 150, GROUND_KEY)

        return platforms
    }

	// läger en scorelabel function
	addScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#000' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}

	addCat(){ 
		const cat = this.physics.add.sprite(100, 2300, CAT)		

		return cat
	}
	// spelaren function
    addPlayer(){
        
        const player = this.physics.add.sprite(100, 4900, RAT_IDEL_KEY)
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

	// pistolens functions
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

		// OM spelaren landar under kamran så är det gameOver 
		if (this.player.y > this.cameras.main.midPoint.y + 300 ){
			this.gameOver = true
		} 

		// det blir två game overs, vet inte varför 
		if(this.gameOver){
			this.add.text(300, this.cameras.main.midPoint.y, 'Game Over', { fontSize: '32px'})
			return
		}

		// logik för pistolens inputs
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
			this.player.setVelocityX(-250)

			this.player.anims.play('right', true)
		} 
		//input keys D
		else if (
			this.keyD.isDown)
		{
			this.player.setVelocityX(250)

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
			this.player.setVelocityY(-350)
		}

		// lek område
		this.cat.angle -= 10
		this.img.scaleX +=0.001
		this.img.scaleY +=0.001
    	this.cameras.main.scrollY -= 1
		//console.log(this.player.y);
		//console.log(this.cameras.main.midPoint.y)
	}
}