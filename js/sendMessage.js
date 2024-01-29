document.addEventListener('DOMContentLoaded', function () {
    console.log('Strona została załadowana.');
    findSubmit();

});

function findSubmit() {
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        console.log('Formularz został znaleziony.');
        messageForm.addEventListener('submit', function (e) {
            console.log('Wysyłanie formularza.');
            e.preventDefault();
            sendMessage(new FormData(messageForm));
        });
    }
}

function sendMessage(formData) {
    const token = localStorage.getItem('token');
    formData.append('id_user', token);
    fetch(`http://localhost/TechReports/php/sendMessage.php`, {
        method: 'POST',
        body: formData,
        enctype: 'multipart/form-data'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                document.getElementById('messageForm').reset();
                loadMessages();
            } else {
                console.error('Błąd podczas wysyłania wiadomości:', data.error);
            }
        })
        .catch(error => {
            console.error('Błąd połączenia:', error);
        });
}
