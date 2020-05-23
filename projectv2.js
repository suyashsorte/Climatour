"use strict"

function initializeMap() {
    // Making object of direction renderrer to render the results
    var directionRender = new google.maps.DirectionsRenderer;
    // making object of direction service
    var directionsService = new google.maps.DirectionsService;
    var lat= 43.15;
    var lng= -77.60;
    var map_center=new google.maps.LatLng(lat, lng);
    // Initializing the google map to location by default set to rochester and setting the zoom
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: map_center
    });
    // Setting map on display
    directionRender.setMap(map);
    // Setting the pannel on the map to set start and end places
    directionRender.setPanel(document.getElementById('right-panel'));
    var control = document.getElementById('floating-panel');
    control.style.display = 'block';
    // Putting cotrol pannel to right top position
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(control);
    // Function call to calculate and put the navigation direction on the map
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionRender);
        // Calling weather function to get weather details
        getweather();
    };
    // Setting origin of journey
    document.getElementById('start').addEventListener('change', onChangeHandler);
    // Setting destination of journey
    document.getElementById('end').addEventListener('change', onChangeHandler);
    // Setting the mode of journey 
    document.getElementById('mode').addEventListener('change', onChangeHandler);
}
 /* This function has been taken from google maps documentation and has been modified to cater the 
    functionalities of my project*/
function calculateAndDisplayRoute(directionsService, directionRender) {
    // Getting start location with id start
    var start = document.getElementById('start').value;
    // Getting end location with id end
    var end = document.getElementById('end').value;
    // Getting mode of travel with id mode
    var selectedMode = document.getElementById('mode').value;
    /*Calling google direction service with directioservice object to route 
    the path by assigning origin,destination and travel mode*/
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
            // If the return status is ok then the route is renderd and displayed on map else alert is displayed
            if (status === 'OK') {
                directionRender.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
    });
}
// Getting weather information
function getweather(){
    // Initializing the destination city to get the weather
    var cityname=document.getElementById('end').value;
    // Slicing the cityname so as to get just the city name and not state
    cityname=cityname.slice(0,-4);
    // Making an API call to openweathermap by giving the URL
    var apicall='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid=AIzaSyCq0g5jfViYAIfIhaHtcyg8pJOzZdUQWvY';
    $.getJSON(apicall,weather);
    function weather(data){
        var cityname=data.name;
        var description=data.weather[0].description; 
        var windspeed=data.wind.speed
        var temp=(((data.main.temp)-273.15)*(9/5)+32).toFixed(2);
        var humidity=data.main.humidity;
        var temp_max=(((data.main.temp_max)-273.15)*(9/5)+32).toFixed(2);
        var temp_min=(((data.main.temp_min)-273.15)*(9/5)+32).toFixed(2);
        var info="<div class='wdata' id='mydiv'><h1> Weather at "+cityname+" is:</h1>"
        info+="<ul><li>Description: "+description+"</li> "+"<li>Wind speed: "+windspeed+" m/s </li>"+"<li>Humidity: "+humidity+" %</li> "+"<li>Temperature:"+temp+" F </li>"+"<li>Temperature(Max):"+temp_max+" F</li> "+"<li>Temperature(Min):"+temp_min+" F</li></ul>";
        info+="</div>"
        // Displaying the results got from weather API
        document.getElementById('weatherdata').innerHTML = info;
    }
    
  }