var ApiKey = "0851b496d12ca4c702ac618ee6340d10";
var cityInput = document.getElementById("city");
var currentCity = document.querySelector('#current-city-info');

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
            currentCity.textContent = "City: " + data.name;
        }).catch(function(error) {
            console.log(error);
            currentCity.textContent = "Error fetching weather data";
        });
}
  
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit-button").addEventListener("click", function(event) {
        event.preventDefault(); // prevent form submission
        getApi();
    });
  });
 

