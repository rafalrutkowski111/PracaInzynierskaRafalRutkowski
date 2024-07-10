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
            //hmm jeżeli zrobie testy dla loginu i husha to jakie tu powinienem zobić?
            // takie same drugi raz z innymi wynikami?
            // (zamiast nulla w loginie to przechodizmy do 2 wyrazenia i Wynikiem jest BadRequest?)
            var employer = _service.Login(login, password);
            
            if (employer == null) { return BadRequest(); }

            var builder = _service.Hush(employer);

            return Ok(new { hash = builder.ToString(), userId = employer.Id });
        }

        [HttpGet("veryfieLogin")]
        public IActionResult VeryfieLogin([FromQuery] int userId, [FromQuery] string hash)
        {
            var employer = _service.VeryfieLogin(userId);

            if (employer == null) { return BadRequest(); }

            var builder = _service.Hush(employer);

            if (string.Equals(builder.ToString(), hash)) return Ok();
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetEmployer([FromQuery] int employerId)
        {
            var employer = _service.GetEmployer(employerId);

            return Ok(new
            {
                name = employer.Name,
                surname = employer.Surname,
                phone = employer.Phone,
            });
        }
    }
}
