import { getInputDirection } from "./input.js";

export const snakeSpeed = 5;
// snakeBody is an array of objects, each object being a rendered segment in the snake's body
const snakeBody = [{ x: 11, y: 11}];
let newSegments = 0;

export function update() {
    // console.log(snakeBody[0])
    // This is is taking keyboard input from input.js
    const inputDirection = getInputDirection()
    // This for loop is starting at the 2nd to last segment of snakeBody, and looping backwards. Each iteration is
    // essentially putting the last segment of snakeBody into the position of the second last segment. This continues for
    // every segment of snakeBody except for the first segment (the head)
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    // This is determining the direction and movement of the head of snakeBody based on keyboard input
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    // This forEach function is creating a new div for each segment of snakeBody, as well as determining the posistion,
    // adding the style, and appending that div to the gameboard
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position) {
    return snakeBody.some(segment => {
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

