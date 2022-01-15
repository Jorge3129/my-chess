import {codes, idToName, nameToId} from "./pieces.js";
let [whites, blacks] = codes;

function board(playingFor) {
    let boardHTML = '';
    let [start, end, comp, action] = playingFor === 'whites' ? [0, 8, (a, b) => a < b, 1] : [7, -1, (a, b) => a > b, -1];
    for (let i = start; comp(i, end); i += action) {
        let rowHTML = '<ul class="board-row">';
        for (let j = start; comp(j, end); j += action) {
            let className = (i % 2 !== j % 2) ? 'black' : 'white';
            let piece = fillRow(i, j);
            rowHTML += `<li class="${className}" 
                            id="cell-${j + 8 * i + 1}" 
                            data-row="${i + 1}"
                            data-col="${j + 1}"
                            data-is-full=${piece ? 'true' : 'false'}>
            <span class="index">${j + 8 * i + 1}</span>
            ${
                piece ? `<div class="piece" data-piece="${idToName(piece)}">${piece}</div>` : ''
            }</li>`;
        }
        rowHTML += '</ul>';
        boardHTML += rowHTML;
    }
    const board = document.querySelector('#board-list');
    board.innerHTML = boardHTML;
}

function fillRow(row, col) {
    switch (row) {
        case 0:
            return blacks[col];
        case 1:
            return blacks[8];
        case 7:
            return whites[col];
        case 6:
            return whites[8];
        default:
            return '';
    }
}

let isSelected = false;

function movePieces() {
    let curPiece;
    document.querySelector('#board-list').addEventListener('click', (event) => {
        let piece = event.target.closest('.piece');
        if (!piece && !isSelected) return;
        // if we click the already selected piece
        if (piece === curPiece) {
            curPiece = null;
            piece.removeAttribute('id');
            isSelected = false;
            document.querySelectorAll('.move').forEach((el) => el.classList.remove('move'));
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
            let black = event.target.closest('.black');
            let cell = black ? black : event.target.closest('.white');
            cell.innerHTML = `<div class="piece" data-piece="${curPiece.getAttribute('data-piece')}">${curPiece.innerText}</div>`;
            cell.setAttribute('data-is-full', 'true');
            curPiece.parentElement.setAttribute('data-is-full', 'false');
            curPiece.parentElement.innerHTML = '';
            document.querySelectorAll('.move').forEach((el) => el.classList.remove('move'));
            isSelected = false;
        }
    });
}

function showMovesForPiece(piece) {
    const [color, type] = piece.getAttribute('data-piece').split('-');
    if (type === 'pawn') {
        showPawnMoves(piece, color === 'white');
    }
}

function showPawnMoves(pawn, isWhite) {
    const [sign, edge] = isWhite ? [-1, 8] : [1, 1];
    if (pawn.parentElement.getAttribute('data-row') === `${edge + sign}`) {
        pawnStep(pawn, 16 * sign);
    }
    pawnStep(pawn, 8 * sign);
    pawnAttack(pawn, sign);
}

function pawnStep(piece, diff) {
    let cellID = parseInt(piece.parentElement.getAttribute('id').replace('cell-', ''), 10) + diff;
    let cell = document.getElementById(`cell-${cellID}`);
    if (!cell) return;
    if (!isFull(cell)) {
        highlightMove(cell);
    }
}

function pawnAttack(pawn, sign) {
    let parent = pawn.parentElement;
    let row = Number(parent.getAttribute('data-row')) + sign;
    let col1 = Number(parent.getAttribute('data-col')) + 1;
    let col2 = col1 - 2;
    if (row > 8 || row < 1) return;
    if (col1 <= 8 && col1 >= 1) {
        let cell = document.getElementById(`cell-${(row - 1) * 8 + col1}`);
        if (isFull(cell)) highlightMove(cell);
    }
    if (col2 <= 8 && col2 >= 1) {
        let cell = document.getElementById(`cell-${(row - 1) * 8 + col2}`);
        if (isFull(cell)) highlightMove(cell);
    }
}

function isFull(cell) {
    return cell.getAttribute('data-is-full') === 'true';
}

function highlightMove(cell) {
    cell.classList.add('move');
}

export {board, movePieces}
