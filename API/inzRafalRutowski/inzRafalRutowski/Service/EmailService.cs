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

            return $"http://localhost:5000/api/Employer/VerifityEmailEmployer?tokenId={emailVerificationToken.Id}";
        }

        // stworzona metoda generyczna na potrzeby przetestowania metod generycznych
        public async Task<bool> VerifityEmail<TModel>(
            Guid tokenId,
            Func<EmailVerificationToken, int> modelIdSelector,
            Func<TModel, bool> propertySelector,
            Action<TModel> updateAction   // Action to tez funkcja ale moze miec 1 parametr i nie zwraca nic
            ) where TModel : class
        {
            var token = await _context.EmailVerificationTokens.FirstOrDefaultAsync(x => Equals(x.Id, tokenId));
            if (token == null) return false;

            var modelId = modelIdSelector(token);
            var model = await _context.Set<TModel>().FindAsync(modelId);
            if (model == null) return false;

            if (token.ExpiresOnUtc < DateTime.UtcNow || propertySelector(model)) return false;

            updateAction(model);

            _context.EmailVerificationTokens.Remove(token);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
