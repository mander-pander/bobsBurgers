let getBurgerBtn = document.getElementById('burgerBtn');

const displayRandomBurger = () => {
    axios.get('https://bobsburgers-api.herokuapp.com/burgerOfTheDay/')
    .then((res) => {
        let randomIdx = Math.floor(Math.random() * res.data.length);

        let randomBurger = res.data[randomIdx];
        let burger = document.createElement('div');
        let burgerName = document.createElement('h4');
        let burgerPrice = document.createElement('p');
        let favoritesBtn = document.createElement('button');
        favoritesBtn.innerHTML = 'Add to Favorites';

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
