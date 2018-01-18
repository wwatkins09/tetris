const Tetrimino = require('../tetrimino.js');

class Straight extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'cyan';
    this.area = [4, 1];
    this.blockCoords = [[0, 0], [1, 0], [2, 0], [3, 0]];
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 160, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 160, 40);
  }

  canMoveDown() {
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }

  canMoveLeft() {
    return (this.x > 0 &&
      this.well.getBlock([(this.x - 1), this.y]).status === 'empty'
    );
  }

  canMoveRight() {
    return ((this.x + 4) < 10 &&
      this.well.getBlock([(this.x + 4), this.y]).status === 'empty'
    );
  }

}

module.exports = Straight;
