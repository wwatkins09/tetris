const Well = require('./well.js');
const Tetrimino = require('./tetrimino.js');
const Alpha = require('./tetriminoes/alpha.js');
const Square = require('./tetriminoes/square.js');
const Pyramid = require('./tetriminoes/pyramid.js');
const Gamma = require('./tetriminoes/gamma.js');
const LeftSnake = require('./tetriminoes/left_snake.js');
const RightSnake = require('./tetriminoes/right_snake.js');
const Straight = require('./tetriminoes/straight.js');

class View {

  constructor() {
    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 800;
    canvasEl.width = 400;
    const ctx = canvasEl.getContext('2d');
    new Straight(ctx);
  }

}

module.exports = View;
