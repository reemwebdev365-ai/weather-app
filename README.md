# ☀️ Weather App

A simple and responsive web app that takes a country or city name and shows its coordinates and current temperature.

Built with **Node.js**, **Express**, and **Handlebars**. It uses the **Mapbox Geocoding API** to find the location and **WeatherAPI** to get the current weather.

## Screenshots

### 1. Home
The landing page. The user types a country or city name in the search box and clicks **Get Weather**.

![Home page](./screenshots/1.png)

### 2. Loading State
After clicking the button, it changes to "Loading..." and is disabled while the data is being fetched. This gives the user feedback and prevents sending duplicate requests.

![Loading state](./screenshots/loading.png)

### 3. Weather Result
Once the data arrives, the app shows the country name, latitude, longitude, and the current temperature in °C inside separate info cards.

![Weather result](./screenshots/2.png)

### 4. Error Handling
If the location can't be found or the request fails, a clear message is shown under the form instead of breaking the page. Here, a meaningless search returns "Unable to find location. Try another search".

![Error message](./screenshots/3.png)

## Features

- Search by country or city name
- Displays country, latitude, longitude, and current temperature (°C)
- Friendly error messages for invalid locations or API failures
- Loading indicator and disabled button while the request is in progress
- Clean glassmorphism UI with a responsive layout
- API keys stored securely in environment variables

## Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** Handlebars (hbs)
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **APIs:** [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/), [WeatherAPI](https://www.weatherapi.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- A free API key from [WeatherAPI](https://www.weatherapi.com/)
- A free access token from [Mapbox](https://www.mapbox.com/)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/reemwebdev365-ai/weather-app.git
   cd weather-app
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in the root folder (you can copy `.env.example`) and add your keys:

```env
   WEATHER_API_KEY=your_weatherapi_key_here
   MAPBOX_TOKEN=your_mapbox_token_here
   PORT=3000
```

4. Start the app:

```bash
   npm start
```

   For development with auto-reload:

```bash
   npm run dev
```

5. Open your browser at [http://localhost:3000](http://localhost:3000)

## How It Works

1. The user enters a country or city name.
2. The browser sends a request to the server: `GET /weather?address=<name>`.
3. The server sends the name to the **Mapbox Geocoding API** to get its latitude and longitude.
4. The coordinates are sent to **WeatherAPI** to get the current temperature.
5. The server returns the result as JSON, and the page displays it (or shows an error message if something fails).

## API Endpoint

```
GET /weather?address=<country or city name>
```

**Example response:**

```json
{
  "country": "Egypt",
  "latitude": 26.4942,
  "longitude": 29.8719,
  "temperature": 30.3
}
```

**Error response:**

```json
{
  "error": "Unable to find location. Try another search"
}
```

## Project Structure

```
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/         # Background image
│   └── js/
│       └── script.js   # Client-side script
├── screenshots/        # README screenshots
├── src/
│   ├── app.js          # Express server
│   └── tools/
│       ├── geocode.js  # Mapbox geocoding
│       └── forecast.js # WeatherAPI request
├── views/
│   └── index.hbs       # Main page
├── .env.example
├── .gitignore
├── package-lock.json
└── package.json
```

## Security Note

API keys are loaded from a `.env` file, which is ignored by Git. Never commit your real keys. Use `.env.example` as a template.

## Author

**Reem**
GitHub: [@reemwebdev365-ai](https://github.com/reemwebdev365-ai)