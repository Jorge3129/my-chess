import {virtualBoard} from "./moves.js";

function rowColToID(row, col) {
    return (row - 1) * 8 + col;
}

function idToRowCol(id) {
    return [Math.ceil(id / 8), id % 8 !== 0 ? id % 8 : 8];
}

function idToArrayRowCol(id) {
    return [Math.ceil(id / 8) - 1, id % 8 !== 0 ? id % 8 - 1 : 7];
}

function getFromVirtualBoard(id) {
    const [row, col] = idToArrayRowCol(id);
    return virtualBoard[row][col];
}

function getVirtualCell(cell) {
    const virtualCellID = Number(cell.getAttribute('id'));
    return getFromVirtualBoard(virtualCellID);
}

function pieceToVirtualCell(piece) {
    return getVirtualCell(piece.parentElement);
}

function pieceToVirtualPiece(piece) {
    return pieceToVirtualCell(piece).piece;
}

export {rowColToID, idToArrayRowCol, getFromVirtualBoard, getVirtualCell, pieceToVirtualCell, pieceToVirtualPiece};
