import {pieceToVirtualCell, rowColToID} from '../virtualBoard.js';
import {isFullByID, isEnemy, highlightMove, highlightKill} from "./actions.js";

function kingActions(king) {
    const moves = [-1, 0, 1];
    const {row, col} = pieceToVirtualCell(king);
    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < moves.length; j++) {
            let [newRow, newCol] = [row + moves[i], col + moves[j]];
            if (newRow > 8 || newRow < 1 || newCol > 8 || newCol < 1) continue;
            const cellID = rowColToID(newRow, newCol);
            const cell = document.getElementById(`${cellID}`);
            if (!isFullByID(cellID)) highlightMove(cell);
            if (isEnemy(cell, king)) highlightKill(cell);
        }
    }
}

export {kingActions};
