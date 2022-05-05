let logout = document.getElementById('logout');



function logoutUser () {
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('userId');
    window.location.href = '../Login/login.html';
}

logout.addEventListener('click', logoutUser);
