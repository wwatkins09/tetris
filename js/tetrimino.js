class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 0;
    this.y = 0;
    this.blockCoords = [];
    this.rotationPos = 0;

    this.move = this.move.bind(this);
    this.rerender = this.rerender.bind(this);

    this.getBlocksBelow = this.getBlocksBelow.bind(this);
    this.setFinalPosition = this.setFinalPosition.bind(this);
  }

  move(dir) {
    this.clear();
    if (dir === 'down') {
      this.rerender([0, 1]);
    }
    if (dir === 'left') {
      this.rerender([-1, 0]);
    }
    if (dir === 'right') {
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

  rotate(dir) {
    
  }

  clear() {
    this.blockCoords.forEach((coord) => {
      this.ctx.clearRect((coord[0] * 40), (coord[1] * 40), 40, 40);
    });
  }

}

module.exports = Tetrimino;
