document.addEventListener('DOMContentLoaded', function() {
     loadMessages();
 });
 
 function loadMessages() {
     const token = localStorage.getItem('token');
     fetch(`http://localhost/TechReports/php/getMessages.php?token=${token}`)
     .then(response => {
          return response.json();
      })
     .then(messages => {
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
    messagesContainer.innerHTML = ''; 
    console.log(messages);
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        let filesHtml = '';
        console.log(message);
            if (message.file_name) {
                console.log(message.file_name);
                console.log(message.id);
            filesHtml = `<a href="http://localhost/TechReports/php/downloadFile.php?message_id=${message.id}" download>${message.file_name}</a>`;

        }

        messageDiv.innerHTML = `
            <h3 class="titleMessage">${message.title}</h3>
            <p class="authorMessage">Autor: ${message.firstname} ${message.lastname}</p>
            <p class="dateMessage">Data wysłania: ${new Date(message.sent_at).toLocaleString()}</p>
            <p class="contentsMessage">${message.contents}</p>
            ${filesHtml}
        `;
        messagesContainer.appendChild(messageDiv);
    });
}

 