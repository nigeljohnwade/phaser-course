class TitleScene extends Phaser.Scene{
    constructor() {
        super('Title');
    }

    preload() {

    }
    create() {
        this.button = this.add.image(100, 100, 'button1');
    }
}