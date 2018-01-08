const express = require('express');
const cors = require('cors');

const init = (data) => {
    const app = express();

    app.use(cors());
    app.get('/forecast', (req, res) => {
        data.temperatures.getForecastForCity(req.query.city).then((forecast) => {
            res.send(forecast);
        });
    });

    app.get('/login', (req, res) => {
        //console.log(req);
        res.send('ok');
    });

    return Promise.resolve(app);
};

module.exports = { init };
