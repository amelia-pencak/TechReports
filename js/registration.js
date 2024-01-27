// document.addEventListener('DOMContentLoaded', function() {
//      const registrationForm = document.getElementById('registrationForm');
 
//      if (registrationForm) {
//          registrationForm.addEventListener('submit', function(e) {
//              e.preventDefault();
//              handleRegistration(registrationForm);
//          });
//      }
//  });
 
//  function handleRegistration(form) {
//      fetch('http://localhost/TechReports/php/register.php', {
//          method: 'POST',
//          body: new FormData(form),
//      //     headers: 
//              'Accept': 'application/json',
//          }
//      })
//      .then(response => response.json())
//      .then(data => {
//          if (data.success) {
//              console.log('Rejestracja zakończona sukcesem');
//              form.reset(); // Resetowanie formularza
//              // Tutaj możesz również dodać przekierowanie lub inne akcje
//          } else {
//              console.error('Błąd rejestracji:', data.error);
//          }
//      })
//      .catch(error => console.error('Błąd połączenia', error));
//  }
 