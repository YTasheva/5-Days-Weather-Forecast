var cityData = [];
var cityId = 0;
var searchCityBtn = document.querySelector("#btn-search-city");
var searchCity = document.querySelector("#search-city");
var historyEl = document.querySelector(".history-part");
var btnClearEl = document.querySelector("#btn-clear");
var todayWeatherEl = document.querySelector(".today");
var fiveDayEl = document.querySelector(".fiveday-forecast");
var fiveDaytemp = document.querySelector(".card-body");
var btnsubscribe = document.querySelector(".btn-subscribe");
var apiKey = "4f585493f941e0eeef3857860aa417e6";

// loading after
window.addEventListener("load", function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c7f5505a9mshbeda1d20024b8f4p11cfd0jsn6f20bc102b9e",
      "X-RapidAPI-Host": "spott.p.rapidapi.com",
    },
  };

  fetch("https://spott.p.rapidapi.com/places/ip/me", options)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      var cityCoord = {
        lat: data.coordinates.latitude,
        lon: data.coordinates.longitude,
      };
      fetchApiWeather(cityCoord);
    })
    .catch((err) => console.error(err));
});

// starting search
function searchCityEl() {
  var city = searchCity.value.toLowerCase();
  if (!city) {
    alert("Please enter a city");
  } else {
    var searchCityObj = {
      record: city,
    };

    searchHistoryEl(searchCityObj);
    fetchApiData(city);
    searchCity.value = "";
    savedata();
  }
}

// create search history in historyEl(".history-part")
function searchHistoryEl(searchCityObj) {
  var cityList = document.createElement("button");
  cityList.classList.add("city-list", "mt-2");
  cityList.setAttribute("data-city-id", cityId);
  cityList.textContent = searchCityObj.record;
  historyEl.appendChild(cityList);

  searchCityObj.id = cityId;
  cityData.push(searchCityObj);

  cityId++;
}

// click a city in history
var searchHistoryCity = function (event) {
  var targetEl = event.target;
  var cityHistoryId = targetEl.getAttribute("data-city-id");
  for (var i = 0; i < cityData.length; i++) {
    if (cityData[i].id === parseInt(cityHistoryId)) {
      var historyCityName = cityData[i].record;
      fetchApiData(historyCityName);
    }
  }
};

// clear search history
function clearHistoryEl() {
  var removeAll = historyEl;

  while (removeAll.hasChildNodes()) {
    removeAll.removeChild(removeAll.firstChild);
  }

  cityData.length = 0;

  window.localStorage.clear();
}

// refresh page, load localstorage
function loadsearch() {
  var load = localStorage.getItem("city");

  if (!load) {
    return false;
  }

  load = JSON.parse(load);

  for (var i = 0; i < load.length; i++) {
    searchHistoryEl(load[i]);
  }
}

// save search city in localstorage
function savedata() {
  localStorage.setItem("city", JSON.stringify(cityData));
}

// city, date, & icon
function fetchApiData(city) {
  apiCity =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(apiCity)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // clear old
          var removeAll = todayWeatherEl;
          while (removeAll.hasChildNodes()) {
            removeAll.removeChild(removeAll.firstChild);
          }
          // get city coordinates
          var cityCoord = data.coord;
          // get date
          var dt = data.dt;
          dt = new Date(dt * 1000);
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          var year = dt.getFullYear();
          var month = months[dt.getMonth()];
          var date = dt.getDate();
          var time = month + " " + date + " " + year;
          // get icon
          var icon = data.weather[0].icon;
          var iconUrl = `<img src = "http://openweathermap.org/img/wn/${icon}@2x.png" alt = "" />`;
          // display city, date, icon
          var displayCity = document.createElement("h2");
          displayCity.classList.add("city-name");
          displayCity.innerHTML = data.name + " (" + time + ") " + iconUrl;
          todayWeatherEl.appendChild(displayCity);

          fetchApiWeather(cityCoord);
        });
      } else {
        alert("Error: The City is Not Found");
        removeLastOne();
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Weather Dashboard");
    });
}

