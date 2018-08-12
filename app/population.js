function Population(size, generations, rateMutation) {
    this.size = size;
    this.fitness = 0;
    this.lastFitness = 0;
    this.bestFitness = 0;
    this.best;
    this.population = [];
    this.maxGenerations = generations;
    this.generation = 1;
    this.rateMutation = rateMutation;

    this.evolving = false;

    this.start = function(){
        if(this.population.length == 0){
            for(let i = 0; i < size; i++){
                this.population.push(new Dino());
            }
        }
    }

    this.update = function(walls){
        if(this.checkAllDead() && !this.evolving){
            GAME_SPEED = 5;
            this.evolving = true;
            walls.restart();
            this.evaluate();
            this.getBest();
            this.evolve();
            this.evolving = false;
            this.fitness = 0;
            print('GAME OVER');
        }else{
            for(let i = 0; i < this.population.length; i++){
                let dino = this.population[i];
                dino.update(walls);
            }
        }
    }

    this.checkAllDead = function(){
        for(let i = 0; i < this.population.length; i++){
            if(!this.population[i].isDead){
                return false;
            }
        }

        return true;
    }

    this.evaluate = function(){
        this.population.forEach(dino => {
            this.fitness += dino.score;
        });

        print('FITNESS: ', this.fitness);
    }

    this.getBest = function(){
        this.population.sort(function(a,b){
            if (a.score < b.score)
                return -1;
            if (a.score > b.score)
                return 1;
            return 0;
        });

        print('BEST: ', this.population[0]);
        this.lastFitness = this.population[0].score;
        this.bestFitness = this.lastFitness > this.bestFitness ? this.lastFitness : this.bestFitness;

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
        print("EVOLVE");
        let newPopulation = [];

        for(let i = 0; i < this.population.length; i++){
            let father = this.getBest();
            let mother = this.getFather();
            let children = father.crossOver(mother);
            let newDino = new Dino();
            
            newDino.cromossome = new Cromossome(children[0], children[1], children[2]);
            newDino.mutate(this.rateMutation);
            newPopulation.push(newDino);
        }

        print("NEW POPULATION: ", newPopulation);
        print("NEW POPULATION SIZE: ", newPopulation.length);

        this.population = newPopulation;
        this.generation++;
        this.start();
    }

}