document.addEventListener('DOMContentLoaded', function() {
     document.querySelectorAll('nav a').forEach(link => {
         link.addEventListener('click', function(e) {
             e.preventDefault();
             var url = e.target.href;
             fetch(url)
                 .then(response => response.text())
                 .then(data => {
                     document.getElementById('content').innerHTML = data;
                 })
                 .catch(error => console.error('Błąd ładowania strony', error));
         });
     });
 });
 

const words = ["zgłoszeniami", "raporatmi", "zadaniami", "wnioskami", "problemami"];
let currentWordIndex = 0;

const dynamicWord = document.getElementById("dynamicWord");

function rotateWord() {
    dynamicWord.classList.add("rotating");

    setTimeout(() => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        dynamicWord.textContent = words[currentWordIndex];

        dynamicWord.classList.remove("rotating");
    }, 500);
}

setInterval(rotateWord, 3000);


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('scrollToTopButton').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


