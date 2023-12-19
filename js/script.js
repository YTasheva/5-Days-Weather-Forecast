// References to HTML elements
var searchInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var historyList = document.querySelector("#history");
var todayWeather = document.querySelector("#today");
var forecast = document.querySelector(".forecast");
var today = moment().format('L');
var historyList = []


// API key for the OpenWeather
var apiKey = "dde671ce0faac451b9eaab661597d442";
var apiGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=dde671ce0faac451b9eaab661597d442";
var forecast5DayURL = "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=dde671ce0faac451b9eaab661597d442";

// function for current forecast
function currentForecast(city) {
    fetch(forecast5DayURL) 
        .then(function(cityForecastResponse) {
            return response.json();
})
        .then(function(cityForecastData) {
        console.log(cityForecastResponse)

        var iconcode = cityForecastResponse.weather[0].icon;
        var iconurl = `https://openweathermap.org/img/w/10d.png`;
        $('#wicon').attr('src', iconurl);


// Display forecast data for cu
    displayForecast(data);
})
.catch(function(error) {
    console.log(error);
});
}



// Event listener
$("#search-button").on("click", function() {
    event.preventDefault();

    var city = $("#search-input").val().trim(); 
    currentCondition(city);
    if (!historyList.includes(city)) {
        historyList.push(city);
        var searchedCity = $(`
            <div class="list-group-item">${city}</div>
            `);
        $("#history").append(searchedCity);
    };
    
    localStorage.setItem("city", JSON.stringify(history));
    console.log(historyList);
});


//Forecast of the locations in the history input
$(document).on("click", ".list-group-item", function() {
    var cityList = $(this).text();
    currentForecast(cityList);
});


//Last searched forecast of a location
$(document).ready(function() {
    var historyArr = JSON.parse (localStorage.getItem("city"));

    if (historyArr !== null) {
        var lastSearchedIndex = historyArr.length - 1;
        var lastCitySearch = historyArr[lastSearchedIndex];
        currentForecast(lastCitySearch);
        console.log(`Last searched city: lastCitySearch`);
    }
});


   