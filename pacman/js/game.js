'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = 'o'
const CHERRY = '&'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFoodRemains


var gPlaceCherryInterval


function onInit() {
    gNextId = 101  //maybe not here
    console.log('hello')
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    createPacman(gBoard)
    createGhosts(gBoard)
    gGame.isOn = true
    document.querySelector('.modal').style.display = 'none'
    gPlaceCherryInterval = setInterval(placeCherry, 15000)
    // if (gPlaceCherryInterval) {
    //     clearInterval(gPlaceCherryInterval)
    // }

}

function buildBoard() {
    const size = 10
    const board = []
    gFoodRemains = size * size //- 1 for pacman: done

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodRemains--
            }
        }
    }
    board[1][1] = board[8][1] = board[1][8] = board[8][8] = SUPER_FOOD
    gFoodRemains -= 4
    console.log(gFoodRemains)
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gPlaceCherryInterval)
    gGhosts = []
    gGame.isOn = false
    document.querySelector('.modal').style.display = 'block'
}


function placeCherry() {
    const emptyCells = getCellsWithValue(gBoard, EMPTY)
    if (emptyCells.length === 0) return
    const emptyCell = getRandomItem(emptyCells)
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    setTimeout(() => {
        gBoard[emptyCell.i][emptyCell.j] = EMPTY  //put in diff function
        renderCell(emptyCell, EMPTY)
    }, 15000)
}