function fetchApiWeather(cityCoord) {
  apiWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoord.lat}&lon=${cityCoord.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  fetch(apiWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var rowWeather = document.createElement("div");
      rowWeather.classList.add("row");
      todayWeatherEl.appendChild(rowWeather);

      var currentWeather = document.createElement("div");
      currentWeather.classList.add("col-6", "current-weather", "mt-2");
      currentWeather.innerHTML = "<h3>Current Weather</h3>";
      rowWeather.appendChild(currentWeather);

      // temperature
      var temperatureEl = document.createElement("li");
      temperatureEl.classList.add("today-weather");
      temperatureEl.innerHTML =
        "<span><b>Temperature: </b>" + data.current.temp + "&#8451</span>";
      currentWeather.appendChild(temperatureEl);
      // wind speed
      var windSpeedEl = document.createElement("li");
      windSpeedEl.classList.add("today-weather");
      windSpeedEl.innerHTML =
      "<b>Wind Speed: </b>" + data.current.wind_speed + " m/s";
      currentWeather.appendChild(windSpeedEl);
      // humidity
      var humidityEl = document.createElement("li");
      humidityEl.classList.add("today-weather");
      humidityEl.innerHTML = "<b>Humidity: </b>" + data.current.humidity + "%";
      currentWeather.appendChild(humidityEl);
      // UV index
      var uvIndexEl = document.createElement("li");
      uvIndexEl.classList.add("today-weather");
      uvIndexEl.innerHTML =
        "<b>UV Index: </b><span class='uv-index'>" +
        data.current.uvi +
        "</span>";
      currentWeather.appendChild(uvIndexEl);

      if (data.current.uvi >= 0 && data.current.uvi < 3) {
        var uvColor = document.querySelector(".uv-index");
        uvColor.classList.add("green");
      } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
        var uvColor = document.querySelector(".uv-index");
        uvColor.classList.add("yellow");
      } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
        var uvColor = document.querySelector(".uv-index");
        uvColor.classList.add("orange");
      } else if (data.current.uvi >= 8 && data.current.uvi < 11) {
        var uvColor = document.querySelector(".uv-index");
        uvColor.classList.add("red");
      } else {
        var uvColor = document.querySelector(".uv-index");
        uvColor.classList.add("violet");
      }
      // can add a UV index table (bootstrap)
      var uvIndexTable = document.createElement("div");
      uvIndexTable.classList.add("col-6", "uv-table", "text-center", "mt-2");
      uvIndexTable.innerHTML = `<table class="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">UV Index</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Risk of harm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">0-2</th>
                                        <td class="green">Green</td>
                                        <td>Low</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">3-5</th>
                                        <td class="yellow">Yellow</td>
                                        <td>Moderate</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">6-7</th>
                                        <td class="orange">Orange</td>
                                        <td>High</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">8-10</th>
                                        <td class="red">Red</td>
                                        <td>Very high</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">11+</th>
                                        <td class="violet">Violet</td>
                                        <td>Extreme</td>
                                        </tr>
                                    </tbody>
                                </table><br/>`;
      rowWeather.appendChild(uvIndexTable);

      fiveDayForecast(data.daily);
    });
}

function fiveDayForecast(daily) {
  // clear old
  var removeAll = fiveDayEl;
  while (removeAll.hasChildNodes()) {
    removeAll.removeChild(removeAll.firstChild);
  }

  // five day forecast
  var fiveDayTitle = document.createElement("h3");
  fiveDayTitle.classList.add("col-12");
  fiveDayTitle.setAttribute("id", "five-day-title");
  fiveDayTitle.textContent = "5-Day Forecast:";
  fiveDayEl.appendChild(fiveDayTitle);
  var fiveDayArr = [];
  for (var i = 1; i < daily.length - 2; i++) {
    // time
    var fiveDaydt = daily[i].dt;
    fiveDaydt = new Date(fiveDaydt * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = fiveDaydt.getFullYear();
    var month = months[fiveDaydt.getMonth()];
    var date = fiveDaydt.getDate();
    var time = month + " " + date + " " + year;
    // icon
    var fiveDayIcon = daily[i].weather[0].icon;
    // temperature
    var fiveDayTemp = daily[i].temp.day;
    // wind speed
    var fiveDayWind = daily[i].wind_speed;
    // the humidity
    var fiveDayHumidity = daily[i].humidity;
    // create an object to save one-day weather
    var fiveDayObj = {
      fdate: time,
      ficon: fiveDayIcon,
      ftemp: fiveDayTemp,
      fwind: fiveDayWind,
      fhumidity: fiveDayHumidity,
    };
    // push fiveDayObj into fiveDayArr
    fiveDayArr.push(fiveDayObj);
  }

  // create five day weather card
  for (var i = 0; i < 5; i++) {
    var fDayCard = document.createElement("div");
    fDayCard.classList.add("card");
    fDayCard.setAttribute("style", "width: 10rem;");

    var fDayContent = document.createElement("div");
    fDayContent.classList.add("card-body");

    var date = document.createElement("h5");
    date.classList.add("card-title");
    date.innerHTML =
      `${fiveDayArr[i].fdate}` +
      " " +
      `<img src = "http://openweathermap.org/img/wn/${fiveDayArr[i].ficon}@2x.png" alt = "" />`;
    fDayContent.appendChild(date);

    var temp = document.createElement("li");
    temp.classList.add("card-text");
    temp.innerHTML =
      "<b>Temperature: </b><br/>" + fiveDayArr[i].ftemp + "<span>&#8451</span>";
    fDayContent.appendChild(temp);

    var wind = document.createElement("li");
    wind.classList.add("card-text");
    wind.innerHTML = "<b>Wind Speed: </b><br/>" + fiveDayArr[i].fwind + " m/s";
    fDayContent.appendChild(wind);

    var humidity = document.createElement("li");
    humidity.classList.add("card-text");
    humidity.innerHTML =
      "<b>Humidity: </b><br/>" + fiveDayArr[i].fhumidity + "%";

    fDayContent.appendChild(humidity);
    fDayCard.appendChild(fDayContent);
    fiveDayEl.appendChild(fDayCard);
  }
}

// when alert, remove last one record
function removeLastOne() {
  var removeLastOne = historyEl;

  if (removeLastOne.hasChildNodes()) {
    removeLastOne.removeChild(removeLastOne.lastChild);
  }

  cityData.pop();

  localStorage.setItem("city", JSON.stringify(cityData));
}

function subscribeEl(event) {
  alert("Thanks for subscribing");
}

searchCityBtn.addEventListener("click", searchCityEl);
btnClearEl.addEventListener("click", clearHistoryEl);
historyEl.addEventListener("click", searchHistoryCity);
btnsubscribe.addEventListener("click", subscribeEl);
loadsearch();
