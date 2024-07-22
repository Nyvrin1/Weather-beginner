async function searchWeather() {
    const apiKey = '12a572575cb00f04e3fe0793c2edf631'; 
    const city = document.getElementById('search-input').value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('API Key:', apiKey);
    console.log('URL:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Invalid API key or issue with the request');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather-result');
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-result');
    if (data.cod === 200) {
        weatherDiv.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
    }
}
