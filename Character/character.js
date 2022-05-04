let getCharacterBtn = document.getElementById('getCharacter');

const displayRandomCharacter = () => {
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

        document.getElementById('characterCard').appendChild(charCard);
        charCard.classList.add('charCard');

        charCard.appendChild(charName);
        charCard.appendChild(charImg);
        charCard.appendChild(charOcc);
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
    console.log(charName)

    axios.get(`https://bobsburgers-api.herokuapp.com/characters?name=${charName}`)
    .then((res) => {
        let searchedChar = res.data;
        console.log(searchedChar)
        let charCard = document.createElement('div');
        let charName = document.createElement('h4');
        let charImg = document.createElement('img');
        let charOcc = document.createElement('p');
        let favoritesBtn = document.createElement('button');

        document.getElementById('characterCard').appendChild(charCard);
        charCard.classList.add('charCard');

        charCard.appendChild(charName);
        charCard.appendChild(charImg);
        charCard.appendChild(charOcc);
        charCard.appendChild(favoritesBtn);
        favoritesBtn.innerHTML = 'Add to Favorites';


        charName.innerHTML = searchedChar[0].name;
        charImg.src = searchedChar[0].image;
        charOcc.innerHTML = searchedChar[0].occupation;
    })
    .catch(err => console.log(err));
}

searchForm.addEventListener('submit', searchForCharacter);


const saveChar = (e) => {
    e.preventDefault();

    let body = {
        
    }
}

favoritesBtn.addEventListener('click', saveChar);
