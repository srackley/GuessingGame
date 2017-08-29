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
    return 'You Win!'
  } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
    return 'You have already guessed that number.'
  } else {
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length >= 5) {
      return 'You Lose.';
    } else if (this.difference() < 10) {
      return "You're burning up!";
    } else if (this.difference() < 25) {
      return "You're lukewarm.";
    } else if (this.difference() < 50) {
      return "You're a bit chilly.";
    } else {
      return "You're ice cold!";
    }
  }
}

function newGame(){
 return new Game();
}

Game.prototype.provideHint = function(){
  var arr = [];
  arr.push(generateWinningNumber(), this.winningNumber, generateWinningNumber());

  return shuffle(arr);
}


$(document).ready(function() {

          $("#go").click(function(e) {
             console.log('Submit button has been clicked')
          })


      });
