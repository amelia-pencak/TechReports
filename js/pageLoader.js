document.addEventListener('DOMContentLoaded', function() {
     document.querySelectorAll('nav a').forEach(link => {
         link.addEventListener('click', function(e) {
             e.preventDefault();
             var url = e.target.href;
             fetch(url)
                 .then(response => response.text())
                 .then(data => {
                     document.getElementById('content').innerHTML = data;
                     initializeSlider();
                 })
                 .catch(error => console.error('Błąd ładowania strony', error));
         });
     });
 });


 
