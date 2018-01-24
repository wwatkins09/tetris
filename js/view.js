const Game = require('./game.js');

class View {

  constructor() {
    const canvasEl2 = document.getElementById('myCanvas2');
    const ctx2 = canvasEl2.getContext('2d');
    canvasEl2.width = 150;
    canvasEl2.height = 75;

    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 500;
    canvasEl.width = 250;
    const ctx = canvasEl.getContext('2d');
    const game = new Game(ctx, ctx2);
  }

}

module.exports = View;
