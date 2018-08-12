function Cromossome(distance, height, speed){
    this.rateToDistance = distance ? distance : random(0, width);
    this.rateToHeight = height ? height : random(50, 130);
    this.rateToSpeed = speed ? speed : random(5, 10);

    this.checkIfNeedJump = function(distance, height, speed){
        let distanceToJump = int((this.rateToDistance * speed * this.rateToHeight) / (this.rateToSpeed * height));

        return distance == distanceToJump;
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