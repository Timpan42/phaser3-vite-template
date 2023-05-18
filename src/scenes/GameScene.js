import Phaser from 'phaser'

const road = 'road';
const road_ro = 'road_ro'

// spelet
export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game-scene')

	}
	// ladar in först t.ex sprits
	preload() {

		this.load.image('background', 'assets/Background.png')
		this.load.image(road, 'assets/road.png')
		this.load.image(road_ro, 'assets/road_rotation.png')
		this.load.image('ship', 'assets/BlueStrip.png');
		this.load.image('otherPlayer', 'assets/GreenStrip.png');
		this.load.image('bomb', 'assets/star_gold.png');
	}
	
	// ladar spel
	create() {
		// cameras physics
		
	}

	update() {

	}
}