function Dino(){
    this.size = 40;
    this.x = 20;
    this.y = (height - FLOOR_HEIGHT) - this.size;
    this.gravitySpeed = 1;
    this.gravity = GAME_GRAVITY;
    this.jumpForce = 15;

    this.score = 0;
    this.sensorDistanceToWall = width;
    this.sensorHeightWall = 0;

    this.output = 0;

    this.jump = function(){
        if(this.isTouchingFloor()){
            this.gravitySpeed -= this.jumpForce;
        }
    }

    this.startBrain = function(){
        const { Layer, Network } = window.synaptic;

        this.inputLayer = new Layer(2);
        this.hiddenLayer = new Layer(3);
        this.outputLayer = new Layer(1);

        this.inputLayer.project(this.hiddenLayer);
        this.hiddenLayer.project(this.outputLayer);

        this.network = new Network({
            input: this.inputLayer,
            hidden: [this.hiddenLayer],
            output: this.outputLayer
        });
    }

    this.learn = function(){
        let output = this.network.activate([this.sensorDistanceToWall, this.sensorHeightWall]);

        if(output < 5){
            //this.jump();
        }

        this.output = output[0] * 10000;
    }
    
    // Starting brain
    this.startBrain();

    this.jumpToStartPosition = function(){
        this.x = 20;
        this.y = (height - FLOOR_HEIGHT) - this.size;
    }

    this.update = function(wall){

        this.applyGravity();

        this.isTouchingFloor();

        this.calculateScore();

        this.getWallData(wall);

        this.learn();
        
        if(this.isDead(wall)){
            alert('GAME OVER');
            wall.start()
            this.jumpToStartPosition();
            this.score = 0;
        }
    }

    this.draw = function(){
        fill(255);
        rect(this.x, this.y, this.size, this.size);
    }

    this.isDead = function(wall){

        let a = (this.x < wall.x && (this.x + this.size) > wall.x) && (this.y + this.size) > wall.y;

        let b = (this.x > wall.x && this.x < (wall.x + wall.width)) && (this.y + this.size) > wall.y;

        return a || b;
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