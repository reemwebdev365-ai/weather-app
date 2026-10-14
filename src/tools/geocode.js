const request = require('request');

const geocode = (address, callback) => {
    const token = process.env.MAPBOX_TOKEN;

    if (!token) {
        return callback('Missing MAPBOX_TOKEN in .env file', undefined);
    }

    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json';

    request(
        { url, qs: { access_token: token, limit: 1 }, json: true },
        (error, response) => {
            if (error) {
                return callback('Unable to connect to the geocode service', undefined);
            }

            if (response.body.message) {
                return callback(response.body.message, undefined);
            }

            if (!response.body.features || response.body.features.length === 0) {
                return callback('Unable to find location. Try another search', undefined);
            }

            const [longitude, latitude] = response.body.features[0].center;
            callback(undefined, { latitude, longitude });
        }
    );
};

module.exports = geocode;