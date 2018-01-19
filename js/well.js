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

  checkForFullRow() {
    this.blocks.forEach((row, idx) => {
      let full = true;
      row.forEach((block) => {
        if (block.status === 'empty') {
          full = false;
        }
      });
      if (full === true) {
        this.clearRow(idx);
      }
    });
  }

  clearRow(idx) {
    for (let i = idx; i > 0; i--) {
      this.blocks[i] = this.blocks[i - 1];
    }
    let newRow = []
    for (let i = 0; i < 10; i++) {
      newRow.push(new Block([i,0]));
    }
    this.blocks[0] = newRow;
    this.rerenderWell();
  }

  rerenderWell() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.blocks.forEach((row, idx1) => {
      row.forEach((block, idx2) => {
        if (block.color != 'white') {
        this.ctx.fillStyle = block.color;
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(((idx2 * 40)), ((idx1 * 40)), 40, 40)
          this.ctx.strokeRect((idx2 * 40), (idx1 * 40), 40, 40);
        }
      });
    });
  }


}

module.exports = Well;
