const Tetrimino = require('../tetrimino.js');

class Gamma extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'blue';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 40, 40);
    this.ctx.fillRect((this.x), (this.y + 40), 120, 40)
    if (this.y === 720) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 280) {
      this.x += 40;
    }
  }

}

module.exports = Gamma;
