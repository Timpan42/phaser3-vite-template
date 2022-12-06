import Phaser from 'phaser'

export default class GunMaker
{
	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor(scene, gunKey = 'gun')
	{
		this.scene = scene
		this.key = gunKey

	}
}