const Tetrimino = require('../tetrimino.js');

class RightSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'green';
    this.blockCoords = [[3, 1], [4, 1], [4, 0], [5, 0]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && !this.hasBlocksBelow())
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && !this.hasBlocksBelow())
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[1, -1], [0, 0], [1, 1], [0, 2]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[1, 1], [0, 0], [-1, 1], [-2, 0]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[-1, 1], [0, 0], [-1, -1], [0, -2]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[-1, -1], [0, 0], [1, -1], [2, 0]];
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
        yFactor = 0;
        rotationCoords = [[1, 1], [0, 0], [-1, 1], [-2, 0]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[-1, 1], [0, 0], [-1, -1], [0, -2]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[-1, -1], [0, 0], [1, -1], [2, 0]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[1, -1], [0, 0], [1, 1], [0, 2]];
    }

    return {xFactor, yFactor, rotationCoords}
  }

}

module.exports = RightSnake;
