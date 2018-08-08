function Wall(){
    this.height = int(random(50, 130));
    this.width = this.width = random(20, 70);
    this.x = width + this.width;
    this.y = (height - this.height) - FLOOR_HEIGHT;
    this.isDead = false;
    
    this.update = function(){
        this.draw();
        this.x -= GAME_SPEED;
        this.checkIsDead();
    }

    this.draw = function(){
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    this.checkIsDead = function(){
        this.isDead = this.x + this.width <= 0;
    }
}