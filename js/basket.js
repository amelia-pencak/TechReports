function basket() {

    const uslugi = [
        { id: 1, nazwa: 'Konsultacja IT', cena: 100 },
        { id: 2, nazwa: 'Naprawa komputera', cena: 200 },
        { id: 3, nazwa: 'Konfiguracja sieci', cena: 150 },
        { id: 4, nazwa: 'Odzyskiwanie danych', cena: 300 },
        { id: 5, nazwa: 'Optymalizacja wydajności komputera', cena: 120 },
        { id: 6, nazwa: 'Wsparcie zdalne', cena: 80 },
        { id: 7, nazwa: 'Tworzenie kopii zapasowych', cena: 100 }
    ];

    let koszyk = {};

    const uslugiForm = document.getElementById('uslugiForm');
    uslugiForm.addEventListener('click', function (event) {
        if (event.target.classList.contains('dodajButton')) {
            const uslugaId = event.target.getAttribute('data-id');
            dodajDoKoszyka(uslugaId);
        }
    });

    function dodajDoKoszyka(id) {
        const usluga = uslugi.find(u => u.id == id);
        if (!koszyk[id]) {
            koszyk[id] = { ...usluga, ilosc: 1 };
        } else {
            koszyk[id].ilosc++;
        }
        aktualizujKoszyk();
    }

    function usunZKoszyka(id) {
        if (koszyk[id] && koszyk[id].ilosc > 1) {
            koszyk[id].ilosc--;
        } else {
            delete koszyk[id];
        }
        aktualizujKoszyk();
    }

    function aktualizujKoszyk() {
        const koszykDiv = document.getElementById('koszyk');
        koszykDiv.innerHTML = '';
        let suma = 0;
        Object.keys(koszyk).forEach(id => {
            const usluga = koszyk[id];
            suma += usluga.cena * usluga.ilosc;

            const uslugaDiv = document.createElement('div');
            uslugaDiv.className = 'uslugaKoszyk';
            uslugaDiv.innerHTML = `${usluga.nazwa} - ${usluga.ilosc} szt. - ${usluga.cena * usluga.ilosc} PLN`;
            const usunButton = document.createElement('button');
            usunButton.textContent = 'Usuń';
            usunButton.addEventListener('click', () => usunZKoszyka(id));
            uslugaDiv.appendChild(usunButton);
            koszykDiv.appendChild(uslugaDiv);
        });
        const sumaDiv = document.createElement('div');
        sumaDiv.className = 'suma';
        sumaDiv.textContent = `Suma: ${suma} PLN`;
        koszykDiv.appendChild(sumaDiv);
    }

    const zlozZamowienieButton = document.getElementById('zlozZamowienie');
    zlozZamowienieButton.addEventListener('click', function () {
        alert('Zamówienie zostało złożone!');
        koszyk = {};
        aktualizujKoszyk();
    });

}