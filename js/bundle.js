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
    this.blockCoords = [];
    this.rotationPos = 0;

    this.move = this.move.bind(this);
    this.rerender = this.rerender.bind(this);

    this.getBlocksBelow = this.getBlocksBelow.bind(this);
    this.setFinalPosition = this.setFinalPosition.bind(this);
  }

  move(dir) {
    this.clear();
    if (dir === 'down') {
      this.rerender([0, 1]);
    }
    if (dir === 'left') {
      this.rerender([-1, 0]);
    }
    if (dir === 'right') {
      this.rerender([1, 0]);
    }
  }

  rerender(arr) {
    this.x += arr[0];
    this.y += arr[1];
    this.blockCoords.forEach((coord) => {
      coord[0] += arr[0];
      coord[1] += arr[1];
      this.ctx.fillRect((coord[0] * 40), coord[1] * 40, 40, 40);
    });
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
      this.rerender([0, 0]);
    }
  }

  rotateClockwise() {

  }

  rotateCounterClockwise() {

  }

  clear() {
    this.blockCoords.forEach((coord) => {
      this.ctx.clearRect((coord[0] * 40), (coord[1] * 40), 40, 40);
    });
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
    this.blockCoords = [[0, 1], [1, 1], [2, 1], [2, 0]]
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0)
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0)
    }
  }

  canMoveLeft() {
    if (this.rotationPos === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x), (this.y + 2)]).status === 'empty'
      );
    }
  }

  canMoveRight() {
    if (this.rotationPos === 0) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 2)]).status === 'empty'
      );
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

const Tetrimino = __webpack_require__(4);

