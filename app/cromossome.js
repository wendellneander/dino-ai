function Cromossome(distance, height, speed){
    this.rateToDistance = distance ? distance : random(0, width);
    this.rateToHeight = height ? height : random(50, 130);
    this.rateToSpeed = speed ? speed : random(5, 10);
    this.bias = 8;

    this.sigmoid = function(x){
        return 1/(1+Math.exp(-x));
    }

    this.checkIfNeedJump = function(distance, height, speed){
        // DIRETAMENTE PROPORCIONAL
        let rateToJump = this.rateToDistance * this.rateToHeight * this.rateToSpeed;

        let newRateToJump = rateToJump / (distance * height * speed);

        let rate = this.sigmoid(newRateToJump/this.bias);

        //print(rateToJump, newRateToJump, rate)
        
        return rate > 0.6;
    }

    this.getCromossome = function(){
        return [this.rateToDistance, this.rateToHeight, this.rateToSpeed];
    }

    this.setCromossome = function(cromossome){
        this.rateToDistance = cromossome[0];
        this.rateToHeight = cromossome[1];
        this.rateToSpeed = cromossome[2];
    }
}