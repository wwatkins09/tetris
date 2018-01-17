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
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Block([i,j], 'empty'));
      }
      blocks.push(row);
    }
    this.blocks = blocks;
  }

  getBlock(coord) {
    return this.blocks[coord[0]][coord[1]];
  }


}

module.exports = Well;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Block {

  constructor(coord, status) {
    this.coord = coord;
    this.status = status;
  }

}

module.exports = Block;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Alpha extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    this.y += 40;
    ctx.fillStyle = 'orange';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 120, 40);
    this.ctx.fillRect((this.x + 80), (this.y - 40), 40, 40);
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 280) {
      this.x += 40;
    }
  }

}

module.exports = Alpha;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Square extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'yellow';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 80, 80);
    if (this.y === 720) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 320) {
      this.x += 40;
    }
  }

}

module.exports = Square;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Pyramid extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'magenta';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 120, 40);
    this.ctx.fillRect((this.x + 40), (this.y - 40), 40, 40)
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 280) {
      this.x += 40;
    }
  }

}

module.exports = Pyramid;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Gamma extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'blue';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 40, 40);
    this.ctx.fillRect((this.x), (this.y + 40), 120, 40)
    if (this.y === 720) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 280) {
      this.x += 40;
    }
  }

}

module.exports = Gamma;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class LeftSnake extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'red';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 80, 40);
    this.ctx.fillRect((this.x + 40), (this.y + 40), 80, 40)
    if (this.y === 720) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 280) {
      this.x += 40;
    }
  }

}

module.exports = LeftSnake;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class RightSnake extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'green';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 80, 40);
    this.ctx.fillRect((this.x + 40), (this.y - 40) , 80, 40)
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 280) {
      this.x += 40;
    }
  }

}

module.exports = RightSnake;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Tetrimino = __webpack_require__(4);

class Straight extends Tetrimino {

  constructor(ctx) {
    super(ctx);
    ctx.fillStyle = 'cyan';
  }

  move() {
    this.ctx.clearRect(0, 0, 400, 800);
    this.y = this.y + 40;
    this.ctx.fillRect(this.x, this.y, 160, 40);
    if (this.y === 760) {
      clearInterval(this.falling);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 40;
    }
  }

  moveRight() {
    if (this.x < 240) {
      this.x += 40;
    }
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
    this.currentTetrimino = new LeftSnake(ctx);
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


/***/ })
/******/ ]);