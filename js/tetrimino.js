class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 0;
    this.y = 0;
    this.move = this.move.bind(this);
    this.rerender = this.rerender.bind(this);
    this.area = [];
    this.blockCoords = [];

    this.getBlocksBelow = this.getBlocksBelow.bind(this);
  }

  move(dir) {
    if (dir === 'down') {
      this.rerender([0, 1]);
    }
    if (dir === 'left' && this.x > 0) {
      this.rerender([-1, 0]);
    }
    if (dir === 'right' && this.x < 10 - (this.area[0])) {
      this.rerender([1, 0]);
    }
  }

    rerender() {

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
    })
  }

}

module.exports = Tetrimino;
