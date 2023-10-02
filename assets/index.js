var sevenDayForecast = document.querySelector('sevenDayContainer');
var city = 

function weatherForecast() {
 fetch('http://api.weatherapi.com/v1/current.json?key=0326e1253a344fc8858235651232809')

 .then(function(response){
    return response.json();
 })
    .then(function(data){
        console.log(data);
    });
   

 fetch('http://api.weatherapi.com/v1/forecast.json?key=0326e1253a344fc8858235651232809&days=7')

 }


function trafficReport(){
fetch("https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/xml?key={kYLbyqIA0g1ERQMZT87Gd66qOcgrH7nT}&point=52.41072,4.84239")
 
.then(function(response){
   return response.json();
})
   .then(function(data){
       console.log(data);
   });
  
}