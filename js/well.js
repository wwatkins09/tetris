const Tetrimino = require('./tetrimino.js');
const Block = require('./block.js');

class Well {

  constructor(ctx) {
    this.ctx = ctx;
    let blocks = [];
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Block([i,j]));
      }
      blocks.push(row);
    }
    this.blocks = blocks;
  }

  getBlock(coord) {
    return this.blocks[coord[1]][coord[0]];
  }

  assignBlockStatus(coord, status) {
    this.blocks[coord[1]][coord[0]].status = status;
  }

  assignBlockColor(coord, color) {
    this.blocks[coord[1]][coord[0]].color = color;
  }

  rerenderWell() {
    this.ctx.clearRect(0, 0, 250, 500);
    this.blocks.forEach((row, idx1) => {
      row.forEach((block, idx2) => {
        if (block.color != 'white') {
        this.ctx.fillStyle = block.color;
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(((idx2 * 25)), ((idx1 * 25)), 25, 25);
        this.ctx.strokeRect((idx2 * 25), (idx1 * 25), 25, 25);
        }
      });
    });
  }


}

module.exports = Well;
