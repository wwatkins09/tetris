const Well = require('./well.js');
const Tetrimino = require('./tetrimino.js');

class View {

  constructor() {
    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 800;
    canvasEl.width = 400;
    const ctx = canvasEl.getContext('2d');
    new Tetrimino(ctx);
  }

}

module.exports = View;
