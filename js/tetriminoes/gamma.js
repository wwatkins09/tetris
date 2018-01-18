const Tetrimino = require('../tetrimino.js');

class Gamma extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'blue';
    this.area = [3, 2];
    this.blockCoords = [[0, 0], [0, 1], [1, 1], [2, 1]]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 40, 40);
    this.ctx.clearRect(((this.x) * 40), ((this.y + 1) * 40), 120, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 40, 40);
    this.ctx.fillRect((this.x * 40), ((this.y + 1) * 40), 120, 40);
  }

  canMoveDown() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

  canMoveLeft() {
    return (this.x > 0 &&
      this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
      this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty'
    );
  }

  canMoveRight() {
    return ((this.x + 3) < 10 &&
      this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
    );
  }

}

module.exports = Gamma;
