import {pieceToVirtualCell} from '../virtualBoard.js';
import {isFull, isFullByID, isEnemy, highlightMove, highlightKill} from "./actions.js";

function pawnActions(pawn, isWhite) {
    const [sign, edge] = isWhite ? [-1, 8] : [1, 1];
    const virtualCell = pieceToVirtualCell(pawn);
    if (virtualCell.row === edge + sign && !isFullByID(virtualCell.id + sign * 8)) {
        pawnMove(pawn, 16 * sign);
    }
    pawnMove(pawn, 8 * sign);
    pawnKill(pawn, sign);
}

function pawnMove(piece, diff) {
    let cellID = pieceToVirtualCell(piece).id + diff;
    let cell = document.getElementById(`${cellID}`);
    if (!cell) return;
    if (!isFull(cell)) {
        highlightMove(cell);
    }
}

function pawnKill(pawn, sign) {
    const virtualCell = pieceToVirtualCell(pawn);
    let row = virtualCell.row + sign;
    let col1 = virtualCell.col + 1;
    let col2 = col1 - 2;
    if (row > 8 || row < 1) return;
    if (col1 <= 8 && col1 >= 1) {
        let cell = document.getElementById(`${(row - 1) * 8 + col1}`);
        if (isEnemy(cell, pawn)) highlightKill(cell);
    }
    if (col2 <= 8 && col2 >= 1) {
        let cell = document.getElementById(`${(row - 1) * 8 + col2}`);
        if (isEnemy(cell, pawn)) highlightKill(cell);
    }
}

export {pawnActions};
