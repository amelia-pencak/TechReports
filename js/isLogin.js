
document.addEventListener('DOMContentLoaded', function() {
    console.log('Strona została załadowansssa');
    checkLoginStatusAndUpdateLink();
    setUpLoginForm();
    console.log('Strona została załadowana');
});

function setUpLoginForm() {
    // const loginForm = document.querySelector('form-box_left'); // Zakładam, że masz taki selektor
    const loginForm = document.getElementById('loginForm');

    console.log(loginForm);
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formularz logowania został wysłany');
            handleLogin(loginForm);
        });
    } else {
        console.log("Formularz nie został znaleziony.");
    }
}

function handleLogin(form) {
    const url = form.action;
    fetch(url, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.success) {
            console.log('Zalogowano poprawnie');
            localStorage.setItem('token', data.token);
            // window.location.href = '../index.html';
            loadPage('pages/profile.html');

            checkLoginStatusAndUpdateLink(); // Ponownie sprawdź status logowania
        } else {
            console.error('Błąd logowania:', data.message);
        }
    })
    .catch(error => console.error('Błąd połączenia', error));
}

function checkLoginStatusAndUpdateLink() {
    const token = localStorage.getItem('token');
    if (token) {
        fetch(`http://localhost/TechReports/php/isLog.php?token=${encodeURIComponent(token)}`)
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    document.getElementById('loginLink').setAttribute('href', 'pages/profile.html');
                } else {
                    localStorage.removeItem('token'); // Usuwamy token, jeśli nie jest ważny
                    document.getElementById('loginLink').setAttribute('href', 'pages/log.html');
                }
            })
            .catch(error => {
                console.error('Błąd sprawdzania statusu logowania', error);
                localStorage.removeItem('token'); // Usuwamy token w przypadku błędu
                document.getElementById('loginLink').setAttribute('href', 'pages/log.html');
            });
    } else {
        document.getElementById('loginLink').setAttribute('href', 'pages/log.html');
    }
}

