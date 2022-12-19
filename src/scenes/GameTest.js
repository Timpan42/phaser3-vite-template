import Phaser from 'phaser'

const GROUND_KEY = 'ground'
const RAT_IDEL_KEY = 'rat1_idel'
const RAT_WALK_KEY = 'rat1_walk'
const CAT = 'Cat'
const BOMB = 'bomb'
const ROAD = 'road'

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
		this.gameWin = false
	}
	// ladar in först t.ex sprits
	preload()
	{
        this.load.image('city', 'assets/war2_back_v2.png')
        this.load.image(ROAD, 'assets/small_road.png')
		this.load.image(GROUND_KEY, 'assets/platform.png')
		this.load.image(BOMB, 'assets/star.png')
		this.load.spritesheet(CAT,'assets/Cat/Idle.png',{
			frameWidth: 48, frameHeight:48})

		this.load.spritesheet(RAT_IDEL_KEY, 
			'assets/rat/idle.png',
			{ frameWidth: 31.5, frameHeight: 11 })

		this.load.spritesheet(RAT_WALK_KEY, 
			'assets/rat/walk.png',
			{ frameWidth: 32, frameHeight: 11 })
	}
	
	// ladar spel
	create()
	{
		// cameras physics
        this.cameras.main.setBounds(0, 20, 800, 5000)
        this.physics.world.setBounds(0, 0, 800, 5000)

		// skapa city (backgrund)
		this.img = this.add.image(400, 2500, 'city')
		
		//spana mark
        const platforms = this.addPlatforms()
        
		//spana player och NPC
		this.player = this.addPlayer()
		this.player.setScale(2).refreshBody()

		this.cat = this.addCat()
		this.cat.setScale(1.7)

		// skapar bomb 
		this.bomb = this.addBomb()

		// kamra start position
		this.cameras.main.centerOn(0,5000)

		//camera ska följa splerare 
		this.cameras.main.startFollow(this.player, true, 0.05, 0.05);		

		//colider med mark
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.cat, platforms)
        this.physics.add.collider(this.bomb, platforms)

		// kollar om player overlapar med bomb
		this.physics.add.overlap(this.player, this.bomb, this.collectBomb, null, this)

		// inportera inputs
		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		


	}
	// blockar upp win
	collectBomb(player, bomb){
		this.bomb.disableBody(true, true)
		this.gameWin = true
	}
	// skapar platforms function
    addPlatforms(){
        const platforms = this.physics.add.staticGroup()
		
		platforms.create(400, 5000, ROAD).setScale(1).refreshBody()
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
	// bombens/win object function
	addBomb(){
		const bomb = this.physics.add.sprite(50, 100, BOMB).refreshBody()

		return bomb
	}
	// catens function
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

	addText(){
		this.add.text(300, this.cameras.main.midPoint.y, 'Game Over', { fontSize: '32px'})

	}

	update(){
		// OM spelaren landar under kamran så är det gameOver 
		if (this.player.y > this.cameras.main.midPoint.y + 300 ){
			this.gameOver = true
		} 

		// Game Over
		if(this.gameOver){
			this.add.text(300, this.cameras.main.midPoint.y, 'Game Over', { fontSize: '32px'})
			return
		}
		// Game Win 
		if(this.gameWin){
			this.add.text(300, this.cameras.main.midPoint.y, 'Game Win', { fontSize: '32px'})
			this.scene.pause()
		}

		//input keys A 
		if (this.keyA.isDown 
			||this.cursors.left.isDown)
		{
			this.player.setVelocityX(-250)

			this.player.anims.play('right', true)
		} 
		//input keys D
		else if (
			this.keyD.isDown 
			|| this.cursors.right.isDown)
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
			|| this.cursors.up.isDown && this.player.body.touching.down
			)
		{
			this.player.setVelocityY(-350)
		}

		// lek område
		this.cat.angle -= 10

		// kamra kontrolen 
		if (this.player.y <= 4800 && this.player.y >= 4500){
    	this.cameras.main.scrollY -= 1
		} if(this.player.y <= 4500 && this.player.y >= 3500) {
			this.cameras.main.scrollY -= 1.5
		} else if(this.player.y <= 3500) {
			this.cameras.main.scrollY -= 1.75
		}
		//console.log(this.player.y);
		//console.log(this.cameras.main.midPoint.y)
	}
}