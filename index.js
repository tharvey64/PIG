//List:
//Combine some of these fucking Prototypes
//Like roll button and roll
//Possibly expand game size to more than 2 players
//add Attributes to PIG: scoreToWin - #OfPlayers - #dieSides
//currently might have more comments than code

function PIG(playerName1, playerName2){
    this.player1 = new Player(playerName1);
    this.player2 = new Player(playerName2);
    // tracking turn using variables
    // easiest for 2 player game
    this.current = this.player1;
    this.next = this.player2;

    //could use array to track turn
    //would have to add attribute to player constructor
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
};//end of newRoller

PIG.prototype.bankButton = function(){
    //WAITING For Selection
        player.bank(turnScore);
        this.newRoller();
        this.turnScore = 0;
        return this.next;
};//end of bankButton

PIG.prototype.rollButton = function(){
    //WAITING For Selection
        var die1 = Math.ceil(Math.random()*6);
        var die2 = Math.ceil(Math.random()*6);

    if (die1 == 1 && die2 ==1){
        this.current.playerScore = 0;
        this.newRoller();
        return 0;
    }else if(die1 == 1 || die2 == 1){
        this.newRoller();
        return 1;
    }else if(die1 == die2){
        // player must roll again
        this.turnScore += (die1 + die2);
        return 2;
    }else{
        this.turnScore += (die1 + die2);
        return 3;
    }//end rollButton else if
}//end rollButton

// PIG.prototype.roll = function(){
//     return
// }//end roll w/ random num generator

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
    // additional attribute to track turn
    // this.turn = false;
}//end Player constructor

Player.prototype.bankScore = function(score){
    this.playerScore += score;
};


$(document).ready(function(){
    //Create form
    //Once player names are entered buttons should be activated

    game = new PIG($('input=[name1]').val(), $('input=[name2]').val());


    $('#roll').on('click', function(){
        var result = game.rollButton(game.current);
        //Insert images before switch statement.
        //Sets die images
        $('#die1').attr('src', toString(game.die1) + '.png');
        $('#die1').attr('src', toString(game.die2) + '.png');

        // Could also add window messages here
        // Could change the order of the cases
        // or the value returned to clean up switch statement.
        switch(result){
            case 0:
                // Update player score
                $('#' + game.next.name).text(game.next.playerScore)
                break;
            case 1:
                break;
            case 2:
                // Deactivate Bank Button
                break;
            case 3:
                break;
        }//end of roll button switch

        $('#turnScore').text(game.turnScore);
    });//end click rollButton

    $('#bank').on('click', function(){
        // use this line to update screen
        //I want to insert into the players score not name
        $('#' + game.current.name).text(game.bankButton(game.current).playerScore);

        //This refers to the score of the player who pressed the button
        // game.next.playerScore;

        $('#turnScore').text(game.turnScore);

        //-highlight the new player that is up
    });//end click bankButton

    //When someones turn ends we might want to inform the next player

});//end doc.ready
