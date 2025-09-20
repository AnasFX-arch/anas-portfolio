const apiKey = "371186cffb431b26e2b8ead77fd9271b"; // Replace with your OpenWeather API key
let isCelsius = true; 
let currentTempC = null;

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    alert("City not found");
    return;
  }

  const data = await response.json();
  showWeather(data);
}

function showWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  currentTempC = Math.round(data.main.temp);
  const condition = data.weather[0].main;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  let icon = "";
  let emoji = "";
  let bg = "";

  switch (condition.toLowerCase()) {
    case "clouds":
      icon = "fas fa-cloud";
      emoji = "☁️";
      bg = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
      break;
    case "rain":
      icon = "fas fa-cloud-showers-heavy";
      emoji = "🌧️";
      bg = "linear-gradient(135deg, #4b79a1, #283e51)";
      break;
    case "snow":
      icon = "fas fa-snowflake";
      emoji = "❄️";
      bg = "linear-gradient(135deg, #83a4d4, #b6fbff)";
      break;
    case "clear":
      icon = "fas fa-sun";
      emoji = "☀️";
      bg = "linear-gradient(135deg, #f7971e, #ffd200)";
      break;
    case "thunderstorm":
      icon = "fas fa-bolt";
      emoji = "⚡";
      bg = "linear-gradient(135deg, #232526, #414345)";
      break;
    default:
      icon = "fas fa-smog";
      emoji = "🌫️";
      bg = "linear-gradient(135deg, #757f9a, #d7dde8)";
  }

  document.body.style.background = bg;

  weatherInfo.innerHTML = `
    <i class="${icon}"></i> <span style="font-size:2rem">${emoji}</span>
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3 id="temp">${currentTempC}°C - ${condition}</h3>
    <p>Humidity: ${humidity}% | Wind: ${wind} m/s</p>
  `;
}

function toggleUnit() {
  if (currentTempC === null) return;

  const tempElement = document.getElementById("temp");
  if (isCelsius) {
    let f = Math.round((currentTempC * 9/5) + 32);
    tempElement.innerHTML = `${f}°F`;
    document.querySelector("#toggle button").innerText = "Switch to °C";
  } else {
    tempElement.innerHTML = `${currentTempC}°C`;
    document.querySelector("#toggle button").innerText = "Switch to °F";
  }
  isCelsius = !isCelsius;
}
