const Well = require('./well.js');
const Tetrimino = require('./tetrimino.js');
const Alpha = require('./tetriminoes/alpha.js');
const Square = require('./tetriminoes/square.js');
const Pyramid = require('./tetriminoes/pyramid.js');
const Gamma = require('./tetriminoes/gamma.js');
const LeftSnake = require('./tetriminoes/left_snake.js');
const RightSnake = require('./tetriminoes/right_snake.js');
const Straight = require('./tetriminoes/straight.js');
const Block = require('./block.js');


const allPieces = [Alpha, Square, Pyramid, Gamma, LeftSnake, RightSnake, Straight];

class Game {


  constructor(ctx) {
    this.handleHorizontalMovement = this.handleHorizontalMovement.bind(this);
    this.handleVerticalMovement = this.handleVerticalMovement.bind(this);

    this.over = false;
    this.score = 0;
    this.htmlScore = document.getElementById('score-value');
    this.htmlScore.innerHTML = this.score;
    this.speed = 500;
    this.well = new Well(ctx);
    this.ctx = ctx;
    this.setupNewPiece();
    document.addEventListener('keydown', this.handleHorizontalMovement)
  }

  handleVerticalMovement() {
    if (this.currentTetrimino.canMoveDown()) {
      this.currentTetrimino.move('down');
    } else {
      clearInterval(this.falling)
      this.currentTetrimino.setFinalPosition();
      this.checkForFullRow();
      this.setupNewPiece();
    }
  }

  checkForFullRow() {
    this.well.blocks.forEach((row, idx) => {
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
      this.well.blocks[i] = this.well.blocks[i - 1];
    }
    let newRow = []
    for (let i = 0; i < 10; i++) {
      newRow.push(new Block([i,0]));
    }
    this.well.blocks[0] = newRow;
    this.well.rerenderWell();
    this.score += 100;
    this.htmlScore.innerHTML = this.score;
    this.speed -= 5;
  }

  setupNewPiece() {
    this.currentTetrimino = new allPieces[this.getRandomInt(7)](this.ctx, this.well);
    if (this.currentTetrimino.checkIfGameOver()) {
      this.gameOver();
    } else {
      this.currentTetrimino.move('none');
      this.falling = window.setInterval(this.handleVerticalMovement, this.speed);
    }
  }

  handleHorizontalMovement(event) {
    if (event.key.includes("Arrow")) {
      event.preventDefault();
    }
    if (event.key === "a" && this.currentTetrimino.canMoveLeft()) {
      this.currentTetrimino.move('left');
    }
    if (event.key === "d" && this.currentTetrimino.canMoveRight()) {
      this.currentTetrimino.move('right');
    }
    if (event.key === "q") {
      this.currentTetrimino.handleRotation('counterClockwise');
    }
    if (event.key === "e") {
      this.currentTetrimino.handleRotation('clockwise');
    }
    if (event.key === "s") {
      this.handleVerticalMovement();
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  gameOver() {
    this.over = true;
    console.log("worked!");
  }



}

module.exports = Game;
