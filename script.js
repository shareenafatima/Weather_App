
async function fetchWeather(location) {
    const apiKey = '804ffd0b5fcd78e70effd697f9180def'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=804ffd0b5fcd78e70effd697f9180def`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return processWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        return null;
    }
}

function processWeatherData(data) {
    const processedData = {
        location: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description
    };
    return processedData;
}

document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();

    if (location === '') {
        alert('Please enter a location');
        return;
    }

    const weatherData = await fetchWeather(location);
    if (weatherData) {
        displayWeather(weatherData);
    }
});

function displayWeather(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
      <h2>Weather Information</h2>
      <p><strong>Location:</strong> ${weatherData.location}, ${weatherData.country}</p>
      <p><strong>Temperature:</strong> ${weatherData.temperature} K</p>
      <p><strong>Description:</strong> ${weatherData.description}</p>
    `;
}
