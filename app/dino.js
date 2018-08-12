function Dino(){
    this.size = 40;
    this.x = 50;
    this.y = (height - FLOOR_HEIGHT) - this.size;
    this.gravitySpeed = 1;
    this.gravity = GAME_GRAVITY;
    this.jumpForce = 15;
    this.walls;
    this.wallNearest;
    this.isDead = false;
    this.color = color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));

    this.cromossome = new Cromossome();

    this.score = 0;
    this.sensorDistanceToWall = width;
    this.sensorHeightWall = 0;
    this.sensorWidthWall = 0;

    this.jumpToStartPosition = function(){
        this.x = 50;
        this.y = (height - FLOOR_HEIGHT) - this.size;
    }

    this.update = function(walls){
        
        this.walls = walls;

        this.wallNearest = walls.getNearestWall();

        this.applyGravity();

        this.isTouchingFloor();

        this.getWallData();
        
        this.checkDead();

        if(this.cromossome && this.cromossome.checkIfNeedJump(this.sensorDistanceToWall, this.sensorHeightWall, GAME_SPEED)){
            this.jump();
        }

        this.draw();
    }

    this.draw = function(){
        fill(255);
        text(this.score, this.x, this.y);

        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }

    this.jump = function(){
        if(this.isTouchingFloor()){
            this.gravitySpeed -= this.jumpForce;
        }
    }

    this.checkDead = function(){
        let dead = false;

        if(this.wallNearest){
            let a = (this.x < this.wallNearest.x && (this.x + this.size) > this.wallNearest.x) && (this.y + this.size) > this.wallNearest.y;

            let b = (this.x > this.wallNearest.x && this.x < (this.wallNearest.x + this.wallNearest.width)) && (this.y + this.size) > this.wallNearest.y;
    
            dead = a || b;
        }

        if(dead){
            this.x = -100;
            this.y = -100;
            this.isDead = true;
            print("DEAD");
            /*this.walls.restart();
            this.jumpToStartPosition();
            this.score = 0;
            GAME_SPEED = 5;
            print('GAME OVER');*/
        }else{
            this.calculateScore();
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
        this.sensorWidthWall = this.wallNearest.width;
    }

    this.crossOver = function(dino){
        
        let cromossomeMother = this.cromossome.getCromossome();
        let cromossomeFather = dino.cromossome.getCromossome();
        let cutPoint = int(random(1, cromossomeMother.length));

        let first = cromossomeFather.splice(0, cutPoint);
        let second = cromossomeMother.splice(cutPoint);
        let child = first.concat(second);

        return child;
    }

    this.mutate = function(mutateRate){
        let cromossome = this.cromossome.getCromossome();
        for(let i = 0; i < cromossome.length; i++){
            if(random(0,1) < mutateRate){
                print("MUTATION");

                if(i == 0){
                    cromossome[i] = random(0, width);
                }

                if(i == 1){
                    cromossome[i] = random(50, 130);
                }

                if(i == 2){
                    cromossome[i] = random(20, 70);
                }
                
            }
        }
        
        this.cromossome.setCromossome(cromossome);
    }

    
}