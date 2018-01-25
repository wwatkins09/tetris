const Tetrimino = require('../tetrimino.js');

class Square extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'yellow';
    this.blockCoords = [[3, 0], [4, 0], [3, 1], [4, 1]];
  }

  canMoveDown() {
    return (this.y < 18 && !this.hasBlocksBelow())
  }

  handleRotation(dir) {
    return
  }

}

module.exports = Square;
