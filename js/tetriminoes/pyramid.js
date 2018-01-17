const Tetrimino = require('../tetrimino.js');

class Pyramid extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'magenta';
    this.area = [3, 2]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 120, 40);
    this.ctx.clearRect(((this.x + 1) * 40), ((this.y - 1) * 40), 40, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.ctx.fillRect((this.x * 40), (this.y * 40), 120, 40);
    this.ctx.fillRect(((this.x + 1) * 40), ((this.y - 1) * 40), 40, 40);
  }

  canMove() {
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }


}

module.exports = Pyramid;
