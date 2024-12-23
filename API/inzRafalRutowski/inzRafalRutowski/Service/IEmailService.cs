using inzRafalRutowski.Models;

namespace inzRafalRutowski.Service
{
    public interface IEmailService
    {
        Task Send(EmailMetadata emailMetadata);
        string CreateVerificationToken(EmailVerificationToken emailVerificationToken);
        Task<bool> VerifityEmail(Guid tokenId);
    }
}
