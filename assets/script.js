var ApiKey = "0851b496d12ca4c702ac618ee6340d10";
api.openweathermap.org/data/2.5/weather?q={city}&appid:{ApiKey};
var cityInput = document.getElementById("city");
var cityInputText = document.getElementById('city-input-text');
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + ApiKey;

function getApi(queryURL) {
    fetch(queryURL)
      .then(function (response) {
        console.log(response);
        // We check whether the response.status equals 200, as follows:
        if (response.status === 200) {
            //If it does, we assign the status code from response.status to the textContent
            cityInputText.textContent = response.status;
        }
        // we return response.json()
        return response.json();
    }).then(function(data){
      console.log(data);
    });
  }
  
  getApi(queryURL);

  fetch('https://api.github.com/orgs/twitter/repos')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Twitter Repositories: Names only \n----------');
    console.log(data);
    //The response we receive is an array, meaning that we can loop through the data, accessing whatever specific data we want, as shown in the following code:
    for (var i = 0; i < data.length; i++) {
      console.log("********")
      console.log("Id", data[i].id);
      console.log("Name", data[i].name);
    }
  });