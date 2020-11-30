function swp(){
  let checkbox = document.querySelector('#swap');
  if(checkbox.checked){
    document.getElementById('resultWork').hidden = true;
    document.getElementById('resultNonWork').hidden = false;
  }else{
    document.getElementById('resultWork').hidden = false;
    document.getElementById('resultNonWork').hidden = true;
  }
}

function sendJSON() {
  // с помощью jQuery обращаемся к элементам на странице по их именам
  let startDate = document.querySelector('#startDate');
  let endDate = document.querySelector('#endDate');
  let userId = document.querySelector('#userId');
  // создаём новый экземпляр запроса
  let xhr = new XMLHttpRequest();
  // адрес, куда мы отправим нашу JSON-строку
  let url = "/calculate?data=" + encodeURIComponent(JSON.stringify({ "startDate": startDate.value, "endDate": endDate.value, "userId": userId.value }));
  // открываем соединение
  xhr.open("GET", url, true);
  // устанавливаем заголовок
  xhr.setRequestHeader("Content-Type", "application/json");
  // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь
  xhr.onreadystatechange = function () {
    // если запрос принят и сервер ответил, что всё в порядке
    if (xhr.readyState === 4 && xhr.status === 200) {
      // парсим json
      let json = JSON.parse(this.responseText);
      //фукция генерации html
      responseWork(json.schedule);
      responseNonWork(json.nonworking);
    }
  };
  // отправляем JSON на сервер
  xhr.send();
}

function responseWork(schedule){
  let resultWork = document.querySelector('.resultWork');
  let htmlTextWork = '<tr><th>День</th><th>Рабочий график</th></tr>';
  for (var i = 0; i < schedule.length; i++) {
    htmlTextWork += '<tr>'+
            '<td>'+schedule[i].day+'</td>'+
            '<td>'+schedule[i].timeRanges['am']['start']+
            '-'+schedule[i].timeRanges['am']['end']+
            '<br>'+schedule[i].timeRanges['pm']['start']+
            '-'+schedule[i].timeRanges['pm']['end']+'</td></tr>';
  }
  resultWork.innerHTML = htmlTextWork;
}

function responseNonWork(nonworking){
  let resultNonWork = document.querySelector('.resultNonWork');
  let htmlTextWork = '<tr><th>День</th><th>Нерабочий график</th></tr>';
  for (var i = 0; i < nonworking.length; i++) {

    if (typeof nonworking[i].timeRanges['pm'] !== 'undefined') {
      htmlTextWork += '<tr>'+
              '<td>'+nonworking[i].day+'</td>'+
              '<td>00:00-'+nonworking[i].timeRanges['am']['start']+'<br>'+
              nonworking[i].timeRanges['am']['end']+'-'+nonworking[i].timeRanges['pm']['start']+'<br>'+
              nonworking[i].timeRanges['pm']['end']+'-23:59</td></tr>';
    }else{
      htmlTextWork += '<tr>'+
              '<td>'+nonworking[i].day+'</td>'+
              '<td>00:00-23:59</td></tr>';
    }
  }
  resultNonWork.innerHTML = htmlTextWork;
}
