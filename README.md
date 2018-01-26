# Tetris
<a href="http://will-watkins.com/tetris" >
  <img src="https://i.imgur.com/8lk59II.png" />
</a>

## About

It's everyone's favorite Soviet puzzle game! Move and rotate the pieces to clear rows and earn points. See how long you can last as the speed increases!

<a href="http://will-watkins.com/tetris" >Live Version</a>

## How to Play

### Gameplay

The player's goal is to fill as many rows as possible with the seven various types of pieces without letting them reach the top of the screen, or "well". Each time a row is cleared, the player earns 100 points, and the falling speed increases. Players can rotate as well as move the pieces to stack them as efficiently as possible.

### Controls

* Use the "a" and "d" keys to move the pieces left and right, or use "d" to increase the piece's falling speed.
* Turn the piece clockwise with "e" and counterclockwise with "q".
* Press "m" to mute/unmute the music.
* Press "p" to pause/restart the game.

## Features

### Tetriminos

Each game piece (or "tetrimino") is represented by an instance of the Tetrimino class (with a subclass for each specific type). Each tetrimino contains exactly four blocks, which are represented by arrays of coordinates. For each direction of movement, including rotation, each block's coordinate is updated and compared with corresponding blocks contained in an instance of the game's Well class.

```javascript
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
```

Tetriminos can only move in a specified direction if each of their blocks would still be within the confines of the well and none of them would occupy a block already taken by another piece.

```javascript
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
```

### Well

The game's well consists of a 10x20 grid of Blocks, each with its own `status` and `color` attributes. A block's `status` can either be 'filled' or 'empty', and the color represents the color of the piece occupying it, defaulting to white if it is empty. Once a piece is incapable of moving further, its position is fixed in the well, and the corresponding blocks are updated accordingly.

```javascript
setFinalPosition() {
  this.blockCoords.forEach((coord) => {
    this.well.assignBlockStatus(coord, 'filled');
    this.well.assignBlockColor(coord, this.color);
  });
}
```

The well itself is rendered using HTML5's Canvas element.

```javascript
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
```

## Future Features

* Global high scores
