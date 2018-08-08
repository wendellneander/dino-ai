function Walls(){
    this.maxWalls = 5;
    this.wallsRate = .3;
    this.walls = [];

    this.restart = function(){
        this.walls = [];
        this.wallsRate = .3;
    }

    this.update = function(){

        this.createWall();

        this.updateWalls();

        this.updateWallsRate();

    }

    this.addWall = function(){
        if(this.walls.length < this.maxWalls){
            this.walls.push(new Wall());
        }
    }

    this.updateWalls = function(){
        let wallsDead = [];
        this.walls.forEach((wall, key) => {
            wall.update();

            if(wall.isDead){
                this.wallsRate += 0.1;
                wallsDead.push(key);
            }
        });

        this.removeWalls(wallsDead);
    }

    this.updateWallsRate = function(){
        if (this.walls.length <= 0) {
            this.wallsRate = .9;
        }
    }

    this.createWall = function(){

        if (this.walls.length <= 0) {
            this.addWall();
        }else if (random(0, 1.5) < this.wallsRate) {
            let lastWall = this.walls[this.walls.length - 1];

            if (lastWall.x < width * random(0.15, 0.5)) {
                this.addWall();
            }
        }
    }

    this.removeWalls = function(walls){
        walls.forEach((index) => {
            this.walls.splice(key, 1);
        });
    }

    this.getNearestWall = function(){
        // TODO melhorar
        return this.walls[0];
    }
}