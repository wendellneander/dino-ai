function Gene(){
    this.input;
    this.weight;
    this.bias = Math.random() * .2 - .1;
    this.output;
    
    this.activate = function(x){
        this.output = 1 / (1 + Math.exp(-x));

        return this.output;
    }
}
