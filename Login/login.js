const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');



function loginUser () {
    // let body = {
    //     username: `${usernameInput.value}`,
    //     password: `${passwordInput.value}`
    // };

    axios.post('http://localhost:5050/loginUser', body)
    .then(res => {
        const {username, password} = res.data;

        if (usernameInput.value === username && passwordInput.value === password) {
            
        }


    })
}
