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
  var solution = new Board({'n' : n}); //fixme
  var count = 0;

  var rookCounter = function(level){
    if(level === n){
      count++;
    } else {
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

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({'n' : n}); //fixme
  var count = 0;

  var boardPrinter = function(){
    for(var i = 0; i < n; i++){
      console.log(solution.get(i).toString());
    }
    console.log("_____________")
  };

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

  queenCounter(0);
  var solutionCount = count;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
