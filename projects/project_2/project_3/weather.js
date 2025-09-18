const apiKey = "371186cffb431b26e2b8ead77fd9271b"; // Replace with your API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city) fetchWeather(city);
});

async function fetchWeather(city){
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        if(!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);

        // Fetch forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p>${error.message}</p>`;
        document.body.style.background = 'linear-gradient(135deg, #ff5f6d, #ffc371)';
    }
}

function displayWeather(data){
    const { name, sys, weather, main, wind } = data;
    document.getElementById('city-name').innerText = `${name}, ${sys.country}`;
    document.getElementById('description').innerText = weather[0].description;
    document.getElementById('temp').innerText = `Temp: ${main.temp} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${main.humidity}%`;
    document.getElementById('wind').innerText = `Wind: ${wind.speed} m/s`;

    const iconEl = document.getElementById('icon');
    const desc = weather[0].main.toLowerCase();
    let icon='🌤️', bg='linear-gradient(135deg, #6dd5ed, #2193b0)';
    if(desc.includes('cloud')) { icon='☁️'; bg='linear-gradient(135deg,#bdc3c7,#2c3e50)'; }
    else if(desc.includes('rain')) { icon='🌧️'; bg='linear-gradient(135deg,#00c6ff,#0072ff)'; }
    else if(desc.includes('clear')) { icon='☀️'; bg='linear-gradient(135deg,#fbd3e9,#bb377d)'; }
    else if(desc.includes('snow')) { icon='❄️'; bg='linear-gradient(135deg,#83a4d4,#b6fbff)'; }
    else if(desc.includes('thunder')) { icon='⛈️'; bg='linear-gradient(135deg,#373b44,#4286f4)'; }
    iconEl.innerText = icon;
    document.body.style.background = bg;
}

function displayForecast(data){
    const forecastEl = document.getElementById('forecast');
    forecastEl.innerHTML = '';
    const days = {};
    data.list.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
        if(!days[date]) days[date] = item;
    });

    Object.values(days).slice(0,3).forEach(day => {
        const desc = day.weather[0].main.toLowerCase();
        let icon='🌤️';
        if(desc.includes('cloud')) icon='☁️';
        else if(desc.includes('rain')) icon='🌧️';
        else if(desc.includes('clear')) icon='☀️';
        else if(desc.includes('snow')) icon='❄️';
        else if(desc.includes('thunder')) icon='⛈️';

        const div = document.createElement('div');
        div.className = 'forecast-day';
        div.innerHTML = `<p>${new Date(day.dt_txt).toLocaleDateString('en-US',{weekday:'short'})}</p>
                         <p>${icon}</p>
                         <p>${Math.round(day.main.temp)} °C</p>`;
        forecastEl.appendChild(div);
    });
}
