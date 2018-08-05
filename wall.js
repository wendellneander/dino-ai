function Wall(){
    this.height = 100;
    this.width = 50;
    this.x = width - this.width;
    this.y = (height - this.height) - FLOOR_HEIGHT;

    this.start = function(){
        //this.width = random(20, 50);
        this.height = int(random(60, 100));
        this.jumpToStartPosition();
    }

    this.jumpToStartPosition = function(){
        this.x = width - this.width;
        this.y = (height - this.height) - FLOOR_HEIGHT;
    }
    
    this.update = function(){
        this.x -= GAME_SPEED;

        if(this.isDead()){
            this.start();
        }
    }

    this.draw = function(){
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    this.isDead = function(){
        return this.x + this.width <= 0;
    }
}