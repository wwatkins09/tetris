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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', () => {
  new View(document.getElementById('tetris-game'))
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(13);

class View {

  constructor() {
    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 800;
    canvasEl.width = 400;
    const ctx = canvasEl.getContext('2d');
    const game = new Game(ctx);
  }

}

module.exports = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);
const Block = __webpack_require__(5);

class Well {

  constructor() {
    let blocks = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 20; j++) {
        row.push(new Block([i,j]));
      }
      blocks.push(row);
    }
    this.blocks = blocks;
  }

  getBlock(coord) {
    return this.blocks[coord[0]][coord[1]];
  }

  assignBlockStatus(coord, status) {
    this.blocks[coord[0]][coord[1]].status = status;
  }


}

module.exports = Well;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

class Tetrimino {

  constructor(ctx, well) {
    this.ctx = ctx;
    this.well = well;
    this.x = 0;
    this.y = 0;
    this.move = this.move.bind(this);
    this.rerender = this.rerender.bind(this);
    this.area = [];
    this.blockCoords = [];

    this.getBlocksBelow = this.getBlocksBelow.bind(this);
  }

  move(dir) {
    if (dir === 'down') {
      this.rerender([0, 1]);
    }
    if (dir === 'left' && this.x > 0) {
      this.rerender([-1, 0]);
    }
    if (dir === 'right' && this.x < 10 - (this.area[0])) {
      this.rerender([1, 0]);
    }
  }

    rerender() {

    }

  getBlocksBelow() {
    let result = [];
    this.blockCoords.forEach((coord) => {
      let lowerCoord = [coord[0], (coord[1] + 1)]
      if (this.well.getBlock(lowerCoord).status === 'filled') {
        result.push(this.well.getBlock(lowerCoord));
      }
    });
    return result
  }

  setFinalPosition() {
    this.blockCoords.forEach((coord) => {
      this.well.assignBlockStatus(coord, 'filled');
    })
  }

}

module.exports = Tetrimino;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Block {

  constructor(coord) {
    this.coord = coord;
    this.status = 'empty';
  }

}

module.exports = Block;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Alpha extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'orange';
    this.area = [3, 2];
    this.blockCoords = [[0, 1], [1, 1], [2, 1], [2, 0]]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), ((this.y + 1) * 40), 120, 40);
    this.ctx.clearRect(((this.x + 2) * 40), (this.y * 40), 40, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), ((this.y + 1) * 40), 120, 40);
    this.ctx.fillRect(((this.x + 2) * 40), ((this.y) * 40), 40, 40);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Alpha;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Square extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'yellow';
    this.area = [2, 2]
    this.blockCoords = [[0, 0], [1, 0], [0, 1], [1, 1]];
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 80, 80);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 80, 80);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Square;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Pyramid extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'magenta';
    this.area = [3, 2]
    this.blockCoords = [[0, 1], [1, 0], [1, 1], [2, 1]]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), ((this.y + 1)* 40), 120, 40);
    this.ctx.clearRect(((this.x + 1) * 40), (this.y * 40), 40, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), ((this.y + 1) * 40), 120, 40);
    this.ctx.fillRect(((this.x + 1) * 40), (this.y * 40), 40, 40);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }


}

module.exports = Pyramid;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Gamma extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'blue';
    this.area = [3, 2];
    this.blockCoords = [[0, 0], [0, 1], [1, 1], [2, 1]]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 40, 40);
    this.ctx.clearRect(((this.x) * 40), ((this.y + 1) * 40), 120, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 40, 40);
    this.ctx.fillRect((this.x * 40), ((this.y + 1) * 40), 120, 40);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Gamma;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class LeftSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'red';
    this.area = [3, 2];
    this.blockCoords = [[0, 0], [1, 0], [1, 1], [2, 1]]
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.clearRect(((this.x + 1) * 40), ((this.y + 1) * 40), 80, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 80, 40);
    this.ctx.fillRect(((this.x + 1) * 40), ((this.y + 1) * 40), 80, 40);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = LeftSnake;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class RightSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'green';
    this.area = [3, 2];
    this.blockCoords = [[0, 1], [1, 0], [1, 1], [2, 0]];
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), ((this.y + 1) * 40), 80, 40);
    this.ctx.clearRect(((this.x + 1) * 40), (this.y * 40), 80, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), ((this.y + 1) * 40), 80, 40);
    this.ctx.fillRect(((this.x + 1) * 40), (this.y * 40), 80, 40);
  }

  canMove() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

}

module.exports = RightSnake;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Straight extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'cyan';
    this.area = [4, 1];
    this.blockCoords = [[0, 0], [1, 0], [2, 0], [3, 0]];
  }

  rerender(arr) {
    this.ctx.clearRect((this.x * 40), (this.y * 40), 160, 40);
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
    });
    this.ctx.fillRect((this.x * 40), (this.y * 40), 160, 40);
  }

  canMove() {
    return (this.y < 19 && this.getBlocksBelow().length === 0)
  }

}

module.exports = Straight;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const Well = __webpack_require__(2);
const Tetrimino = __webpack_require__(4);
const Alpha = __webpack_require__(6);
const Square = __webpack_require__(7);
const Pyramid = __webpack_require__(8);
const Gamma = __webpack_require__(9);
const LeftSnake = __webpack_require__(10);
const RightSnake = __webpack_require__(11);
const Straight = __webpack_require__(12);


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


/***/ })
/******/ ]);