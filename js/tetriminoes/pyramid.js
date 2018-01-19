const Tetrimino = require('../tetrimino.js');

class Pyramid extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'magenta';
    this.blockCoords = [[1, 1], [0, 1], [1, 0], [2, 1]]
  }

  rerender(arr) {
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
      this.ctx.fillRect((coord[0] * 40), coord[1] * 40, 40, 40);
    });
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

  handleRotation(dir) {
    let newBlockCoords = [[], [], [], []];
    let canRotate = true;
    let rotateResults;
    let rotationPosFactor;
    if (dir === 'clockwise') {
      rotateResults = this.rotateClockwise()
      rotationPosFactor = 1;
    } else {
      rotateResults = this.rotateCounterClockwise();
      rotationPosFactor = 3;
    }
    let xFactor = rotateResults.xFactor;
    let yFactor = rotateResults.yFactor;
    let rotationCoords = rotateResults.rotationCoords;

    for (let i = 0; i < 4; i++) {
      newBlockCoords[i][0] = this.blockCoords[i][0] + rotationCoords[i][0];
      newBlockCoords[i][1] = this.blockCoords[i][1] + rotationCoords[i][1];
    }
    newBlockCoords.forEach((coord) => {
      if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
        canRotate = false
      }
    });
    if (canRotate) {
      this.clear();
      this.blockCoords = newBlockCoords;
      this.rotationPos = (this.rotationPos + rotationPosFactor) % 4
      this.x += xFactor;
      this.y += yFactor;
      this.rerender([0, 0]);
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
        rotationCoords = [[0, 0], [1, 1], [-1, 1], [-1, -1]];
    }
    if (this.rotationPos === 1) {

        xFactor = -1;
        yFactor = 0;
        rotationCoords = [[0, 0], [-1, 1], [-1, -1], [1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 1;
        yFactor = -1;
        rotationCoords = [[0, 0], [-1, -1], [1, -1], [1, 1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 1;
        rotationCoords = [[0, 0], [1, -1], [1, 1], [-1, 1]]
    }

    return {xFactor, yFactor, rotationCoords}

  }

  rotate(dir) {
    let rotationCoords;
    let newBlockCoords = [[], [], [], []]
    let canRotate = true;
    let xFactor;
    let yFactor;
    const dirFactor = (dir === 'clockwise') ? 1 : -1;

    if (this.rotationPos === 0) {
      if (dirFactor === 1) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[0, 0], [1, -1], [1, 1], [-1, 1]];
      } else {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[0, 0], [1, 1], [-1, 1], [-1, -1]];
      }

    }

    if (this.rotationPos === 1) {
      if (dirFactor === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[0, 0], [1, 1], [-1, 1], [-1, -1]];
      } else {
        xFactor = -1;
        yFactor = 0;
        rotationCoords = [[0, 0], [-1, 1], [-1, -1], [1, -1]];
      }
    }

    if (this.rotationPos === 2) {
      if (dirFactor === 1) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[0, 0], [-1, 1], [-1, -1], [1, -1]];
      } else {
        xFactor = 1;
        yFactor = -1;
        rotationCoords = [[0, 0], [-1, -1], [1, -1], [1, 1]];
      }
    }

    if (this.rotationPos === 3) {
      if (dirFactor === 1) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[0, 0], [-1, -1], [1, -1], [1, 1]];
      } else {
        xFactor = 0;
        yFactor = 1;
        rotationCoords = [[0, 0], [1, -1], [1, 1], [-1, 1]]
      }
    }

    for (let i = 0; i < 4; i++) {
      newBlockCoords[i][0] = this.blockCoords[i][0] + rotationCoords[i][0];
      newBlockCoords[i][1] = this.blockCoords[i][1] + rotationCoords[i][1];
    }
    newBlockCoords.forEach((coord) => {
      if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
        canRotate = false
      }
    });
    if (canRotate) {
      this.clear();
      this.blockCoords = newBlockCoords;
      if (this.rotationPos > 0) {
        this.rotationPos = (this.rotationPos + dirFactor) % 4
      } else {
        this.rotationPos = (this.rotationPos + dirFactor + 4) % 4
      }
      this.x += xFactor;
      this.y += yFactor;
      this.rerender([0, 0]);
    } else {
    }
  }


}

module.exports = Pyramid;
