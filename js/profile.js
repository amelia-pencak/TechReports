document.addEventListener('DOMContentLoaded', function () {
  loadData();
  addLogoutEvent();
  setUpEditProfileForm();
  deleteProfile() ;
  console.log('Strona została załadowana.');
});

function addLogoutEvent() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    console.log('Przycisk wylogowania został znaleziony.');
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('addressData');
      loadPage('pages/log.html');
      new Toast({
        message: 'Użytkownik został wylogowany.',
        type: 'success'
      });
      console.log('Wylogowano.');
    });
  } else {
    console.log('Przycisk wylogowania nie został znaleziony.');
  }
}

function deleteProfile() {
  const deleteProfileButton = document.getElementById('deleteProfileButton');
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Brak tokenu, nie można usunąć profilu');
    return;
  }
  deleteProfileButton.addEventListener('click', function () {
    fetch(`http://localhost/TechReports/php/deleteProfile.php?token=${token}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        console.log("usuw",data);
        if (data.success) {
          console.log('Profil został usunięty.');
          localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('addressData');
      loadPage('pages/log.html');
      new Toast({
        message: 'Profil został usunięty.',
        type: 'success'
      });
        } else {
          console.error('Błąd podczas usuwania profilu:', data.error);
        }
      })
      .catch(error => {
        console.error('Błąd połączenia:', error);
      });
  });
}



function loadData() {
  let storedData = localStorage.getItem('userData');
  let storedAddress = localStorage.getItem('addressData');

  if (storedData) {
    displayUserData(JSON.parse(storedData));
  } if (storedAddress) {
    displayAddressData(JSON.parse(storedAddress));
  }
  else {
    const token = localStorage.getItem('token');
    fetch(`http://localhost/TechReports/php/profile.php?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data && 'error' in data) {
          console.error(data.error);
          
        } else {
          localStorage.setItem('userData', JSON.stringify(data.userData));
          localStorage.setItem('addressData', JSON.stringify(data.addressData));

          displayUserData(data.userData);
          displayAddressData(data.addressData);

        }
      })
      .catch(error => console.error('Błąd:', error));
  }
}

function displayUserData(data) {
  document.getElementById('editFirstName').value = data.firstname;
  document.getElementById('editLastName').value = data.lastname;
  document.getElementById('editEmail').value = data.email;
  document.getElementById('editPhone').value = data.phone;
  document.getElementById('created_at').value = data.created_at;
}

function displayAddressData(data) {
  document.getElementById('editCountry').value = data && data.country ? data.country : '';
  document.getElementById('editCity').value = data && data.city ? data.city : '';
  document.getElementById('editStreet').value = data && data.street ? data.street : '';
  document.getElementById('editStreetNumber').value = data && data.streetnumber ? data.streetnumber : '';
  document.getElementById('editPostalCode').value = data && data.postalcode ? data.postalcode : '';
}


function setUpEditProfileForm() {
  const editForm = document.getElementById('editProfileForm');
  if (editForm) {
    editForm.addEventListener('submit', function (e) {
      console.log('Wysyłanie formularzaaa.');
      e.preventDefault();
      console.log(new FormData(editForm));
      console.log("Wysyłanie formularzaaaa", editForm);
      handleProfileEdit(new FormData(editForm));

    });
  }
}

function handleProfileEdit(formData) {
  const token = localStorage.getItem('token');
  formData.append('token', token);

  fetch(`http://localhost/TechReports/php/edit.php?token=${token}`, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok', response);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        new Toast({
          message: 'Dane zostały zaktualizowane.',
          type: 'success'
        });
        fetch(`http://localhost/TechReports/php/profile.php?token=${token}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log("odp", response);
            return response.json();
          })
          .then(updatedData => {
            localStorage.setItem('userData', JSON.stringify(updatedData.userData));
            localStorage.setItem('addressData', JSON.stringify(updatedData.addressData));
            console.log('Zaktualizowane dane użytkownika:', updatedData.userData);
            console.log('Zaktualizowane dane adresowe:', updatedData.addressData);


            displayUserData(updatedData.userData); // Aktualizacja danych użytkownika na stronie
            displayAddressData(updatedData.addressData);
          });
      } else {
        toastr.error('Błąd podczas aktualizacji profilu: ' + data.error);

      }
    })
    .catch(error => {
      console.error('Błąd połączenia:', error);
    });
}
