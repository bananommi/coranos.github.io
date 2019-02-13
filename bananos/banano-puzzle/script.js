window.onload = function() {

  // 0 empty space
  // 1 square
  // 2 Top Left
  // 3 Top Right
  // 4 Bottom Left
  // 5 Bottom Right

  // 2 2 3 3
  // 2 1 1 3
  // 4 1 1 5
  // 4 4 5 5
  // 0 0 0 0
  // 0 0 0 0

  var counter = document.getElementById('counter');
  var path = document.getElementById('path');
  var pathString = "";

  var count = -1;

  function countUp() {
    count = count + 1;
    counter.innerHTML = "Counter: " + count;
    path.value = pathString;
  }

  var state = new Array(6);
  var colors = [
    'white',
    'black',
    'red',
    'green',
    'blue',
    'yellow'
  ]

  function init() {
    count = -1;
    pathString = "";
    done = false;

    for (var i = 0; i < state.length; i++) {
      state[i] = new Array(4).fill(0);
    }

    state[0][0] = 2;
    state[0][1] = 2;
    state[0][2] = 3;
    state[0][3] = 3;

    state[1][0] = 2;
    state[1][1] = 1;
    state[1][2] = 1;
    state[1][3] = 3;

    state[2][0] = 4;
    state[2][1] = 1;
    state[2][2] = 1;
    state[2][3] = 5;

    state[3][0] = 4;
    state[3][1] = 4;
    state[3][2] = 5;
    state[3][3] = 5;

    newc();
  }

  function finished() {

    if (!(state[0][0] == 2 && state[0][1] == 2 && state[0][2] == 3 && state[0][3] == 3)) {
      return false
    }

    if (!(state[1][0] == 2 && state[1][1] == 0 && state[1][2] == 0 && state[1][3] == 3)) {
      return false
    }

    if (!(state[2][0] == 4 && state[2][1] == 0 && state[2][2] == 0 && state[2][3] == 5)) {
      return false
    }

    if (!(state[3][0] == 4 && state[3][1] == 4 && state[3][2] == 5 && state[3][3] == 5)) {
      return false
    }

    if (!(state[4][0] == 0 && state[4][1] == 1 && state[4][2] == 1 && state[4][3] == 0)) {
      return false
    }

    //console.log((state[5][0] == 0 && state[5][1] == 1 && state[5][2] == 1 && state[5][3] == 0));
    if (!(state[5][0] == 0 && state[5][1] == 1 && state[5][2] == 1 && state[5][3] == 0)) {
      return false
    }

    return true;
  }

  var canvas = document.getElementById("canvas");
  var canvasback = document.getElementById("canvas-back");
  canvas.width = 400;
  canvas.height = 600;
  canvasback.width = 400;
  canvasback.height = 600;

  var ctx = canvas.getContext("2d");
  var ctxback = canvasback.getContext("2d");

  ctxback.beginPath();
  ctxback.moveTo(0, 0);
  ctxback.lineTo(0, canvas.height);
  ctxback.lineTo(canvas.width, canvas.height);
  ctxback.lineTo(canvas.width, 0);
  ctxback.lineTo(300, 0);
  ctxback.lineTo(300, canvas.height);
  ctxback.lineTo(200, canvas.height);
  ctxback.lineTo(200, 0);
  ctxback.lineTo(100, 0);
  ctxback.lineTo(100, canvas.height);
  ctxback.moveTo(0, 100);
  ctxback.lineTo(400, 100);
  ctxback.moveTo(0, 200);
  ctxback.lineTo(400, 200);
  ctxback.moveTo(0, 300);
  ctxback.lineTo(400, 300);
  ctxback.moveTo(0, 400);
  ctxback.lineTo(400, 400);
  ctxback.moveTo(0, 500);
  ctxback.lineTo(400, 500);
  ctxback.moveTo(0, 600);
  ctxback.lineTo(400, 600);
  ctxback.stroke();

  init();

  // re-drawing
  var done = false;

  function newc() {
    if (!done) {
      countUp();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < state.length; i++) {
        for (var j = 0; j < state[i].length; j++) {
          var corx = j;
          var cory = i;
          var v = state[i][j];
          if (v != 0) {
            ctx.fillStyle = colors[v];
            ctx.fillRect((corx * 100), (cory * 100), 100, 100);
            ctx.stroke();
          }
        }
      }

      if (finished()) {
        alert("You made it! If you are confident with your solution, hit the COPY SOLUTION button and sent it to not_idol#5004");
        done = true;
      }
    }
  }

  function findNumber(v) {
    for (var i = 0; i < state.length; i++) {
      for (var j = 0; j < state[i].length; j++) {
        if (state[i][j] == v) {
          var x = j;
          var y = i;
          return {
            x: x,
            y: y
          };
        }
      }
    }
  }

  function isFree(a, b) {
    if (a >= 6 || b >= 4 || a < 0 || b < 0) {
      return false;
    }
    return (state[a][b] == 0);
  }

  document.getElementById("reset").addEventListener("click", function() {
    init();
  }, false)

  // DOWN MOVEMENT
  var buttonsDown = document.getElementsByClassName('down');
  for (var i = 0; i < buttonsDown.length; i++) {
    buttonsDown[i].addEventListener("click", function() {
      var type = this.id;

      if (type == "down1") {
        var x = findNumber(1).x;
        var y = findNumber(1).y;

        if (isFree(y + 2, x) && isFree(y + 2, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y + 1][x] = 1;
          state[y + 1 + 1][x] = 1;
          state[y + 1 + 1][x + 1] = 1;
          state[y + 1][x + 1] = 1;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "down2") {
        var x = findNumber(2).x;
        var y = findNumber(2).y;

        if (isFree(y + 2, x) && isFree(y + 1, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y][x + 1] = 0;

          state[y + 1][x] = 2;
          state[y + 1][x + 1] = 2;
          state[y + 2][x] = 2;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "down3") {
        var x = findNumber(3).x;
        var y = findNumber(3).y;

        if (isFree(y + 1, x) && isFree(y + 2, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y + 1][x] = 3;
          state[y + 1][x + 1] = 3;
          state[y + 2][x + 1] = 3;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "down4") {
        var x = findNumber(4).x;
        var y = findNumber(4).y;

        if (isFree(y + 2, x) && isFree(y + 2, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;

          state[y + 1][x] = 4;
          state[y + 1 + 1][x] = 4;
          state[y + 1 + 1][x + 1] = 4;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "down5") {
        var x = findNumber(5).x;
        var y = findNumber(5).y;

        if (isFree(y + 2, x) && isFree(y + 2, x - 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x - 1] = 0;

          state[y + 1][x] = 5;
          state[y + 1 + 1][x] = 5;
          state[y + 1 + 1][x - 1] = 5;
          pathString = pathString + type + " ";
          newc();
        }
      }

    }, false);
  }


  // UP MOVEMENT
  var buttonsUp = document.getElementsByClassName('up');
  for (var i = 0; i < buttonsUp.length; i++) {
    buttonsUp[i].addEventListener("click", function() {
      var type = this.id;

      if (type == "up1") {
        var x = findNumber(1).x;
        var y = findNumber(1).y;

        if (isFree(y - 1, x) && isFree(y - 1, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y - 1][x] = 1;
          state[y - 1][x + 1] = 1;
          state[y][x] = 1;
          state[y][x + 1] = 1;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "up2") {
        var x = findNumber(2).x;
        var y = findNumber(2).y;

        if (isFree(y - 1, x) && isFree(y - 1, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y][x + 1] = 0;

          state[y][x] = 2;
          state[y - 1][x] = 2;
          state[y - 1][x + 1] = 2;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "up3") {
        var x = findNumber(3).x;
        var y = findNumber(3).y;

        if (isFree(y - 1, x) && isFree(y - 1, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y - 1][x] = 3;
          state[y - 1][x + 1] = 3;
          state[y][x + 1] = 3;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "up4") {
        var x = findNumber(4).x;
        var y = findNumber(4).y;

        if (isFree(y - 1, x) && isFree(y, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;

          state[y][x] = 4;
          state[y - 1][x] = 4;
          state[y][x + 1] = 4;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "up5") {
        var x = findNumber(5).x;
        var y = findNumber(5).y;

        if (isFree(y - 1, x) && isFree(y, x - 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x - 1] = 0;

          state[y][x] = 5;
          state[y - 1][x] = 5;
          state[y][x - 1] = 5;
          pathString = pathString + type + " ";
          newc();
        }
      }

    }, false);
  }


  // Right MOVEMENT
  var buttonsRight = document.getElementsByClassName('right');
  for (var i = 0; i < buttonsRight.length; i++) {
    buttonsRight[i].addEventListener("click", function() {
      var type = this.id;

      if (type == "right1") {
        var x = findNumber(1).x;
        var y = findNumber(1).y;

        if (isFree(y, x + 2) && isFree(y + 1, x + 2)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y][x + 1] = 1;
          state[y + 1][x + 1] = 1;
          state[y][x + 2] = 1;
          state[y + 1][x + 2] = 1;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "right2") {
        var x = findNumber(2).x;
        var y = findNumber(2).y;

        if (isFree(y, x + 2) && isFree(y + 1, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y][x + 1] = 0;

          state[y][x + 1] = 2;
          state[y][x + 2] = 2;
          state[y + 1][x + 1] = 2;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "right3") {
        var x = findNumber(3).x;
        var y = findNumber(3).y;

        if (isFree(y, x + 2) && isFree(y + 1, x + 2)) {
          state[y][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y][x + 1] = 3;
          state[y][x + 2] = 3;
          state[y + 1][x + 2] = 3;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "right4") {
        var x = findNumber(4).x;
        var y = findNumber(4).y;

        if (isFree(y, x + 1) && isFree(y + 1, x + 2)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;

          state[y][x + 1] = 4;
          state[y + 1][x + 1] = 4;
          state[y + 1][x + 2] = 4;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "right5") {
        var x = findNumber(5).x;
        var y = findNumber(5).y;

        if (isFree(y, x + 1) && isFree(y + 1, x + 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x - 1] = 0;

          state[y][x + 1] = 5;
          state[y + 1][x + 1] = 5;
          state[y + 1][x] = 5;
          pathString = pathString + type + " ";
          newc();
        }
      }

    }, false);
  }

  // Right MOVEMENT
  var buttonsLeft = document.getElementsByClassName('left');
  for (var i = 0; i < buttonsLeft.length; i++) {
    buttonsLeft[i].addEventListener("click", function() {
      var type = this.id;

      if (type == "left1") {
        var x = findNumber(1).x;
        var y = findNumber(1).y;

        if (isFree(y, x - 1) && isFree(y + 1, x - 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y][x] = 1;
          state[y + 1][x] = 1;
          state[y][x - 1] = 1;
          state[y + 1][x - 1] = 1;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "left2") {
        var x = findNumber(2).x;
        var y = findNumber(2).y;

        if (isFree(y, x - 1) && isFree(y + 1, x - 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y][x + 1] = 0;

          state[y][x] = 2;
          state[y][x - 1] = 2;
          state[y + 1][x - 1] = 2;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "left3") {
        var x = findNumber(3).x;
        var y = findNumber(3).y;

        if (isFree(y, x - 1) && isFree(y + 1, x)) {
          state[y][x] = 0;
          state[y + 1][x + 1] = 0;
          state[y][x + 1] = 0;

          state[y][x - 1] = 3;
          state[y][x] = 3;
          state[y + 1][x] = 3;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "left4") {
        var x = findNumber(4).x;
        var y = findNumber(4).y;

        if (isFree(y, x - 1) && isFree(y + 1, x - 1)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x + 1] = 0;

          state[y][x - 1] = 4;
          state[y + 1][x - 1] = 4;
          state[y + 1][x] = 4;
          pathString = pathString + type + " ";
          newc();
        }
      }

      if (type == "left5") {
        var x = findNumber(5).x;
        var y = findNumber(5).y;

        if (isFree(y, x - 1) && isFree(y + 1, x - 2)) {
          state[y][x] = 0;
          state[y + 1][x] = 0;
          state[y + 1][x - 1] = 0;

          state[y][x - 1] = 5;
          state[y + 1][x - 1] = 5;
          state[y + 1][x - 2] = 5;
          pathString = pathString + type + " ";
          newc();
        }
      }

    }, false);
  }

  const moveButtons = [
    'up', 'left', 'down', 'right'
  ];

  const moveColors = ['1', '2', '3', '4',
    '5'
  ];
  /*
  const moveButtons = [
    'up', 'down'
  ];

  const moveColors = ['4'];
  */

  const moves = [];
  moveButtons.forEach((button) => {
    moveColors.forEach((color) => {
      const move = button + color;
      moves.push(move);
    });
  });

  document.getElementById('copy').addEventListener("click", function() {
    /* Get the text field */
    var copyText = path;
    copyText.value = copyText.value + " counter " + count;

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the solution! Send it to not_idol#5004");
  }, false)

  document.getElementById('solve').addEventListener('click', function() {
    const solutionTa = document.getElementById('solution');

    // alert('solve');
    const moves = solutionTa.value.split(new RegExp('\\s+'));
    // alert(`moves ${moves}`);
    // console.log('moves', moves);

    moves.forEach((move) => {
      if (move != '') {
        const elt = document.getElementById(move);
        // console.log('move, elt', move, elt);
        if (elt) {
          const oldState = JSON.stringify(state);
          elt.click();
          const newState = JSON.stringify(state);
          const stateChanged = oldState != newState;
          console.log('move', move, 'stateChanged', stateChanged);
        }
      }
    });

  }, false)

  const maxMoves = 80;

  const saveInvalidState = false;

  const validPaths = [];
  validPaths.push([]);

  const visitedStates = new Set();

  let intervalId;

  console.log('moves.length', moves.length);

  const clickReset = () => {
    const elt = document.getElementById('reset');
    elt.click();
  }

  const appendToPath = (validPath, newMove) => {
    const newPath = [];
    validPath.forEach((move) => {
      newPath.push(move);
    });
    newPath.push(newMove);
    return newPath;
  }

  const solveNextStep = () => {
    let foundFinish = false;
    const nextValidPaths = [];
    const invalidPathStatus = {};
    const validPathStatus = {};

    validPaths.forEach((validPath) => {
      moves.forEach((move) => {
        clickReset();

        validPath.forEach((prevMove) => {
          const elt = document.getElementById(prevMove);
          // console.log('move, elt', move, elt);
          if (elt) {
            elt.click();
          }
        });

        const oldState = JSON.stringify(state);
        const elt = document.getElementById(move);
        elt.click();
        const newState = JSON.stringify(state);

        let status;
        let invalidPath = true;
        if (finished()) {
          status = 'finished';
          foundFinish = true;
          invalidPath = false;
        } else if (visitedStates.has(newState)) {
          status = 'loopBack';
        } else {
          const stateChanged = oldState != newState;
          if (stateChanged) {
            status = 'stateChanged';
            invalidPath = false;
          } else {
            status = 'blocked';
          }
        }
        if (invalidPath) {
          if (saveInvalidState) {
            const newPath = appendToPath(validPath, move);
            invalidPathStatus[newPath] = status;
          }
        } else {
          const newPath = appendToPath(validPath, move);
          if (saveInvalidState) {
            validPathStatus[newPath] = status + oldState + ' ' + newState;
          } else {
            validPathStatus[newPath] = status;
          }
          nextValidPaths.push(newPath);
          visitedStates.add(newState);
        }
      });
    });
    validPaths.length = 0;
    nextValidPaths.forEach((path) => {
      validPaths.push(path);
    });
    if (foundFinish) {
      clearInterval(intervalId);
    }
    const solutionTa = document.getElementById('solution');
    solutionTa.value = 'found finish:' + foundFinish + '\n';
    solutionTa.value += 'valid paths:' + validPaths.length + '\n';

    validPaths.forEach((validPath) => {
      solutionTa.value += validPath.length;
      solutionTa.value += ' ';
      solutionTa.value += validPath;
      const status = validPathStatus[validPath];
      solutionTa.value += ' ';
      solutionTa.value += status;
      solutionTa.value += '\n';
    });
    Object.keys(invalidPathStatus).forEach((invalidPath) => {
      const status = invalidPathStatus[invalidPath];
      solutionTa.value += status;
      solutionTa.value += ' ';
      solutionTa.value += invalidPath;
      solutionTa.value += '\n';
    });
  }

  document.getElementById('solve-random').addEventListener('click', function() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(solveNextStep, 1000);
  }, false)

  document.getElementById('stop-solve-random').addEventListener('click', function() {
    clearInterval(intervalId);
  }, false)

}
