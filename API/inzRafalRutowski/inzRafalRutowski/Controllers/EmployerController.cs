using AutoMapper;
using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Cryptography;
using System.Text;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : HomeController
    {
        private readonly IEmployerService _service;
        private readonly IJwtService _jwtService;
        private readonly DataContext _context;
        private readonly IEmailService _emailService;

        public EmployerController( IEmployerService service, IJwtService jwtService,
            DataContext context, IEmailService emailService) : base(jwtService)
        {
            _service = service;
            _jwtService = jwtService;
            _context = context;
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpGet("checkUniqueLoginAndEmail")]
        public IActionResult CheckUniqueLoginAndEmail([FromQuery] string login, [FromQuery] string email)
        {
            var loginUnique = true;
            var emailUnique = true;

            var loginEmployer = _context.Employers.FirstOrDefault(x=> string.Equals(x.Login, login));
            if(loginEmployer != null) loginUnique = false;

            var emailEmployer = _context.Employers.FirstOrDefault(x => string.Equals(x.Email, email));
            if(emailEmployer != null) emailUnique = false;


            return Ok(new
            {
                login = loginUnique,
                email = emailUnique,
            });
        }
        [AllowAnonymous]
        [HttpGet("register")]
        public IActionResult Register([FromQuery] string login, [FromQuery] string password, [FromQuery] string email)
        {
            string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);

            Employer employer = new Employer();

            employer.Name = "aa";
            employer.Surname = "bb";
            employer.Login = login;
            employer.Password = passwordHash;
            employer.Phone = "66";
            employer.Admin = false;
            employer.Email = email;

            _context.Employers.Add(employer);


            DateTime utcNow = DateTime.UtcNow;
            var varificationToken = new EmailVerificationToken
            {
                Id = Guid.NewGuid(),
                EmployerId = employer.Id,
                CreatedOnUtc = utcNow,
                ExpiresOnUtc = utcNow.AddMinutes(15),
            };

            _context.EmailVerificationTokens.Add(varificationToken);

            _context.SaveChanges();

            string verificationLink = "";

            EmailMetadata emailMetadata = new("test@gmail.com",
            "Email verification for inzRafalRutkowski",
            $"To verifity your email address <a href='{verificationLink}'>click here </a>");
            _emailService.Send(emailMetadata);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("VerifityEmailEmployer")]
        public IActionResult VerifityEmailEmployer(Guid token)
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("login")]
        public IActionResult Login([FromQuery] string login, [FromQuery] string password, [FromQuery] bool cookies)
        {
            var employer = _service.Login(login, password);
            if (employer == null)
            {
                employer = _service.Login(login, password);
                if (employer == null) { return BadRequest(new { message = "Nieprawidłowe dane logowania" }); }
            } 

            var builder = _service.Hush(employer);
            

            if (!cookies) return Ok(new { hash = builder.ToString(), userId = employer.Id, employer = employer });
            // dodana zmiana, w przyszłości przenieść do servisu
            // i zastąpić to z uzywaniem husha
            var jwt = _jwtService.Generate(employer);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });  

            return Ok(new { hash = builder.ToString(), userId = employer.Id, employer = employer });
        }
        [AllowAnonymous]
        //po autentykazcji za pomoca jwt po stronie fronta usunac VeryfieLogin
        [HttpGet("veryfieLogin")]
        public IActionResult VeryfieLogin([FromQuery] int userId, [FromQuery] string hash)
        {
            var employer = _service.VeryfieLogin(userId);
            if (employer == null) { return BadRequest(new { message = "Id użytkownika jest niepoprawne" }); }

            var builder = _service.Hush(employer);
            if (string.Equals(builder.ToString(), hash)) return Ok();
            return BadRequest(new {message = "Utracono token, proszę się zalogować ponownie."});
        }

        //pobieranie pracownika za pomocą jwt cookie
        public IActionResult GetEmployer()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int employerId = int.Parse(token.Issuer);

                var employer = _service.GetEmployerById(employerId);

                return Ok(new
                {
                    name = employer.Name,
                    surname = employer.Surname,
                    phone = employer.Phone,
                    smsMFA = employer.SmsMFA,
                    ignoreMFA = employer.IgnoreMFA
                });
            }
            catch(Exception _)
            {
                return Unauthorized();
            }

        }
        [HttpGet("IgnoreMFA")]
        public IActionResult Ignore30daysMFA()
        {
            DateTime thisDay = DateTime.Now;
            DateTime thisDayWith30Days = thisDay.AddDays(30);

            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int employerId = int.Parse(token.Issuer);

            var employer = _service.GetEmployerById(employerId);

            employer.IgnoreMFA = thisDayWith30Days;
            _context.SaveChanges();
            return Ok();
        }
    }
}
