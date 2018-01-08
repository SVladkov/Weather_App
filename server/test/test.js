const db = require('../db');
const data = require('../data');
const fixtures = require('./fixtures');
var database;

function insertTemperatureData(database, temperatureData) {
    return database.collection('temperatures').insert(Object.assign({}, temperatureData));    
}

db.init('mongodb://localhost/weather-db-test')
    .then((db) => {
        database = db;
        return data.init(db)
    })
    .then((data) => {
        var tap = require('tap');

        tap.afterEach(function(done) {
            return database.collection('temperatures').remove({});
        });

        tap.plan(2);

        tap.test('temperature data is properly found in the database', function(tap) {
            tap.plan(3);

            insertTemperatureData(database, fixtures.temperatureData)
                .then(
                    data.temperatures.getForecastForCity('Sofia').then((temperaturesData) => {
                        tap.equal(temperaturesData[0].temperature, fixtures.temperatureData.temperature);
                        tap.equal(temperaturesData[0].city, fixtures.temperatureData.city);
                        tap.equal(temperaturesData[0].datetime.toString(), fixtures.temperatureData.datetime.toString());
                    }));
        });

        tap.test('searching for city that is not in the database', function(tap) {
            tap.plan(1);

            data.temperatures.getForecastForCity('Sofia').then((temperaturesData) => {
                tap.equal(temperaturesData.length, 0);
            });
        });
    });
