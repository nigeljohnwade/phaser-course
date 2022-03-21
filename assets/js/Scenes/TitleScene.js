class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        this.startGameButton = new UiButton(
            this,
            this.scale.width / 2, this.scale.height * 0.65,
            'button1',
            'button2',
            'Start',
            this.startScene.bind(this, 'Game')
        )
    }

    startScene(targetScene){
        this.scene.start(targetScene)
    }
}