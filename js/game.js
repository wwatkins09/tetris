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
    this.handleStart = this.handleStart.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleSetup = this.handleSetup.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.ctx = ctx;
    document.addEventListener('keydown', this.handleStart)
  }

  handleStart() {
    if (event.key === "s") {
      const startModal = document.getElementById('start');
      startModal.classList.remove('start-game-modal');
      startModal.classList.add('hidden-modal');
      document.removeEventListener('keydown', this.handleStart);
      this.handleSetup();
    }

  }

  handleSetup() {
    this.over = false;
    this.muted = false;
    this.score = 0;
    this.htmlScore = document.getElementById('score-value');
    this.htmlScore.innerHTML = this.score;
    this.speed = 500;
    this.well = new Well(this.ctx);
    this.setupNewPiece();
    document.addEventListener('keydown', this.handleMute);
    document.addEventListener('keydown', this.handleHorizontalMovement);
    this.startPlayback();
  }

  startPlayback() {
    if (!this.muted) {
      return document.getElementById('music').play();
    }
  }

  handleMute() {
    if (event.key === "m") {
      const audio = document.getElementById('music');
      this.muted = !this.muted;
      if (!this.muted) {
        return audio.play();
      } else {
        return audio.pause();
      }
    }
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
    const overModal = document.getElementById("over");
    overModal.classList.remove('hidden-modal');
    overModal.classList.add('end-game-modal');
    document.addEventListener('keydown', this.handleRestart);
  }

  handleRestart() {
    if (event.key === "n") {
      document.removeEventListener('keydown', this.handleRestart);
      const overModal = document.getElementById("over");
      overModal.classList.remove('end-game-modal');
      overModal.classList.add('hidden-modal');
      this.handleSetup();
    }
  }



}

module.exports = Game;
