let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let newUser = document.getElementById('newUser');

function createUser(e) {
    e.preventDefault();

    let body = {
        username: usernameInput.value,
        password: passwordInput.value
    }

    axios.post('https://burgers-ag-capstone.herokuapp.com/user', body)
        .then(() => {
            window.location.href = '../Login/login.html'
        })
}

newUser.addEventListener('submit', createUser);
