let getCharacterBtn = document.getElementById('charButton');
let userID = window.localStorage.getItem('userId');


const displayFavorites = () => {
    let favoriteCharacters = document.getElementById('favoriteChar');
    favoriteCharacters.innerHTML = '';

    axios.get('http://localhost:5050/faveCharacters/', {
        params: {
            user_id: `${userID}`
        }
    })
    .then((res) => {
        // console.log(res.data)

        for(let i = 0; i <res.data.length; i++) {

            let charCard = document.createElement('div');
            let charName = document.createElement('h4');
            let charImg = document.createElement('img');
            let charOcc = document.createElement('p');

            favoriteCharacters.appendChild(charCard);

            charCard.appendChild(charName);
            charCard.appendChild(charImg);
            charCard.appendChild(charOcc);

            // debugger;
            charName.innerHTML = res.data[i].name;
            charImg.src = res.data[i].img;
            charOcc.innerHTML = res.data[i].occupation;
        }
    })
}

const displayRandomCharacter = () => {
    let characterCard = document.getElementById('characterResult');
    characterCard.innerHTML = '';

    axios.get('https://bobsburgers-api.herokuapp.com/characters/')
    .then((res) => {
        let randomIdx = Math.floor(Math.random() * res.data.length);
        // console.log('random char id:', res.data[randomIdx])
        let randomChar = res.data[randomIdx];
        let charCard = document.createElement('div');
        let charName = document.createElement('h4');
        let charImg = document.createElement('img');
        let charOcc = document.createElement('p');
        let favoritesBtn = document.createElement('button');
        // document.querySelector(favoritesBtn).addEventListener('click', saveChar);

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
        charOcc.innerHTML = randomChar.occupation;
        })
        .catch(err => console.log(err));
}

getCharacterBtn.addEventListener('click', displayRandomCharacter)



let charNameInput = document.getElementById('characterName');
let searchForm = document.getElementById('searchForm');


const searchForCharacter = (e) => {
    e.preventDefault();
    let charName= charNameInput.value;
    // console.log(charName)
    let characterCard = document.getElementById('characterResult');
    characterCard.innerHTML = '';

    axios.get(`https://bobsburgers-api.herokuapp.com/characters?name=${charName}`)
    .then((res) => {
        let searchedChar = res.data;
        // console.log(searchedChar)
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
        charOcc.innerHTML = searchedChar[0].occupation;
    })
    .catch(err => console.log(err));
}

searchForm.addEventListener('submit', searchForCharacter);


const saveChar = (e) => {

    // console.log(userID)
    let {charName, charImg, charOcc} = e.currentTarget.dataset;
    // console.log('dataset', e.currentTarget.dataset.charName);
    // debugger;
    let body = {
        name: `${charName}`,
        img: `${charImg}`,
        occupation: `${charOcc.replaceAll('/', ' ').replaceAll("'", "")}`,
        user_id: `${userID}`
    };
    // debugger;

    axios.post('http://localhost:5050/charCollection', body)
    .then(() => {
        displayFavorites();
    })
}

displayFavorites();
