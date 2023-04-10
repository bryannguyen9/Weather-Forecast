var ApiKey = "0851b496d12ca4c702ac618ee6340d10";
var cityInput = document.getElementById("city");
var currentCityHeader = document.getElementById('current-city-info');

var cityInfoContainer = document.getElementById('current-city-info-2');

//api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}

function getApi() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=imperial&appid=" + ApiKey;

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
            var currName = document.createElement('p');
            currName.textContent = "City: " + data.name;
            currentCityHeader.append(currName);
            var today = dayjs(today).format('dddd MMM DD/YY');
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

            //add 5 day forecast info
            //use dayjs.add to add a day to each date prior

        }).catch(function(error) {
            console.log(error);
            currName.textContent = "Error fetching weather data";
            currentCityHeader.append(currName);
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
 