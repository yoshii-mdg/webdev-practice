const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Fetch weather data for a city
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('City not found');
    }
    return await response.json();
}

// Display weather data in the DOM
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
    `;
}

// Handle form submission
document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('cityInput').value;
    try {
        const data = await getWeather(city);
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather').textContent = error.message;
    }
});