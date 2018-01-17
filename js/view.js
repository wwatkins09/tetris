const Game = require('./game.js');

class View {

  constructor() {
    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 800;
    canvasEl.width = 400;
    const ctx = canvasEl.getContext('2d');
    const game = new Game(ctx);
  }

}

module.exports = View;
