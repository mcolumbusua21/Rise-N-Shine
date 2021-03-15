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
var $cityText = document.querySelector("#city-text");
var currentContainer = document.querySelector("#current-container");
var histroryContainer = document.querySelector("#history-container");
var past = JSON.parse(localStorage.getItem("past")) || "";
// userSearch();
var lat;
var lon;

function getCurrentWeather(city) {
  var currentWeatherEnd = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  fetch(currentWeatherEnd)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      if (weather.cod === "404") {
        alert("City not Found");
        return;
      }
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      var weatherNow = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

      fetch(weatherNow)
        .then((data) => data.json())
        .then(function (oneCallData) {
          var mainCard = document.createElement("div");
          mainCard.classList.add("maincard");
          console.log(oneCallData);

          var cityEl = document.createElement("h2");
          cityEl.innerText = city + " - " + new Date().toDateString();
          mainCard.append(cityEl);

          var uVEl = document.createElement("button");
          var uvIndex = oneCallData.current.uvi;
          uVEl.innerText = oneCallData.current.uvi;
          if (uvIndex <= 2) {
            uVEl.classList.add("favorable");
          } else if (uvIndex >= 5) {
            uVEl.classList.add("severe");
          } else {
            uVEl.classList.add("moderate");
          }
          mainCard.append(uVEl);

          var tempEl = document.createElement("p");
        tempEl.innerText = kToF(oneCallData.current.temp);
        mainCard.append(tempEl);

        var humidEl = document.createElement("p");
        humidEl.innerText = oneCallData.current.humidity + "%" + " humidity";
        mainCard.append(humidEl);

        var windSpeedEl = document.createElement("p");
        windSpeedEl.innerText = oneCallData.current.wind_speed+ " mph";
        mainCard.append(windSpeedEl);


          $currentWeatherContainer.append(mainCard);
        });
    });
}

function formSubmitHandler(event) {
  event.preventDefault();
  var city = $city.value.trim();
  if (city) {
    getWeather(city);
    getCurrentWeather(city);
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
}
var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

function getWeather(city) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather.list);
      forecastContainer.innerHTML = "";
      for (var i = 4; i < weather.list.length; i = i + 8) {
        console.log(weather.list[i]);
        var currentDay = weather.list[i];
        var forecastCard = document.createElement("div");
        forecastCard.classList = "five-card";

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
}

function kToF(k) {
  var fTemp = (k - 273.15) * 1.8 + 32;
  return `${fTemp.toFixed()} degrees`;
}

histroryContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches("li")) return;
  getWeather(e.target.textContent);
  getFiveDay(e.target.textContent);
});
$submitBtn.addEventListener("click", formSubmitHandler);

$(".sbmtbutton").on("click", function (event) {
  event.preventDefault();
  var city = $("#city-input").val();
  handleCity(city);
  getWeather(city);
  getFiveDay(city);
  renderPast();
});

function handleCity() {
  if (!past.includes(cityName)) {
    past.push(cityName);
  }
  renderPast();
  function renderPast() {
    for (const city of past) {
      historyContainer.innerHTML = "";
      var previousCity = document.createElement("li");
      previousCity.innerText = city;
      histroryContainer.append(previousCity);
    }
  }
}
localStorage.setItem("history", JSON.stringify(history));
