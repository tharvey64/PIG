function Player(name) {
    this.name = name
    this.score = 0
    this.promptName = prompt("Enter your name: ")
}
//havin issues with prompt  - name showing up in current player etc.

    Player.prototype.bankCurrent = function(score){
        this.score += score
    }

function Pig(pOne, pTwo) {
    this.die1 = 0;
    this.die2 = 0;
    this.player1 = new Player(pOne);
    this.player2 = new Player(pTwo);
    this.current = this.player1;
    this.next = this.player2;
    this.turnScore = 0;
}

    Pig.prototype.nextTurn = function(){
        var temp = this.current;
        this.current = this.next;
        this.next = temp;
        this.turnScore = 0;
    }

    Pig.prototype.toBank = function(){
        this.current.bankCurrent(this.turnScore);
        this.nextTurn();
        this.turnScore = 0;
        return this.next;
    }
    Pig.prototype.roll = function(){
        this.die1 = Math.ceil(Math.random()*6);
        this.die2 = Math.ceil(Math.random()*6);

        if (this.die1 === 1 && this.die2 === 1){
            this.current.score = 0;
            this.nextTurn();
            return 0;
        }else if(this.die1 === 1 || this.die2 === 1){
            this.nextTurn();
            return 1;
        }else if(this.die1 === this.die2){
            this.turnScore += (this.die1 + this.die2);
            return 2;
        }else{
            this.turnScore += (this.die1 + this.die2);
            return 3;
        }
    };

    Pig.prototype.gameOver = function(){
        if(this.player1.score > 99){
            return this.player2.promptName;
        }else if(this.player2.score > 99){
            return this.player2.promptName;
        };
    };
    //still needs to end the game, which doesn't happen at this time..

$(document).ready(function(){
    var game = new Pig("player1", "player2");
    $('#roll').on('click', function(){
        var result = game.roll(game.current);
        $('#bank').prop('disabled', false);
        switch(result){
            case 0:
                var piggedOut = game.next.score
                $('#' + String(game.next.name) + 'Score' + ' p').html(String(piggedOut))
                break;
            case 1:
                break;
            case 2:
                $('#bank').prop('disabled', true)
                break;
            case 3:
                break;
        }
        $('#turnScore').html(String(game.turnScore));
        $('#dieImg1').attr('src','images/' + String(game.die1) + '.png');
        $('#dieImg2').attr('src','images/' + String(game.die2) + '.png');

        $('#bank').on('click', function(){
            var banking = game.toBank(game.current).score;
            $('#' + String(game.next.name) + 'score' + ' p').text(String(banking));
            $('#turnScore').text(String(game.turnScore));
        });
    });
});
