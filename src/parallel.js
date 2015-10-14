//window.parallel = function (n) {
  if(window.Worker) {
    // if(n === 0){
    //   return 1;
    // }
    var now = new Date;
    console.log("in function");
    var n = 15;
    var w = 4;
    var count = 0;

    var workers = [];
    var inputs = [];

    var countCounter = 0;

    var onmessage = function(e) {
      count += +(e.data);
      countCounter++;
      if(countCounter === w) {
        console.log('solution: ' + count);
        console.log(new Date - now);
      }
    };

    var start = 0;
    var end = 0;

    for(var i = 0; i < w; i++) {
      workers.push(new window.Worker('src/worker.js'));
      workers[i].onmessage = onmessage;
      end = start + Math.floor(n/w);
      if(i === w-1) {
        end = n;
      }
      workers[i].postMessage({'n': n, 'start': start, 'end': end});
      start = end;
    }

  }


//};
