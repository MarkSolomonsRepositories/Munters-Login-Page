angular.module('WeatherForcastApp.services', ['SignalR']).
  factory('weatherApiService',['$rootScope','$http', function($rootScope,$http) {

	  var weatherAPI = {};

	  console.log('asdfasf')

	  //weatherAPI.updateWeather = function () {
		//  hub.UpdateWeather(); //Calling a server method
	 // };
	 




    weatherAPI.getForecast = function() {
      return $http.get(`${window.location.origin}/WeatherForecast`);    
      }

    return weatherAPI;
  }]);