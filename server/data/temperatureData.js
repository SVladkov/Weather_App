class TemperatureData {
    constructor(db) {
        this.db = db;
        this.collectionName = 'temperatures';
        this.collection = this.db.collection(this.collectionName);
    }

    getForecastForCity(city) {
        return this.collection.find({'city': city}).sort({ 'datetime' : 1 }).toArray();
    }

    getMinTemperatureForCity(city) {
        return this.collection.find({'city': city}, { 'datetime': 1, 'temperature': 1 }).sort({ 'temperature' : 1 }).limit(1).toArray();
    }

    getMaxTemperatureForCity(city) {
        return this.collection.find({'city': city}).sort({ 'temperature' : -1 }).limit(1).toArray();
    }

    updateTemperatureForCityOnDatetime(temperatureData) {
        return this.collection.update({
            'city': temperatureData.city,
            'datetime': temperatureData.datetime
        },
        temperatureData, {
            upsert: true
        });
    }

    create(model) {
        return this.collection.insert(model);
    }
}

module.exports = TemperatureData;