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
