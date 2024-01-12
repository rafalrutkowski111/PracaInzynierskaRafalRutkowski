using AutoMapper;
using inzRafalRutowski.Data;
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
        private readonly DataContext _context;

        public EmployerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("login")]
        public IActionResult Login([FromQuery] string login, [FromQuery] string password)
        {

            var employer = _context.Employers.FirstOrDefault(x => string.Equals(x.Login, login) && string.Equals(x.Password, password));

            if (employer == null) { return BadRequest(); }

            //hash
            byte[] data = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes($"{employer.Id}_{employer.Login}_{employer.Password}"));
            var builder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                builder.Append(data[i].ToString("x2"));
            }

            //dynamic result = new JObject();
            //result.hash = ;
            //result.userId ;

            return Ok(new { hash = builder.ToString(), userId = employer.Id });
        }

        [HttpGet("veryfieLogin")]
        public IActionResult VeryfieLogin([FromQuery] int userId, [FromQuery] string hash)
        {

            var employer = _context.Employers.FirstOrDefault(x => string.Equals(x.Id, userId));

            if (employer == null) { return BadRequest(); }

            //hash
            byte[] data = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes($"{employer.Id}_{employer.Login}_{employer.Password}"));
            var builder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                builder.Append(data[i].ToString("x2"));
            }

            if (string.Equals(builder.ToString(), hash)) return Ok();
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetEmployer([FromQuery] int employerId)
        {
            var employer = _context.Employers.FirstOrDefault(x => string.Equals(x.Id, employerId));

            return Ok(new
            {
                name = employer.Name,
                surname = employer.Surname,
                phone = employer.Phone,
            });
        }
    }
}
