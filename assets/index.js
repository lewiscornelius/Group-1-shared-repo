var sevenDayForecastEl = document.querySelector('#sevenDayContainer');
var currentTempEl = document.querySelector('#currentTemp');
var currentWeatherEl = document.querySelector('#currentWeather');

var city = { lng: -122, lat: 37 }; //place holder

function currentWeatherForecast() {
    fetch('http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809')

        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
        });

}
function sevenDayForecast() {
    fetch('http://api.weatherapi.com/v1/forecast.json?key=0326e1253a344fc8858235651232809&days=7')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
}

function searchInput() {
    this.sevenDayForecast(document.getElementById(".input").value);
    console.log(value);
}

document.querySelector(".input").addEventListener("keydown", function (event) { 
    if (event.key == "Enter") {
        sevenDayForecast.search(event);
    }document.querySelector(".input").value });



function displaySevenDayForecast(forecast) {
    for (var i = 0; i < 7; i++) {
        var sevenDays = document.querySelector('span');
        var weather = document.createElement('div');
        weather.classList = 'list-item flex-row justify-space-between align-center';

        var temperature

        weather.appendChild(sevenDays)
        sevenDayForecastEl.appendChild(weather);
    }
}
// // point = is the lat and long for coordinates
// function trafficReport(){
// fetch("https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=52.41072%2C4.84239&unit=MPH&openLr=false&key=DzuYR8JOWdmvyTeedltrKg0WXzWiKulJ")

// .then(function(response){
//    return response.json();
// })
//    .then(function(data){
//        console.log(data);
//    });
// }

// Map Display
var trafficKey = 'DzuYR8JOWdmvyTeedltrKg0WXzWiKulJ'

var map = tt.map({
    key: trafficKey,
    container: 'map-div',
    center: city,
    zoom: 12,
    style: 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAVmV2cTdUdHloQlR4b2J5Ujs5ZWRmZTk2ZC1jNjI5LTQ3YWUtODY4OS0yNDA2NGJiZTQ4ZGY=.json?key=DzuYR8JOWdmvyTeedltrKg0WXzWiKulJ'
})
