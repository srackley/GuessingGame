function generateWinningNumber(){
return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr){
  var len = arr.length, swap, current;

  while (len) {
    current = Math.floor(Math.random() * len--);
    swap = arr[len];
    arr[len] = arr[current];
    arr[current] = swap;
  }
  return arr;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();

}

var invalid = 'That is an invalid guess.'

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
  }

Game.prototype.isLower = function() {
  return (this.playersGuess < this.winningNumber);
}

Game.prototype.playersGuessSubmission = function(num) {
  if (num.toString().match(/^[1-9][0-9]?$|^100$/)) {
    this.playersGuess = num;
    return this.checkGuess();
  } else {
    throw invalid;
  }
}

Game.prototype.checkGuess = function() {
  if (this.winningNumber === this.playersGuess){
    $('#title').text('You Win!');
    $('#sub').text('Click reset to play again.');
    $('#hint, #submit').prop("disabled", true);
  } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
    $('#sub').text('You have already guessed that number.');
  } else {
    this.pastGuesses.push(this.playersGuess);
    $('#guesses li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);
    if (this.pastGuesses.length >= 5) {
      $('#title').text('You Lose.');
      $('#sub').text('Click reset to try your luck again.');
      $('#hint, #submit').prop("disabled", true);
    } else {
      if (this.isLower()) {
        $('#sub').text('Guess Higher!');
      } else {
        $('#sub').text('Guess Lower!');
      }
     if (this.difference() < 10) return "You're burning up!";
     else if (this.difference() < 25) return "You're lukewarm.";
     else if (this.difference() < 50) return "You're a bit chilly.";
    else return "You're ice cold!";
    }
  }
}

function newGame(){
 return new Game();
}

Game.prototype.provideHint = function(){
  var arr = [];
  arr.push(generateWinningNumber(), this.winningNumber, generateWinningNumber());
  var hints = shuffle(arr);
  $('#title').text('The winning number is ' + hints[0] + ", " + hints[1] + ", or " + hints[2]);
}

function makeAGuess(game){
  var guess = $('#player-input').val();
  $('#player-input').val("");
  var output = game.playersGuessSubmission(parseInt(guess, 10));
  $('#title').text(output);
}

$(document).ready(function() {
  var game = newGame();
          $('#hint').click(function(){
            game.provideHint();
          });

          $('#reset').click(function(){
            game = newGame();
            $('#title').text("Play the Guessing Game!");
            $('#sub').text("Guess a number between 1-100!");
            $('.guess').text('-');
            $('#hint, #go').prop("disabled", false);
          })

          $('#go').click(function(e) {
            makeAGuess(game);
          });

          $('#player-input').keypress(function(event){
              if (event.which == 13) {
                makeAGuess(game);
              }
          });



      });

