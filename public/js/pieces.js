const names = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
const indices = [2, 4, 3, 1, 0, 3, 4, 2, 5];

const [whiteStart, blackStart] = [12, 18];

const whiteCodes = indices.map((index) => `&#98${whiteStart + index};`);
const blackCodes = indices.map((index) => `&#98${blackStart + index};`);
const codes = [whiteCodes, blackCodes];

function idToName(id) {
    let index = Number(id.substring(4, 6)) - 18;
    return index > 0 ? 'black-' + names[index] : 'white-' + names[index + 6];
}

function nameToId(name) {
    let [side, piece] = name.split('-');
    let start = side === 'white' ? 12 : 18;
    let index = names.indexOf(piece);
    return `&#98${start + index};`
}

export {codes, idToName, nameToId};
