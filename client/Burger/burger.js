let getBurgerBtn = document.getElementById('burgerBtn');
let userID = window.localStorage.getItem('userId');
let session = window.localStorage.getItem('isLoggedIn');

const displayFavorites = () => {
    let favoriteBurg = document.getElementById('favoriteBurg');
    favoriteBurg.innerHTML = '';

    if (session !== 'true') {
        window.location.href = '../Login/login.html'
    }

    axios.get('https://burgers-ag-capstone.herokuapp.com/faveBurgers', {
        params: {
            user_id: `${userID}`
        }
    })
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {

                let burger = document.createElement('div');
                let burgerName = document.createElement('h4');
                let burgerPrice = document.createElement('p');
                let deleteBtn = document.createElement('button')


                favoriteBurg.appendChild(burger);

                burger.appendChild(burgerName);
                burger.appendChild(burgerPrice);
                burger.appendChild(deleteBtn);

                burgerName.innerHTML = res.data[i].name;
                burgerPrice.innerHTML = res.data[i].price;

                deleteBtn.innerHTML = 'X';
                deleteBtn.dataset.burgerId = res.data[i].burger_id;

                deleteBtn.addEventListener('click', deleteFaveBurger);
            }
        })
        .catch(err => console.log(err))
}

const displayRandomBurger = () => {

    let burgerCard = document.getElementById('burgerCard');
    burgerCard.innerHTML = '';

    let session = window.localStorage.getItem('isLoggedIn');
    if (session !== 'true') {
        window.location.href = '../Login/login.html'
    }

    axios.get('https://bobsburgers-api.herokuapp.com/burgerOfTheDay/')
        .then((res) => {
            let randomIdx = Math.floor(Math.random() * res.data.length);

            let randomBurger = res.data[randomIdx];
            let burger = document.createElement('div');
            let burgerName = document.createElement('h4');
            let burgerPrice = document.createElement('p');
            let favoritesBtn = document.createElement('button');

            favoritesBtn.innerHTML = 'Add to Favorites';
            favoritesBtn.dataset.burgerName = randomBurger.name;
            favoritesBtn.dataset.burgerPrice = randomBurger.price;

            burgerCard.appendChild(burger);
            burger.classList.add('burger');

            burger.appendChild(burgerName);
            burger.appendChild(burgerPrice);

            favoritesBtn.addEventListener('click', saveBurger)
            burger.appendChild(favoritesBtn);

            burgerName.innerHTML = randomBurger.name;
            burgerPrice.innerHTML = randomBurger.price;
        })
        .catch(err => console.log(err));
}

getBurgerBtn.addEventListener('click', displayRandomBurger);



const saveBurger = (e) => {
    let { burgerName, burgerPrice } = e.currentTarget.dataset;

    let body = {
        name: `${burgerName}`,
        price: `${burgerPrice}`,
        user_id: `${userID}`
    };

    axios.post('https://burgers-ag-capstone.herokuapp.com/burgerCollection', body)
        .then(() => {
            displayFavorites();
        })
}

const deleteFaveBurger = (e) => {
    let params = {
        data: {
            burger_id: `${e.currentTarget.dataset.burgerId}`
        }
    };

    axios.delete('https://burgers-ag-capstone.herokuapp.com/faveBurgers/', { params })
        .then((res) => {
            displayFavorites();
        })
        .catch(err => console.log(err));
}

displayFavorites();
