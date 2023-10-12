const sevenDayForecastEl = document.querySelector('#sevenDayContainer');
const currentTempEl = document.querySelector('#currentTemperature');
const locationValue = document.getElementById('locationValue');
const precipitation = document.querySelector('#precipitation');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const conditions = document.querySelector('#conditions');
const today = document.querySelector('#today');
const nameOfCity = document.querySelector('#nameOfCity');
let city = '';

const weatherApiKey = '0326e1253a344fc8858235651232809'; // Replace with your actual API key

function saveSearchToLocalStorage(city) {
    localStorage.setItem('lastSearch', city);
}

function loadLastSearch() {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        city = lastSearch;
        setMapLocation();
        currentWeatherForecast(city);
    }
}

locationValue.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        city = locationValue.value;
        setMapLocation();
        currentWeatherForecast(city);
        saveSearchToLocalStorage(city);
    }
});

function fetchWeatherData(endpoint) {
    return fetch(`http://api.weatherapi.com/v1/${endpoint}&key=${weatherApiKey}`)
        .then(response => response.json());
}

function currentWeatherForecast(city) {
    fetchWeatherData(`current.json?q=${city}`)
        .then(data => {
            const weatherData = {
                currentTemperature: Math.round(data.current.temp_f),
                precipitation: ` ${data.current.precip_in} in`,
                humidity: ` ${data.current.humidity}`,
                windSpeed: ` ${data.current.wind_mph}`,
                conditionalText: data.current.condition.text,
                conditionalIcon: `https:${data.current.condition.icon}`,
            };

            const date = new Date(data.current.last_updated);
            const hour = date.getHours();
            const minute = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
            const dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            weatherData.dayOfTheWeek = `${dayOfTheWeek} ${hour}:${minute}`;

            displaySevenDayForecast(weatherData, city);
            sevenDayForecast(city);
            displayCurrentWeatherForecast(weatherData, city);
        });
}

function sevenDayForecast(city) {
    fetchWeatherData(`forecast.json?q=${city}&days=7`)
        .then(data => {
            sevenDayForecastEl.innerHTML = '';
            data.forecast.forecastday.forEach(day => {
                const weatherData = {
                    currentTemperature: Math.round(day.day.avgtemp_f),
                    conditionalIcon: `https:${day.day.condition.icon}`,
                    precipitation: `${day.day.daily_chance_of_rain}%`,
                    windSpeed: day.day.maxwind_mph,
                    humidity: day.day.avghumidity,
                    conditionalText: day.day.condition.text,
                    maxTemp: Math.round(day.day.maxtemp_f),
                    minTemp: Math.round(day.day.mintemp_f),
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][new Date(day.date).getDay()],
                };

                const sevenDayForecastHTML = displaySevenDayForecast(weatherData, city);
                sevenDayForecastEl.appendChild(sevenDayForecastHTML);
            });
        });
}

function displaySevenDayForecast(weatherData, city) {
    const div = document.createElement('div');
    div.className = 'sevenDayForecast';

    const sevenDayForecast = document.createElement('div');
    sevenDayForecast.className = 'sevenDayForecast';
    sevenDayForecast.textContent = weatherData.dayOfWeek;
    div.appendChild(sevenDayForecast);

    const image = document.createElement('div');
    const img = document.createElement('img');
    img.id = 'conditionalIcon';
    img.src = weatherData.conditionalIcon;
    image.appendChild(img);
    div.appendChild(image);

    const minMaxTemp = document.createElement('div');
    minMaxTemp.className = 'minMaxTemp';

    const span1Temperature = document.createElement('span');
    span1Temperature.className = 'temperature';
    span1Temperature.textContent = `${weatherData.minTemp}°`;
    minMaxTemp.appendChild(span1Temperature);

    const span2Temperature = document.createElement('span');
    span2Temperature.className = 'temperature';
    span2Temperature.textContent = `${weatherData.maxTemp}°`;
    minMaxTemp.appendChild(span2Temperature);
    div.appendChild(minMaxTemp);

    div.addEventListener('click', () => {
        displayCurrentWeatherForecast(weatherData, city);
    });

    return div;
}

function displayCurrentWeatherForecast(weatherData, city) {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const day = weekday[d.getDay()];

    const img = document.getElementById('conditionalIcon');
    img.src = weatherData.conditionalIcon;

    currentTempEl.innerHTML = weatherData.currentTemperature;
    precipitation.innerHTML = weatherData.precipitation;
    humidity.innerHTML = `${weatherData.humidity}%`;
    windSpeed.innerHTML = `${weatherData.windSpeed} mph`;
    conditions.innerHTML = weatherData.conditionalText;
    today.innerHTML = day;
    nameOfCity.innerHTML = city;
}

// Map
let map;

window.onload = function () {
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [28.59675, -81.20339],
        zoom: 16
    });
    MQ.trafficLayer().addTo(map);
    loadLastSearch();
};

function setMapLocation() {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=gUgK3zuO2juaY9exckXhIafpgj38trkj&location=${city}`)
        .then(response => response.json())
        .then(data => {
            const firstResult = data.results[0].locations[0];
            const latitude = firstResult.latLng.lat;
            const longitude = firstResult.latLng.lng;
            map.setView([latitude, longitude], 16);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}