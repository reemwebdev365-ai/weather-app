require('dotenv').config();

const path = require('path');
const express = require('express');

const geocode = require('./tools/geocode');
const forecast = require('./tools/forecast');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address || !address.trim()) {
        return res.status(400).send({ error: 'You must provide an address' });
    }

    geocode(address.trim(), (error, data) => {
        if (error) {
            return res.status(400).send({ error });
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.status(400).send({ error });
            }

            res.send({
                country: forecastData.country,
                latitude: data.latitude,
                longitude: data.longitude,
                temperature: forecastData.temperature
            });
        });
    });
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});