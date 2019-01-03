const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=gpVncx3EaxiQg9sNUNrE85jmhCVYYMfX&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    console.log('ppppppppppppppppppp', response.data);

    const lat = response.data.results[0].locations[0].latLng.lat;
    const long = response.data.results[0].locations[0].latLng.lng;
    const weatherUrl = `https://api.darksky.net/forecast/45a244c5be7687d86ae931ad25ee78a1/${lat},${long}`;

    return axios.get(weatherUrl);
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It's feels like ${apparentTemperature}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});

