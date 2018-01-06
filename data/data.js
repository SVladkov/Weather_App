const TemperatureData = require('./temperatureData');

const init = (db) => {
    return Promise.resolve({
        temperatures: new TemperatureData(db)
    });
};

module.exports = { init };