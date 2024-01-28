document.addEventListener('DOMContentLoaded', function() {
     loadMessages();
 });
 
 function loadMessages() {
     const token = localStorage.getItem('token');
     fetch(`http://localhost/TechReports/php/getMessages.php?token=${token}`)
     .then(response => {
        console.log(response); 
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
    messagesContainer.innerHTML = ''; // Wyczyść poprzednie wiadomości

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        let filesHtml = '';
        if (message.files) {
            filesHtml = message.files.map(file => `<a href="${file}" download>Pobierz załącznik</a>`).join('<br>');
        }

        messageDiv.innerHTML = `
            <h3>${message.title}</h3>
            <p>Autor: ${message.firstname} ${message.lastname}</p>
            <p>Data wysłania: ${new Date(message.sent_at).toLocaleString()}</p>
            <p>${message.contents}</p>
            ${filesHtml}
        `;
        messagesContainer.appendChild(messageDiv);
    });
}

 