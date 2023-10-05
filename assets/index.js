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
        currentWeatherForecast(city);
        sevenDayForecast(city);
    }
});  

function currentWeatherForecast(city) {
    var currentWeatherURL = `http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809&q=${city}`;

    fetch(currentWeatherURL).then(function (response) {
        console.log(response);
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
            console.log(hour);
            var minute = data.getMinutes();
            minute = (minute < 10) ? "0" + minute : minute;
            dayOfTheWeek = date.getDay();
            var weeklyArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var dayOfWeek = weeklyArray[dayOfTheWeek];
            dayOfWeek += " " + hour + ":" + minute;
            weatherData.dayOfTheWeek = dayOfTheWeek;
            currentWeatherEl(weatherData, city);
        });

    function sevenDayForecast(city) {
        var weeklyForecastURL = `http://api.weatherapi.com/v1/forecast.json?key=0326e1253a344fc8858235651232809&q=${city}&days=7`
        sevenDayForecastEl.innerHTML = "";
        fetch(weeklyForecastURL)
            .then(function (response) {
                console.log(city);
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                data.forecast.forecastday.forEach(day=>{
                    var weatherData = {};
                    weatherData.currentTemperature = Math.round(day.day.avgtemp_f);
                    weatherData.conditonalIcon = "https:"+day.day.condition.icon;
                    var date = new Date(day.date);
                    var dayOfTheWeek = date.getDay();
                    weatherData.precipitation = day.day.daily_chance_of_rain + "%";
                    weatherData.windSpeed = day.day.maxwind_mph;
                    weatherData.humidity = day.day.avghumidity;
                    weatherData.conditionalText = day.day.condition.text;
                    weatherData.maxTemp = Math.round(day.day.maxtemp_f);
                    weatherData.maxTemp = Math.round(day.day.mintemp_f);
                    var weeklyArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    weatherData.dayOfWeek = weeklyArray[dayOfTheWeek];
                    var sevenDayForecastHTML = displaySevenDayForecastHTML(weatherData, city);
                    sevenDayForecastEl.appendChild(sevenDayForecastHTML);
                }
                )
            });
    }

    function displaySevenDayForecast(weatherData, city) {
        var div = document.createElement("div");
        div.innerText = "sevenDayForecast";

        var sevenDayForecast = document.createElement("div");
        sevenDayForecast.innerText = "sevenDayForecast";
        
    }

    function displayCurrentWeatherForecast(weatherData, city) {

    }
    var locationValue = document.getElementById("locationValue");
    city = locationValue.value;
    setMapLocation();
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
