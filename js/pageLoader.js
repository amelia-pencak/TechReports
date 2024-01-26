 document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a').forEach(link => {
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
                    dynamicList();
                    logoCarousel();
                    setUpLoginForm();
                })
                .catch(error => console.error('Błąd ładowania strony', error));
        });
    });
});

