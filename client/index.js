(function () {
    function getForecastForCity(city) {
        var request = new XMLHttpRequest();
        request.addEventListener('load', function() {
            fillTable(JSON.parse(this.responseText));
        });
        request.open('GET', 'http://localhost:3000/forecast?city=Sofia');
        request.send();
    };

    getForecastForCity();

    function fillTable(temperaturesData) {
        var forecastElement = document.getElementById('forecast');
        var table = document.createElement('table');
        var tableHeader = document.createElement('tr');
        var datetimeHeader = document.createElement('th');
        var temperatureHeader = document.createElement('th');

        datetimeHeader.innerText = 'Time';
        temperatureHeader.innerText = 'Temperature';

        tableHeader.appendChild(datetimeHeader);
        tableHeader.appendChild(temperatureHeader);
        table.appendChild(tableHeader);

        temperaturesData.forEach(function(temperatureData) {
            console.log(temperatureData);
            var row = document.createElement('tr');
            var datetime = document.createElement('td');
            var temperature = document.createElement('td');

            var date = new Date(temperatureData.datetime);
            console.log(date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ', ' + date.getUTCHours() + 'h');

            datetime.innerText = temperatureData.datetime;
            temperature.innerText = temperatureData.temperature;

            row.appendChild(datetime);
            row.appendChild(temperature);
            table.appendChild(row);
        });

        forecastElement.appendChild(table);
    }
})();

