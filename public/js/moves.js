import {setVirtualBoard} from "./pieces.js";
import {pawnActions} from "./pieces/pawn.js";
import {getVirtualCell, pieceToVirtualPiece} from './virtualBoard.js';
import {knightActions} from "./pieces/knight.js";
import {bishopActions} from "./pieces/bishop.js";
import {rookActions} from "./pieces/rook.js";
import {kingActions} from "./pieces/king.js";

const virtualBoard = setVirtualBoard();
export {virtualBoard};

function board(playingFor) {
    let boardHTML = '';
    let [start, end, comp, action] = playingFor === 'whites' ? [0, 8, (a, b) => a < b, 1] : [7, -1, (a, b) => a > b, -1];
    for (let i = start; comp(i, end); i += action) {
        let rowHTML = '<ul class="board-row">';
        for (let j = start; comp(j, end); j += action) {
            const className = (i % 2 !== j % 2) ? 'black' : 'white';
            const piece = virtualBoard[i][j].piece;
            rowHTML += `<li class="${className}" id="${j + 8 * i + 1}">
            ${
                piece ? `<div class="piece" data-id="${piece.id}">${piece.code}</div>` : ''
            }</li>`;
        }
        rowHTML += '</ul>';
        boardHTML += rowHTML;
    }
    const board = document.querySelector('#board-list');
    board.innerHTML = boardHTML;
}

let isSelected = false;

function movePieces() {
    let curPiece;
    document.querySelector('#board-list').addEventListener('click', (event) => {
        const piece = event.target.closest('.piece');
        if (!piece && !isSelected) return;
        // if we click the already selected piece
        if (piece === curPiece) {
            curPiece = null;
            piece.removeAttribute('id');
            isSelected = false;
            document.querySelectorAll('.move').forEach((el) => el.classList.remove('move'));
            document.querySelectorAll('.kill').forEach((el) => el.classList.remove('kill'));
            return;
        }
        // if we click another piece
        if (!isSelected) {         // if we click to select
            piece.setAttribute('id', 'highlight');
            if (curPiece) curPiece.removeAttribute('id');
            curPiece = piece;
            isSelected = true;
            showMovesForPiece(curPiece);

        } else {             // if we click to move
            const black = event.target.closest('.black');
            const cell = black ? black : event.target.closest('.white');
            // possible errors
            if (!cell) return;
            if (!cell.classList.contains('move') && !cell.classList.contains('kill')) return;

            // getting cell objects from virtual board
            const virtualDestCell = getVirtualCell(cell);
            const virtualSrcCell = getVirtualCell(curPiece.parentElement);

            // moving piece object from source to destination
            const piece = virtualSrcCell.piece;
            cell.innerHTML = `<div class="piece" id="${piece.id}">${piece.code}</div>`;
            virtualDestCell.full = true;
            virtualDestCell.piece = piece;
            virtualSrcCell.full = false;
            curPiece.parentElement.innerHTML = '';
            console.log(`${piece.id}: ${virtualSrcCell.id} -> ${virtualDestCell.id}`)

            // remove possible moves highlighting
            document.querySelectorAll('.move').forEach((el) => el.classList.remove('move'));
            document.querySelectorAll('.kill').forEach((el) => el.classList.remove('kill'));
            isSelected = false;
        }
    });
}

function showMovesForPiece(piece) {
    const virtualPiece = pieceToVirtualPiece(piece);
    const [color, type] = virtualPiece.id.split('-');

    switch (type) {
        case 'pawn':
            pawnActions(piece, color === 'white');
            break;
        case 'knight':
            knightActions(piece);
            break;
        case 'bishop':
            bishopActions(piece);
            break;
        case 'rook':
            rookActions(piece);
            break;
        case 'queen':
            bishopActions(piece);
            rookActions(piece);
            break;
        case 'king':
            kingActions(piece);
            break;
    }
}

export {board, movePieces};
