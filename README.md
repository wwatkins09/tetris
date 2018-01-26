# Tetris

<img src="https://i.imgur.com/8lk59II.png" />

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

Each game piece (or "tetrimino") is represented by an instance of the Tetrimino class (with a subclass for each specific type). Each tetrimino contains exactly four blocks, which are represented by arrays of coordinates. For each direction of movement, including rotation, each block's coordinate is updated and compared with corresponding blocks contained in an instance of the game's Well class. Tetriminos can only move in a specified direction if each of their blocks would still be within the confines of the well and none of them would occupy a block already taken by another piece.

### Well

The game's well consists of a 10x20 grid of Blocks, each with its own `status` and `color` attributes. A block's `status` can either be 'filled' or 'empty', and the color represents the color of the piece occupying it, defaulting to white if it is empty. Once a piece is incapable of moving further, its position is fixed in the well, and the corresponding blocks are updated accordingly. The well itself is rendered using HTML5's Canvas element.

## Future Features

* Global high scores
