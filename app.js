
let GAME_SPEED = 5;
const GAME_GRAVITY = 0.6;
const FLOOR_HEIGHT = 20;
const GENES_PER_GENOME = 3;
const GENOME_INPUTS = 1;

let dino;
let population;
let wall;
let floor;

function setup(){
    createCanvas(800, 500);

   // dino = new Dino();
    walls = new Walls();
    floor = new Floor();
    population = new Population(10, 20);
    population.start();
}

function draw(){
    background(51);

    walls.update();

    floor.draw();

    population.update(walls);
    
    GAME_SPEED += 0.0001;

    getGui();
}

function mouseClicked(){
    //dino.jump();
}

function getGui(){
    var speed = 'Speed: ' + GAME_SPEED;
    fill(255);
    text(speed, 10, 20);

    var heightOfWall = 'Dinos: ' + population.population.length;
    fill(255);
    text(heightOfWall, 10, 35);

    var heightOfWall = 'Generation: ' + population.generation;
    fill(255);
    text(heightOfWall, 10, 50);

    var heightOfWall = 'Fitness: ' + population.fitness;
    fill(255);
    text(heightOfWall, 10, 65);
}