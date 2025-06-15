// script.js
const apiKey = "95a091c82c721b14cacd3fb32ed62d57"; // OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
  const weatherId = data.weather[0].id;
  const weatherIconClass = getWeatherIcon(weatherId); // use helper function

  const weatherInfo = `
    <div class="fade-in">
      <h3>${data.name}, ${data.sys.country}</h3>
      <i class="wi ${weatherIconClass}" style="font-size: 48px;"></i>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>⛅ Condition: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    </div>
  `;
  const weatherDataDiv = document.getElementById("weatherData");
  weatherDataDiv.innerHTML = weatherInfo;

  weatherDataDiv.classList.remove("weather-box");
  void weatherDataDiv.offsetWidth;
  weatherDataDiv.classList.add("weather-box");
})

    .catch(error => {
      document.getElementById("weatherData").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
function getWeatherIcon(id) {
  if (id >= 200 && id < 300) return "wi-thunderstorm";
  if (id >= 300 && id < 500) return "wi-sprinkle";
  if (id >= 500 && id < 600) return "wi-rain";
  if (id >= 600 && id < 700) return "wi-snow";
  if (id >= 700 && id < 800) return "wi-fog";
  if (id === 800) return "wi-day-sunny";
  if (id > 800 && id < 805) return "wi-cloudy";
  return "wi-na"; // fallback icon
}

