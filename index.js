//List:
//Combine some of these fucking Prototypes
//Like roll button and roll
//Possibly expand game size to more than 2 players
//add Attributes to PIG: scoreToWin - #OfPlayers - #dieSides
//currently might have more comments than code
//Stop writing comments

function PIG(playerName1, playerName2){
    this.player1 = new Player(playerName1);
    this.player2 = new Player(playerName2);
    // tracking turn using variables
    // easiest for 2 player game
    this.current = this.player1;
    this.next = this.player2
    //notTurn isn't functional
    this.notTurn = player2
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
}//end of newRoller

PIG.prototype.bankButton = function(){
    //WAITING For Selection
        player.bank(turnScore);
        this.newRoller();
        this.turnScore = 0;
}//end of bankButton

PIG.prototype.rollButton = function(){
    //WAITING For Selection
        var die1 = this.roll();
        var die2 = this.roll();
        this.rollResult(die1, die2);
}//end of rollButton
// Might Be Able to Merge rollButton and rollResult
// But it looks very neat this way

PIG.prototype.rollResult = (die1, die2){
    if (die1 == 1 && die2 ==1){
        player.playerScore = 0;
        this.newRoller();
    }else if(die1 == die2){
        // player must roll again
        this.turnScore += (die1 + die2)
    }else if(die1 == 1 || die2 == 1){
        this.turnScore = 0;
        this.newRoller();
    }else{
        this.turnScore += (die1 + die2);
    }
}//end rollResult

PIG.prototype.roll = function(){
    return Math.ceil(Math.random()*6);
}//end roll w/ random num generator

//Holds conditions for Victory so consider name revision
//Soon to be PIG.victory() or PIG.victor()
PIG.prototype.gameOver = function(){
    if(this.player1.playerScore > 99){}
    if(this.player2.playerScore > 99){}
}//end gameOver


function Player(name){
    this.name = name;
    this.playerScore = 0;
    // additional attribute to track turn
    // this.turn = false;
}//end Player constructor

Player.prototype.bankScore = function(score){
    this.playerScore += score;
}


$(document).ready(function(){
    //Create form
    //Once player names are entered buttons should be activated

    game = new PIG($('input=[name1]').val(), $('input=[name2]').val());


    $('#roll').on('click', function(){
        // FIX roller() function-Done
        game.rollButton(game.current);
        // insert both pngs of result
        // Also something in here should deactivate the bank Button
        // if the player rolls doubles greater than 1
    });//end click rollButton

    // Maybe create a printGame method to print all
    // the current data about the game
    // Could print it to a dict and use keys to mark things to update
    // in html
    // some type of print will give jquery access to the games live data.

    $('#bank').on('click', function(){
        game.bankButton(game.current);
        //-increment current players score on html
        //-highlight the new player that is up
    });//end click bankButton

    //When someones turn ends we might want to inform the next player

});//end doc.ready
