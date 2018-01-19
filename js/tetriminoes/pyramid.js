const Tetrimino = require('../tetrimino.js');

class Pyramid extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'magenta';
    this.blockCoords = [[1, 1], [0, 1], [1, 0], [2, 1]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0);
    }

    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0);
    }
  }

  canMoveLeft() {
    if (this.x === 0) {
      return false;
    }
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] - 1;
      let y = coord[1];
      if (this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }

  canMoveRight() {
    if ((this.rotationPos % 2 === 0 && (this.x + 3) === 10) || (this.rotationPos % 2 === 1) && (this.x + 2) === 10) {
      return false;
    }
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] + 1;
      let y = coord[1];
      if (this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }


  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[0, 0], [1, -1], [1, 1], [-1, 1]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[0, 0], [1, 1], [-1, 1], [-1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[0, 0], [-1, 1], [-1, -1], [1, -1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[0, 0], [-1, -1], [1, -1], [1, 1]];
    }

    return {xFactor, yFactor, rotationCoords}
  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[0, 2], [-1, 1], [0, 0], [-1, -1]];
    }
    if (this.rotationPos === 1) {
        xFactor = -1;
        yFactor = 0;
        rotationCoords = [[-2, 0], [-1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 1;
        yFactor = -1;
        rotationCoords = [[0, -2], [1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 1;
        rotationCoords = [[2, 0], [1, 1], [0, 0], [-1, 1]]
    }

    return {xFactor, yFactor, rotationCoords}

  }

}

module.exports = Pyramid;
