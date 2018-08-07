function Floor(){
    this.height = FLOOR_HEIGHT;
    this.width = width;
    this.x = 0;
    this.y = height - this.height;

    this.update = function(){
        // TODO check Collision
    }

    this.draw = function(){
        fill(200);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

}