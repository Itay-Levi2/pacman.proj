'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍬'
const CHERRY = '🍒'


var gCherryInterval
var gGame
var gBoard


function onInit() {

    gGame = {
        score: 0,
        isOn: true,
        isVictory: false,
        foodCount: 0
    }

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    closeModal()
    gCherryInterval = setInterval(addCherry, 15000)
    resetScore()

}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    addSuperFood(board)
    return board
}

function addSuperFood(board) {
    board[1][1] = SUPERFOOD
    board[1][board[0].length - 2] = SUPERFOOD
    board[board.length - 2][1] = SUPERFOOD
    board[board.length - 2][board[0].length - 2] = SUPERFOOD
    gGame.foodCount -= 4
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
    // elScore.innerText = gGame.score

}

// setInterval()
function addCherry() {
    const emptyLocation = findEmptyLocation(gBoard)
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY)

}


function findEmptyLocation(board) {
    const emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
    
}


function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    var msg = gGame.isVictory ? 'you win!' : 'game over'
    openModal(msg)
}

function checkVictory() {
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
        }

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elSpan = elModal.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function resetScore() {
    gGame.score = 0
    const elScore = document.querySelector('span')
    elScore.innerText = 0
}