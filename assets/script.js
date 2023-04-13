const API_KEY = "0851b496d12ca4c702ac618ee6340d10";
const previousCities = JSON.parse(localStorage.getItem("cities")) || [];

const searchCity = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;
    const response = await fetch(url);
    return response.json();
};

var cityInput = document.getElementById("city");
var currentCityHeader = document.getElementById('current-city-info');
var cityInfoContainer = document.getElementById('current-city-info-2');
var forecastData = document.getElementById('forecast-data')

const createDayData = (date, temp, wind, humidity) => {
  const dayData = document.createElement("div");
  dayData.classList.add("day-data");

  const dateEl = document.createElement("p");
  dateEl.textContent = date.format("dddd MMM DD, YYYY");
  dayData.append(dateEl);

  const tempEl = document.createElement("p");
  tempEl.textContent = `Temperature(F): ${temp}`;
  dayData.append(tempEl);

  const windEl = document.createElement("p");
  windEl.textContent = `Wind Speeds(MPH): ${wind.toFixed(2)}`;
  dayData.append(windEl);

  const humidityEl = document.createElement("p");
  humidityEl.textContent = `Humidity: ${humidity}%`;
  dayData.append(humidityEl);

  return dayData;
};

const displayCurrentWeather = (data) => {
  console.log(data);
  console.log("Name ", data.name);
  const currName = document.createElement("p");
  currName.textContent = `City: ${data.name}`;
  currentCityHeader.append(currName);

  const today = dayjs();
  const currDate = document.createElement("p");
  currDate.textContent = today.format("dddd MMM DD, YYYY");
  currentCityHeader.append(currDate);

  const currTemp = document.createElement("p");
  currTemp.textContent = `Temperature(F): ${data.main.temp}`;
  cityInfoContainer.append(currTemp);

  const currWind = document.createElement("p");
  const windSpeed = (data.wind.speed / 1609.34) * 3600;
  currWind.textContent = `Wind Speeds(MPH): ${windSpeed.toFixed(2)}`;
  cityInfoContainer.append(currWind);

  const currHumidity = document.createElement("p");
  currHumidity.textContent = `Humidity: ${data.main.humidity}%`;
  cityInfoContainer.append(currHumidity);
};

