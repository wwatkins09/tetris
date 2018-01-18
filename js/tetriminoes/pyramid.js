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
    if (this.rotationPos === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0);
    }

    if (this.rotationPos === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0);
    }

    if (this.rotationPos === 2) {
      return (this.y < 18 && this.getBlocksBelow().length === 0)
    }

    if (this.rotationPos === 3) {
      return (this.y < 17 && this.getBlocksBelow().length === 0);
    }
  }

  canMoveLeft() {
    if (this.rotationPos === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([this.x, this.y]).status === 'empty'
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
        this.well.getBlock([(this.x), (this.y + 1)]).status === 'empty'
      );
    }

    if (this.rotationPos === 3) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([this.x, this.y]).status === 'empty' &&
        this.well.getBlock([this.x, (this.y + 2)]).status === 'empty'
      );
    }
  }

  canMoveRight() {
    if (this.rotationPos === 0) {
      return ((this.x + 3) < 10 &&
      this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty' &&
      this.well.getBlock([this.x + 2, this.y]).status === 'empty'
      );
    }

    if (this.rotationPos === 1) {
      return ((this.x + 2) < 10 &&
      this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty' &&
      this.well.getBlock([(this.x + 1), this.y]).status === 'empty' &&
      this.well.getBlock([(this.x + 1), (this.y + 2)]).status === 'empty'
      );
    }

    if (this.rotationPos === 2) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
        this.well.getBlock([this.x + 2, (this.y + 1)]).status === 'empty'
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
    let clockwiseCoords;
    let newBlockCoords = [[], [], [], []]
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 1;
      yFactor = 0;
      clockwiseCoords = [[0, 0], [1, -1], [1, 1], [-1, 1]]
      for (let i = 0; i < 4; i++) {
        newBlockCoords[i][0] = this.blockCoords[i][0] + clockwiseCoords[i][0];
        newBlockCoords[i][1] = this.blockCoords[i][1] + clockwiseCoords[i][1];
      }
      newBlockCoords.forEach((coord) => {
        if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
          canRotate = false
        }
      });
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 1;
      clockwiseCoords = [[0, 0], [1, 1], [-1, 1], [-1, -1]]
      for (let i = 0; i < 4; i++) {
        newBlockCoords[i][0] = this.blockCoords[i][0] + clockwiseCoords[i][0];
        newBlockCoords[i][1] = this.blockCoords[i][1] + clockwiseCoords[i][1];
      }
      newBlockCoords.forEach((coord) => {
        if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
          canRotate = false
        }
      });
    }

    if (this.rotationPos === 2) {
      xFactor = 0;
      yFactor = -1;
      clockwiseCoords = [[0, 0], [-1, 1], [-1, -1], [1, -1]]
      for (let i = 0; i < 4; i++) {
        newBlockCoords[i][0] = this.blockCoords[i][0] + clockwiseCoords[i][0];
        newBlockCoords[i][1] = this.blockCoords[i][1] + clockwiseCoords[i][1];
      }
      newBlockCoords.forEach((coord) => {
        if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
          canRotate = false
        }
      });
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 0;
      clockwiseCoords = [[0, 0], [-1, -1], [1, -1], [1, 1]]
      for (let i = 0; i < 4; i++) {
        newBlockCoords[i][0] = this.blockCoords[i][0] + clockwiseCoords[i][0];
        newBlockCoords[i][1] = this.blockCoords[i][1] + clockwiseCoords[i][1];
      }
      newBlockCoords.forEach((coord) => {
        if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
          canRotate = false
        }
      });
    }

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


}

module.exports = Pyramid;
