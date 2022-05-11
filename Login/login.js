const form = document.getElementById('loginUser');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const message = document.querySelector('span');

function loginUser (e) {
    e.preventDefault();
    let body = {
        username: `${usernameInput.value}`,
        password: `${passwordInput.value}`
    };

    axios.post('http://localhost:5050/login', body)
    .then((res) => {
        if(res.data[0] === undefined) {
            message.classList.toggle('spanVisible');
            return;
        }

        const {username, password, user_id} = res.data[0];

        if (usernameInput.value === username && passwordInput.value === password) {
            window.localStorage.setItem('userId', user_id);
            window.localStorage.setItem('isLoggedIn', true);
            window.location.href = '../Home/home.html'
        }
    })
    .catch(err => console.log(err));
}

form.addEventListener('submit', loginUser);
