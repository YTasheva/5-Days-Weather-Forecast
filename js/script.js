// References to HTML elements
var searchInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var historyList = document.querySelector("#history");
var searchResults = document.querySelector("#search-results");
var searchResultsList = document.querySelector("#search-results-list");
var todayWeather = document.querySelector("#today");
var forecast = document.querySelector(".forecast");
var fiveDay = document.querySelector("#fiveDay");
var today = moment().format('L');

// API key for the OpenWeather
var apiKey = "48fd55791116a3eb6271c7845017027a";
var apiGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=48fd55791116a3eb6271c7845017027a";
var forecast5DayURL = "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=48fd55791116a3eb6271c7845017027a";

// Event listener
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var searchValue = searchInput.value.trim();
    if (searchValue === "") {
        alert('Enter City');
        return;
    }
    todayWeather.innerHTML = "";
    forecast.innerHTML = "";

todayWeather.appendChild(temperature);
todayWeather.appendChild(humidity);
todayWeather.appendChild(wind);
}

function displayForecast(data) {
    for (var i = 0; i < data.list.length; i++) {
        var forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.appendChild(date);
        forecastItem.appendChild(temperature);
        forecastItem.appendChild(humidity);

        forecast.appendChild(forecastItem);
    }
}
    for (var i = 0; i < data.list.length; i++) {
        var forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.appendChild(date);
        forecastItem.appendChild(temperature);
        forecastItem.appendChild(humidity);

        forecast.appendChild(forecastItem);
    }
}
        for (var i = 0; i < data.list.length; i++) {
            var forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.appendChild(date);
            forecastItem.appendChild(temperature);
            forecastItem.appendChild(humidity);
    
            forecast.appendChild(forecastItem);
        }
    }
            } else {
                throw  Error("Error: " + response.status);
            }
        })
        .then(function(data) {
            displayCurrentWeather(data);
            fetchForecastData(data[0].lat, data[0].lon);
        })
        .catch(function(error) {
            console.log(error);
            alert('Error:');
        });
}

function fetchForecastData(lat, lon) {
    fetch(forecast5DayURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(function(data) {
            // Display forecast data
            displayForecast(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}
  alert('Error:');
});
}

//Display current weather
function displayCurrentWeather(data) {
var cityName = document.createElement('h2');
cityName.textContent = data.name;
  
var temperature = document.createElement('p');
temperature.textContent = 'Temp: ' + data.main.temp + '°C';

var wind = document.createElement('p');
wind.textContent = 'Wind: ' + data.wind + ' m/s';
  
var humidity = document.createElement('p');
humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
  
// Append HTML elements

todayWeather.appendChild(cityName);
todayWeather.appendChild(temp);
todayWeather.appendChild(humidity);
todayWeather.appendChild(wind);
}

function displayForecast(data) {
    for (var i = 0; i < data.list.length; i++) {
      var forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
  
      var date = document.createElement('p');
      date.textContent = data.list[i].dt_txt;
  
      var temperature = document.createElement('p');
      temperature.textContent = 'Temperature: ' + data.list[i].main.temp + '°C';
  
      var humidity = document.createElement('p');
      humidity.textContent = 'Humidity: ' + data.list[i].main.humidity + '%';
  
      forecastItem.appendChild(date);
      forecastItem.appendChild(temperature);
      forecastItem.appendChild(humidity);
  
      forecast.appendChild(forecastItem);
    }
  }
  
  