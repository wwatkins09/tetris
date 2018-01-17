const Tetrimino = require('../tetrimino.js');

class Gamma extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'blue';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 1;
    this.ctx.fillRect((this.x * 40), (this.y * 40), 40, 40);
    this.ctx.fillRect((this.x * 40), ((this.y + 1) * 40), 120, 40)
    if ((this.y * 40) === 720) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 1;
    }
  }

  moveRight() {
    if ((this.x * 40) < 280) {
      this.x += 1;
    }
  }

}

module.exports = Gamma;
