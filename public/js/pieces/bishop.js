import {pieceToVirtualCell, rowColToID} from '../virtualBoard.js';
import {isFullByID, isEnemy, highlightMove, highlightKill} from "./actions.js";

function bishopActions(bishop) {
    const moves = [-1, 1];
    const {row, col} = pieceToVirtualCell(bishop);
    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < moves.length; j++) {
            let [newRow, newCol] = [row + moves[i], col + moves[j]];
            if (newRow > 8 || newRow < 1 || newCol > 8 || newCol < 1) continue;
            while (true) {
                const cellID = rowColToID(newRow, newCol);
                const cell = document.getElementById(`${cellID}`);
                if (!isFullByID(cellID)) {
                    highlightMove(cell);
                    [newRow, newCol] = [newRow + moves[i], newCol + moves[j]];
                    if (newRow > 8 || newRow < 1 || newCol > 8 || newCol < 1) break;
                    continue;
                }
                if (isEnemy(cell, bishop)) highlightKill(cell);
                break;
            }
        }
    }
}

export {bishopActions};
