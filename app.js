
let GAME_SPEED = 5;
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
    
    GAME_SPEED += (0.0001 + random(0.0001, 0.003));

    getGui();
}

function mouseClicked(){
    dino.jump();
}

function getGui(){
    var score = 'Score: ' + dino.score;
    fill(255);
    text(score, 10, 20);

    var score = 'Speed: ' + GAME_SPEED;
    fill(255);
    text(score, 10, 35);

    var distance = 'Distance: ' + dino.sensorDistanceToWall;
    fill(255);
    text(distance, 10, 50);

    var heightOfWall = 'Height: ' + dino.sensorHeightWall;
    fill(255);
    text(heightOfWall, 10, 65);
}