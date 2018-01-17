class Tetrimino {

  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.move = this.move.bind(this);
    this.falling = window.setInterval(this.move, 500)

  }

  move() {


  }

}

module.exports = Tetrimino;
