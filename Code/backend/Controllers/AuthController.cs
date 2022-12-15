using CsvHelper;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Globalization;
using System.Reflection.PortableExecutable;
using System.Text.Json;
/*using DatabaseFunctions.cs;*/

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
/*namespace System.Collections.Generic;*/


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
   
        [HttpPost("signup")]
        public IActionResult CreateUser([FromBody] JsonElement bodyJson)
        {
            var body = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(bodyJson);
            try
            {
                DatabaseFunctions DF = new DatabaseFunctions();
                Object finalUserObject = DF.SignUpFunction(body);
                return Ok(finalUserObject);
            }
            catch (NullReferenceException ex)
            {
                throw(ex);
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] JsonElement bodyJson)
        {
            var body = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(bodyJson);
            DatabaseFunctions DF = new DatabaseFunctions();
            Object finalUserObject = DF.LoginFunction(body);
            return Ok(finalUserObject); 
        }

        [HttpPost("languageUpdate")]
        public IActionResult LanguageUpdate([FromBody] JsonElement bodyJson)
        {
            var body = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(bodyJson);
            DatabaseFunctions DF = new DatabaseFunctions();
            try
            {
                Object finalUserObject = DF.LanguageUpdateFunction(body);
                return Ok(finalUserObject);
            }
            catch(NullReferenceException ex) { 
                throw ex;
            }
        }
    }
}
