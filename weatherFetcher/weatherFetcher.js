var CronJob = require('cron').CronJob;
var request = require('request');

const init = (data) => {
    // the job is executed on every third hour
    //new CronJob('0 */3 * * * *', () => {
    new CronJob('*/3 * * * * *', () => {
        console.log(new Date());

        request
            .get('https://api.weatherbit.io/v2.0/forecast/3hourly?city=Sofia&key=adc675edc9a148518ced4c8fc14c2996', (err, response, body) => {
                var temperaturesData = [];
                var parsedBody = JSON.parse(body);

                for (temperatureData of parsedBody.data) {
                    var newTemperatureData = {
                        temperature: temperatureData.temp,
                        city: 'Sofia',
                        datetime: temperatureData.datetime
                    }

                    temperaturesData.push(newTemperatureData);
                }

                console.log(temperaturesData);

                data.temperatures.create(temperaturesData);
            });
    }, null, true);
};

module.exports = { init };