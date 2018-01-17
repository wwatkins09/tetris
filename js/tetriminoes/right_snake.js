const Tetrimino = require('../tetrimino.js');

class RightSnake extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    this.x += 40;
    ctx.fillStyle = 'green';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 80, 40);
    this.ctx.fillRect((this.x - 40), (this.y + 40), 80, 40)
    if (this.y === 720) {
      clearInterval(this.falling);
    }
  }

}

module.exports = RightSnake;
