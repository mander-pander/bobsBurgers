let charBtn = document.getElementById('charBtn');
let burgerBtn = document.getElementById('burgerBtn');

let userID = window.localStorage.getItem('userId');
let session = window.localStorage.getItem('isLoggedIn');

const redirect = () => {
    if(session !== 'true') {
        window.location.href = '../Login/login.html'
    }
}

charBtn.addEventListener('click', redirect);
burgerBtn.addEventListener('click', redirect);
