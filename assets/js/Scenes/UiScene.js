class UiScene extends Phaser.Scene{
    constructor() {
        super('Ui');
        this.score = 0;
    }

    init(){
        this.gameScene = this.scene.get('Game')
    }

    create() {
        this.setUpUiElements();
        this.setUpEvents();

    }

    setUpUiElements(){
        this.scoreText = this.add.text(35, 8, 'Coins: 0', {fontSize: '16px', fill: '#fff'});
        this.coinIcon = this.add.image(15, 15, 'items', 3);
    }

    setUpEvents(){
        this.gameScene.events.on('updateScore', (score) => {
            this.score = this.score + score;
            this.scoreText.setText(`Coins: ${this.score}`)
        })
    }
}