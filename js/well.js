const Tetrimino = require('./tetrimino.js');
const Block = require('./block.js');

class Well {

  constructor(ctx, rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.ctx = ctx;
    let blocks = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
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
    this.ctx.clearRect(0, 0, (25 * this.columns), (25 * this.rows));
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

  clearWell() {
    this.blocks.forEach((row, idx1) => {
      row.forEach((block, idx2) => {
        this.assignBlockColor([idx2, idx1], 'white');
      });
    });
  }


}

module.exports = Well;
