class TitleScene extends Phaser.Scene{
    constructor() {
        super('Title');
    }

    preload() {

    }
    create() {
        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Zenva MMORPG', {fontSize: '64px', fill: '#fff'});
        this.titleText.setOrigin(0.5)
        this.button = this.add.image(this.scale.width / 2, this.scale.height* 0.65, 'button1');
        this.button.setInteractive();
        this.button.on('pointerdown', (e) =>{
            console.log(e, 'pointerdown');
            this.scene.start('Game');
        });
        this.button.on('pointerover', (e) =>{
            console.log(e, 'pointerover');
            this.button.setTexture('button2');
        });
        this.button.on('pointerout', (e) =>{
            console.log(e, 'pointerout');
            this.button.setTexture('button1');
        });
    }
}