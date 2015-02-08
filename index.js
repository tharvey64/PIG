
//Possibly expand game size to more than 2 players
//add Attributes to PIG: scoreToWin - #OfPlayers - #dieSides


function PIG(p1, p2){
    this.player1 = new Player(p1);
    this.player2 = new Player(p2);
    this.die1 = 0;
    this.die2 = 0;
    this.current = this.player1;
    this.next = this.player2;
    //could use array to track turn
    //this.plyr = [player1, player2];
    this.turnScore = 0;

}

// traking turn using prototype and player attribute.
// probably the way to go if you have more people
// IF Created this should be passed this.plyr
// The first index holding the current Player
//   Current Player = this.plyr[0]
// When the turn is changed POP the first Player
// and append them to the end of the Array
//
// PIG.prototype.roller = function(){
//      var temp = this.plyr.pop(0);
//      this.plyr.append(temp);
// }

PIG.prototype.newRoller = function(){
    var temp = this.current;
    this.current = this.next;
    this.next = temp;
    this.turnScore = 0;
}//end of newRoller

PIG.prototype.bankButton = function(){
    //WAITING For Selection
        this.current.bankScore(this.turnScore);
        this.newRoller();
        this.turnScore = 0;
        return this.next;
}//end of bankButton

PIG.prototype.rollButton = function(){
    //WAITING For Selection
        this.die1 = Math.ceil(Math.random()*6);
        this.die2 = Math.ceil(Math.random()*6);

    if (this.die1 == 1 && this.die2 ==1){
        this.current.playerScore = 0;
        this.newRoller();
        return 0;
    }else if(this.die1 == 1 || this.die2 == 1){
        this.newRoller();
        return 1;
    }else if(this.die1 == this.die2){
        // player must roll again
        this.turnScore += (this.die1 + this.die2);
        return 2;
    }else{
        this.turnScore += (this.die1 + this.die2);
        return 3;
    }//end rollButton else if
};//end rollButton

// Name pending
// PIG.prototype.currentData = function(){
// Some function that prints/contains all the games live information
// This function should gather the PIG instance's attribute values
//
// Consider storing the game data in a dictionary
// }

//Holds conditions for Victory so consider name revision
//Soon to be PIG.victory() or PIG.victor()
// PIG.prototype.gameOver = function(){
//     if(this.player1.playerScore > 99){}
//     if(this.player2.playerScore > 99){}
// }//end gameOver



function Player(name){
    this.name = name;
    this.playerScore = 0;
}//end Player constructor

Player.prototype.bankScore = function(score){
    this.playerScore += score;
};



$(document).ready(function(){
    //Create form
    //Once player names are entered buttons should be activated

    // game = new PIG($('input=[name1]').val(), $('input=[name2]').val());
    game = new PIG("player1", "player2");

    $('#roll').on('click', function(){
        var result = game.rollButton(game.current);
        //Insert images before switch statement.
        //Sets die images

        // Could also add window messages here
        // Could change the order of the cases
        // or the value returned to clean up switch statement.
        $('#bank').prop('disabled', false);
        switch(result){
            case 0:
                // Update player score
                var resetScore = game.next.playerScore
                $('#' + String(game.next.name) + 'Score' + ' p').html(String(resetScore))
                break;
            case 1:
                break;
            case 2:
                $('#bank').prop('disabled', true)
                break;
            case 3:
                break;
        }//end of roll button switch

        $('#turnScore').html(String(game.turnScore));
        $('#dieImg1').attr('src','images/' + String(game.die1) + '.png');
        $('#dieImg2').attr('src','images/' + String(game.die2) + '.png');
    });//end click rollButton

    $('#bank').on('click', function(){
        // use this line to update screen
        //I want to insert into the players score not name
        var scoreUpdate = game.bankButton(game.current).playerScore;
        $('#' + String(game.next.name) + 'Score' + ' p').text(String(scoreUpdate));

        $('#turnScore').text(String(game.turnScore));

        //-highlight the new player that is up
    });//end click bankButton

    //When someones turn ends we might want to inform the next player

});//end doc.ready
