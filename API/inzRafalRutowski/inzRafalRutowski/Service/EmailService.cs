using FluentEmail.Core;
using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Service
{
    public class EmailService :IEmailService
    {
        private readonly IFluentEmail _fluentEmail;
        private readonly DataContext _context;

        public EmailService(IFluentEmail fluentEmail, DataContext dataContext)
        {
            _fluentEmail = fluentEmail;
            _context = dataContext;
        }

        public async Task Send(EmailMetadata emailMetadata)
        {
            await _fluentEmail.To(emailMetadata.ToAddress)
                .Subject(emailMetadata.Subject)
                .Body(emailMetadata.Body)
                .SendAsync();
        }
        
        // zrefaktoryzować potem zeby Employer był przekazywany jako parametr i była to metoda dla wielu cntrollerów
        public string CreateVerificationToken(EmailVerificationToken emailVerificationToken)
        {
            if (emailVerificationToken == null)
                throw new ArgumentNullException(nameof(emailVerificationToken), "EmailVerificationToken cannot be null");

            return $"http://localhost:5000/api/Employer/VerifityEmailEmployer?token={emailVerificationToken.Id}";
        }

        // mogłym użyć refleksji aby przesłać wartość "Employer" i odczytać jego właściwość dla tokena przez co verifity email mógłby być używany wielokrotnie
        // refleksja raczej nie jest rekomendowana bo ma niższą wydajność i lepiej byłoby dać tą metode do employera, ale przetestujemy refleksje tu
        public async Task<bool> VerifityEmail(Guid tokenId)
        {
            var token = await _context.EmailVerificationTokens.FirstOrDefaultAsync(x => Equals(x.Id, tokenId));
            if (token == null) return false;

            var employer = await _context.Employers.FirstAsync( x=> Equals(x.Id, token.EmployerId));

            if (token.ExpiresOnUtc < DateTime.UtcNow || employer.ConfirmEmail) return false;

            token.Employer.ConfirmEmail = true;

            _context.EmailVerificationTokens.Remove(token);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
