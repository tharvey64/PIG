
function PIG(playerName1, playerName2){
    this.player1 = new Player(playerName1);
    this.player2 = new Player(playerName2);
    this.notTurn = player2;
    this.turnScore = 0;
}



PIG.prototype.bankButton = function(player){
    //WAITING For Selection if bank
        player.bank(turnScore);
        this.notTurn = player;
        this.turnScore = 0;
}
PIG.prototype.rollButton = function(player){
    //WAITING For Selection if roll
        var die1 = this.roll();
        var die2 = this.roll();
        this.rollResult(die1, die2, player);
}

PIG.prototype.rollResult = (die1, die2, player){
    if (die1 == 1 && die2 ==1){
        player.playerScore = 0;
        this.notTurn = player;
    }else if(die1 == die2){
        // player must roll again
        this.turnScore += (die1 + die2)
    }else if(die1 == 1 || die2 == 1){
        this.turnScore = 0;
    }else{
        this.turnScore += (die1 + die2);
    }
}

PIG.prototype.roll = function(){
    return Math.ceil(Math.random()*6);
}
PIG.prototype.gameOver = function(){
    if(this.player1.playerScore > 99){}
    if(this.player2.playerScore > 99){}
}


function Player(name){
    this.name = name;
    this.playerScore = 0;
}

Player.prototype.bankScore = function(score){
    this.playerScore += score;
}

$(document).ready(function(){
    //Create form
    //Once player names are entered
    game = new PIG($('input=[name1]').val(), $('input=[name2]').val());


    $('#roll').on('click', function(){

    });
    $('#bank').on('click', function(){

    });
});
