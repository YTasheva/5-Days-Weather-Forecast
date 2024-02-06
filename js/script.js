// References to HTML elements
var searchInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var historyList = document.querySelector("#history");
var todayWeather = document.querySelector("#today");
var forecast = document.querySelector("#5DayForecast");
var today = moment().format('L');



// API key for the OpenWeather
var apiKey = "dde671ce0faac451b9eaab661597d442";
var apiGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=dde671ce0faac451b9eaab661597d442";
var forecast5DayURL = "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=dde671ce0faac451b9eaab661597d442";

// function for current forecast
function currentForecast(city) {
    fetch(apiGeoURL) 
        .then(function(cityForecastResponse)
         {
            return cityForecastResponse.json();
})
        .then(function(cityForecastData) {
        console.log(cityForecastResponse)

        $("#today").css("display", "block");
        $("#todayWeather").empty();

        var iconCode = cityForecastResponse.weather[0].icon;
        var iconurl = `https://openweathermap.org/img/w/10d.png`;
        $('#wicon').attr('src', iconurl);

// Current city forecast: weather wind, temperature, humidity, date
var cityForecastData = $(`
<h2 id="cityForecastData">
    ${cityForecastResponse.name} ${today} <img src="${iconurl}" alt="${cityForecastResponse.weather[0].description}" />
</h2>
<p>Temperature: ${cityForecastResponse.main.temp} °C</p>
<p>Wind Speed: ${cityForecastResponse.wind.speed} KPH</p>
<p>Humidity: ${cityForecastResponse.main.humidity}\%</p>
`);

$("#today").append(cityForecastData);

//  5-day forecast
function futureForecast(lat, lon) {
    fetch(forecast5DayURL) 
    .then(function(futureForecastResponse) {
        return futureForecastResponse.json();
        console.log(futureForecastResponse);
})
    .then(function(futureForecastData) {
    console.log(futureForecastData)
    $("#5DayForecast").empty();

    for (let i = 1; i < 6; i++) {
        var cityData = {
            date: futureForecastResponse.daily[i].dt,
            icon: futureForecastResponse.daily[i].weather[0].icon,
            temp: futureForecastResponse.daily[i].temp.day,
            humidity: futureForecastResponse.daily[i].humidity
        };

        var currDate = moment.unix(cityData.date).format("DD/MM/YYYY");
        var iconurl = `<img src="https://openweathermap.org/img/w/${cityData.icon}.png" alt="${futureForecastResponse.daily[i].weather[0].main}" />`;

// Display the 5-day forecast - day, temperature, wind, humidity
var future5Day = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconurl}</p>
                            <p>Temp: ${cityInfo.temp} °C</p>
                            <p>Humidity: ${cityData.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);

            $("#5DayForecast").append(future5Day);
        }
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