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

const Well = __webpack_require__(2);
const Tetrimino = __webpack_require__(4);
const Alpha = __webpack_require__(6);
const Square = __webpack_require__(7);
const Pyramid = __webpack_require__(8);

class View {

  constructor() {
    const canvasEl = document.getElementById('myCanvas');
    canvasEl.height = 800;
    canvasEl.width = 400;
    const ctx = canvasEl.getContext('2d');
    new Pyramid(ctx);
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

}

module.exports = Pyramid;


/***/ })
/******/ ]);