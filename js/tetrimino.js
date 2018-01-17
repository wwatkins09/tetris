class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 0;
    this.y = 0;
    this.move = this.move.bind(this);
    this.rerender = this.rerender.bind(this);
    this.area = [];

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
    this.well.blocks[this.y + 1].forEach((block) => {
      if (block.status === 'filled') {
        result.push(block);
      }
    });
    return result
  }

}

module.exports = Tetrimino;
