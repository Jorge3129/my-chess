import {board, movePieces} from "./moves.js";

let playingFor = 'whites';
let loggedIn = false;

function selectSide() {
    document.querySelector('#select-side').addEventListener('change', () => {
        const form = document.querySelector('.settings');
        const data = new FormData(form);
        playingFor = data.get('select-side');
        board(playingFor);
    });
}

board(playingFor);
movePieces();
selectSide();


let loginDiv = document.createElement('div');
loginDiv.setAttribute('class', 'login-back');
loginDiv.innerHTML = `<form class="login-form">
            <div class="login-signup">
                <button class="login-title" id="login-title">Login</button>
                <button class="login-title" id="signup-title">Sign up</button>
            </div>
            <label for="username">Username: </label>
            <input type="text" name="username">
            <label for="password">Password: </label>
            <input type="password" name="password">
            <button class="login-ok-btn">Ok</button>
        </form>`
document.body.appendChild(loginDiv);
document.querySelector('.login-form').addEventListener('submit', (e) => {
    e.preventDefault();
});
document.querySelector('#login-title').classList.add('underline');

document.querySelector('.login-signup').addEventListener('click', (e) => {
    document.querySelector('.underline').classList.remove('underline');
    e.target.closest('.login-title').classList.add('underline');
});

document.querySelector('.login-ok-btn').addEventListener('click',()=>{

});



