const request = require('request');

const geocodeAddress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=gpVncx3EaxiQg9sNUNrE85jmhCVYYMfX&location=${encodedAddress}`,
            json: true,
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google service.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else {
                resolve(
                    {
                        address: body.results[0].locations[0].street,
                        lat: body.results[0].locations[0].latLng.lat,
                        long: body.results[0].locations[0].latLng.lng
                    }
                );
            }
        })
    })
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}).catch(console.log);