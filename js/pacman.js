'use strict'

const PACMAN = '😷'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCount--

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhosts()
        } else {
            gameOver()
            return
        }
    } else if (nextCell === FOOD) {
        handleFood()
    } else if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        handleSuperFood()
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }

// DONE: moving from current location:
// DONE: update the model
gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
// DONE: update the DOM
renderCell(gPacman.location, EMPTY)

// DONE: Move the pacman to new location:
// DONE: update the model
gPacman.location = nextLocation
gBoard[nextLocation.i][nextLocation.j] = PACMAN
// DONE: update the DOM
console.log(gPacman.deg)
renderCell(nextLocation, getPacmanHtml(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.deg = -90
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = 0
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = 90
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = 180
            nextLocation.j--
            break;
    }
    // DONE: figure out nextLocation
    return nextLocation
}

function getPacmanHtml(deg) {
return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}

function handleFood() {
    gGame.foodCount--
    updateScore(1)
    checkVictory()
}

function handleSuperFood() {
    gPacman.isSuper = true
    renderGhosts()
    setTimeout(() => {
        gPacman.isSuper = false
        renderGhosts()
    }, 5000)
}