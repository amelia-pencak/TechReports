const ipv4 = '83.7.17.154';

function fetchTime() {
  $.ajax({
    url: `http://worldtimeapi.org/api/ip/${ipv4}.txt`,
    method: 'GET',
    success: function (data) {
      const lines = data.split('\n');
      const dateTimeLine = lines.find(line => line.startsWith('datetime'));
      if (dateTimeLine) {
        const dateTime = dateTimeLine.split(' ')[1].split('.')[0].split('T')[1];
        $('#clock').text(dateTime);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#clock').text('Błąd podczas ładowania czasu: ' + textStatus);
    }
  });
}
setInterval(fetchTime, 1000);
