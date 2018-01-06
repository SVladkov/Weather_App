var express = require('express');

const init = (data) => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Welcome to my weather website!');
    });

    app.listen(3000, () => {
        console.log('Up and running on localhost:3000');
    });
}

module.exports = { init };
