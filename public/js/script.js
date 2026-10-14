
const form = document.getElementById('form1');
const addressInput = document.getElementById('address');
const errorF = document.getElementById('error');
const result = document.getElementById('weather-result');
const submitBtn = document.getElementById('submit-btn');

const countryF = document.getElementById('country');
const latitudeF = document.getElementById('latitude');
const longitudeF = document.getElementById('longitude');
const temperatureF = document.getElementById('temperature');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const address = addressInput.value.trim();

    if (!address) {
        errorF.innerText = 'Please enter a country or city name.';
        result.hidden = true;
        return;
    }

    errorF.innerText = '';
    result.hidden = true;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Loading...';

    try {
        const response = await fetch(
            '/weather?address=' + encodeURIComponent(address)
        );

        const data = await response.json();

        if (!response.ok || data.error) {
            errorF.innerText = data.error || 'Unable to get weather data.';
            return;
        }

        countryF.innerText = 'Country: ' + data.country;
        latitudeF.innerText = 'Latitude: ' +
            Number(data.latitude).toFixed(4);
        longitudeF.innerText = 'Longitude: ' +
            Number(data.longitude).toFixed(4);
        temperatureF.innerText = 'Temperature: ' +
            data.temperature + '°C';

        result.hidden = false;

    } catch (error) {
        console.error(error);
        errorF.innerText = 'Something went wrong. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Get Weather';
    }
});
