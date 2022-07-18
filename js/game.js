'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '*'
const CHERRY = '<img src="IMG/Cherry.png">'

var gBoard;
var gGame

var gInterval


function init() {
    console.log('hello pacman')
    closeGameOverModal()
    closeWinModal()
    gIdx = 0
    clearInterval(gInterval)
    clearInterval(gIntervalGhosts)
    gBoard = buildBoard()
    gGame = {
        score: 0,
        points: 0,
        isOn: false,
        foodAvaible: getFoodAvailble()
    }

    createPacman(gBoard);
    gGhosts = []
    createGhosts(gBoard);
    gInterval = setInterval(addRandomBonus, 15000)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function log() {
    console.table(gBoard)
}

function buildBoard() {
    const SIZE = 10;
    var board = [];

    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2) || (i === SIZE - 2 && j === 1) || (i === SIZE - 2 && j === SIZE - 2)) board[i][j] = SUPERFOOD
            else if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}
function updateScore(diff) {
    // TODO: update model and dom

    // Model
    gGame.score += diff

    // DOM
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

function updatePoints() {
    // TODO: update model and dom

    // Model
    gGame.points += 10

    // DOM
    var elScore = document.querySelector('.points')
    elScore.innerText = "points: " + gGame.points
}

function gameOver() {
    console.log('Game Over');
    // TODO

    gGame.isOn = false
    // Some more stuff coming later
}

function getFoodAvailble() {
    var board = gBoard
    var foodAvaible = -1
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (board[i][j] === FOOD) foodAvaible++
        }
    }
    return foodAvaible
}

function checkIsWin() {
    if (gGame.score === gGame.foodAvaible) {
        gGame.isOn = false
        openWinModal()
    }
}

function resetGame() {
    gGame.score = 0


}

function openWinModal() {
    var elModal = document.querySelector(".winModal")
    elModal.style.display = "flex"
    resetGame()
}

function closeWinModal() {
    var elModal = document.querySelector(".winModal")
    elModal.style.display = "none"
}

function openGameOverModal() {
    var elModal = document.querySelector(".gameOverModal")
    elModal.style.display = "flex"
    resetGame()
}

function closeGameOverModal() {
    var elModal = document.querySelector(".gameOverModal")
    elModal.style.display = "none"
}

function getRandomIntInc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//find empty cell 
function findEmetyCells() {
    var board = gBoard
    var emptyCells = []
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            if (board[i][j] === EMPTY) emptyCells.push({ i: i, j: j })
        }
    }
    return emptyCells
}
//return random empty cell
function getRandomEmetyCell() {
    var emptyCells = findEmetyCells()
    var randomEmptyCell = emptyCells[getRandomIntInc(0, emptyCells.length - 1)]
    return randomEmptyCell
}

function addRandomBonus() {
    var board = gBoard
    var cell = getRandomEmetyCell()
    board[cell.i][cell.j] = CHERRY
    printMat(gBoard, '.board-container')

    setTimeout(() => {
        board[cell.i][cell.j] = EMPTY;

        // prevent rerendering a game after a win
        printMat(gBoard, '.board-container')
    }, 5000);

}