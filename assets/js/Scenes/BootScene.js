class BootScene extends Phaser.Scene{
    constructor() {
        super('Boot');
    }

    preload() {
        this.loadImages();
        this.loadSpritesheets();
        this.loadAudio();
        this.loadTileMap();
    }

    loadImages() {
        this.load.image('button1', 'assets/images/ui/blue_button01.png');
        this.load.image('button2', 'assets/images/ui/blue_button02.png');
        this.load.image('background', 'assets/level/background-extruded.png');
    }

    loadAudio() {
        this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    }

    loadSpritesheets() {
        this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        this.scene.start('Game');
    }

    loadTileMap(){
        this.load.tilemapTiledJSON('map', 'assets/level/large_level.json');
    }
}