const Tetrimino = require('../tetrimino.js');

class Alpha extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    this.y += 40;
    ctx.fillStyle = 'orange';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 120, 40);
    this.ctx.fillRect((this.x + 80), (this.y - 40), 40, 40);
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

}

module.exports = Alpha;
