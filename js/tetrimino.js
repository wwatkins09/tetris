class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 3;
    this.y = 0;
    this.blockCoords = [];
    this.rotationPos = 0;
    this.color = '';

    this.move = this.move.bind(this);

    this.getBlocksBelow = this.getBlocksBelow.bind(this);
    this.setFinalPosition = this.setFinalPosition.bind(this);
    this.checkIfGameOver = this.checkIfGameOver.bind(this);
  }

  canMoveLeft() {
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] - 1;
      let y = coord[1];
      if (newX < 0 || this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }

  canMoveRight() {
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] + 1;
      let y = coord[1];
      if (newX > 9 || this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }

  move(dir) {
    this.clear();
    let arr;
    if (dir === 'down') {
      arr = [0, 1];
    }
    if (dir === 'left') {
      arr = [-1, 0];
    }
    if (dir === 'right') {
      arr = [1, 0];
    }
    if (dir === 'rotate' || dir === 'none') {
      arr = [0, 0];
    }
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
      this.well.assignBlockColor(coord, this.color);
    });
    this.well.rerenderWell();
  }

  getBlocksBelow() {
    let result = [];
    this.blockCoords.forEach((coord) => {
      let lowerCoord = [coord[0], (coord[1] + 1)]
      if (this.well.getBlock(lowerCoord).status === 'filled') {
        result.push(this.well.getBlock(lowerCoord));
      }
    });
    return result
  }

  setFinalPosition() {
    this.blockCoords.forEach((coord) => {
      this.well.assignBlockStatus(coord, 'filled');
      this.well.assignBlockColor(coord, this.color);
    });
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
      this.move('rotate');
    }
  }


  clear() {
    this.blockCoords.forEach((coord) => {
      this.well.assignBlockColor(coord, 'white');
    });
  }

  rotateClockwise() {

  }

  rotateCounterClockwise() {

  }

  checkIfGameOver() {
    let result = false;
    this.blockCoords.forEach((coord) => {
      if (this.well.getBlock(coord).status === 'filled') {
        result = true;
      }
    });
    return result;
  }
}

module.exports = Tetrimino;
