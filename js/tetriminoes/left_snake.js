const Tetrimino = require('../tetrimino.js');

class LeftSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'red';
    this.area = [3, 2];
    this.blockCoords = [[0, 0], [1, 0], [1, 1], [2, 1]]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.clearRect(((this.x + 1) * 40), ((this.y + 1) * 40), 80, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.fillRect(((this.x + 1) * 40), ((this.y + 1) * 40), 80, 40);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = LeftSnake;
