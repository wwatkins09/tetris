const Tetrimino = require('../tetrimino.js');

class Alpha extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.y += 1;
    ctx.fillStyle = 'orange';
  }

  move() {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 120, 40);
    this.ctx.clearRect(((this.x + 2) * 40), ((this.y - 1) * 40), 40, 40);    this.y = this.y + 1;
    this.ctx.fillRect((this.x * 40), (this.y * 40), 120, 40);
    this.ctx.fillRect(((this.x + 2) * 40), ((this.y - 1) * 40), 40, 40);
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
    if ((this.x * 40) < 280) {
      this.x += 1;
    }
  }

  canMove() {
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Alpha;
