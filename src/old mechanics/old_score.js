import Phaser from 'phaser'

const formatScore = (score) => `Score: ${score}`

export default class ScoreLabel extends Phaser.GameObjects.Text
{
	constructor(scene, x, y, score, style)
	{
		super(scene, x, y, formatScore(score), style)

		this.score = score
	}

	setScore(score)
	{
		this.score  = score
		this.updateScoreText()
	}

	add(points)
	{
		this.setScore(this.score + points)
	}

	updateScoreText()
	{
		this.setText(formatScore(this.score))
	}
}

/* 
	// läger en scorelabel function
	addScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#000' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}

    // score 
		this.scoreLabel = this.addScoreLabel(16, 16, 0)

*/