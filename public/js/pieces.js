const names = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']; // names of chess pieces
const indices = [2, 4, 3, 1, 0, 3, 4, 2, 5, 5, 5, 5, 5, 5, 5, 5]; // indices of chess pieces
const [whiteStart, blackStart] = [12, 18];

/**
 * Convert UTF code to chess piece name with color
 * @param id
 * @returns {string}
 */
function codeToName(id) {
    let index = Number(id.substring(4, 6)) - 18;
    return index >= 0 ? 'black-' + names[index] : 'white-' + names[index + 6];
}

/**
 * Convert UTF code to chess piece name without color
 * @param id
 * @returns {string}
 */
function codeToHalfName(id) {
    let index = Number(id.substring(4, 6)) - 18;
    return index >= 0 ? names[index] : names[index + 6];
}

/**
 * Convert to chess piece name to UTF code
 * @param name
 * @returns {string}
 */
function nameToCode(name) {
    let [side, piece] = name.split('-');
    let start = side === 'white' ? 12 : 18;
    let index = names.indexOf(piece);
    return `&#98${start + index};`
}

/**
 * Returns two arrays with chess piece objects for each side
 * @returns {{code: string, id: string}[][]}
 */
function createMaps() {
    const count = [];

    function pieceObject(index, white) {
        const start = white ? whiteStart : blackStart;
        const code = `&#98${start + index};`
        return {
            code,
            id: codeToName(code) + '-' + (++count[names.indexOf(codeToHalfName(code))]),
            color: codeToName(code).split('-')[0],
            type: codeToName(code).split('-')[1],
        };
    }

    for (let i = 0; i < 6; i++) {
        count[i] = 0;
    }
    const whites = indices.map((index) => pieceObject(index, true));
    for (let i = 0; i < 6; i++) {
        count[i] = 0;
    }
    const blacks = indices.map((index) => pieceObject(index, false));
    return [whites, blacks];
}

const [whites, blacks] = createMaps();

function setVirtualBoard() {
    const arr = [];
    for (let i = 0; i < 8; i++) {
        arr[i] = [];
        for (let j = 0; j < 8; j++) {
            arr[i][j] = {full: false, id: j + 8 * i + 1, row: i + 1, col: j + 1, piece: null};
        }
    }
    //set black player
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 8; j++) {
            arr[i][j].piece = blacks[j + 8 * i];
            arr[i][j].full = true;
        }
    }
    // set white player
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 8; j++) {
            arr[7 - i][7 - j].piece = whites[j + 8 * i];
            arr[7 - i][7 - j].full = true;
        }
    }
    return arr;
}

export {setVirtualBoard, codeToName, nameToCode};
