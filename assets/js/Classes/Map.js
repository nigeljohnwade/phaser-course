class Map {
    constructor(scene, key, tilesetName, backgroundLayerName, blockedLayerName) {
        this.scene = scene;
        this.key = key;
        this.tilesetName = tilesetName;
        this.backgroundLayerName = backgroundLayerName;
        this.blockedLayerName = blockedLayerName;
        scene && this.createMap();
    }

    createMap(){
        this.map = this.scene.make.tilemap({key: this.key});
        this.tiles = this.map.addTilesetImage(this.tilesetName, this.tilesetName, 32, 32, 1, 2 );
        this.backgroundLayer = this.map.createStaticLayer(this.backgroundLayerName, this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setScale(2);
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion([-1]);
        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);
    }
}