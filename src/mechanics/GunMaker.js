const BULLET = 'bullet'

class GunMaker extends Phaser.Physics.Arcade.Sprite{
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
