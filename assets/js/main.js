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
                y: 5,
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
}

function create() {
    // button with origin set to top left of image
    var button = this.add.image(100, 100, 'button1');
    button.setOrigin(0, 0);
    // sprite with origin set to center which would be default
    // sprite has an animation component attached
    var sprite = this.add.sprite(300, 200, 'button1');
    sprite.setOrigin(0.5, 0.5);
    // loads frames from the spritesheet as images by specifying frame number
    // these will not have an animation component attached
    var chest = this.add.image(100, 400, 'items');
    var chest = this.add.image(200, 400, 'items', 1);
    var chest = this.add.image(300, 400, 'items', 2);
    var chest = this.add.image(400, 400, 'items', 3);
    var chest = this.add.image(500, 400, 'items', 4);

    this.physics.add.image(500, 100, 'button1');
    this.player = this.physics.add.image(500, 44, 'characters', 0);
    this.player.setScale(2);

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