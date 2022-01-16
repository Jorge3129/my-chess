import {pieceToVirtualCell, rowColToID} from '../virtualBoard.js';
import {isFullByID, isEnemy, highlightMove, highlightKill} from "./actions.js";

function knightActions(knight) {
    const moves = [-2, -1, 1, 2];
    const {row, col} = pieceToVirtualCell(knight);
    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < moves.length; j++) {
            const [newRow, newCol] = [row + moves[i], col + moves[j]];
            if (newRow > 8 || newRow < 1 || newCol > 8 || newCol < 1 || Math.abs(moves[i]) === Math.abs(moves[j])) continue;
            const cellID = rowColToID(newRow, newCol);
            const cell = document.getElementById(`${cellID}`);
            if (isEnemy(cell, knight)) highlightKill(cell);
            else if (!isFullByID(cellID)) highlightMove(cell);
        }
    }
}

export {knightActions};
