function basket() {

     const uslugi = [
         { id: 1,nazwa: 'Konsultacja IT', cena: 100 },
         { id: 2,nazwa: 'Naprawa komputera', cena: 200 },
         { id: 3,nazwa: 'Instalacja oprogramowania', cena: 50 }
     ];
 
     const koszyk = {};

function aktualizujKoszyk() {
     const koszykDiv = document.getElementById('koszyk');
     koszykDiv.innerHTML = '';
     let suma = 0;
     Object.keys(koszyk).forEach(id => {
         const usluga = koszyk[id];
         suma += usluga.cena * usluga.ilosc;
 
         const uslugaDiv = document.createElement('div');
         uslugaDiv.className = 'usluga-item';
         uslugaDiv.textContent = `${usluga.nazwa} - ${usluga.ilosc} szt. - ${usluga.cena} PLN `;
 
         const buttonsDiv = document.createElement('div');
         buttonsDiv.className = 'buttons';
 
         const dodajButton = document.createElement('button');
         dodajButton.className = 'buttonKoszyk';
         dodajButton.textContent = '+';
         dodajButton.addEventListener('click', () => zmienIlosc(usluga, 1));
 
         const usunButton = document.createElement('button');
         usunButton.className = 'buttonKoszyk';
         usunButton.textContent = '-';
         usunButton.addEventListener('click', () => zmienIlosc(usluga, -1));
 
         buttonsDiv.appendChild(dodajButton);
         buttonsDiv.appendChild(usunButton);
         uslugaDiv.appendChild(buttonsDiv);
         koszykDiv.appendChild(uslugaDiv);
     });
 
     koszykDiv.appendChild(document.createTextNode(`Suma: ${suma} PLN`));
 }
 
    function dodajDoKoszyka(usluga) {
        if (!koszyk[usluga.id]) {
            koszyk[usluga.id] = {...usluga, ilosc: 0};
        }
        zmienIlosc(koszyk[usluga.id], 1);
    }

    function zmienIlosc(usluga, zmiana) {
        usluga.ilosc += zmiana;
        if (usluga.ilosc <= 0) {
            delete koszyk[usluga.id];
        }
        aktualizujKoszyk();
    }

    const uslugiDiv = document.getElementById('uslugi');

    
    uslugi.forEach(usluga => {
        const uslugaDiv = document.createElement('div');
        uslugaDiv.className = 'usluga-container';

        uslugaDiv.textContent = `${usluga.nazwa} - ${usluga.cena} PLN `;
        const dodajButton = document.createElement('button');
        dodajButton.className = 'dodajButton';
        dodajButton.textContent = '+';
        dodajButton.addEventListener('click', () => dodajDoKoszyka(usluga));
        uslugaDiv.appendChild(dodajButton);
        uslugiDiv.appendChild(uslugaDiv);
    });

    const zlozZamowienieButton = document.getElementById('zlozZamowienie');
    zlozZamowienieButton.addEventListener('click', () => {
        alert('Zamówienie zostało złożone!');
        Object.keys(koszyk).forEach(key => delete koszyk[key]);
        aktualizujKoszyk();
    });


}