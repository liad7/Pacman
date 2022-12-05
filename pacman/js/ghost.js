'use strict'

const GHOST = '&#9781'
var gGhosts = []
var gDeadGhosts = []
var gNextId = 101

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        id: gNextId++
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
            return
        }
        document.querySelector('.modal span').innerText = 'you lose'
        renderCell(gPacman.location, '🪦')
        gameOver()
        return
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) return `<span style="color: blue;">${GHOST}</span>`
    return `<span style="color: ${ghost.color};">${GHOST}</span>`
}


function killGhost(loc) {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        if (loc.i === ghost.location.i &&
            loc.j === ghost.location.j) {
            if (ghost.currCellContent === FOOD) {
                ghost.currCellContent = EMPTY
                gFoodRemains--
                if (!gFoodRemains) {
                    document.querySelector('.modal span').innerText = 'victory!'
                    // renderCell(gPacman.location, 'pacman')
                    gameOver()
                }
            }
            gDeadGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
            console.log(gGhosts, gDeadGhosts)
        }

    }

}


