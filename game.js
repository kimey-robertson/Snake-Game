import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection, snakeBody } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'  
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')
const scoreBoard = document.getElementById('score-board')

// This main game tick function. window.requestAnimationFrame(main) is basically creating a game tick, 
// i.e. a function that runs every second to calculate snake speed and run the two main game functions, update() and draw()

function main(currentTime) {
    if (gameOver) {
        if (confirm(`You lost. Your score was ${snakeBody.length - 1}. Press ok to restart.`)) {
            window.location = '/Snake-Game/'
        }
        return
    }

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
    updateScore()
    checkDeath()
    
}

function draw() {
    // The purpose of this line is just to essentially reset each part of the grid in the gameboard, so that only elements
    // that have been created by the draw() function in snake.js are rendering.
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function updateScore() {
    scoreBoard.innerHTML = `Score: ${snakeBody.length - 1}`
}