class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('Ui');
        this.score = 0;
    }

    create() {
        this.createMap();
        this.createAudio();
        this.createGroups();
        this.createInput();
        this.createGameManager();
    }

    update() {
        this.player && this.player.update(this.cursors);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', {loop: false});
    }

    createPlayer(location) {
        this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 0);
    }

    createGroups() {
        this.chests = this.physics.add.group();
    }

    spawnChest(chestObject) {
        let chest = this.chests.getFirstDead();
        if (!chest) {
            chest = new Chest(this, chestObject.x * 2, chestObject.y * 2, 'items', 0, chestObject.gold, chestObject.id);
            this.chests.add(chest);
        } else {
            chest.coins = chestObject.gold;
            chest.id = chestObject.id;
            chest.setPosition(chestObject.x * 2, chestObject.y * 2);
            chest.makeActive();
        }
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    createGameManager() {
        this.events.on('spawnPlayer', location => {
            this.createPlayer(location);
            this.createCollisions();
        });
        this.events.on('chestSpawned', chest => {
            this.spawnChest(chest);
        });
        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createCollisions() {
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }





    collectChest(player, chest) {
        this.goldPickupAudio.play();
        this.events.emit('updateScore', chest.coins);
        chest.makeInactive();
        this.events.emit('pickUpChest', chest.id);
    }

}