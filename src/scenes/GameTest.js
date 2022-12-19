import Phaser from 'phaser'

const GROUND_KEY = 'ground'
const RAT_IDEL_KEY = 'rat1_idel'
const RAT_WALK_KEY = 'rat1_walk'
const BIG_RAT = 'big_rat'
const CAT = 'cat'
const DOG = 'dog'
const BOMB = 'bomb'
const ROAD = 'road'
const CLOUD = 'cloud'

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
		this.load.image(GROUND_KEY, 'assets/road.png')
		this.load.image(CLOUD, 'assets/clouds.png')
		this.load.image(BOMB, 'assets/star.png')

		this.load.spritesheet(CAT,'assets/Cat/Idle.png',{
			frameWidth: 48, frameHeight:48})

		this.load.spritesheet(DOG,'assets/Dog/Idle.png',{
			frameWidth: 48, frameHeight:48})

		this.load.spritesheet(BIG_RAT, 
			'assets/bigRat/Idle.png',
			{ frameWidth: 32, frameHeight: 32 })

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

		this.dog = this.addDog()
		this.dog.setScale(1.7)

		this.rat = this.addRat()
		this.rat.setScale(5.5)

		// skapar bomb 
		this.bomb = this.addBomb()

		// skapar text
		this.ratText = this.addRatText()


		// kamra start position
		this.cameras.main.centerOn(0,5000)

		//camera ska följa splerare 
		//this.cameras.main.startFollow(this.player, true, 0.05, 0.05);		

		//colider med mark
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.cat, platforms)
        this.physics.add.collider(this.dog, platforms)
        this.physics.add.collider(this.rat, platforms)
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
        platforms.create(130, 1630, CLOUD).setScale(0.25,0.5).refreshBody()
        platforms.create(30, 1430, CLOUD).setScale(0.25,0.5).refreshBody()
        platforms.create(530, 1260, CLOUD).setScale(0.25,0.5).refreshBody()
        platforms.create(700, 1060, CLOUD).setScale(0.25,0.5).refreshBody()
        platforms.create(80, 960, CLOUD).setScale(0.25,0.5).refreshBody()

        platforms.create(150, 760, GROUND_KEY).setScale(0.03,1).refreshBody()
        platforms.create(550, 580, GROUND_KEY).setScale(0.03,1).refreshBody()
        platforms.create(250, 380, GROUND_KEY).setScale(0.02,1).refreshBody()
        platforms.create(650, 200, GROUND_KEY).setScale(0.01,1).refreshBody()

        platforms.create(180, 150, CLOUD)

        return platforms
    }
	addRatText(){
		this.add.text(50, 4700, 'Give me', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})
		
		this.add.text(50, 4750, 'I want', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(550, 4450, 'The big', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})
		
		this.add.text(550, 4500, 'Boom will', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(550, 4550, 'Make town', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(550, 4600, 'Less grey', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})
		
		this.add.text(550, 4000, 'Great light', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(550, 4050, 'Will shine', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})
		
		this.add.text(550, 4100, 'Town happy?', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(300, 3550, 'I work', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})
		
		this.add.text(300, 2200, 'Town not', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(300, 2250, 'Happy', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(300, 2300, 'I Force', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(300, 2350, 'Happiness', {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(250, 950, "Don't like dogs", {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(250, 1000, "they dum", {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(380, 110, "Small rat", {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})

		this.add.text(380, 160, "Says yes", {
			fontSize: '32px', fontStyle: 'normal',
			strokeThickness: 5, stroke:'#000000'
		})
		return this.addRatText
	}

	// bombens/win object function
	addBomb(){
		const bomb = this.physics.add.sprite(50, 100, BOMB).refreshBody()

		return bomb
	}
	// catens function
	addCat(){ 
		const cat = this.physics.add.sprite(50, 2300, CAT)

		this.anims.create({
			key: 'cat-anims',
			frames: this.anims.generateFrameNumbers(CAT, { start: 0, end: 3 }),
			frameRate: 5,
			repeat: -1
		})

		this.add.text(20, 2640, 'Stop it rat you', {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		this.add.text(20, 2680, 'are going to fail', {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		this.add.text(20, 2720, 'and then your', {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		this.add.text(20, 2760, 'body is mine', {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		return cat
	}
	
	// hundens function
	addDog(){
		const dog = this.physics.add.sprite(50, 2000, DOG)

		this.anims.create({
			key: 'dog-anims',
			frames: this.anims.generateFrameNumbers(DOG, { start: 0, end: 3 }),
			frameRate: 5,
			repeat: -1
		})

		this.add.text(20, 1980, 'Ay you, Rat', {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		
		this.add.text(20, 2020, "You suck can't even", {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		this.add.text(20, 2060, "jump to a", {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		this.add.text(20, 2100, "simple platform", {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})

		return dog
	}

	addRat(){
		const rat = this.physics.add.sprite(200, 20, BIG_RAT)

		this.anims.create({
			key: 'rat-anims',
			frames: this.anims.generateFrameNumbers(BIG_RAT, { start: 0, end: 3 }),
			frameRate: 5,
			repeat: -1
		})

		this.add.text(20, 20, 'BIG RAT SAYS NO,	SMALL RAT YOU NEED TO STOP', {
			fontSize: '26px', fontStyle: 'normal',
			strokeThickness: 4, stroke:'#000000'
		})
		return rat
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

	update(){
		// OM spelaren landar under kamran så är det gameOver 
		if (this.player.y > this.cameras.main.midPoint.y + 300 ){
			this.gameOver = true
		} 

		// Game Over
		if(this.gameOver){
			this.winText = this.add.text(250, this.cameras.main.midPoint.y - 50, 'Game Over', { fontSize: '64px'})
			this.winText.setColor('#000000')

			return
		}
		// Game Win 
		if(this.gameWin){
			this.overText = this.add.text(250, this.cameras.main.midPoint.y - 50, 'Game Win', { fontSize: '64px'})
			this.overText.setColor('#000000')
			this.scene.pause()
		}

		//NPC animation
		if (this.cat.y >= 0){
			this.cat.anims.play('cat-anims', true)
		} 
		if (this.dog.y >= 0){
			this.dog.anims.play('dog-anims', true)
		}
		if (this.rat.y >= 0){
			this.rat.anims.play('rat-anims', true)
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
		this.cat.angle -= 0.5

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