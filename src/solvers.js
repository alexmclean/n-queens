/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.BitBoard = function (n) {
  this.col = 0 << 1;
  this.left = 0 << 1;
  this.right = 0 << 1;
  this.n = n;
};

  }
};


window.BitBoard.prototype.convertToArray = function (shouldPrint) {
  var number;
  console.log('left: ');
  for(var l = 0; l < n; l++) {
    number = this.left >> (n - l);
    console.log(number & -number);
  }
  console.log('col: ');
  for(var c = 0; c < n; c++) {
    number = this.col >> (n - c);
    console.log(number & -number);
  }
  console.log('right: ');
  for(var r = 0; r < n; r++) {
    number = this.right >> (n - r);
    console.log(number & -number);
  }
};



window.findNRooksSolution = function(n) {
  var solution = new Board({'n' : n});
  
  var placeRooks = function(firstCol, lastRow){
    for(var j = lastRow; j < n; j++){
      for(var i = firstCol; i < n; i++){
        solution.togglePiece(j, i);
        if(solution.hasAnyRooksConflicts()){
          solution.togglePiece(j,i);
        } else {
          placeRooks(0, j+1);
          return;
        }        
      }
    }
  };

  placeRooks(0,0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var conflicts = new BitBoard(n); //fixme
  var count = 0;

  var allOnes = (1 << n) - 1; 
  var rookCounter = function(conf){
    if(conf.col === allOnes){
      count++;
    } else {

      var open = ~conf.coll;
      var next = open & -open; 

      for(var col = 0; col < n; col++){
        solution.togglePiece(level, col);
        if(!solution.hasAnyRooksConflicts()){
          rookCounter(level+1);  
        } 
        solution.togglePiece(level, col);
      }
    }
  };

  rookCounter(0);
  var solutionCount = count;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n' : n}); //fixme

  var queenPlacer = function(level){
    if(level === n){
      return !solution.hasAnyQueensConflicts();
    } else {
      for(var col = 0; col < n; col++){
        solution.togglePiece(level, col);
        if(!solution.hasAnyQueensConflicts()){
          if(queenPlacer(level+1)){
            return true;
          } else {
            solution.togglePiece(level, col);
          }
        } else {
          solution.togglePiece(level, col);
        }
      }
      return false;
    }
  };

  queenPlacer(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

window.getIthDigit = function(i, solution, n){
  var shifted = solution << (32 - (n-i)*3);
  var reshifted = shifted >>> 29;
  return reshifted; 
};

window.setQueenInRow = function(i, solution, desiredColumn, n){
  var ith = getIthDigit(i, solution, n);
  var preshifted = ith << (n-i-1)*3;
  var postShifted = solution - preshifted;
  var result = postShifted + (desiredColumn << (n-i-1)*3);
  return result;
};

window.checkAllConflictsInRow = function(rowIndex, n, solution){

};

var boardPrinter = function(solution){
    for(var i = 0; i < n; i++){
      console.log(solution.get(i).toString());
    }
    console.log("_____________");
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  /*
  var solution = new Board({'n' : n}); //fixme
  var count = 0;

  

  var queenCounter = function(level){
    if(level === n){
      //boardPrinter();
      count++;
    } else {
      for(var col = 0; col < n; col++){
        solution.togglePiece(level, col);
        if(!solution.hasAnyQueensConflicts()){
          queenCounter(level+1);  
        } 
        solution.togglePiece(level, col);
      }
    }
  };
*/
  var count = 0;
  var solution = _.range(0,n).map(function () { return 0 & 0; });
  
  var queenCounter = function(level){
    if(level === n){
      //boardPrinter();
      count++;
    } else {
      var row = solution.get(level)
      for(var col = 0; col < n; col++){
        row = toggleIthDigit(col);
        solution.set(level);
        if(!solution.hasAnyQueensConflicts()){

          queenCounter(level+1);  
        } 
        row = toggleIthDigit(col);
        solution.set(level);
      }
    }
  };

  queenCounter(0);
  var solutionCount = count;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
