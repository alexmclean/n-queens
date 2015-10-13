 onmessage = function(e) {
  var n = e.data['n'];
  var start = e.data['start'];
  var end = e.data['end'];
  
  var count = 0;

  var allOnes = (1 << n) - 1; 

  var firstOpen = ((1 << (end - start)) - 1) << start;

  var next;

var queenCounter = function(left, col, right){
    if(col === allOnes){
      count++;
    } else {
      var open = (~(left | col | right)) & allOnes;
      var next;
      while(open) {
        next = open & -open;

        queenCounter((left|next)<<1, (col|next), (right|next)>>1);

        open = open & (~next);
      }
    }
  };

  while (firstOpen) {
    next = firstOpen & -firstOpen;

    queenCounter((next)<<1, (next), (next)>>1);

    firstOpen = firstOpen & (~next);
  }

  //queenCounter(0, 0, 0);
  var solution = [count];
  // solution['count'] = count;
  postMessage(solution);
};
