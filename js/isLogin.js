
document.addEventListener('DOMContentLoaded', function() {
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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Zalogowano poprawnie');
            // window.location.href = 'http://127.0.0.1:5501/index.html'; 
            checkLoginStatusAndUpdateLink(); // Ponownie sprawdź status logowania
        } else {
            console.error('Błąd logowania:', data.message);
        }
    })
    .catch(error => console.error('Błąd połączenia', error));
}

function checkLoginStatusAndUpdateLink() {
    fetch('http://localhost/TechReports/php/isLog.php')
        .then(response => response.text())  // najpierw odbierz jako tekst
        .then(text => {
            console.log(text);  // wyświetl tekst w konsoli
            return JSON.parse(text);  // następnie przekształć na JSON

       
        })
        .then(data => {
            if (data.loggedIn) {
                document.getElementById('loginLink').setAttribute('href', 'pages/profile.html');
            } else {
                document.getElementById('loginLink').setAttribute('href', 'pages/log.html');
            }
        })
        .catch(error => console.error('Błąd sprawdzania statusu logowania', error));
}

