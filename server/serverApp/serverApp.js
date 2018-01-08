const express = require('express');
const cors = require('cors');
const router = require('./router');

const init = (data) => {
    const app = express();

    app.use(cors());
    router.attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
