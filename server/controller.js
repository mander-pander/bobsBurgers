require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    createUser: (req, res) => {
        let {username, password} = req.body;
        sequelize.query(`
            INSERT INTO users
            (username, password)
            VALUES ('${username}', '${password}');
        `)
        .then(() => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },

    loginUser: (req, res) => {
        let {username, password} = req.body;

        sequelize.query(`
            SELECT FROM users
            WHERE username = ${username}
            AND password = ${password};
        `)
        .then(()=> {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },

    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username varchar(100),
            password varchar(100)
        );

        CREATE TABLE IF NOT EXISTS favChars (
            char_id SERIAL PRIMARY KEY,
            name varchar(100),
            img varchar(200),
            occupation varchar(200),
            user_id INT NOT NULL REFERENCES users(user_id)
        );

        CREATE TABLE IF NOT EXISTS favBurgers (
            burger_id SERIAL PRIMARY KEY,
            name varchar(250),
            price varchar(50),
            user_id INT NOT NULL REFERENCES users(user_id)
        );
        `).then(() => {
            console.log('DB Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding DB', err))
    }
}
// const BASE_URL = 'https://bobsburgers-api.herokuapp.com';

// module.exports = {
//     getCharacters: (req, res) => {
//         (res.status(200).send(`${BASE_URL}/characters`))

//     },
//     getTest: (req, res) => {
//         console.log('cowman')
//         axios
//         .get(`${BASE_URL}/characters`)
//         .then(res => {
//             console.log(`statusCode: ${res.status}`)
//             console.log(res)
//         })
//         .catch(error => {
//             console.error(error)
//         });
//         res.status(200).send('cowwoman')
//     }
// }
