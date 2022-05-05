const express = require('express');
const cors = require('cors');
// const axios = require('axios');

require('dotenv').config()
const {SERVER_PORT} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

const {
    createUser,
    loginUser,
    saveChar,
    saveBurger,
    displayFaveChar,
    displayFaveBurger
} = require('./controller');


// app.post('/db', () => {
//     seed();
// })

app.post('/user', createUser);
app.post('/login', loginUser);
app.post('/charCollection', saveChar);
app.post('/burgerCollection', saveBurger);
app.get('/faveCharacters', displayFaveChar);
app.get('/faveBurgers', displayFaveBurger);

app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`));
