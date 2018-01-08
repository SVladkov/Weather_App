const express = require('express');
const cors = require('cors');

const init = (data) => {
    const app = express();

    app.use(cors());
    app.use('/forecast', function(req, res, next) {
        if (req.headers.authorization === undefined) {
            res.status(401).send('You are not authorized');
            return;
        }

        const credentials = Buffer.from(req.headers.authorization.slice(6), 'base64').toString().split(':');
        next();
    });
    app.get('/forecast', (req, res) => {
        data.temperatures.getForecastForCity(req.query.city).then((forecast) => {
            if (forecast.length > 0) {
                res.send(forecast);
            } else {
                res.status(404).send('No information found for this city');
            }
        });
    });

    app.get('/login', (req, res) => {
        const credentials = Buffer.from(req.headers.authorization.slice(6), 'base64').toString().split(':');

        const username = credentials[0];
        const password = credentials[1];

        if (username === 'admin' && password === 'pass') {
            res.status(200).send('Logged in');
        } else {
            res.status(401).send('You are not authorized');
        }
    });

    return Promise.resolve(app);
};

module.exports = { init };
