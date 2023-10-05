var sevenDayForecastEl = document.querySelector('#sevenDayContainer');
var currentTempEl = document.querySelector('#currentTemp');
var currentWeatherEl = document.querySelector('#currentWeather');

var city = '';

locationValue.addEventListener("keyup", function (event) {
    // Check if the 'Enter' key is pressed (keyCode 13)
    if (event.key === "Enter") {

        var locationValue = document.getElementById("locationValue");
        city = locationValue.value;
        setMapLocation();
    }
});

function currentWeatherForecast(city) {
    var currentWeatherURL = (`http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809&q=${city}`);

    fetch(currentWeatherURL).then(function (response) {
        return response.json();

    })
        .then(function (data) {
            console.log(data);
            var weatherData = {};
            weatherData.currentTemperature = Math.round(data.current.temp_f);
            weatherData.precipitation = data.current.precip_ + " mm";
            weatherData.humidity = data.current.humidity;
            weatherData.windSpeed = data.current.wind_mph;
            weatherData.conditionalText = data.current.condition.text;
            weatherData.conditionalIcon = data.current.condition.icon;
            var date = new Date(data.current.last_updated);
            var hour = data.getHours();
            var minute = data.getMinutes();
            minute = (minute < 10) ? "0" + minute : minute;
            var weeklyArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        });
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
        } document.querySelector(".input").value
    });



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
}

// Map
var map;

window.onload = function () {
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [28.59675, -81.20339],
        zoom: 16
    });

    MQ.trafficLayer().addTo(map);
};

function setMapLocation() {
    // Use a geocoding service (e.g., MapQuest's Geocoding API) to get coordinates
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=gUgK3zuO2juaY9exckXhIafpgj38trkj&location=${city}`)
        .then((response) => response.json())
        .then((data) => {
            // Extract latitude and longitude from the response
            var firstResult = data.results[0].locations[0];
            var latitude = firstResult.latLng.lat;
            var longitude = firstResult.latLng.lng;

            // Set the map's center to the obtained coordinates
            map.setView([latitude, longitude], 16);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}