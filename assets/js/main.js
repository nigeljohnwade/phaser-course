var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene:{
        preload: preload,
        create: create,
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    // loads an image and specifies each sprites frame dimensions
    this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32});
}

function create() {
    // button with origin set to top left of image
    var button = this.add.image(100,100,'button1');
    button.setOrigin(0, 0);
    // sprite with origin set to center which would be default
    // sprite has an animation component attached
    var sprite = this.add.sprite(300,200,'button1');
    sprite.setOrigin(0.5,0.5);
    // loads frames from the spritesheet as images by specifying frame number
    // these will not have an animation component attached
    var chest = this.add.image(100,400,'items');
    var chest = this.add.image(200,400,'items', 1);
    var chest = this.add.image(300,400,'items', 2);
    var chest = this.add.image(400,400,'items', 3);
    var chest = this.add.image(500,400,'items', 4);
}