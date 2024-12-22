using FluentEmail.Core;
using inzRafalRutowski.Models;

namespace inzRafalRutowski.Service
{
    public class EmailService :IEmailService
    {
        private readonly IFluentEmail _fluentEmail;

        public EmailService(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }

        public async Task Send(EmailMetadata emailMetadata)
        {
            await _fluentEmail.To(emailMetadata.ToAddress)
                .Subject(emailMetadata.Subject)
                .Body(emailMetadata.Body)
                .SendAsync();
        }

        public string CreateVerificationToken(EmailVerificationToken emailVerificationToken)
        {
            string verificationLink = "http://localhost:5000/api/Employer/VerifityEmailEmployer" + emailVerificationToken.Id.ToString();

            return verificationLink ?? throw new Exception("Could not create email verification link");
        }
    }
}
