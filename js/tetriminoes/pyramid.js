const Tetrimino = require('../tetrimino.js');

class Pyramid extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'magenta';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 120, 40);
    this.ctx.fillRect((this.x + 40), (this.y - 40), 40, 40)
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

}

module.exports = Pyramid;
