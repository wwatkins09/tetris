const Tetrimino = require('../tetrimino.js');

class Square extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'yellow';
  }

  move() {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 80, 80);
    this.y = this.y + 1;
    this.ctx.fillRect((this.x * 40), (this.y * 40), 80, 80);
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
    if ((this.x * 40) < 320) {
      this.x += 1;
    }
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Square;
