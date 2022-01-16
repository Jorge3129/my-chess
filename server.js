const express = require('express');
const path = require("path");
const app = express();
const PORT = 3002;
let users = [{username: '1', password: '1', logged: false}, {username: '2', password: '2', logged: false}];

function findUser(username) {
    return users.find((obj) => obj.username === username);
}

app.use(express.static('public'));
app.use(
    express.urlencoded({
        extended: true
    })
)
app.set('view engine', 'ejs');

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (users.find((obj) => obj.username === username && obj.password === password)) {
        findUser(username).logged = true;
        res.send({success: true});
    } else {
        res.send({success: false});
    }
});

app.get('/:username', (req, res) => {
    console.log(req.params);
    const user = findUser(req.params.username);
    if (!user || !user.logged) {
        res.redirect('/');
    } else {
        res.render('index', {username: req.params.username, users: users});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!\nPlease visit http://localhost:3002/`);
})
