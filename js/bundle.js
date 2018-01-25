/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 3;
    this.y = 0;
    this.blockCoords = [];
    this.rotationPos = 0;
    this.color = '';

    this.move = this.move.bind(this);

    this.hasBlocksBelow = this.hasBlocksBelow.bind(this);
    this.setFinalPosition = this.setFinalPosition.bind(this);
    this.checkIfGameOver = this.checkIfGameOver.bind(this);
    this.renderNextTetrimino = this.renderNextTetrimino.bind(this);
  }

  canMoveLeft() {
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] - 1;
      let y = coord[1];
      if (newX < 0 || this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }

  canMoveRight() {
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] + 1;
      let y = coord[1];
      if (newX > 9 || this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }

  move(dir) {
    this.clear();
    let arr;
    if (dir === 'down') {
      arr = [0, 1];
    }
    if (dir === 'left') {
      arr = [-1, 0];
    }
    if (dir === 'right') {
      arr = [1, 0];
    }
    if (dir === 'rotate' || dir === 'none') {
      arr = [0, 0];
    }
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
      this.well.assignBlockColor(coord, this.color);
    });
    this.well.rerenderWell();
  }

  hasBlocksBelow() {
    let result = false;
    this.blockCoords.forEach((coord) => {
      if (coord[1] >= 19) {
        return;
      }
      let lowerCoord = [coord[0], (coord[1] + 1)]
      if (this.well.getBlock(lowerCoord).status === 'filled') {
        result = true;
      }
    });
    return result;
  }

  setFinalPosition() {
    this.blockCoords.forEach((coord) => {
      this.well.assignBlockStatus(coord, 'filled');
      this.well.assignBlockColor(coord, this.color);
    });
  }

  handleRotation(dir) {
    let newBlockCoords = [[], [], [], []];
    let canRotate = true;
    let rotateResults;
    let rotationPosFactor;
    if (dir === 'clockwise') {
      rotateResults = this.rotateClockwise()
      rotationPosFactor = 1;
    } else {
      rotateResults = this.rotateCounterClockwise();
      rotationPosFactor = 3;
    }
    let xFactor = rotateResults.xFactor;
    let yFactor = rotateResults.yFactor;
    let rotationCoords = rotateResults.rotationCoords;

    for (let i = 0; i < 4; i++) {
      newBlockCoords[i][0] = this.blockCoords[i][0] + rotationCoords[i][0];
      newBlockCoords[i][1] = this.blockCoords[i][1] + rotationCoords[i][1];
    }
    newBlockCoords.forEach((coord) => {
      if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 19 || this.well.getBlock(coord).status === 'filled') {
        canRotate = false
      }
    });
    if (canRotate) {
      this.clear();
      this.blockCoords = newBlockCoords;
      this.rotationPos = (this.rotationPos + rotationPosFactor) % 4
      this.x += xFactor;
      this.y += yFactor;
      this.move('rotate');
    }
  }


  clear() {
    this.blockCoords.forEach((coord) => {
      this.well.assignBlockColor(coord, 'white');
    });
  }

  rotateClockwise() {

  }

  rotateCounterClockwise() {

  }

  checkIfGameOver() {
    let result = false;
    this.blockCoords.forEach((coord) => {
      if (this.well.getBlock(coord).status === 'filled') {
        result = true;
      }
    });
    return result;
  }

  renderNextTetrimino() {
    this.well.clearWell();
    this.blockCoords.forEach((blockCoord) => {
      blockCoord[0] -= 3;
      blockCoord[1] += 1;
      this.well.assignBlockColor(blockCoord, this.color);
    });
    this.well.rerenderWell();
  }
}

module.exports = Tetrimino;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Block {

  constructor(coord) {
    this.coord = coord;
    this.status = 'empty';
    this.color = 'white';
  }

}

module.exports = Block;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(3);

