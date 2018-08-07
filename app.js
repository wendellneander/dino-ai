
const GAME_SPEED = 5;
const GAME_GRAVITY = 0.6;
const FLOOR_HEIGHT = 20;
const GENES_PER_GENOME = 3;
const GENOME_INPUTS = 1;

let dino;
let wall;
let floor;

function setup(){
    createCanvas(800, 500);

    dino = new Dino();
    wall = new Wall();
    floor = new Floor();
}

function draw(){
    background(51);

    wall.update();
    wall.draw();

    floor.update();
    floor.draw();

    dino.update(wall);
    dino.draw();

    getGui();
}

function mouseClicked(){
    dino.jump();
}

function getGui(){
    var score = 'Score: ' + dino.score;
    fill(255);
    text(score, 10, 20);

    var distance = 'Distance to Wall: ' + dino.sensorDistanceToWall;
    fill(255);
    text(distance, 10, 35);

    var heightOfWall = 'Height of Wall: ' + dino.sensorHeightWall;
    fill(255);
    text(heightOfWall, 10, 50);

    var activation = 'Activation: ' + dino.output;
    fill(255);
    text(activation, 10, 65);
}