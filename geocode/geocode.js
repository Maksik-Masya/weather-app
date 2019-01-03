const request = require('request');

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=gpVncx3EaxiQg9sNUNrE85jmhCVYYMfX&location=${encodedAddress}`,
        json: true,
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google service.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else {
            callback(undefined, {
                address: body.results[0].locations[0].street,
                lat: body.results[0].locations[0].latLng.lat,
                long: body.results[0].locations[0].latLng.lng
            });
        }
    })
}

module.exports.geocodeAddress = geocodeAddress;