document.addEventListener('DOMContentLoaded', () => {
  new View()
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

class View {

  constructor() {
    const canvasEl2 = document.getElementById('myCanvas2');
    const ctx2 = canvasEl2.getContext('2d');
    canvasEl2.width = 150;
    canvasEl2.height = 75;

    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 500;
    canvasEl.width = 250;
    const ctx = canvasEl.getContext('2d');
    const game = new Game(ctx, ctx2);
  }

}

module.exports = View;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Well = __webpack_require__(5);
const Tetrimino = __webpack_require__(0);
const Alpha = __webpack_require__(6);
const Square = __webpack_require__(7);
const Pyramid = __webpack_require__(8);
const Gamma = __webpack_require__(9);
const LeftSnake = __webpack_require__(10);
const RightSnake = __webpack_require__(11);
const Straight = __webpack_require__(12);
const Block = __webpack_require__(1);


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
    this.ctx = ctx;
    this.ctx2 = ctx2;
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
    this.speed = 5000;
    this.well = new Well(this.ctx, 20, 10);
    this.well2 = new Well(this.ctx2, 3, 6);
    this.setupNewPiece();
    document.addEventListener('keydown', this.handleMute);
    document.addEventListener('keydown', this.handleHorizontalMovement);
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
      // this.currentTetrimino = new allPieces[this.getRandomInt(7)](this.ctx, this.well);
      this.currentTetrimino = new LeftSnake(this.ctx, this.well);
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
    document.removeEventListener('keydown', this.handleHorizontalMovement);
    document.addEventListener('keydown', this.handleRestart);
    window.localStorage.setItem('highScore', this.highScore);
  }

  handleRestart() {
    if (event.key === "n") {
      document.removeEventListener('keydown', this.handleRestart);
      document.addEventListener('keydown', this.handleHorizontalMovement);
      const overModal = document.getElementById("over");
      overModal.classList.remove('end-game-modal');
      overModal.classList.add('hidden-modal');
      this.handleSetup();
    }
  }



}

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);
const Block = __webpack_require__(1);

class Well {

  constructor(ctx, rows, columns) {
    this.getBlock = this.getBlock.bind(this);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class Alpha extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'orange';
    this.blockCoords = [[3, 1], [4, 1], [5, 1], [5, 0]]
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && !this.hasBlocksBelow())
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && !this.hasBlocksBelow())
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 1;
      yFactor = 0;
      rotationCoords = [[1, -1], [0, 0], [-1, 1], [0, 2]]
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 1;
      rotationCoords = [[1, 1], [0, 0], [-1, -1], [-2, 0]];
    }

    if (this.rotationPos === 2) {
      xFactor = 0;
      yFactor = -1;
      rotationCoords = [[-1, 1], [0, 0], [1, -1], [0, -2]]
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 0;
      rotationCoords = [[-1, -1], [0, 0], [1, 1], [2, 0]];
    }

    return {xFactor, yFactor, rotationCoords}

  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 0;
      yFactor = 0;
      rotationCoords = [[1, 1], [0, 0], [-1, -1], [-2, 0]]
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 0;
      rotationCoords = [[-1, 1], [0, 0], [1, -1], [0, -2]];
    }

    if (this.rotationPos === 2) {
      xFactor = 1;
      yFactor = -1;
      rotationCoords = [[-1, -1], [0, 0], [1, 1], [2, 0]]
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 1;
      rotationCoords = [[1, -1], [0, 0], [-1, 1], [0, 2]];
    }

    return {xFactor, yFactor, rotationCoords}


  }


}

module.exports = Alpha;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class Square extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'yellow';
    this.blockCoords = [[3, 0], [4, 0], [3, 1], [4, 1]];
  }

  canMoveDown() {
    return (this.y < 18 && !this.hasBlocksBelow())
  }

  handleRotation(dir) {
    return
  }

}

module.exports = Square;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class Pyramid extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'magenta';
    this.blockCoords = [[3, 1], [4, 0], [4, 1], [5, 1]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && !this.hasBlocksBelow());
    }

    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && !this.hasBlocksBelow());
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[1, -1], [1, 1], [0, 0], [-1, 1]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[1, 1], [-1, 1], [0, 0], [-1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[-1, 1], [-1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[-1, -1], [1, -1], [0, 0], [1, 1]];
    }

    return {xFactor, yFactor, rotationCoords}
  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[1, 1], [-1, 1], [0, 0], [-1, -1]];
    }
    if (this.rotationPos === 1) {
        xFactor = -1;
        yFactor = 0;
        rotationCoords = [[-1, 1], [-1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 1;
        yFactor = -1;
        rotationCoords = [[-1, -1], [1, -1], [0, 0], [1, 1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 1;
        rotationCoords = [[1, -1], [1, 1], [0, 0], [-1, 1]]
    }

    return {xFactor, yFactor, rotationCoords}

  }

}

module.exports = Pyramid;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class Gamma extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'blue';
    this.blockCoords = [[3, 0], [3, 1], [4, 1], [5, 1]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && !this.hasBlocksBelow());
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && !this.hasBlocksBelow());
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 1;
      yFactor = 0;
      rotationCoords = [[2, 0], [1, -1], [0, 0], [-1, 1]]
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 1;
      rotationCoords = [[0, 2], [1, 1], [0, 0], [-1, -1]];
    }

    if (this.rotationPos === 2) {
      xFactor = 0;
      yFactor = -1;
      rotationCoords = [[-2, 0], [-1, 1], [0, 0], [1, -1]]
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 0;
      rotationCoords = [[0, -2], [-1, -1], [0, 0], [1, 1]];
    }

    return {xFactor, yFactor, rotationCoords}

  }


  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 0;
      yFactor = 0;
      rotationCoords = [[0, 2], [1, 1], [0, 0], [-1, -1]]
    }

    if (this.rotationPos === 1) {
      xFactor = -1;
      yFactor = 0;
      rotationCoords = [[-2, 0], [-1, 1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 2) {
      xFactor = 1;
      yFactor = -1;
      rotationCoords = [[0, -2], [-1, -1], [0, 0], [1, 1]]
    }

    if (this.rotationPos === 3) {
      xFactor = 0;
      yFactor = 1;
      rotationCoords = [[2, 0], [1, -1], [0, 0], [-1, 1]];
    }

    return {xFactor, yFactor, rotationCoords}


  }

}

