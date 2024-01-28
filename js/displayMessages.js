document.addEventListener('DOMContentLoaded', function() {
     loadMessages();
 });
 
 function loadMessages() {
     const token = localStorage.getItem('token');
     fetch(`http://localhost/TechReports/php/getMessages.php?token=${token}`)
     .then(response => {
          console.log(response); // Dodaj to, aby zobaczyć surową odpowiedź
          return response.json();
      })
     .then(messages => {
          console.log(messages);
         if (messages && !messages.error) {
             displayMessages(messages);
         } else {
             console.error('Błąd podczas ładowania wiadomości:', messages.error);
         }
     })
     .catch(error => {
         console.error('Błąd połączenia:', error);
     });
 }
 
 function displayMessages(messages) {
     const messagesContainer = document.getElementById('messagesContainer');
     messages.forEach(message => {
         const messageDiv = document.createElement('div');
         messageDiv.innerHTML = `
             <h3>${message.title}</h3>
             <p>${message.contents}</p>
             ${message.files ? `<a href="${message.files}" download>Pobierz załącznik</a>` : ''}
         `;
         messagesContainer.appendChild(messageDiv);
     });
 }
 