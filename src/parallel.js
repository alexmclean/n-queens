//window.parallel = function (n) {
  if(window.Worker) {
    // if(n === 0){
    //   return 1;
    // }
    var now = new Date;
    console.log("in function");
    var n = 15;
    var w = 2;
    var count = 0;

    var worker1 = new window.Worker('src/worker.js');
    var worker2 = new window.Worker('src/worker.js');

    var worker1Vars = {'n': n, 'start': 0, 'end': Math.floor(n/w)};
    var worker2Vars = {'n': n, 'start': Math.floor(n/w), 'end': n};

    worker1.postMessage(worker1Vars);
    worker2.postMessage(worker2Vars);

    worker1.onmessage = function(e) {
      count += +(e.data);
      countCounter++;
      if(countCounter === 2) {
        console.log('solution: ' + count);
        console.log(new Date - now);
      }
    };
    
    worker2.onmessage = function(e) {
      count += +(e.data);
      countCounter++;
      if(countCounter === 2) {
        console.log('solution: ' + count);
        console.log(new Date - now);
      }
    };

    var countCounter = 0;

    count.onchange = function () {
      countCounter++;
      console.log("onchange: " + count);
      if(countCounter === 2) {
        //return count;
      }
    }

  }


//};
