const Tetrimino = require('../tetrimino.js');

class Straight extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'cyan';
    this.blockCoords = [[0, 0], [1, 0], [2, 0], [3, 0]];
    this.checkIfGameOver();
    this.move('none');
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 19 && this.getBlocksBelow().length === 0);
    }

    if (this.rotationPos % 2 === 1) {
      return (this.y < 16 && this.getBlocksBelow().length === 0);
    }
  }

  canMoveLeft() {
    if (this.rotationPos % 2 === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty'
      );
    }

    if (this.rotationPos % 2 === 1) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 3)]).status === 'empty'
      );
    }
  }

  canMoveRight() {
    if (this.rotationPos % 2 === 0) {
      return ((this.x + 4) < 10 &&
      this.well.getBlock([(this.x + 4), this.y]).status === 'empty'
      );
    }

    if (this.rotationPos % 2 === 1) {
      return ((this.x + 1) < 10 &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 2)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 3)]).status === 'empty'
      );
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 2;
      yFactor = -1;
      rotationCoords = [[2, -1], [1, 0], [0, 1], [-1, 2]]
    }

    if (this.rotationPos === 1) {
      xFactor = -2;
      yFactor = 2;
      rotationCoords = [[1, 2], [0, 1], [-1, 0], [-2, -1]];
    }

    if (this.rotationPos === 2) {
      xFactor = 1;
      yFactor = -2;
      rotationCoords = [[-2, 1], [-1, 0], [0, -1], [1, -2]]
    }

    if (this.rotationPos === 3) {
      xFactor = -1;
      yFactor = 1;
      rotationCoords = [[-1, -2], [0, -1], [1, 0], [2, 1]];
    }

    return {xFactor, yFactor, rotationCoords}

  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 1;
      yFactor = -1;
      rotationCoords = [[1, 2], [0, 1], [-1, 0], [-2, -1]]
    }

    if (this.rotationPos === 1) {
      xFactor = -2;
      yFactor = 1;
      rotationCoords = [[-2, 1], [-1, 0], [0, -1], [1, -2]];
    }

    if (this.rotationPos === 2) {
      xFactor = 2;
      yFactor = -2;
      rotationCoords = [[-1, -2], [0, -1], [1, 0], [2, 1]]
    }

    if (this.rotationPos === 3) {
      xFactor = -1;
      yFactor = 2;
      rotationCoords = [[2, -1], [1, 0], [0, 1], [-1, 2]];
    }

    return {xFactor, yFactor, rotationCoords}


  }

}

module.exports = Straight;
