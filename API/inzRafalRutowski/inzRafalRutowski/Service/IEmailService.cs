using inzRafalRutowski.Models;

namespace inzRafalRutowski.Service
{
    public interface IEmailService
    {
        Task Send(EmailMetadata emailMetadata);
    }
}
