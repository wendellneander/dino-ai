
const GAME_SPEED = 5;
const GAME_GRAVITY = 0.6;
const FLOOR_HEIGHT = 20;

let flappy;
let wall;
let floor;

function setup(){
    createCanvas(800, 500);

    flappy = new Flappy();
    wall = new Wall();
    floor = new Floor();

    
}

function draw(){
    background(51);

    wall.update();
    wall.draw();

    floor.update();
    floor.draw();

    flappy.update(wall);
    flappy.draw();

    getGui();

    //frameRate(0);
}

function mouseClicked(){
    flappy.jump();
}

function getGui(){
    var score = 'Score: ' + flappy.score;
    fill(255);
    text(score, 10, 20);

    var score = 'Distance to Wall: ' + flappy.sensorDistanceToWall;
    fill(255);
    text(score, 10, 35);

    var score = 'Height of Wall: ' + flappy.sensorHeightWall;
    fill(255);
    text(score, 10, 50);
}