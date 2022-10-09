import { update as updateSnake, draw as drawSnake, snakeSpeed } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'  

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board')

// This main game tick function. window.requestAnimationFrame(main) is basically creating a game tick, 
// i.e. a function that runs every second to calculate snake speed and run the two main game functions, update() and draw()

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
}

function draw() {
    // The purpose of this line is just to essentially reset each part of the grid in the gameboard, so that only elements
    // that have been created by the draw() function in snake.js are rendering.
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}