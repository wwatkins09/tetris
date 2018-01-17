const Tetrimino = require('../tetrimino.js');

class Straight extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'cyan';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 160, 40);
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 240) {
      this.x += 40;
    }
  }

}

module.exports = Straight;
