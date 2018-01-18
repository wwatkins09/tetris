const Tetrimino = require('../tetrimino.js');

class RightSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'green';
    this.area = [3, 2];
    // fix negative number glitch!
    this.blockCoords = [[0, 0], [1, -1], [1, 0], [2, -1]];
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.clearRect(((this.x + 1) * 40), ((this.y - 1) * 40), 80, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.fillRect(((this.x + 1) * 40), ((this.y - 1) * 40), 80, 40);
  }

  canMove() {
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }

}

module.exports = RightSnake;
