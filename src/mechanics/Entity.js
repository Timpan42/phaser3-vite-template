class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, textureKey, type){
        super(scene, x, y, textureKey)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enableBody(this, 0)
        this.type = type
        this.isDead = false
    }
}