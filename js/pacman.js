'use strict'
var PACMAN = '<img src="IMG/pacman.png">';

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: { i: 5, j: 7 },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    checkIsWin()

    if (!gGame.isOn) return
    console.log(gIdx);
    // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)

    // TODO: return if cannot move
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return

    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gGame.isOn = false
        openGameOverModal()
        return
    }
    else if (nextCell === GHOST && gPacman.isSuper) {

        var idx
        for (var i = 0; i < gGhosts.length; i++) {
            if (nextLocation.i === gGhosts[i].location.i &&
                nextLocation.j === gGhosts[i].location.j) idx = i
        }
        if (gGhosts[idx].currCellContents === FOOD) updateScore(1)
        gGhosts.splice(idx, 1)
        gIdx--
        setTimeout(createGhost, 5000)



    }


    // TODO: moving from corrent position:
    // TODO: update the model
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        PACMAN = '<img src="IMG/pacmanSuper.png">'
        setTimeout(isSuperPacman, 5000)
    }
    if (nextCell === CHERRY) updatePoints()
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}
function getNextLocation(ev) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    // TODO: figure out nextLocation
    switch (ev.code) {
        case 'ArrowUp': {
            nextLocation.i--
            if (!gPacman.isSuper) PACMAN = `<img src="IMG/pacmanUp.png">`
        }
            break;

        case 'ArrowDown': {
            nextLocation.i++
            if (!gPacman.isSuper) PACMAN = `<img src="IMG/pacman.png">`
        }
            break;

        case 'ArrowLeft': {
            nextLocation.j--
            if (!gPacman.isSuper) PACMAN = `<img src="IMG/pacmanL.png">`
        }
            break;

        case 'ArrowRight': {
            nextLocation.j++
            if (!gPacman.isSuper) PACMAN = `<img src="IMG/pacmanR.png">`
        }
            break;
    }
    return nextLocation;
}


function isSuperPacman() {
    gPacman.isSuper = false
    PACMAN = '<img src="IMG/pacman.png">';

}