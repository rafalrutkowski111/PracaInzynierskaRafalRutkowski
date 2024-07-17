using AutoMapper;
using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Cryptography;
using System.Text;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerService _service;

        public EmployerController( IEmployerService service)
        {
            _service = service;
        }

        [HttpGet("login")]
        public IActionResult Login([FromQuery] string login, [FromQuery] string password)
        {
            var employer = _service.Login(login, password);
            if (employer == null) { return BadRequest("Nieprawidłowy login lub hasło"); }

            var builder = _service.Hush(employer);
            return Ok(new { hash = builder.ToString(), userId = employer.Id });
        }

        [HttpGet("veryfieLogin")]
        public IActionResult VeryfieLogin([FromQuery] int userId, [FromQuery] string hash)
        {
            var employer = _service.VeryfieLogin(userId);
            if (employer == null) { return BadRequest("Id użytkownika jest niepoprawne"); }

            var builder = _service.Hush(employer);
            if (string.Equals(builder.ToString(), hash)) return Ok();
            return BadRequest("Utracono token, proszę się zalogować ponownie.");
        }

        [HttpGet]
        public IActionResult GetEmployer([FromQuery] int employerId)
        {
            var employer = _service.GetEmployer(employerId);
            if(employer == null) return BadRequest("Id pracodawcy niepoprawne.");

            return Ok(new
            {
                name = employer.Name,
                surname = employer.Surname,
                phone = employer.Phone,
            });
        }
    }
}
