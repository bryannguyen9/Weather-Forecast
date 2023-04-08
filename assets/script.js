var ApiKey = "0851b496d12ca4c702ac618ee6340d10";
var cityInput = document.getElementById("city");
var currentCity = document.querySelector('#current-city-info');

var cityInfoContainer = document.getElementById('current-city-info-2');

function getApi() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + ApiKey;

    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            // We check whether the response.status equals 200, as follows:
            if (response.status === 200) {
                //If it does, we assign the status code from response.status to the textContent
                return response.json();
            }
            else {
                throw new Error('Error fetching weather data');
            }
        }).then(function(data){
            console.log(data);
            console.log("Name ", data.name);
            //current city info name, temp, wind, humidity
            currentCity.textContent = "City: " + data.name;
            var currTemp = document.createElement('p');
            currTemp.textContent = "Temperature(F): " + (((((data.main.temp)-273.15)*9)/5)+32);
            cityInfoContainer.append(currTemp);

            var currWind = document.createElement('p');
            currWind.textContent = "Wind Speeds(MPH): " + (((data.wind.speed)/1609.34)*3600);
            cityInfoContainer.append(currWind);

            var currHumidity = document.createElement('p');
            currHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            cityInfoContainer.append(currHumidity);

        }).catch(function(error) {
            console.log(error);
            currentCity.textContent = "Error fetching weather data";
        });
}
  
//event listener on click of form submit to first DOMLoad then run the function of getAPI()
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit-button").addEventListener("click", function(event) {
        event.preventDefault(); // prevent form submission
        getApi();
    });
  });
 
  //need to add dayJS for current date and then add 5 day forecast implemented within current city
  