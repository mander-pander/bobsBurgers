let getBurgerBtn = document.getElementById('burgerBtn');
let userID = window.localStorage.getItem('userId');

const displayFavorites = () => {
    axios.get('http://localhost:5050/faveBurgers', {
        params: {
            user_id: `${userID}`
        }
    })
    .then(() => {
        console.log(res.data)

        for(let i = 0; i < 5; i++) {
            
        }
    })
}



const displayRandomBurger = () => {

    let session = window.localStorage.getItem('isLoggedIn');
    console.log(typeof session)
    debugger;

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

            burger.appendChild(burgerName);
            burger.appendChild(burgerPrice);
            burger.appendChild(favoritesBtn);

            burgerName.innerHTML = randomBurger.name;
            burgerPrice.innerHTML = randomBurger.price;
        })
        .catch(err => console.log(err));
}

getBurgerBtn.addEventListener('click', displayRandomBurger);



const saveBurger = () => {
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
