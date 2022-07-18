'use strict'
var GHOST = `<img src="IMG/ghost1.png">`;
var gGhosts = []
var gIntervalGhosts;
var gIdx = 0
function createGhost(I = 3, J = 3) {
    // TODO
    gIdx++
    var ghost = {
        location: { i: I, j: J },
        currCellContents: FOOD,
        imgSrc: `<img src="IMG/ghost${gIdx}.png">`
    }
    gGhosts.push(ghost)
    gBoard[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts() {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        if (i === 0) createGhost(3, 3)
        else if (i === 1) createGhost(3, 5)
        else createGhost(1, 7)
    }
    gIntervalGhosts = setInterval(moveGhosts, 400)
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}
function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff(ghost)
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) {
        renderCell(ghost.location, getGhostHTML(ghost))
        return
    }
    if (nextCell === GHOST) {
        renderCell(ghost.location, getGhostHTML(ghost))
        return
    }


    // TODO: hitting a pacman?  call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gGame.isOn = false
        openGameOverModal()
        return
    }
    else if (nextCell === PACMAN && gPacman.isSuper) {
        gBoard[ghost.location.i][ghost.location.j] === EMPTY
        renderCell(ghost.location, EMPTY)

        gGhosts.splice(1, 1)

        return
    }

    // TODO: moving from current position:
    // TODO: update the model

    // Restore the prev cell contents
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContents

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContents)

    // TODO: Move the ghost to new location
    // TODO: update the model

    // Save the new cell contents so we can restore later
    ghost.currCellContents = gBoard[nextLocation.i][nextLocation.j]

    ghost.location = nextLocation

    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff(ghost, isWall = true) {
    // var randNum = getRandomIntInclusive(1, 100)

    // if (randNum <= 25) {
    //     return { i: 0, j: 1 }
    // } else if (randNum <= 50) {
    //     return { i: -1, j: 0 }
    // } else if (randNum <= 75) {
    //     return { i: 0, j: -1 }
    // } else {
    //     return { i: 1, j: 0 }
    // }

    var pacmanI = gPacman.location.i
    var pacmanJ = gPacman.location.j
    var ghostI = ghost.location.i
    var ghostJ = ghost.location.j
    var diffI = Math.abs(pacmanI - ghostI)
    var diffJ = Math.abs(pacmanJ - ghostJ)

    if (diffI > diffJ) {
        if (pacmanI > ghostI) return { i: 1, j: 0 }
        else return { i: -1, j: 0 }
    }
    else {
        if (pacmanJ > ghostJ) return { i: 0, j: 1 }
        else return { i: 0, j: -1 }
    }
}
function getGhostHTML(ghost) {
    return `<span>${ghost.imgSrc}</span>`
}