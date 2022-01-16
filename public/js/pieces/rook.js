import {pieceToVirtualCell, rowColToID} from '../virtualBoard.js';
import {isFullByID, isEnemy, highlightMove, highlightKill} from "./actions.js";

function rookActions(rook) {
    const moves = [-1, 0, 1];
    const {row, col} = pieceToVirtualCell(rook);
    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < moves.length; j++) {
            let [newRow, newCol] = [row + moves[i], col + moves[j]];
            if (newRow > 8 || newRow < 1 || newCol > 8 || newCol < 1 || Math.abs(moves[i]) === Math.abs(moves[j])) continue;
            while (true) {
                const cellID = rowColToID(newRow, newCol);
                const cell = document.getElementById(`${cellID}`);
                if (!isFullByID(cellID)) {
                    highlightMove(cell);
                    [newRow, newCol] = [newRow + moves[i], newCol + moves[j]];
                    if (newRow > 8 || newRow < 1 || newCol > 8 || newCol < 1) break;
                    continue;
                }
                if (isEnemy(cell, rook)) highlightKill(cell);
                break;
            }
        }
    }
}

export {rookActions};
