function gettingTheDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector("#day-input");
  day.innerHTML = days[now.getDay()];
  let hours = document.querySelector("#hour-input");
  hours.innerHTML = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = document.querySelector("#minutes-input");
  minutes.innerHTML = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

gettingTheDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
<div class= "weather-forecast-date">${formatDay(forecastday.dt)}</div>
   <img
                  src="http://openweathermap.org/img/wn/${
                    forecastday.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />     

                
<div class="weather-forecast-temperature"> <strong><span class="forecast-max-temperature">${Math.round(
          forecastday.temp.max
        )}°c</span></strong> <span class="forecast-min-temperature">${Math.round(
          forecastday.temp.min
        )}°c</span>
</div>  
</div>
 `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displaySearchedCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("h1 #h1-city");
  city.innerHTML = cityInput.value;
  getCity(cityInput.value);
}

function getForecast(coordinates) {
  let apiKey = "4970a89d2204448fdc16ce044df95ebe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celciusTemperature = response.data.main.temp;
  let temperature = Math.round(celciusTemperature);
  let temperatureElement = document.querySelector("#temperature-data");
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon-weather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function displayCityData(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#h1-city");
  cityElement.innerHTML = `${city}`;
  displayWeather(response);
}

function getCity(city) {
  //question here.
  let units = "metric";
  let apiKey = "4970a89d2204448fdc16ce044df95ebe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
  axios.get(apiUrl).then(displayCityData);
}

function showLocation(position) {
  let units = "metric";
  let apiKey = "4970a89d2204448fdc16ce044df95ebe";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
  axios.get(apiUrl).then(displayCityData);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-data");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature-data");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let enterPressed = document
  .querySelector("#city-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      displaySearchedCity(e);
    }
  });

let celciusTemperature = null;

let buttonPressed = document.querySelector("#enter-city");
buttonPressed.addEventListener("click", displaySearchedCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemperature);

getCity("Punta Cana");
