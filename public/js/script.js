import {board, movePieces} from "./moves.js";

let playingFor = 'whites';

function selectSide() {
    document.querySelector('#select-side').addEventListener('change', () => {
        const form = document.querySelector('.settings');
        const data = new FormData(form);
        playingFor = data.get('select-side');
        board(playingFor);
    });
}

function setLogin() {
    const loginDiv = document.querySelector('.login-back');
    if (!loginDiv) return;

    document.querySelector('.login-form').addEventListener('submit', (e) => {
        e.preventDefault();
    });

    document.querySelector('#login-title').classList.add('underline');

    document.querySelector('.login-signup').addEventListener('click', (e) => {
        document.querySelector('.underline').classList.remove('underline');
        e.target.closest('.login-title').classList.add('underline');
    });


    document.querySelector('.login-ok-btn').addEventListener('click', () => {
        const form = document.querySelector('.login-form');
        const data = new FormData(form);
        (async () => {
            const rawResponse = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: data.get('username'),
                    password: data.get('password'),
                })
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content['success']) {
                location.href = `/${data.get('username')}`;
                document.querySelector('.login-back').remove();
            } else {
                alert('Wrong password or username');
                location.reload();
            }
        })();
    });
}

board(playingFor);
movePieces();
selectSide();
setLogin();



