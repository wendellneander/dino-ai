function Dino(){
    this.size = 40;
    this.x = 50;
    this.y = (height - FLOOR_HEIGHT) - this.size;
    this.gravitySpeed = 1;
    this.gravity = GAME_GRAVITY;
    this.jumpForce = 15;
    this.walls;
    this.wallNearest;

    this.score = 0;
    this.sensorDistanceToWall = width;
    this.sensorHeightWall = 0;

    this.inputGenome = new Genome(GENOME_INPUTS);
    this.genome = new Genome(GENES_PER_GENOME);
    this.outputGenome = new Genome(1);

    this.jumpToStartPosition = function(){
        this.x = 50;
        this.y = (height - FLOOR_HEIGHT) - this.size;
    }

    this.update = function(walls){
        
        this.walls = walls;

        this.wallNearest = walls.getNearestWall();

        this.applyGravity();

        this.isTouchingFloor();

        this.calculateScore();

        this.getWallData();
        
        this.isDead();
    }

    this.draw = function(){
        fill(255);
        rect(this.x, this.y, this.size, this.size);
    }

    this.jump = function(){
        if(this.isTouchingFloor()){
            this.gravitySpeed -= this.jumpForce;
        }
    }

    this.isDead = function(){

        let a = (this.x < this.wallNearest.x && (this.x + this.size) > this.wallNearest.x) && (this.y + this.size) > this.wallNearest.y;

        let b = (this.x > this.wallNearest.x && this.x < (this.wallNearest.x + this.wallNearest.width)) && (this.y + this.size) > this.wallNearest.y;

        let dead = a || b;

        if(dead){
            this.walls.restart();
            this.jumpToStartPosition();
            this.score = 0;
            GAME_SPEED = 5;
            print('GAME OVER');
        }

        return dead;
    }

    this.applyGravity = function(){
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
    }

    this.isTouchingFloor = function(){
        let isTouchingFloor = this.y + this.size >= height - FLOOR_HEIGHT;

        if(isTouchingFloor){
            this.gravitySpeed = 1;
            this.gravity = 0;
            this.y = (height - FLOOR_HEIGHT) - this.size;
        }else{
            this.gravity = GAME_GRAVITY;
        }

        return isTouchingFloor;
    }

    this.calculateScore = function(){
        this.score++;
    }

    this.getWallData = function(){
        let myX = this.x + this.size;
        let myY = this.y + this.size;
        
        this.sensorDistanceToWall = int(dist(myX, myY, this.wallNearest.x, this.wallNearest.y + this.wallNearest.height));
        this.sensorHeightWall = this.wallNearest.height;
    }
}