/*
***
*** TURTLE PATCH                                            ***
*** @author: hd                                             ***
*** @description: synchronize animation in original script  ***
*** @dependency: ./js/vendor/turtle.js                      ***
*** @date: 01/05/2018                                       ***
*** @license: MIT                                           ***
***
*/


var _queue = [];
var _speed = 2;

// private helper
function _animate(f, args) {
  if (args[0] == null || args.length == 2) {
    _queue.push([f, args]);
    return;
  }

  while (args[0] >= _speed) {
    _queue.push([f, [_speed]]);
    args[0] -= _speed;
  }

  if (args[0] > 0 || typeof(args[0]) !== "number") {
    _queue.push([f, [args[0]]]);
  }
}

function _process_queue(timestamp) {
  var event;

  if (_queue.length > 0) {
    event = _queue.shift();

    // execute each method in the queue
    // depending on the number of arguments
    if (event[1].length == 1) {
      event[0](event[1][0]);    // case f(x)
    }
    else if (event[1].length == 2) {
      event[0](event[1][0], event[1][1]);  //case f(x,y);
    }
  }

  requestAnimationFrame(_process_queue);
}

function _tinit() {
  treset();
  twrap(false);
  requestAnimationFrame(_process_queue);
}

///////////////////////////////////////
///////  PROTECTED API          //////
/////////////////////////////////////

function emptyQ() {
  _queue.length = 0;
}

///////////////////////////////////////////////////////////////////
//////////////       PUBLIC API                 //////////////////
/////////////////////////////////////////////////////////////////

// auto call
_tinit();

function tspeed(s = null) {
  if (s == null) {
    return _speed;
  } else {
    _speed = s;
  }
}

function tleft(degree) {
  _animate(left, [degree]);
}

function tright(degree) {
  _animate(right, [degree]);
}

function tforward(distance) {
  _animate(forward, [distance]);
}

function treset() {
  _animate(reset, [null]);
}

function tclear() {
  _animate(clear, [null]);
}

function thide() {
  _animate(hideTurtle, [null]);
}

function tshow() {
  _animate(showTurtle, [null]);
}

function tgoto(x, y) {
  _animate(goto, [x, y]);
}

function twrite(s) {
  _animate(write, [s]);
}

function twrap(b) {
  _animate(wrap, [b]);
}

function tpenup() {
  _animate(penup, [null]);
}

function tpendown() {
  _animate(pendown, [null]);
}

function tcsize() {
  return [imageCanvas.width, imageCanvas.height];
}

function tpos(obj) {
  _animate(_getpos, [obj]);
}

function _getpos(obj) {
  obj.x = turtle.pos.x;
  obj.y = turtle.pos.y;
}

function theading(obj) {
  _animate(_getheading, [obj]);

  function _getheading(obj) {
    obj.angle = radToDeg(turtle.angle);
  }
}

function tsetpos(obj) {
  _animate(_setpos, [obj]);

  function _setpos(obj) {
    goto(obj.x, obj.y);
  }

}

function tsetheading(obj) {
  _animate(_setheading, [obj]);

  function _setheading(obj) {
    turtle.angle = degToRad(obj.angle);
    draw();
  }
}

function tlog(obj) {
  _animate(console.log, [obj]);
}
