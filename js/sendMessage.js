document.addEventListener('DOMContentLoaded', function() {
     console.log('Strona została załadowana.');
     findSubmit();
     
 });

 function findSubmit() {
     const messageForm = document.getElementById('messageForm');
     if (messageForm) {
          console.log('Formularz został znaleziony.');
         messageForm.addEventListener('submit', function(e) {
                console.log('Wysyłanie formularza.');
             e.preventDefault();
             sendMessage(new FormData(messageForm));
         });
     }
 }
 
 function sendMessage(formData) {
     const token = localStorage.getItem('token');
     formData.append('id_user', token);
 console.log("Wysyłanie danych formularza", formData);
     fetch('http://localhost/TechReports/php/sendMessage.php', {
         method: 'POST',
         body: formData,
         enctype: 'multipart/form-data' // Dla obsługi plików
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             console.log('Wiadomość została wysłana.');
             document.getElementById('messageForm').reset(); // Czyszczenie formularza
         } else {
             console.error('Błąd podczas wysyłania wiadomości:', data.error);
         }
     })
     .catch(error => {
         console.error('Błąd połączenia:', error);
     });
 }
 