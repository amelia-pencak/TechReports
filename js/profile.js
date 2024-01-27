document.addEventListener('DOMContentLoaded', function () {
loadData();
addLogoutEvent() 
console.log('Strona została załadowana.');
});
function addLogoutEvent() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    console.log('Przycisk wylogowania został znaleziony.');
      logoutButton.addEventListener('click', function() {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          loadPage('pages/log.html');// Przekierowanie do strony logowania
          console.log('Wylogowano.');
      });
  } else {
      console.log('Przycisk wylogowania nie został znaleziony.');
  }
}

function loadData() {

let storedData = localStorage.getItem('userData');
if (storedData) {
    displayUserData(JSON.parse(storedData));
} else {
  const token = localStorage.getItem('token');
  fetch(`http://localhost/TechReports/php/profile.php?token=${token}`)
      .then(response => response.json())
      .then(data => {
          if (data && 'error' in data) {
              console.error(data.error);
          } else {
            localStorage.setItem('userData', JSON.stringify(data));; // Zapisz dane użytkownika
              displayUserData(data);
          }
      })
      .catch(error => console.error('Błąd:', error));
}
}

function displayUserData(data) {
        document.getElementById('firstName').textContent = data.firstname;
        document.getElementById('lastName').textContent = data.lastname;
        document.getElementById('email').textContent = data.email;
        document.getElementById('country').textContent = data.country;
        document.getElementById('city').textContent = data.city;
        document.getElementById('created_at').textContent = data.created_at;
}