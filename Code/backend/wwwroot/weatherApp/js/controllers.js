angular.module('WeatherForcastApp.controllers', []).
  controller('weatherController', function($scope, weatherApiService ) {
      $scope.weatherList = [];
      

    weatherApiService.getForecast().then(function (response) {
        //Dig into the responde to get the relevant data
        console.log(response);
        $scope.weatherList = response.data;
    });


      const connection = new signalR.HubConnectionBuilder()
          .withUrl("/weatherHub")
          .configureLogging(signalR.LogLevel.Information)
          .build();

      

      async function start() {
          try {
              await connection.start();
              console.log("SignalR Connected.");
          } catch (err) {
              console.log(err);
              setTimeout(start, 5000);
          }
      };

      connection.onclose(async () => {
          await start();
      });

      // Start the connection.
      start();
      var count = 0;
      let timer = setInterval(updateWeather, 1000);

      async function updateWeather() {
          try {
              count++;
              await connection.invoke("UpdateWeather");
          } catch (err) {
              clearInterval(timer);
              console.error(err);
          }
          finally {
              //if (count == 5) {
              //    timer = clearInterval(timer);

              //}
          }

      }

      connection.on("WeatherUpdated", (weather) => {
          $scope.weatherList = weather;
          //console.log(weather);
          $scope.$apply();
         
      });
    
});