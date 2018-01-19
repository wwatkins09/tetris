const Tetrimino = require('../tetrimino.js');

class Straight extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'cyan';
    this.blockCoords = [[0, 0], [1, 0], [2, 0], [3, 0]];
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 160, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
      this.ctx.fillRect((coord[0] * 40), (coord[1] * 40), 40, 40);
    });
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
    let newBlockCoords = [[], [], [], []]
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
      this.rotationPos = (this.rotationPos + 1) % 4
      this.x += xFactor;
      this.y += yFactor;
      this.rerender([0, 0]);
    } else {
    }

  }

  rotateCounterClockwise() {
    let rotationCoords;
    let newBlockCoords = [[], [], [], []]
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
      this.rotationPos = (this.rotationPos + 3) % 4
      this.x += xFactor;
      this.y += yFactor;
      this.rerender([0, 0]);
    } else {
    }

  }

}

module.exports = Straight;
