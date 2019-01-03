const request = require('request');

const getWeather = (latitude, longitude, callback) => {
    const forecastKey = '45a244c5be7687d86ae931ad25ee78a1';

    request({
        url: `https://api.darksky.net/forecast/${forecastKey}/${latitude},${longitude}`,
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        } else {
            callback('Unable to fetch weather.');
        }
    })
}

module.exports.getWeather = getWeather;

