/// <reference path="phaser/phaser.d.ts"/>

import Point = Phaser.Point;
class mainState extends Phaser.State {
    game: Phaser.Game;

    private ufo:Phaser.Sprite;
    private pickups:Phaser.Group;
    private cursor:Phaser.CursorKeys;
    private parets:Phaser.TilemapLayer;
    private map:Phaser.Tilemap;

    private MAX_SPEED = 250; // pixels/second
    private ACCELERATION = 750; // pixels/second/second
    private ROZAMIENTO = 100; // pixels/second/second

    preload():void {
        super.preload();

        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');

        this.game.load.tilemap('tilemap', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/Background_low.png');

        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();

        this.crearParets();
        this.crearJugador();
        this.createPickup();

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    private crearParets() {
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('Background_low', 'tiles');

        var fons = this.map.createLayer('fons');
        this.parets = this.map.createLayer('parets');

        this.map.setCollisionBetween(1, 100, true, 'parets');
    }

    private crearJugador(){
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);

        this.physics.enable(this.ufo, Phaser.Physics.ARCADE); // activar la fisica del ovni

        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.drag.setTo(this.ROZAMIENTO,this.ROZAMIENTO);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.7);
    }

    private createPickup():void {
        this.pickups = this.add.group();
        this.pickups.enableBody = true;

        var posicions = [ {x:300, y:95},
            {x:190, y:135}, {x:410, y:135},
            {x:120, y:200}, {x:480, y:200},
            {x:95, y:300}, {x:505, y:300},
            {x:120, y:405}, {x:480, y:405},
            {x:190, y:465}, {x:410, y:465},
            {x:300, y:505}
        ];
        for (var i = 0; i < posicions.length; i++) {
            var posicio = posicions[i];
            var pickup = new Pickup (this.game, posicio.x, posicio.y, 'pickup');

            this.pickups.add(pickup);
        }
    }

    update():void {
        super.update();

        this.moureOVNI();
        //this.mourePickup();

        this.game.debug.body(this.pickups.getAt(0));
        this.game.debug.body(this.ufo);

        this.physics.arcade.collide(this.ufo, this.parets);
        this.physics.arcade.overlap(this.ufo, this.pickups, this.getPickup, null, this);
    }

    private getPickup(){
        //alert("hola");
    }

    private moureOVNI(){
        if (this.cursor.left.isDown){
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        } else if (this.cursor.right.isDown){
            this.ufo.body.acceleration.x = this.ACCELERATION;
        } else {
            this.ufo.body.acceleration.x = 0;
        }
        if (this.cursor.up.isDown){
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        } else if (this.cursor.down.isDown){
            this.ufo.body.acceleration.y = this.ACCELERATION;
        } else {
            this.ufo.body.acceleration.y = 0;
        }

        // fer que funcioni amb el ratolí
        /*if (this.input.activePointer.active) {
            this.ufo.rotation = this.physics.arcade.moveToPointer(this.ufo, 60, this.input.activePointer, 700);
        }*/
    }
}

class Pickup extends Phaser.Sprite {

    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture) {
        super(game, x, y, key);
        this.anchor.setTo(0.5, 0.5);
    }

    update():void {
        super.update();
        this.angle += 5;
    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};
