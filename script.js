
async function fetchWeather(location) {
    const apiKey = '804ffd0b5fcd78e70effd697f9180def'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=804ffd0b5fcd78e70effd697f9180def`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found!');
        }
        const data = await response.json();
        if (!validCountry(data)){
            throw new Error('Invalid country name!');
        }
        return processWeatherData(data);
    }  
    catch(error){
        displayError(error.message);
        return null;
    }
}

function validCountry(data){
    return data.sys && data.sys.country;

}

function processWeatherData(data) {
    const temperatureCelsius = (data.main.temp - 273.15).toFixed(3);
    const processedData = {
        location: data.name,
        country: data.sys.country,
        temperature: temperatureCelsius,
        description: data.weather[0].description
    };
    return processedData;
}

function displayError(message){
    clearInfo();
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
}

function clearInfo(){
    const clearWeather = document.getElementById('weatherInfo');
    clearWeather.innerHTML = '';
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
        clearerror();
    }
    locationInput.value = '';
});
function clearerror(){
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = '';
}

function displayWeather(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
      <h2>Weather Information</h2>
      <p><strong>Location:</strong> ${weatherData.location}, ${weatherData.country}</p>
      <p><strong>Temperature:</strong> ${weatherData.temperature} C</p>
      <p><strong>Description:</strong> ${weatherData.description}</p>
    `;
}
