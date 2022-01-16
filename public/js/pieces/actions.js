import {getFromVirtualBoard, getVirtualCell, pieceToVirtualPiece} from "../virtualBoard.js";

function isEnemy(cell, piece) {
    const destCell = getVirtualCell(cell);
    const srcPiece = pieceToVirtualPiece(piece);
    if (!destCell.full) return false;
    const destPiece = destCell.piece;
    return destPiece.color !== srcPiece.color;
}

//alert(`The ${srcPiece.color} ${srcPiece.type} attacked the ${destPiece.color} ${destPiece.type}`);

function isFull(cell) {
    const virtualCell = getVirtualCell(cell);
    return virtualCell.full;
}

function isFullByID(id) {
    const virtualCell = getFromVirtualBoard(id);
    return virtualCell.full;
}

function highlightMove(cell) {
    cell.classList.add('move');
}

function highlightKill(cell) {
    cell.classList.add('kill');
}

export {isEnemy, isFull, isFullByID, highlightMove, highlightKill}
