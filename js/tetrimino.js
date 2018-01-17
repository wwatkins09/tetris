class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 0;
    this.y = 0;
    this.move = this.move.bind(this);

    this.getBlocksBelow = this.getBlocksBelow.bind(this);
  }

  move() {


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
