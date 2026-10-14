const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const key = process.env.WEATHER_API_KEY;

    if (!key) {
        return callback('Missing WEATHER_API_KEY in .env file', undefined);
    }

    const url = 'https://api.weatherapi.com/v1/current.json';

    request(
        {
            url,
            qs: { key, q: `${latitude},${longitude}`, aqi: 'no' },
            json: true
        },
        (error, response) => {
            if (error) {
                return callback('Unable to connect to weather service', undefined);
            }

            if (response.statusCode !== 200 || !response.body || response.body.error) {
                return callback(
                    response.body?.error?.message || 'Unable to get weather data',
                    undefined
                );
            }

            const data = response.body;

            callback(undefined, {
                country: data.location.country,
                temperature: data.current.temp_c
            });
        }
    );
};

module.exports = forecast;