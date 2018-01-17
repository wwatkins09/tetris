const Tetrimino = require('../tetrimino.js');

class LeftSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'red';
  }

  move() {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.clearRect(((this.x + 1) * 40), ((this.y + 1) * 40), 80, 40)
    this.y = this.y + 1;
    this.ctx.fillRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.fillRect(((this.x + 1) * 40), ((this.y + 1) * 40), 80, 40)
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

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = LeftSnake;
