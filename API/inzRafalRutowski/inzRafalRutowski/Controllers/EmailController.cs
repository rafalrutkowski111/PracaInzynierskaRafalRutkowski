using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : Controller
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpGet("singleemail")]
        public async Task<IActionResult> SendSingleEmail()
        {
            //EmailMetadata emailMetadata = new("test@gmail.com",
            //    "Fluent test email",
            //    "This is a test email from FluentEmial.");
            //await _emailService.Send(emailMetadata);

            DateTime utcNow = DateTime.UtcNow;
            var varificationToken = new EmailVerificationToken
            {
                Id = Guid.NewGuid(),
                EmployerId = 1,
                CreatedOnUtc = utcNow,
                ExpiresOnUtc = utcNow.AddMinutes(15),
            };

            string verificationLink = _emailService.CreateVerificationToken(varificationToken);

            EmailMetadata emailMetadata = new("test@gmail.com",
            "Email verification for inzRafalRutkowski",
            $"To verifity your email address <a href='{verificationLink}'>click here </a>");
            await _emailService.Send(emailMetadata);

            return Ok();
        }
    }
}
