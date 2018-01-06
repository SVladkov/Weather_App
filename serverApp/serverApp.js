var express = require('express');

const init = (data) => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Welcome to my weather website!');
    });

    return Promise.resolve(app);
};

module.exports = { init };
