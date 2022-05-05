let getBurgerBtn = document.getElementById('burgerBtn');
let userID = window.localStorage.getItem('userId');

const displayFavorites = () => {
    let favoriteBurg = document.getElementById('favoriteBurg');

    axios.get('http://localhost:5050/faveBurgers', {
        params: {
            user_id: `${userID}`
        }
    })
    .then((res) => {


        for(let i = 0; i < res.data.length; i++) {

            let burger = document.createElement('div');
            let burgerName = document.createElement('h4');
            let burgerPrice = document.createElement('p');

            favoriteBurg.appendChild(burger)

            burger.appendChild(burgerName);
            burger.appendChild(burgerPrice);

            // debugger;

            console.log('res.data[i]', res.data[i])

            burgerName.innerHTML = res.data[i].name;
            burgerPrice.innerHTML = res.data[i].price;
        }
    })
}



const displayRandomBurger = () => {

    let session = window.localStorage.getItem('isLoggedIn');
    // console.log(typeof session)
    // debugger;

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

            document.getElementById('burgerCard').appendChild(burger);
            burger.classList.add('burger');
            console.log(randomBurger)

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
    let {burgerName, burgerPrice} = e.currentTarget.dataset;

    let body = {
        name: `${burgerName}`,
        price: `${burgerPrice}`,
        user_id: `${userID}`
    };

    axios.post('http://localhost:5050/burgerCollection', body)
    .then(() => {
        displayFavorites();
    })
}

displayFavorites();
