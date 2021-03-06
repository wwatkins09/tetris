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


  constructor(ctx, ctx2) {
    this.handleHorizontalMovement = this.handleHorizontalMovement.bind(this);
    this.handleVerticalMovement = this.handleVerticalMovement.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleSetup = this.handleSetup.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.setupNewPiece = this.setupNewPiece.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.paused = false;
    document.addEventListener('keydown', this.handleStart)
  }

  handleStart() {
    if (event.key === "s") {
      const startModal = document.getElementById('start');
      startModal.classList.remove('start-game-modal');
      startModal.classList.add('hidden-modal');
      document.removeEventListener('keydown', this.handleStart);
      if (!window.localStorage.getItem('muted')) {
        window.localStorage.setItem('muted', 'false');
      }
      this.handleSetup();
    }

  }

  handleSetup() {
    this.over = false;
    this.score = 0;
    this.highScore = parseInt(window.localStorage.getItem('highScore')) || 0;
    this.htmlScore = document.getElementById('current-score-value');
    this.htmlScore.innerHTML = this.score;
    this.htmlHighScore = document.getElementById('high-score-value');
    this.htmlHighScore.innerHTML = this.highScore;
    this.speed = 500;
    this.well = new Well(this.ctx, 20, 10);
    this.well2 = new Well(this.ctx2, 3, 6);
    this.setupNewPiece();
    document.addEventListener('keydown', this.handleMute);
    document.addEventListener('keydown', this.handleHorizontalMovement);
    document.addEventListener('keydown', this.handlePause);
    this.startPlayback();
  }

  startPlayback() {
    if (window.localStorage.getItem('muted') === 'false') {
      return document.getElementById('music').play();
    }
  }

  handleMute() {
    if (event.key === "m") {
      const audio = document.getElementById('music');
      if (window.localStorage.getItem('muted') === 'true') {
        window.localStorage.setItem('muted', 'false');
        return audio.play();
      } else {
        window.localStorage.setItem('muted', 'true');
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
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.htmlHighScore.innerHTML = this.highScore
    }
    this.speed -= 5;
  }

  setupNewPiece() {
    if (!this.nextTetrimino) {
      this.currentTetrimino = new allPieces[this.getRandomInt(7)](this.ctx, this.well);
      this.nextTetriminoIdx = this.getRandomInt(7);
      this.nextTetrimino = new allPieces[this.nextTetriminoIdx](this.ctx2, this.well2);
    } else {
      this.currentTetrimino = new allPieces[this.nextTetriminoIdx](this.ctx, this.well);
      this.nextTetriminoIdx = this.getRandomInt(7);
      this.nextTetrimino = new allPieces[this.nextTetriminoIdx](this.ctx2, this.well2);
    }
    this.nextTetrimino.renderNextTetrimino();
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
    if ((event.key === "a" || event.key === "ArrowLeft") && this.currentTetrimino.canMoveLeft()) {
      this.currentTetrimino.move('left');
    }
    if ((event.key === "d" || event.key === "ArrowRight") && this.currentTetrimino.canMoveRight()) {
      this.currentTetrimino.move('right');
    }
    if (event.key === "q") {
      this.currentTetrimino.handleRotation('counterClockwise');
    }
    if (event.key === "e" || event.key === "ArrowUp") {
      this.currentTetrimino.handleRotation('clockwise');
    }
    if (event.key === "s" || event.key === "ArrowDown") {
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
    document.removeEventListener('keydown', this.handleHorizontalMovement);
    document.removeEventListener('keydown', this.handlePause);
    document.addEventListener('keydown', this.handleRestart);
    window.localStorage.setItem('highScore', this.highScore);
  }

  handleRestart() {
    if (event.key === "n") {
      document.removeEventListener('keydown', this.handleRestart);
      document.addEventListener('keydown', this.handleHorizontalMovement);
      document.addEventListener('keydown', this.handlePause);
      const overModal = document.getElementById("over");
      overModal.classList.remove('end-game-modal');
      overModal.classList.add('hidden-modal');
      this.handleSetup();
    }
  }

  handlePause(event) {
    if (event.key === "p") {
      const pauseModal = document.getElementById('paused');
      if (this.paused) {
        pauseModal.classList.add('hidden-modal');
        document.addEventListener('keydown', this.handleHorizontalMovement);
        this.falling = window.setInterval(this.handleVerticalMovement, this.speed);
      } else {
        pauseModal.classList.remove('hidden-modal');
        document.removeEventListener('keydown', this.handleHorizontalMovement);
        clearInterval(this.falling);

      }
      this.paused = !this.paused;
    }
  }



}

module.exports = Game;
