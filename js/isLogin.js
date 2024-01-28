
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatusAndUpdateLink();
    setUpLoginForm();
});

function setUpLoginForm() {
    // const loginForm = document.querySelector('form-box_left'); // Zakładam, że masz taki selektor
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(loginForm);
        });
    } else {
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
            localStorage.setItem('token', data.token);
           
            loadPage('pages/profile.html');
            new Toast({
                message: 'Zalogowano pomyślnie.',
                type: 'success'
              });
            checkLoginStatusAndUpdateLink(); // Ponownie sprawdź status logowania
        } else {
            console.error('Błąd logowania:', data.message);
            new Toast({
                message: 'Błąd logowania. Nieprawidłowy login lub hasło.',
                type: 'warning'
              });
              document.getElementById('loginForm').reset();  
        }
    })
    .catch(error => {
        console.error('Błąd połączenia', error);
        // Wyświetlenie powiadomienia toast w przypadku błędu sieciowego
        new Toast({
            message: 'Błąd logowania.',
            type: 'warning'
        });
        document.getElementById('loginForm').reset(); 
    });
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

