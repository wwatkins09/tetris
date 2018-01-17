const Tetrimino = require('./tetrimino.js');
const Block = require('./block.js');

class Well {

  constructor() {
    let blocks = [];
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Block([i,j], 'empty'));
      }
      blocks.push(row);
    }
    this.blocks = blocks;
  }

  getBlock(coord) {
    return this.blocks[coord[0]][coord[1]];
  }


}

module.exports = Well;
