'use strict'

const PACMAN = '😷'

var PACMAN_ING = '<img src="/img/pacman-right.png">'

var gPacman


function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    renderCell(gPacman.location, PACMAN_ING)
    gFoodRemains--

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)

        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodRemains--

    } else if (nextCell === CHERRY) {
        updateScore(10)

    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return

        updateScore(1)
        gFoodRemains--
        gPacman.isSuper = true
        setTimeout(endSuperPower, 5000)//gSuperTimer =

    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN_ING)


    if (!gFoodRemains) {
        document.querySelector('.modal span').innerText = 'victory!'
        // renderCell(gPacman.location, 'pacman')
        gameOver()
    }
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            PACMAN_ING = '<img src="/img/pacman-up.png">'
            break
        case 'ArrowRight':
            nextLocation.j++
            PACMAN_ING = '<img src="/img/pacman-right.png">'
            break
        case 'ArrowDown':
            nextLocation.i++
            PACMAN_ING = '<img src="/img/pacman-down.png">'
            break
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN_ING = '<img src="/img/pacman-left.png">'
            break
    }
    return nextLocation
}


function endSuperPower() {
    gPacman.isSuper = false
    // gGhosts.splice(0,0,gDeadGhosts)
    // gGhosts = gGhosts.concat(gDeadGhosts)
    for (var i = 0; i < gDeadGhosts.length; i++) {
        const ghost = gDeadGhosts[i]
        gGhosts.push(ghost)
    }
    gDeadGhosts = []
    console.log(gGhosts, gDeadGhosts)

}


