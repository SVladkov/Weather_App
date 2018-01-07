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

    return Promise.resolve(app);
};

module.exports = { init };
