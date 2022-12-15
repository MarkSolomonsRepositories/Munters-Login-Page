using Microsoft.AspNetCore.SignalR;

namespace backend.hub
{
 
    public class WeatherHub:Hub
    {
        private WeatherFunctions weatherFunctions;  
        
        public WeatherHub()
        {
            weatherFunctions = new WeatherFunctions();
        }


        public async Task UpdateWeather()
        {
            var results = weatherFunctions.GenerateRandomWeather();
            await Clients.All.SendAsync("WeatherUpdated", results); //ie it retuns an async result
        }
    }
}
