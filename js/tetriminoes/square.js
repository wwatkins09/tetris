const Tetrimino = require('../tetrimino.js');

class Square extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'yellow';
    this.blockCoords = [[0, 0], [1, 0], [0, 1], [1, 1]];
    this.checkIfGameOver();
    this.move('none');
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
    return ((this.x + 2) < 10 &&
      this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
      this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty'
    );
  }

  handleRotation(dir) {
    return
  }

}

module.exports = Square;
