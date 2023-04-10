var ApiKey = "0851b496d12ca4c702ac618ee6340d10";
var cityInput = document.getElementById("city");
var currentCityHeader = document.getElementById('current-city-info');

var cityInfoContainer = document.getElementById('current-city-info-2');

var forecastData = document.getElementById('forecast-data')

//api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}

function getApi() {
    var currentWeatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=imperial&cnt=5&appid=" + ApiKey;
    var fiveDayForecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=imperial&cnt=5&appid=" + ApiKey;

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
            currWind.textContent = "Wind Speeds(MPH): " + (((data.wind.speed)/1609.34)*3600);
            cityInfoContainer.append(currWind);

            var currHumidity = document.createElement('p');
            currHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            cityInfoContainer.append(currHumidity);

    // make another API request for the 5-day forecast data
    fetch(fiveDayForecastQueryURL)
        .then(function (response) {
            if (response.status === 200) {
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
                    for (var i = 0; i < data.list.length; i++) {
                    // display forecast data for each day

                    //need a way to identify which exact forecastData container to append dayData to at end need another index for day containers.
                        var dayData = document.createElement('div');
                        dayData.classList.add('day-data');

                        var date = dayjs(data.list[i].dt_txt).format('dddd MMM DD, YYYY');
                        var dateEl = document.createElement('p');
                        dateEl.textContent = date;
                        dayData.append(dateEl);

                        var temp = document.createElement('p');
                        temp.textContent = "Temperature(F): " + data.list[i].main.temp;
                        dayData.append(temp);

                        var wind = document.createElement('p');
                        wind.textContent = "Wind Speeds(MPH): " + (((data.list[i].wind.speed)/1609.34)*3600);
                        dayData.append(wind);

                        var humidity = document.createElement('p');
                        humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                        dayData.append(humidity);

                        forecastData.append(dayData);
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
 
 
 