/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point = Phaser.Point;
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.MAX_SPEED = 250; // pixels/second
        this.ACCELERATION = 750; // pixels/second/second
        this.ROZAMIENTO = 100; // pixels/second/second
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.game.load.tilemap('tilemap', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/Background_low.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.crearParets();
        this.crearJugador();
        this.createPickup();
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
    mainState.prototype.createPickup = function () {
        this.pickups = this.add.group();
        this.pickups.enableBody = true;
        var posicions = [{ x: 300, y: 95 },
            { x: 190, y: 135 }, { x: 410, y: 135 },
            { x: 120, y: 200 }, { x: 480, y: 200 },
            { x: 95, y: 300 }, { x: 505, y: 300 },
            { x: 120, y: 405 }, { x: 480, y: 405 },
            { x: 190, y: 465 }, { x: 410, y: 465 },
            { x: 300, y: 505 }
        ];
        for (var i = 0; i < posicions.length; i++) {
            var posicio = posicions[i];
            var pickup = new Pickup(this.game, posicio.x, posicio.y, 'pickup');
            this.pickups.add(pickup);
        }
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.moureOVNI();
        //this.mourePickup();
        this.game.debug.body(this.pickups.getAt(0));
        this.game.debug.body(this.ufo);
        this.physics.arcade.collide(this.ufo, this.parets);
        this.physics.arcade.overlap(this.ufo, this.pickups, this.getPickup, null, this);
    };
    mainState.prototype.getPickup = function () {
        //alert("hola");
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
        // fer que funcioni amb el ratolí
        /*if (this.input.activePointer.active) {
            this.ufo.rotation = this.physics.arcade.moveToPointer(this.ufo, 60, this.input.activePointer, 700);
        }*/
    };
    return mainState;
})(Phaser.State);
var Pickup = (function (_super) {
    __extends(Pickup, _super);
    function Pickup(game, x, y, key) {
        _super.call(this, game, x, y, key);
        this.anchor.setTo(0.5, 0.5);
    }
    Pickup.prototype.update = function () {
        _super.prototype.update.call(this);
        this.angle += 5;
    };
    return Pickup;
})(Phaser.Sprite);
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