const CronJob = require('cron').CronJob;
const request = require('request');
const config = require('../config');

const cities = ['Sofia', 'Rome', 'London'];

function transformDate(date) {
    return date.slice(0, 10) + 'T' + date.slice(11) + ':00:00';
}

function transformTemperatureData(temperatureData, city) {
    return {
        temperature: temperatureData.temp,
        city: city,
        datetime: new Date(transformDate(temperatureData.datetime))
    }
}

function getWeatherbitForecastUrl(city) {
    const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/3hourly?city=';
    return baseUrl + city + '&key=' + config.weatherApiKey;
}

const init = (data) => {
    // the job is executed on every third hour
    new CronJob('0 0 0 * * *', () => {
    //new CronJob('0 */3 * * * *', () => {
    //new CronJob('*/3 * * * * *', () => {
        cities.forEach((city) => {
            request
                .get(getWeatherbitForecastUrl(city), (err, response, body) => {
                    console.log('request to weather api');
                    if (err) {
                        console.log(err);
                    }

                    var parsedBody = JSON.parse(body);

                    if (response.statusCode >= 400) {
                        throw new Error('Weather forecast could not be fetched. Got status code '
                            + parsedBody.status_code + ' and status message "' + parsedBody.status_message + '"');
                    }

                    for (temperatureData of parsedBody.data) {
                        var newTemperatureData = transformTemperatureData(temperatureData, city);

                        data.temperatures.updateTemperatureForCityOnDatetime(newTemperatureData);
                    }
                });
        });
    }, null, true);
};

module.exports = { init };