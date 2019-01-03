const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help().alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else if (results) {
        console.log(results.address);
        weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else if (weatherResults) {
                console.log(`It's currently ${weatherResults.temperature}. It's feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }
});


