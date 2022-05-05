const form = document.getElementById('loginUser');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

function loginUser (e) {
    e.preventDefault();
    let body = {
        username: `${usernameInput.value}`,
        password: `${passwordInput.value}`
    };

    axios.post('http://localhost:5050/login', body)
    .then(res => {
        const {username, password, user_id} = res.data[0];
        console.log(res.data[0])

        if (usernameInput.value === username && passwordInput.value === password) {
            // window.localStorage.setItem('username', `${username}`);
            window.localStorage.setItem('userId', user_id);
            window.localStorage.setItem('isLoggedIn', true);
            window.location.href = '../Burger/burger.html'
        }
    })
}

form.addEventListener('submit', loginUser);
