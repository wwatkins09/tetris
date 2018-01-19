const Tetrimino = require('../tetrimino.js');

class Alpha extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'orange';
    this.blockCoords = [[0, 1], [1, 1], [2, 1], [2, 0]]
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0)
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0)
    }
  }

  canMoveLeft() {
    if (this.rotationPos === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x), (this.y + 2)]).status === 'empty'
      );
    }
  }

  canMoveRight() {
    if (this.rotationPos === 0) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 2)]).status === 'empty'
      );
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
      rotationCoords = [[1, -1], [0, 0], [-1, 1], [0, 2]]
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 1;
      rotationCoords = [[1, 1], [0, 0], [-1, -1], [-2, 0]];
    }

    if (this.rotationPos === 2) {
      xFactor = 0;
      yFactor = -1;
      rotationCoords = [[-1, 1], [0, 0], [1, -1], [0, -2]]
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 0;
      rotationCoords = [[-1, -1], [0, 0], [1, 1], [2, 0]];
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
      rotationCoords = [[1, 1], [0, 0], [-1, -1], [-2, 0]]
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 0;
      rotationCoords = [[-1, 1], [0, 0], [1, -1], [0, -2]];
    }

    if (this.rotationPos === 2) {
      xFactor = 1;
      yFactor = -1;
      rotationCoords = [[-1, -1], [0, 0], [1, 1], [2, 0]]
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 1;
      rotationCoords = [[1, -1], [0, 0], [-1, 1], [0, 2]];
    }

    return {xFactor, yFactor, rotationCoords}


  }


}

module.exports = Alpha;
