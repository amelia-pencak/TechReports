document.addEventListener('DOMContentLoaded', function () {
  loadData();
  addLogoutEvent();
  setUpEditProfileForm();
  console.log('Strona została załadowana.');
});
function addLogoutEvent() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    console.log('Przycisk wylogowania został znaleziony.');
    logoutButton.addEventListener('click', function () {
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
          localStorage.setItem('userData', JSON.stringify(data)); 
          displayUserData(data);
        }
      })
      .catch(error => console.error('Błąd:', error));
  }
}

function displayUserData(data) {
  document.getElementById('editFirstName').value = data.firstname;
  document.getElementById('editLastName').value = data.lastname;
  document.getElementById('editEmail').value = data.email;
  document.getElementById('editCountry').value = data.country;
  document.getElementById('editCity').value = data.city;
  document.getElementById('created_at').value = data.created_at;
}

function setUpEditProfileForm() {
  const editForm = document.getElementById('editProfileForm');
  if (editForm) {
      editForm.addEventListener('submit', function(e) {
        console.log('Wysyłanie formularza.');
          e.preventDefault();
          handleProfileEdit(new FormData(editForm));
      });
  }
}

function handleProfileEdit(formData) {
  const token = localStorage.getItem('token');
    formData.append('token', token);
  console.log("Wysyłanie danych formularza", formData);
  console.log("token", token);

  fetch('http://localhost/TechReports/php/edit.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Profil został zaktualizowany.');
      fetch(`http://localhost/TechReports/php/profile.php?token=${token}`)
        .then(response => response.json())
        .then(updatedData => {
            localStorage.setItem('userData', JSON.stringify(updatedData));
            displayUserData(updatedData); 
        });
  } else {
      console.error('Błąd podczas aktualizacji profilu:', data.error);
  }
  })
  .catch(error => {
      console.error('Błąd połączenia:', error);
  });
}