module.exports = Gamma;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class LeftSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'red';
    this.blockCoords = [[3, 0], [4, 0], [4, 1], [5, 1]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && !this.hasBlocksBelow())
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && !this.hasBlocksBelow())
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[2, 0], [1, 1], [0, 0], [-1, 1]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[0, 2], [-1, 1], [0, 0], [-1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[-2, 0], [-1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[0, -2], [1, -1], [0, 0], [1, 1]];
    }

    return {xFactor, yFactor, rotationCoords}
  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[0, 2], [-1, 1], [0, 0], [-1, -1]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[-2, 0], [-1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[0, -2], [1, -1], [0, 0], [1, 1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[2, 0], [1, 1], [0, 0], [-1, 1]];
    }

    return {xFactor, yFactor, rotationCoords}
  }


}

module.exports = LeftSnake;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class RightSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'green';
    this.blockCoords = [[3, 1], [4, 1], [4, 0], [5, 0]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && !this.hasBlocksBelow())
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && !this.hasBlocksBelow())
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[1, -1], [0, 0], [1, 1], [0, 2]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[1, 1], [0, 0], [-1, 1], [-2, 0]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[-1, 1], [0, 0], [-1, -1], [0, -2]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[-1, -1], [0, 0], [1, -1], [2, 0]];
    }

    return {xFactor, yFactor, rotationCoords}
  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[1, 1], [0, 0], [-1, 1], [-2, 0]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[-1, 1], [0, 0], [-1, -1], [0, -2]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[-1, -1], [0, 0], [1, -1], [2, 0]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[1, -1], [0, 0], [1, 1], [0, 2]];
    }

    return {xFactor, yFactor, rotationCoords}
  }

}

module.exports = RightSnake;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(0);

class Straight extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    this.color = 'cyan';
    this.blockCoords = [[3, 0], [4, 0], [5, 0], [6, 0]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 19 && !this.hasBlocksBelow());
    }

    if (this.rotationPos % 2 === 1) {
      return (this.y < 16 && !this.hasBlocksBelow());
    }
  }

  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 2;
      yFactor = -1;
      rotationCoords = [[2, -1], [1, 0], [0, 1], [-1, 2]]
    }

    if (this.rotationPos === 1) {
      xFactor = -2;
      yFactor = 2;
      rotationCoords = [[1, 2], [0, 1], [-1, 0], [-2, -1]];
    }

    if (this.rotationPos === 2) {
      xFactor = 1;
      yFactor = -2;
      rotationCoords = [[-2, 1], [-1, 0], [0, -1], [1, -2]]
    }

    if (this.rotationPos === 3) {
      xFactor = -1;
      yFactor = 1;
      rotationCoords = [[-1, -2], [0, -1], [1, 0], [2, 1]];
    }

    return {xFactor, yFactor, rotationCoords}

  }

  rotateCounterClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
      xFactor = 1;
      yFactor = -1;
      rotationCoords = [[1, 2], [0, 1], [-1, 0], [-2, -1]]
    }

    if (this.rotationPos === 1) {
      xFactor = -2;
      yFactor = 1;
      rotationCoords = [[-2, 1], [-1, 0], [0, -1], [1, -2]];
    }

    if (this.rotationPos === 2) {
      xFactor = 2;
      yFactor = -2;
      rotationCoords = [[-1, -2], [0, -1], [1, 0], [2, 1]]
    }

    if (this.rotationPos === 3) {
      xFactor = -1;
      yFactor = 2;
      rotationCoords = [[2, -1], [1, 0], [0, 1], [-1, 2]];
    }

    return {xFactor, yFactor, rotationCoords}


  }

}

module.exports = Straight;


/***/ })
/******/ ]);