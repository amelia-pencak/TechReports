function dynamicList() {
     $(document).ready(function () {
          var technologyDescriptions = {
               'ticketing': 'Systemy zarządzania zgłoszeniami są kluczowe dla efektywnej obsługi klienta i zarządzania workflow w sektorze IT. TechReports oferuje narzędzia, które ułatwiają kategoryzację, przydział i śledzenie wszystkich zapytań i zgłoszeń, zapewniając przy tym przejrzystość procesów i szybką reakcję na potrzeby klientów. Nasi klienci zyskują pewność, że każde zapytanie zostanie rozpatrzone z należytą uwagą i skutecznością, co przekłada się na wysoką jakość obsługi i zadowolenie końcowe.',
               'cloud': 'Cloud Computing to fundament nowoczesnej infrastruktury IT, umożliwiając elastyczne i skalowalne rozwiązania dostosowane do potrzeb biznesowych. TechReports specjalizuje się w dostarczaniu chmurowych usług, które umożliwiają naszym klientom zwiększenie efektywności, bezpieczeństwa i dostępności ich systemów. Nasze rozwiązania w chmurze są projektowane z myślą o maksymalnej optymalizacji kosztów oraz zwiększeniu potencjału innowacyjnego przedsiębiorstw.',
               'rpa': 'Automatyzacja procesów biznesowych to klucz do efektywności i redukcji kosztów operacyjnych. W TechReports dostarczamy narzędzia RPA, które transformują biznes naszych klientów, automatyzując powtarzalne zadania i pozwalając zespołom skupić się na zadaniach o większej wartości dodanej. Nasze rozwiązania RPA wspierają skalowalność i adaptację do zmieniających się wymagań biznesowych, zapewniając jednocześnie wysoki poziom kontroli i zarządzania procesami.',
               'analize': 'Zarządzanie i monitorowanie systemów IT to niezbędny element zapewnienia ciągłości działania i bezpieczeństwa. TechReports oferuje zaawansowane narzędzia monitorowania, które dostarczają kluczowych informacji o stanie infrastruktury IT. Nasze systemy analizy pozwalają na wczesne wykrywanie i reagowanie na potencjalne zagrożenia, a także optymalizację wydajności, co jest nieocenione w dynamicznym środowisku technologicznym.',
               'ai': 'Sztuczna Inteligencja i analiza danych to fundamenty współczesnych strategii biznesowych. TechReports wykorzystuje moc AI i zaawansowanej analizy danych do przekształcania dużych zbiorów danych w konkretne, działające rozwiązania. Nasze narzędzia analityczne pomagają w odkrywaniu trendów, prognozowaniu wyników i wsparciu decyzji biznesowych, umożliwiając klientom wyprzedzenie konkurencji i zbudowanie przewagi rynkowej.               '
          };

          $('.technology_list li:first').addClass('active');

          var initialTechKey = $('.technology_list li:first').data('tech');
          $('.technology_details').html(technologyDescriptions[initialTechKey]);
  
          $('.technology_list li').click(function () {
              $('.technology_list li').removeClass('active');
              $(this).addClass('active');
              var techKey = $(this).data('tech');
              var description = technologyDescriptions[techKey];
              $('.technology_details').html(description);
          });
     });
}