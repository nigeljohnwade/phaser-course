class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('Ui');
    }

    randomCoords(max) {
        return Math.round(Math.random() * max);
    }

    create() {
        this.createMap();
        this.createAudio();
        this.createChests();
        this.createPlayer();
        this.createCollisions();
        this.createInput();
    }

    update() {
        this.player.update(this.cursors);
    }

    createMap(){
        this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createCollisions() {
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }

    createPlayer() {
        this.player = new Player(this, 224, 224, 'characters', 0);
    }

    createChests() {
        this.chests = this.physics.add.group();
        this.maxNumberOfChests = 3;
        for (let i = 0; i < this.maxNumberOfChests; i++) {
            this.spawnChest();
        }
    }

    spawnChest() {
        let chest = this.chests.getFirstDead();
        if (!chest) {
            const chest = new Chest(this, this.randomCoords(800), this.randomCoords(600), 'items', 0);
            this.chests.add(chest);
        } else {
            chest.setPosition( this.randomCoords(800), this.randomCoords(600));
            chest.makeActive();
        }
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', {loop: false});
    }

    collectChest(player, chest) {
        this.goldPickupAudio.play();
        this.events.emit('updateScore', chest.coins);
        chest.makeInactive();
        this.time.delayedCall(1000, this.spawnChest, [], this);
    }

}