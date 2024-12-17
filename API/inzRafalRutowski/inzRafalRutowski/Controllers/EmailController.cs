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
            EmailMetadata emailMetadata = new("konto6510@gmail.com",
                "Fluent test email",
                "This is a test email from FluentEmial.");
            await _emailService.Send(emailMetadata);

            return Ok();
        }
    }
}
