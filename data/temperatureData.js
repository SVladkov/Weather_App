class TemperatureData {
    constructor(db) {
        this.db = db;
        this.collectionName = 'temperatures';
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find().toArray();
    }

    create(model) {
        return this.collection.insert(model);
    }
}

module.exports = TemperatureData;