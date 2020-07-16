var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            },
        },
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    // loads an image and specifies each sprites frame dimensions
    this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth: 32, frameHeight: 32});
    this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
}


function create() {
    var goldPickupAudio = this.sound.add('goldSound', {loop: false});
    // button with origin set to top left of image
    var button = this.add.image(100, 100, 'button1');
    button.setOrigin(0, 0);
    // sprite with origin set to center which would be default
    // sprite has an animation component attached
    var sprite = this.add.sprite(300, 200, 'button1');
    sprite.setOrigin(0.5, 0.5);
    // create a reference to chest which is added to with physics attached
    this.chest = this.physics.add.image(100, 400, 'items', 0);

    // create a reference to an item with physics attached
    this.wall = this.physics.add.image(500, 100, 'button1');
    // Make the instance solid
    this.wall.setImmovable();

    this.player = this.physics.add.image(500, 44, 'characters', 0);
    this.player.setScale(2);
    // prevent the player going out of the scene
    this.player.body.setCollideWorldBounds(true);
    // set up a physics collider between the wall and the player
    this.physics.add.collider(this.player, this.wall);
    // when the player overlaps the chest play a sound and destroy the chest
    this.physics.add.overlap(this.player, this.chest, function(player, chest){
        goldPickupAudio.play();
        chest.destroy();
    });

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    } else {

    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    } else {

    }
}