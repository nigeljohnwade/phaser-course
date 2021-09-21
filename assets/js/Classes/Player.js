class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.velocity = 160;

        // enable physics
        this.scene.physics.world.enable(this);
        // set immovable if another object collides
        this.setImmovable(false);
        // scale player
        this.setScale(2);
        // prevent the player going out of the scene
        this.setCollideWorldBounds(true);
        // add player to scene
        this.scene.add.existing(this);
    }

    update(cursors) {
        this.body.setVelocity(0);
        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
        } else {
            this.body.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(this.velocity);
        } else {
            this.body.setVelocityY(0);
        }
    }
}