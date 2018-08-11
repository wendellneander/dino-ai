function Population(size, generations) {
    this.size = size;
    this.fitness = 0;
    this.best;
    this.population = [];
    this.maxGenerations = generations;

    this.start = function(){
        if(this.population.length == 0){
            for(let i = 0; i < size; i++){
                this.population.push(new Dino());
            }
        }
        //TODO iniciar os dinos na tela
    }

    this.update = function(){
        this.population.forEach(dino => {
            dino.update();
        });

        if(this.checkAllDead()){
            this.evaluate();
            this.getBest();
            this.evolve();
        }
    }

    this.checkAllDead = function(){
        for(let i = 0; i < this.population.length; i++){
            if(!dino.isDead()){
                return false;
            }
        }
        return true;
    }

    this.evaluate = function(){
        this.population.forEach(dino => {
            this.fitness += dino.score;
        });
    }

    this.getBest = function(){
        this.population.sort(function(a,b){
            if (a.score < b.score)
                return -1;
            if (a.score > b.score)
                return 1;
            return 0;
        });

        return this.population[0];
    }

    this.getFather = function(){
        let fatherIndex = -1;
        let randomScore = random(0, 1) * this.fitness;
        let total = 0;
        let i = 0;

        while(i < this.population.length && total < randomScore){
            total += this.population[i].score;
            fatherIndex++;
            i++;
        }

        return this.population[fatherIndex];
    }

    this.evolve = function(){
        let newPopulation = [];

        for(let i = 0; i < this.population.length / 2; i++){
            let father = this.getBest();
            let mother = this.getFather();
            let children = father.crossOver(mother);
    
            children.forEach(child => {
                newPopulation.push(child);
            });
        }

        this.population = newPopulation();
        this.start();
    }

}