const config = require('./config');
const db = require('./db');
const data = require('./data');
const serverApp = require('./serverApp');
const weatherFetcher = require('./weatherFetcher');

db.init(config.connectionString)
    .then((db) => data.init(db))
    .then((data) => {
        weatherFetcher.init(data);
        return serverApp.init(data);
    })
    .then((serverApp) => {
        serverApp.listen(config.port, () => {
            console.log('Up and running on localhost:' + config.port);
        });
    });
