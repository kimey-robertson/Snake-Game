import { getInputDirection } from "./input.js";

export let snakeSpeed = 6;
// snakeBody is an array of objects, each object being a rendered segment in the snake's body
export const snakeBody = [{ x: 11, y: 11}];
let newSegments = 0;

export function update() {
    addSegments()

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

    increaseSnakeSpeed()
    console.log(snakeSpeed)
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

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    // This loop essentially runs for the amount of times of the value of newSegments. It's going to append a new element
    // onto the end of our snakeBody array. It's taking the last element of snakeBody and duplicating it onto the end of 
    // the array
    for (let i = 0; i < newSegments; i++ ) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0;
}

function increaseSnakeSpeed() {
    if (snakeBody.length === 11) {
        snakeSpeed = 7
    }
    if (snakeBody.length === 21) {
        snakeSpeed = 8
    }
    if (snakeBody.length === 31) {
        snakeSpeed = 9
    }
    if (snakeBody.length === 41) {
        snakeSpeed = 10
    }
}