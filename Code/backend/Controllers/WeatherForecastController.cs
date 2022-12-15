using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Sockets;
using System.Net;
using System.Security.Cryptography;
using System.Threading;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
       
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            var weather = new WeatherFunctions();
            return weather.GenerateRandomWeather();
        }
    }
}