class GameScene extends Phaser.Scene{
    constructor() {
        super('Game');
    }

    init(){
        this.scene.launch('Ui');
    }

    randomCoords(max) {
        return Math.round(Math.random() * max);
    }

    create() {
        this.createAudio();

        this.createChests();
        this.createWalls();
        this.createPlayer();
        this.createPhysics();
        this.createInput();
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createPhysics() {
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest1, this.collectChest, null, this);
        this.physics.add.overlap(this.player, this.chest2, this.collectChest, null, this);
    }

    createPlayer() {
        this.player = new Player(this, 500, 44, 'characters', 0);
    }

    createWalls() {
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
    }

    createChests() {
        this.chest1 = new Chest(this, this.randomCoords(800), this.randomCoords(600), 'items', 0);
        this.chest2 = new Chest(this, this.randomCoords(800), this.randomCoords(600), 'items', 0);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', {loop: false});
    }

    update() {
        this.player.update(this.cursors);
    }

    collectChest(player, chest){
        this.goldPickupAudio.play();
        this.events.emit('updateScore', chest.coins)
        chest.destroy();
    }

}