


function gettingTheDate (event) {
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = document.querySelector ("#day-input");
day.innerHTML = days [now.getDay()];
let hours = document.querySelector("#hour-input");
hours.innerHTML = now.getHours();
let minutes = document.querySelector ("#minutes-input");
minutes.innerHTML = now.getMinutes();
}

gettingTheDate ();

function displaySearchedCity (event) {
event.preventDefault();
let cityInput = document.querySelector ("#city-input");
let city = document.querySelector ("h1 #h1-city");
city.innerHTML = (cityInput.value);
getCity (cityInput.value);
}

function displayWeather (response) {
let temperature = Math.round(response.data.main.temp);
let temperatureElement = document.querySelector ("#temperature-data");
temperatureElement.innerHTML = `${temperature}`;
document.querySelector("#feels-like").innerHTML= Math.round(response.data.main.feels_like);
document.querySelector("#humidity").innerHTML= response.data.main.humidity;
document.querySelector("#wind").innerHTML= response.data.wind.speed;
document.querySelector("#description-weather").innerHTML=response.data.weather[0].description;

console.log(response.data);
}

function displayCityData (response) {
let city = response.data.name;
let cityElement = document.querySelector ("#h1-city");
cityElement.innerHTML= `${city}`;
displayWeather(response);
}


function getCity (city) {    //question here.
let units = "metric";
let apiKey ="4970a89d2204448fdc16ce044df95ebe";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
axios.get(apiUrl).then(displayCityData);
}


function showLocation (position) {
let units = "metric";
let apiKey ="4970a89d2204448fdc16ce044df95ebe";
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
axios.get(apiUrl).then(displayCityData);

}

function getLocation (event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(showLocation);
}

let buttonPressed = document.querySelector ("#enter-city");
buttonPressed.addEventListener("submit", displaySearchedCity);

let currentLocationButton = document.querySelector ("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

getCity("Punta Cana");

function getFahrenheit (event) {
  event.preventDefault();
let fahrenheitTemperature = document.querySelector ("#fahrenheit");
fahrenheitTemperature.innerHTML = (Math.round(response.data.main.temp)*1.8)+32;

}

fahrenheitTemperature.addEventListener ("click", getFahrenheit);


  


//function getFahrenheit (event) {

 // event.preventDefault();
//let temperature = document.querySelector ("#temperature-data");
  //temperature.innerHTML = 66;
//}

//let fahrenheitTemperature = document.querySelector ("#fahrenheit");
//fahrenheitTemperature.addEventListener ("click", getFahrenheit);


//function getCelcius (event) {

  //event.preventDefault();
//let temperature = document.querySelector ("#temperature-data");

  //temperature.innerHTML = 19;
//}

//let celciusTemperature = document.querySelector ("#celcius");
//celciusTemperature.addEventListener ("click", getCelcius);

