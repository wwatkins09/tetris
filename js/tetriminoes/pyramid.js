const Tetrimino = require('../tetrimino.js');

class Pyramid extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'magenta';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 1;
    this.ctx.fillRect((this.x * 40), (this.y * 40), 120, 40);
    this.ctx.fillRect(((this.x + 1) * 40), ((this.y - 1) * 40), 40, 40)
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
    console.log(this.y);
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }

  getBlocksBelow() {
    let result = [];
    this.well.blocks[this.y + 1].forEach((block) => {
      if (block.status === 'filled') {
        result.push(block);
      }
    });
    return result
  }

}

module.exports = Pyramid;
