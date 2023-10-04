var sevenDayForecast = document.querySelector('sevenDayContainer');
var city = 'Orlando'; //place holder

function currentWeatherForecast() {
    fetch('http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809')

 .then(function(response){
    return response.json();

 })
    .then(function(data){
        console.log(data);
    });

}
function sevenDayForecast(){
fetch('http://api.weatherapi.com/v1/forecast.json?key=0326e1253a344fc8858235651232809&days=7')
.then(function (response) {
   return response.json();
})
   .then(function (data) {
       console.log(data)
   });

}

// Initialize the map
var map = L.map('map').setView([0, 0], 13); // Set initial coordinates and zoom level

// Create a MapQuest tile layer
L.tileLayer('https://open.mapquestapi.com/tiles/layer/{mapId}/{z}/{x}/{y}.png?key=gUgK3zuO2juaY9exckXhIafpgj38trkj', {
    attribution: '© <a href="https://www.mapquest.com/">MapQuest</a>',
    maxZoom: 18,
    style: 'osm' // You can choose a different style here
}).addTo(map);

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


