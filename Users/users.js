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
            window.location.href = '../Burger/index.html'
        })
}

newUser.addEventListener('submit', createUser);
