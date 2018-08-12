function Cromossome(distance, myHeight, speed){
    this.rateToDistance = distance || random(0, width);
    this.rateToHeight = myHeight || random(50, 130);
    this.rateToSpeed = speed || random(5, 10);
    this.bias = 8;

    this.sigmoid = function(x){
        return 1/(1+Math.exp(-x));
    }

    this.checkIfNeedJump = function(distance, myHeight, speed){

        // DIRETAMENTE PROPORCIONAL
        let rateToJump = this.rateToDistance * this.rateToHeight * this.rateToSpeed;

        let newRateToJump = rateToJump / (distance * myHeight * speed);

        let rate = this.sigmoid(newRateToJump / this.bias);

        return rate > 0.6;

        /** INVERSAMENTE PROPORCIONAL */
        /*let distanceToJump = int((this.rateToDistance * speed * this.rateToHeight) / (this.rateToSpeed * height));

        return distance == distanceToJump;*/
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