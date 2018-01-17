const Tetrimino = require('../tetrimino.js');

class Straight extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'cyan';
  }

  move() {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 160, 40);
    this.y = this.y + 1;
    this.ctx.fillRect((this.x * 40), (this.y * 40), 160, 40);
    if ((this.y * 40) === 760) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 1;
    }
  }

  moveRight() {
    if ((this.x * 40) < 240) {
      this.x += 1;
    }
  }

  canMove() {
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Straight;
