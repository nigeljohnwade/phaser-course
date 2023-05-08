class GameManager {
    constructor(scene, mapData) {
        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};

        this.playerLocations = [];
        this.chestLocations = {};
        this.monsterLocations = {};
    }

    setup() {
        this.parseMapData();
        this.setupEventListener();
        this.setupSpawners();
        this.spawnPlayer();
    }

    parseMapData() {
        this.mapData.forEach(layer => {
            switch (layer.name) {
                case 'player_locations':
                    this.playerLocations = [...layer.objects.map(object => [object.x, object.y])];
                    break;
                case 'chest_locations':
                    layer.objects.forEach((obj) => {
                        if (this.chestLocations[obj.properties.spawner]) {
                            this.chestLocations[obj.properties.spawner].push([obj.x, obj.y]);
                        } else {
                            this.chestLocations[obj.properties.spawner] = [[obj.x, obj.y]];
                        }
                    });
                    break;
                case 'monster_locations':
                    this[layer.name] = layer.objects.reduce((accumulator, object) => {
                        const spawnerId = object.properties.spawner;
                        accumulator[spawnerId]
                            ? accumulator[spawnerId].push([object.x, object.y])
                            : accumulator[spawnerId] = [[object.x, object.y]];
                        return accumulator;
                    }, {});
                    break;
                default:
            }
        });
    }

    setupEventListener() {

    }

    setupSpawners() {
        Object.keys(this.chestLocations).forEach((key) => {
            const config = {
                spawnInterval: 3000,
                limit: 3,
                objectType: SpawnerType.CHEST,
                id: `chest-${key}`,
            };

            const spawner = new Spawner(
                config,
                this.chestLocations[key],
                this.addChest.bind(this),
                this.deleteChest.bind(this),
            );
            this.spawners[spawner.id] = spawner;
        });
        console.log(this.spawners);
    }

    spawnPlayer() {
        const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
        this.scene.events.emit('spawnPlayer', location);
    }

    addChest(chestId, chest) {
        this.chests[chestId] = chest;
        console.log(chest);
    }

    deleteChest(chestId) {
        delete this.chests[chestId];
    }

}