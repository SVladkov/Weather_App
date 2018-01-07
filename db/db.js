const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(connectionString).then((db) => {
            db.ensureIndex('temperatures', 'city', (err) => {
                db.ensureIndex('temperatures', 'datetime', (err) => {
                    resolve(db);
                })
            });
        });
    });
};

module.exports = { init };
