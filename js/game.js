const Well = require('./well.js');
const Tetrimino = require('./tetrimino.js');
const Alpha = require('./tetriminoes/alpha.js');
const Square = require('./tetriminoes/square.js');
const Pyramid = require('./tetriminoes/pyramid.js');
const Gamma = require('./tetriminoes/gamma.js');
const LeftSnake = require('./tetriminoes/left_snake.js');
const RightSnake = require('./tetriminoes/right_snake.js');
const Straight = require('./tetriminoes/straight.js');


class Game {


  constructor(ctx) {
    this.handleHorizontalMovement = this.handleHorizontalMovement.bind(this);
    this.handleVerticalMovement = this.handleVerticalMovement.bind(this);

    this.well = new Well();
    this.ctx = ctx;
    this.setupNewPiece();
    document.addEventListener('keydown', this.handleHorizontalMovement)
  }

  handleVerticalMovement() {
    if (this.currentTetrimino.canMove()) {
      this.currentTetrimino.move('down');
    } else {
      this.currentTetrimino.setFinalPosition();
      clearInterval(this.falling)
      this.setupNewPiece();
    }
  }

  setupNewPiece() {
    this.currentTetrimino = new RightSnake(this.ctx, this.well);
    this.falling = window.setInterval(this.handleVerticalMovement, 100);
  }

  handleHorizontalMovement(event) {
    if (event.key === "ArrowLeft") {
      this.currentTetrimino.move('left');
    }
    if (event.key === "ArrowRight") {
      this.currentTetrimino.move('right');
    }
  }



}

module.exports = Game;
