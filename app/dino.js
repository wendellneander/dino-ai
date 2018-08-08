function Dino(){
    this.size = 40;
    this.x = 50;
    this.y = (height - FLOOR_HEIGHT) - this.size;
    this.gravitySpeed = 1;
    this.gravity = GAME_GRAVITY;
    this.jumpForce = 15;

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

    this.update = function(wall){

        this.applyGravity();

        this.isTouchingFloor();

        this.calculateScore();

        this.getWallData(wall);
        
        this.isDead(wall);
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

    this.isDead = function(wall){

        let a = (this.x < wall.x && (this.x + this.size) > wall.x) && (this.y + this.size) > wall.y;

        let b = (this.x > wall.x && this.x < (wall.x + wall.width)) && (this.y + this.size) > wall.y;

        if(a || b){
            wall.start()
            this.jumpToStartPosition();
            this.score = 0;
        }
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

    this.getWallData = function(wall){
        let myX = this.x + this.size;
        let myY = this.y + this.size;
        
        this.sensorDistanceToWall = int(dist(myX, myY, wall.x, wall.y + wall.height));
        this.sensorHeightWall = wall.height;
    }
}