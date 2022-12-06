const RAT_IDEL_KEY = 'rat1_idel'
const RAT_WALK_KEY = 'rat1_walk'

class Player extends Entity{
    
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey, 'Player')
        
        const animFrameRate = 10
        const anims = scene.anims
        
            this.anims.create({
                key: 'left',
                frames: anims.generateFrameNumbers(this.textureKey, { start: 0, end: 3 }),
                frameRate: animFrameRate,
                repeat: -1
            })
            
            this.anims.create({
                key: 'turn',
                frames: [ { key: this.textureKey, frame: 3 } ],
                frameRate: animFrameRate
            })
            
            this.anims.create({
                key: 'right',
                frames: anims.generateFrameNumbers(this.textureKey, { start: 4, end: 7 }),
                frameRate: animFrameRate,
                repeat: -1
            })
    }
    update(){
        
    }
}