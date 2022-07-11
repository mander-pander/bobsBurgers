let getCharacterBtn = document.getElementById('charButton');
let userID = window.localStorage.getItem('userId');
let session = window.localStorage.getItem('isLoggedIn');

const displayFavorites = () => {
    let favoriteCharacters = document.getElementById('favoriteChar');
    favoriteCharacters.innerHTML = '';

    if (session !== 'true') {
        window.location.href = '../Login/login.html'
    }

    axios.get('https://burgers-ag-capstone.herokuapp.com/faveCharacters/', {
        params: {
            user_id: `${userID}`
        }
    })
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {

                let charCard = document.createElement('div');
                let charName = document.createElement('h4');
                let charImg = document.createElement('img');
                let charOcc = document.createElement('p');
                let deleteBtn = document.createElement('button')

                favoriteCharacters.appendChild(charCard);

                charCard.appendChild(charName);
                charCard.appendChild(charImg);
                charCard.appendChild(charOcc);
                charCard.appendChild(deleteBtn);

                charName.innerHTML = res.data[i].name;
                charImg.src = res.data[i].img;

                deleteBtn.innerHTML = 'X';
                deleteBtn.dataset.charId = res.data[i].char_id;
                deleteBtn.addEventListener('click', deleteFaveChar);


                if (res.data[i].occupation === 'undefined') {
                    charOcc.innerHTML = '';
                } else {
                    charOcc.innerHTML = res.data[i].occupation;
                }
            }
        })
        .catch(err => console.log(err))
}

const displayRandomCharacter = () => {
    let session = window.localStorage.getItem('isLoggedIn');
    let characterCard = document.getElementById('characterResult');
    characterCard.innerHTML = '';

    if (session !== 'true') {
        window.location.href = '../Login/login.html'
    }

    axios.get('https://bobsburgers-api.herokuapp.com/characters/')
        .then((res) => {
            let randomIdx = Math.floor(Math.random() * res.data.length);
            let randomChar = res.data[randomIdx];
            let charCard = document.createElement('div');
            let charName = document.createElement('h4');
            let charImg = document.createElement('img');
            let charOcc = document.createElement('p');
            let favoritesBtn = document.createElement('button');

            characterCard.appendChild(charCard);
            charCard.classList.add('charCard');

            charCard.appendChild(charName);
            charCard.appendChild(charImg);
            charCard.appendChild(charOcc);

            favoritesBtn.innerHTML = 'Add to Favorites';
            favoritesBtn.dataset.charName = randomChar.name;
            favoritesBtn.dataset.charImg = randomChar.image;
            favoritesBtn.dataset.charOcc = randomChar.occupation;

            favoritesBtn.addEventListener('click', saveChar);
            charCard.appendChild(favoritesBtn);

            charName.innerHTML = randomChar.name;
            charImg.src = randomChar.image;
            if (randomChar.occupation) {
                charOcc.innerHTML = randomChar.occupation;
            }
        })
        .catch(err => console.log(err));
}

getCharacterBtn.addEventListener('click', displayRandomCharacter)

let charNameInput = document.getElementById('characterName');
let searchForm = document.getElementById('searchForm');

const searchForCharacter = (e) => {
    e.preventDefault();
    let charName = charNameInput.value;
    let characterCard = document.getElementById('characterResult');
    characterCard.innerHTML = '';

    axios.get(`https://bobsburgers-api.herokuapp.com/characters?name=${charName}`)
        .then((res) => {
            let searchedChar = res.data;
            let charCard = document.createElement('div');
            let charName = document.createElement('h4');
            let charImg = document.createElement('img');
            let charOcc = document.createElement('p');
            let favoritesBtn = document.createElement('button');

            characterCard.appendChild(charCard);
            charCard.classList.add('charCard');

            charCard.appendChild(charName);
            charCard.appendChild(charImg);
            charCard.appendChild(charOcc);
            favoritesBtn.innerHTML = 'Add to Favorites';
            favoritesBtn.dataset.charName = searchedChar[0].name;
            favoritesBtn.dataset.charImg = searchedChar[0].image;
            favoritesBtn.dataset.charOcc = searchedChar[0].occupation;

            favoritesBtn.addEventListener('click', saveChar);
            charCard.appendChild(favoritesBtn);

            charName.innerHTML = searchedChar[0].name;
            charImg.src = searchedChar[0].image;

            if (searchedChar[0].occupation) {
                charOcc.innerHTML = searchedChar[0].occupation;
            }
        })
        .catch(err => console.log(err));
}

searchForm.addEventListener('submit', searchForCharacter);

const saveChar = (e) => {

    let { charName, charImg, charOcc } = e.currentTarget.dataset;

    let body = {
        name: `${charName}`,
        img: `${charImg}`,
        occupation: `${charOcc.replaceAll('/', ' ').replaceAll("'", "")}`,
        user_id: `${userID}`
    };

    axios.post('https://burgers-ag-capstone.herokuapp.com/charCollection', body)
        .then(() => {
            displayFavorites();
        })
}

const deleteFaveChar = (e) => {
    let params = {
        data: {
            char_id: `${e.currentTarget.dataset.charId}`
        }
    };

    axios.delete('https://burgers-ag-capstone.herokuapp.com/faveCharacters/', { params })
        .then((res) => {
            displayFavorites();
        })
        .catch(err => console.log(err))
}

displayFavorites();
