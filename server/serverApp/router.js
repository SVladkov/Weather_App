const attachTo = (app, data) => {
    app.use('/forecast', function(req, res, next) {
        if (req.headers.authorization === undefined) {
            res.status(401).send('You are not authorized');
            return;
        }
        next();
    });

    app.get('/forecast', (req, res) => {
        const city = req.query.city;

        data.temperatures.getForecastForCity(city).then((temperaturesData) => {
            if (temperaturesData.length > 0) {
                data.temperatures.getMinTemperatureForCity(city).then((minTemperature) => {
                    data.temperatures.getMaxTemperatureForCity(city).then((maxTemperature) => {
                        var response = {
                            minTemperature: minTemperature,
                            maxTemperature:  maxTemperature,
                            temperaturesData: temperaturesData
                        }
                        res.send(response);
                    });    
                });
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
}

module.exports = { attachTo };
