/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.MAX_SPEED = 250; // pixels/second
        this.ACCELERATION = 750; // pixels/second/second
        this.ROZAMIENTO = 300; // pixels/second/second
        this.UFO_SPEED = 200;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        //this.load.image('background', 'assets/Background_low.png');
        //this.load.image('background00', 'assets/Background-0-0.png');
        //this.load.image('background01', 'assets/Background-0-1.png');
        //this.load.image('background02', 'assets/Background-0-2.png');
        //this.load.image('background10', 'assets/Background-1-0.png');
        //this.load.image('background11', 'assets/Background-1-1.png');
        //this.load.image('background12', 'assets/Background-1-2.png');
        //this.load.image('background20', 'assets/Background-2-0.png');
        //this.load.image('background21', 'assets/Background-2-1.png');
        //this.load.image('background22', 'assets/Background-2-2.png');
        this.game.load.tilemap('tilemap', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/Background_low.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.crearParets();
        this.crearJugador();
        //this.walls = this.add.group();
        //this.walls.enableBody = true;
        //
        //this.add.sprite(0, 0, 'background00');
        //var wall_left = this.add.sprite(0, 61, 'background01', null, this.walls);
        //this.add.sprite(0, wall_left.height + 61, 'background02');
        //var wall_up = this.add.sprite(wall_left.width, 0, 'background10', null, this.walls);
        //
        //var center = this.add.sprite(wall_left.width, wall_up.height, 'background11', null);
        //
        //var wall_down = this.add.sprite(wall_left.width, wall_up.height + center.height, 'background12', null, this.walls);
        //this.add.sprite(540, 0, 'background20');
        //var wall_right = this.add.sprite(wall_left.width+center.width, wall_up.height, 'background21', null, this.walls);
        //this.add.sprite(540, 535, 'background22');
        //background = this.add.sprite(0, 0, 'background');
        this.cursor = this.input.keyboard.createCursorKeys();
    };
    mainState.prototype.crearParets = function () {
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('Background_low', 'tiles');
        var fons = this.map.createLayer('fons');
        this.parets = this.map.createLayer('parets');
        this.map.setCollisionBetween(1, 100, true, 'parets');
    };
    mainState.prototype.crearJugador = function () {
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo, Phaser.Physics.ARCADE); // activar la fisica del ovni
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.drag.setTo(this.ROZAMIENTO, this.ROZAMIENTO);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.7);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.moureOVNI();
        this.physics.arcade.collide(this.ufo, this.parets);
        //this.physics.arcade.overlap(this.ufo, this.pickups, this.getPickup, null, this);
    };
    mainState.prototype.moureOVNI = function () {
        if (this.cursor.left.isDown) {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown) {
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        else {
            this.ufo.body.acceleration.x = 0;
        }
        if (this.cursor.up.isDown) {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown) {
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
        else {
            this.ufo.body.acceleration.y = 0;
        }
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map