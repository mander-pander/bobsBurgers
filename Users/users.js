let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let newUser = document.getElementById('newUser');

function createUser(e) {
    e.preventDefault();

    let body = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    // console.log(body.username);

    axios.post('http://localhost:5050/user', body)
        .then(() => {
            window.localStorage.setItem('userId', user_id);
            window.localStorage.setItem('isLoggedIn', true);
            window.location.href = '../Burger/burger.html'
        })
}

newUser.addEventListener('submit', createUser);
