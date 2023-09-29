var sevenDayForecast = document.querySelector('sevenDayContainer');

function weatherForecast() {
 fetch('http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809')

.then(function (response) {
    return response.json();
 })
    .then(function (data) {
        console.log(data);
    })


 fetch('http://api.weatherapi.com/v1/forecast.json?key=0326e1253a344fc8858235651232809&days=7')
.then(function (response) {
    return response.json();
})
    .then(function (data) {
        console.log(data)
    })
 }