 document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.target.href.endsWith('index.html') ) {
                return;
            }
            e.preventDefault();
            var url = e.target.href;
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('content').innerHTML = data;
                    initializeSlider();
                    numberAnimator();
                })
                .catch(error => console.error('Błąd ładowania strony', error));
        });
    });
});
