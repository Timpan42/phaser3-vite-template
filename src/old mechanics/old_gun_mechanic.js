const BULLET = 'bullet'
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

/* 
	this.bulletGrupe;

    	this.load.image(BULLET, 'assets/bomb.png')

        // pistol 
        this.bulletGrupe = new BulletGrup(this)

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

*/