class Square extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'yellow';
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

  canMoveDown() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

  canMoveLeft() {
    return (this.x > 0 &&
      this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
      this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty'
    );
  }

  canMoveRight() {
    return ((this.x + 2) < 10 &&
      this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
      this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty'
    );
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
    this.blockCoords = [[1, 1], [0, 1], [1, 0], [2, 1]]
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0);
    }

    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0);
    }
  }

  canMoveLeft() {
    if (this.x === 0) {
      return false;
    }
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] - 1;
      let y = coord[1];
      if (this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }

  canMoveRight() {
    if ((this.rotationPos % 2 === 0 && (this.x + 3) === 10) || (this.rotationPos % 2 === 1) && (this.x + 2) === 10) {
      return false;
    }
    let result = true;
    this.blockCoords.forEach((coord) => {
      let newX = coord[0] + 1;
      let y = coord[1];
      if (this.well.getBlock([newX, y]).status === 'filled') {
        result = false;
      }
    });
    return result;
  }


  rotateClockwise() {
    let rotationCoords;
    let canRotate = true;
    let xFactor;
    let yFactor;

    if (this.rotationPos === 0) {
        xFactor = 1;
        yFactor = 0;
        rotationCoords = [[0, 0], [1, -1], [1, 1], [-1, 1]];
    }

    if (this.rotationPos === 1) {
        xFactor = -1
        yFactor = 1
        rotationCoords = [[0, 0], [1, 1], [-1, 1], [-1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 0;
        yFactor = -1;
        rotationCoords = [[0, 0], [-1, 1], [-1, -1], [1, -1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 0;
        rotationCoords = [[0, 0], [-1, -1], [1, -1], [1, 1]];
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
        rotationCoords = [[0, 2], [-1, 1], [0, 0], [-1, -1]];
    }
    if (this.rotationPos === 1) {
        xFactor = -1;
        yFactor = 0;
        rotationCoords = [[-2, 0], [-1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 2) {
        xFactor = 1;
        yFactor = -1;
        rotationCoords = [[0, -2], [1, -1], [0, 0], [1, -1]];
    }

    if (this.rotationPos === 3) {
        xFactor = 0;
        yFactor = 1;
        rotationCoords = [[2, 0], [1, 1], [0, 0], [-1, 1]]
    }

    return {xFactor, yFactor, rotationCoords}

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
    this.blockCoords = [[0, 0], [0, 1], [1, 1], [2, 1]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0);
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0);
    }
  }

  canMoveLeft() {
    if (this.rotationPos === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return (this.x > 0 &&
        this.well.getBlock([this.x, this.y]).status === 'empty' &&
        this.well.getBlock([this.x, (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty'
      );
    }
  }

  canMoveRight() {
    if (this.rotationPos === 0) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 2)]).status === 'empty'
      );
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

const Tetrimino = __webpack_require__(4);

class LeftSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'red';
    this.blockCoords = [[0, 0], [1, 0], [1, 1], [2, 1]]
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 18 && this.getBlocksBelow().length === 0)
    }
    if (this.rotationPos % 2 === 1) {
      return (this.y < 17 && this.getBlocksBelow().length === 0)

    }
  }

  canMoveLeft() {
    if (this.rotationPos === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([this.x, (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return (this.x > 0 &&
        this.well.getBlock([this.x, this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty'
      );

    }
    if (this.rotationPos === 2) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([this.x, (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return (this.x > 0 &&
        this.well.getBlock([this.x, this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty'
      );

    }
  }

  canMoveRight() {
    if (this.rotationPos === 0) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 1) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 2)]).status === 'empty'
      );
    }
    if (this.rotationPos === 2) {
      return ((this.x + 3) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 3), (this.y + 1)]).status === 'empty'
      );
    }
    if (this.rotationPos === 3) {
      return ((this.x + 2) < 10 &&
        this.well.getBlock([(this.x + 2), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 2)]).status === 'empty'
      );
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

const Tetrimino = __webpack_require__(4);

class RightSnake extends Tetrimino {

  constructor(ctx, well) {
    super(ctx, well);
    ctx.fillStyle = 'green';
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

  canMoveDown() {
    return (this.y < 18 && this.getBlocksBelow().length === 0)
  }

  canMoveLeft() {
    return (this.x > 0 &&
      this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty'
    );
  }

  canMoveRight() {
    return ((this.x + 3) < 10 &&
      this.well.getBlock([(this.x + 3), this.y]).status === 'empty' &&
      this.well.getBlock([(this.x + 2), (this.y + 1)]).status === 'empty'
    );
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
    this.blockCoords = [[0, 0], [1, 0], [2, 0], [3, 0]];
  }

  canMoveDown() {
    if (this.rotationPos % 2 === 0) {
      return (this.y < 19 && this.getBlocksBelow().length === 0);
    }

    if (this.rotationPos % 2 === 1) {
      return (this.y < 16 && this.getBlocksBelow().length === 0);
    }
  }

  canMoveLeft() {
    if (this.rotationPos % 2 === 0) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty'
      );
    }

    if (this.rotationPos % 2 === 1) {
      return (this.x > 0 &&
        this.well.getBlock([(this.x - 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 2)]).status === 'empty' &&
        this.well.getBlock([(this.x - 1), (this.y + 3)]).status === 'empty'
      );
    }
  }

  canMoveRight() {
    if (this.rotationPos % 2 === 0) {
      return ((this.x + 4) < 10 &&
      this.well.getBlock([(this.x + 4), this.y]).status === 'empty'
      );
    }

    if (this.rotationPos % 2 === 1) {
      return ((this.x + 1) < 10 &&
        this.well.getBlock([(this.x + 1), this.y]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 1)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 2)]).status === 'empty' &&
        this.well.getBlock([(this.x + 1), (this.y + 3)]).status === 'empty'
      );
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


const allPieces = [Alpha, Square, Pyramid, Gamma, LeftSnake, RightSnake, Straight];

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
    if (this.currentTetrimino.rotationPos === 2) {
    }
    if (this.currentTetrimino.canMoveDown()) {
      this.currentTetrimino.move('down');
    } else {
      clearInterval(this.falling)
      this.currentTetrimino.setFinalPosition();
      this.setupNewPiece();
    }
  }

  setupNewPiece() {
    // this.currentTetrimino = new allPieces[this.getRandomInt(7)](this.ctx, this.well);
    this.currentTetrimino = new LeftSnake(this.ctx, this.well);
    this.falling = window.setInterval(this.handleVerticalMovement, 500);
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
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }



}

module.exports = Game;


/***/ })
/******/ ]);