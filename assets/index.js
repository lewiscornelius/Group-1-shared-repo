var sevenDayForecastEl = document.querySelector('#sevenDayContainer');
var currentTempEl = document.querySelector('#currentTemp');
var currentWeatherEl = document.querySelector('#currentWeather');


locationValue.addEventListener("keyup", function(event) {
    // Check if the 'Enter' key is pressed (keyCode 13)
    if (event.key === "Enter") {
       
        var locationValue = document.getElementById("locationValue");
        var city = locationValue.value;



function currentWeatherForecast(city) {
    var currentWeatherURL = (`http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809&q=${city}`);

    fetch (currentWeatherURL).then(function (response) {
            return response.json();

    })
    .then(function (data) {
        console.log(data);
        var weatherData = {};
        weatherData.currentTemperature = Math.round(data.current.temp_f);
        weatherData.precipitation = data.current.precip_+" mm";
        weatherData.humidity = data.current.humidity;
        weatherData.windSpeed = data.current.wind_mph;
        weatherData.conditionalText = data.current.condition.text;
        weatherData.conditionalIcon = data.current.condition.icon;
        var date = new Date(data.current.last_updated);
        var hour = data.getHours();
        var minute = data.getMinutes();
        minute = (minute < 10) ? "0"+minute : minute;
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

// // Initialize the map
window.onload = function() {
    L.map('mapid', {
      layers: MQ.mapLayer(),
      center: [ 40.731701, -73.993411 ],
      zoom: 12
    });
  };

//This function needs to be ran on search
// Function to perform the map search
function searchMap() {
    // Use MapQuest's free geocoding API to convert the location to coordinates
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=gUgK3zuO2juaY9exckXhIafpgj38trkj&location=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                var coordinates = data.results[0].locations[0].latLng; // Get the coordinates from the API response
                map.setView([coordinates.lat, coordinates.lng], 13); // Set the map view to the searched location
                L.marker([coordinates.lat, coordinates.lng]).addTo(map); // Add a marker at the searched location
            } else {
                alert('Location not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


}
    });


