const Tetrimino = require('./tetrimino.js');
const Block = require('./block.js');

class Well {

  constructor() {
    let blocks = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 20; j++) {
        row.push(new Block([i,j]));
      }
      blocks.push(row);
    }
    this.blocks = blocks;
  }

  getBlock(coord) {
    return this.blocks[coord[0]][coord[1]];
  }

  assignBlockStatus(coord, status) {
    this.blocks[coord[0]][coord[1]].status = status;
  }


}

module.exports = Well;
