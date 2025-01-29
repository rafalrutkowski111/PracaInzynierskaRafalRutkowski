using FluentEmail.Core;
using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : HomeController
    {
        private readonly IEmailService _emailService;
        private readonly DataContext _context;
        private readonly IEmployerService _emoyerService;
        private readonly IJwtService _jwtService;

        public EmailController(IEmailService emailService, DataContext dataContext,
            IEmployerService emoyerService, IJwtService jwtService) : base(jwtService)
        {
            _emailService = emailService;
            _context = dataContext;
            _emoyerService = emoyerService;
            _jwtService = jwtService;
        }

        [HttpGet("singleemail")]
        public async Task<IActionResult> SendSingleEmail()
        {
            EmailMetadata emailMetadata = new("test@gmail.com",
                "Fluent test email",
                "This is a test email from FluentEmial.");
            await _emailService.Send(emailMetadata);

            return Ok();
        }


        [HttpGet("sendEmplyerEmailConfirm")]
        public async Task<IActionResult> SendEmplyerEmailConfirm(Guid employerId, string email, string controllerAndActionName)
        {

                DateTime utcNow = DateTime.UtcNow;
                var varificationToken = new EmailVerificationToken
                {
                    Id = Guid.NewGuid(),
                    EmployerId = employerId,
                    CreatedOnUtc = utcNow,
                    ExpiresOnUtc = utcNow.AddMinutes(15),
                };
                _context.EmailVerificationTokens.Add(varificationToken);
                await _context.SaveChangesAsync();

                string verificationLink = _emailService.CreateVerificationToken(varificationToken, controllerAndActionName);

                EmailMetadata emailMetadata = new($"{email}",
                "Email verification for inzRafalRutkowski",
                $"To verifity your email address <a href='{verificationLink}'>click here </a>");
                await _emailService.Send(emailMetadata);

                return Ok();


        }
    }
}
