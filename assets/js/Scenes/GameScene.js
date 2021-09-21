class GameScene extends Phaser.Scene{
    constructor() {
        super('Game');
    }

    create() {
        var goldPickupAudio = this.sound.add('goldSound', {loop: false});

        // create a reference to chest which is added to with physics attached
        this.chest = new Chest(this,100, 400, 'items', 0);

        // create a reference to an item with physics attached
        this.wall = this.physics.add.image(500, 100, 'button1');
        // Make the instance solid
        this.wall.setImmovable();

        this.player = new Player(this, 500, 44, 'characters', 0);

        // set up a physics collider between the wall and the player
        this.physics.add.collider(this.player, this.wall);
        // when the player overlaps the chest play a sound and destroy the chest
        this.physics.add.overlap(this.player, this.chest, function(player, chest){
            goldPickupAudio.play();
            chest.destroy();
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.update(this.cursors);
    }
}