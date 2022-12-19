import Phaser from 'phaser'

import GameScene from './scenes/GameScene'
//import GameScene from './scenes/GameTest'


const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 550,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},
	scene: [GameScene],
}

export default new Phaser.Game(config)
