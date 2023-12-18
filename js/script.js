// References to HTML elements
var searchWeather = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var historyList = document.querySelector("#history");
var searchResults = document.querySelector("#search-results");
var searchResultsList = document.querySelector("#search-results-list");
var todayWeather= document.querySelector("#today");
var forecast = document.querySelector(".forecast");
var fiveDay = document.querySelector("#fiveDay");
var today = moment(). format ('L');


// API key for the OpenWeather

var apiKey = "48fd55791116a3eb6271c7845017027a";
var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=$48fd55791116a3eb6271c7845017027a";
var forecast5DayURL = "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=$48fd55791116a3eb6271c7845017027a";

var searchWeather = 