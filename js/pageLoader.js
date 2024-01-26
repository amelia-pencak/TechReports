document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (e.target.href.endsWith('index.html')) {
                return;
            }
            e.preventDefault();
            var url = e.target.href;
            loadPage(url);
         
        });
    });
});


function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            // Tutaj dodaj wszelkie potrzebne inicjalizacje skryptów dla nowo załadowanej strony
            initializeSlider();
            numberAnimator();
            dynamicList();
            logoCarousel();
            setUpLoginForm();
            checkLoginStatusAndUpdateLink();
        })
        .catch(error => console.error('Błąd ładowania strony', error));
}

