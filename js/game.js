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
    this.currentTetrimino = new Square(ctx);
    this.handleHorizontalMovement = this.handleHorizontalMovement.bind(this);

    document.addEventListener('keydown', this.handleHorizontalMovement)
  }

  handleHorizontalMovement(event) {
    if (event.key === "ArrowLeft") {
      this.currentTetrimino.moveLeft();
    }
    if (event.key === "ArrowRight") {
      this.currentTetrimino.moveRight();
    }
  }



}

module.exports = Game;
