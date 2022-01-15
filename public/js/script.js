import {codes, idToName, nameToId} from "./pieces.js";

let playingFor = 'whites';
let [whites, blacks] = codes;

function board() {
    let boardHTML = '';
    let [start, end, comp, action] = playingFor === 'whites' ? [0, 8, (a, b) => a < b, 1] : [7, -1, (a, b) => a > b, -1];
    for (let i = start; comp(i, end); i += action) {
        let rowHTML = '<ul class="board-row">';
        for (let j = start; comp(j, end); j += action) {
            let className = (i % 2 !== j % 2) ? 'black' : 'white';
            let piece = fillRow(i, j);
            rowHTML += `<li class="${className}">${
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
            return;
        }
        // if we click another piece
        if (!isSelected) {         // if we click to select
            piece.setAttribute('id', 'highlight');
            if (curPiece) curPiece.removeAttribute('id');
            curPiece = piece;
            isSelected = true;
        } else {             // if we click to move
            let black = event.target.closest('.black');
            let cell = black ? black : event.target.closest('.white');
            cell.innerHTML = `<div class="piece" data-piece="${idToName(curPiece.innerText)}">${curPiece.innerText}</div>`;
            curPiece.parentElement.innerHTML = '';
            isSelected = false;
        }
    });
}

function selectSide() {
    document.querySelector('#select-side').addEventListener('change', () => {
        const form = document.querySelector('.settings');
        const data = new FormData(form);
        playingFor = data.get('select-side');
        board();
    });
}

board();
movePieces();
selectSide();