const displayForecastWeather = (data) => {
  try {
    // check if data and data.list are defined
    if (data && data.list) {
      console.log(data);
      // loop through 5 day forecast data
      for (let i = 0; i < 5; i++) {
        // display forecast data for each day
        const date = dayjs(data.list[i * 8].dt_txt);
        const temp = data.list[i * 8].main.temp;
        const windSpeed = (data.list[i * 8].wind.speed / 1609.34) * 3600;
        const humidity = data.list[i * 8].main.humidity;

        const dayData = createDayData(date, temp, windSpeed, humidity);
        const dayContainer = document.getElementById(`day-${i + 1}`);
        dayContainer.append(dayData);
      }
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (err) {
    console.error(err);
    const currName = document.createElement("p");
    currName.textContent = "Error fetching weather";
  }
}

function getApi() {
    var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=imperial&appid=" + API_KEY;
    var fiveDayForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=imperial&appid=" + API_KEY;

    fetch(currentWeatherQueryURL)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error('Error fetching weather data');
            }
        }).then(function(data){
            console.log(data);
            console.log("Name ", data.name);
            var currName = document.createElement('p');
            currName.textContent = "City: " + data.name;
            currentCityHeader.append(currName);
            //added dayjs for date
            var today = dayjs(today).format('dddd MMM DD, YYYY');
            currentCityHeader.append(today);

            var currTemp = document.createElement('p');
            currTemp.textContent = "Temperature(F): " + data.main.temp;
            cityInfoContainer.append(currTemp);

            var currWind = document.createElement('p');
            currWind.textContent = "Wind Speeds(MPH): " + (((data.wind.speed)/1609.34)*3600).toFixed(2);
            cityInfoContainer.append(currWind);

            var currHumidity = document.createElement('p');
            currHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            cityInfoContainer.append(currHumidity);

    // make another API request for the 5-day forecast data
    fetch(fiveDayForecastQueryURL)
        .then(function (response) {
            if (response.status === 200) {
                previousCities.unshift(cityInput.value);
                localStorage.setItem("cities", JSON.stringify(previousCities));
            return response.json();
            } else {
            throw new Error('Error fetching weather data');
            }
        }).then(function (data) {
            try {
            // check if data and data.list are defined
                if (data && data.list) {
                    console.log(data);
                    // rest of your code for displaying current weather

                    // loop through 5 day forecast data
                    for (var i = 0; i < 5; i++) {
                    // display forecast data for each day

                    //need a way to identify which exact forecastData container to append dayData to at end need another index for day containers.
                        var dayData = document.createElement('div');
                        dayData.classList.add('day-data');

                        var date = dayjs(data.list[i*8].dt_txt).format('dddd MMM DD, YYYY');
                        var dateEl = document.createElement('p');
                        dateEl.textContent = date;
                        dayData.append(dateEl);                   

                        var temp = document.createElement('p');
                        temp.textContent = "Temperature(F): " + data.list[i*8].main.temp;
                        dayData.append(temp);

                        var wind = document.createElement('p');
                        wind.textContent = "Wind Speeds(MPH): " + (((data.list[i*8].wind.speed)/1609.34)*3600).toFixed(2);
                        dayData.append(wind);

                        var humidity = document.createElement('p');
                        humidity.textContent = "Humidity: " + data.list[i*8].main.humidity + "%";
                        dayData.append(humidity);

                        $(`#day-${i+1}`).append(dayData);
                    }
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (err) {
                console.error(err);
                currName.textContent = "Error fetching weather data";
                currentCityHeader.append(currName);
                }
        }).catch(function (error) {
            console.log(error);
            currName.textContent = "Error fetching weather data";
            currentCityHeader.append(currName);
        });
    })
}

//event listener on click of form submit to first DOMLoad then run the function of getAPI()
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit-button").addEventListener("click", function(event) {
        event.preventDefault(); // prevent form submission
        getApi();
    });
});

const cityInputEl = document.querySelector("#city-input");
const searchFormEl = document.querySelector("#search-form");
const searchHistoryEl = document.querySelector("#search-history");

// Load search history from local storage on page load
const searchHistory = JSON.parse(localStorage.getItem("cities")) || [];

// Create a function to save search history to local storage
function saveSearchHistory(city) {
  // Add the city to the beginning of the search history array
  searchHistory.unshift(city);
  // Limit search history to the 10 most recent searches
  searchHistory.splice(10);
  // Save the updated search history array to local storage
  localStorage.setItem("cities", JSON.stringify(searchHistory));
}

function handleSearch(event) {
    event.preventDefault();
    const city = cityInputEl.value.trim();
    if (city) {
      // Add the city to the search history
      saveSearchHistory(city);
      // Create a button element for the city and append it to the page
      const buttonEl = document.createElement("button");
      buttonEl.textContent = city;
      buttonEl.addEventListener("click", function() {
        // Set the value of the city input to the button's text content
        cityInputEl.value = buttonEl.textContent;
        // Trigger the search form's submit event
        searchFormEl.dispatchEvent(new Event('submit'));
      });
      document.getElementById("city-buttons").appendChild(buttonEl);
      // Clear the city input
      cityInputEl.value = "";
    }
  }

searchFormEl.addEventListener("submit", handleSearch);

const pastCitiesSearchBtn = document.getElementById("city-buttons");

pastCitiesSearchBtn.addEventListener("click", function() {
    // Get the city name from the search input
    const cityName = document.getElementById("city").value;

    localStorage.setItem("lastCity", cityName);

    const lastCityEl = document.getElementById("lastCity");
    lastCityEl.textContent = cityName;

    const lastCity = localStorage.getItem("lastCity");

    // If there is a last city, display it on the page
    if (lastCity) {
    const lastCityEl = document.getElementById("lastCity");
    lastCityEl.textContent = lastCity;
    }
});