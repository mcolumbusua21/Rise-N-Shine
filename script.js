var api_key = "a23365c1b8d54db9365aca921b524b3e";
var $submitBtn = document.querySelector("#submit-btn");
var $city = document.querySelector("#city");
var $searchCardsContainer = document.querySelector("#search-cards-container");
var $currentWeatherContainer = document.querySelector(
  "#current-weather-container"
);
var citySearch = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainer = document.querySelector("#fiveday-container");
var pastSearchButtons = document.querySelector("#past-search-buttons");
var cities = [];
// userSearch();
var lat;
var lon;



var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = $city.value.trim();
  if (city) {
    getWeather(city);
    // get5Day(city);
    cities.unshift({ city });
    city.value = "";
  } else {
    alert("Enter City");
  }
  saveSearch();
  var btn = document.createElement("button");
  btn.innerText = city;
  pastSearchButtons.append(btn);
};
var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

function getWeather(city) {
  var currentWeatherUrl = `"https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
  city;`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather.list);
      forecastContainer.innerHTML = ""
      for (var i = 4; i < weather.list.length; i = i + 8) {
        console.log(weather.list[i]);
        var currentDay = weather.list[i];
        var forecastCard = document.createElement("div");
        forecastCard.classList = "five-card"

        var dateEl = document.createElement("h3");
        dateEl.innerText = currentDay.dt_txt.slice(0, 10);
        forecastCard.prepend(dateEl);

        var tempEl = document.createElement("p");
        tempEl.innerText = kToF(currentDay.main.temp);
        forecastCard.append(tempEl);
        


        var humidEl = document.createElement("p");
        humidEl.innerText = currentDay.main.humidity + "%" + " humidity";
        forecastCard.append(humidEl);

        var windSpeedEl = document.createElement("p");
        windSpeedEl.innerText = currentDay.wind.speed + " Wind Speed";
        forecastCard.append(windSpeedEl);
        
        
        
        
        
        var weatherIcon = document.createElement("img");
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`
            );
            forecastCard.appendChild(weatherIcon);
            
            forecastContainer.append(forecastCard);
        }
    });
};

function kToF (k){
    var fTemp = ((k - 273.15) * 1.8) + 32
    return `${fTemp.toFixed()} degrees`
}

var displayUvIndex = function (index) {
    
    var uvIndexEL = document.createElement("p");
    uvIndex.innerText = currentDay
    if (index.value <= 2) {
      uvIndexValue.classList = "favorable";
    } else if (index.value > 2 && index.value <= 8) {
      uvIndexValue.classList = "moderate";
    } else if (index.value > 8) {
      uvIndexValue.classList = "severe";
    }
  
    uvIndex.appendChild(uvIndexValue);
    weatherContainerEl.appendChild(uvIndex);}



$submitBtn.addEventListener("click", formSubmitHandler);
