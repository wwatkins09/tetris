const Tetrimino = require('../tetrimino.js');

class Square extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'yellow';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 80, 80);
    if (this.y === 720) {
      clearInterval(this.falling);
    }
  }

}

module.exports = Square;
