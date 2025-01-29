using inzRafalRutowski.Models;

namespace inzRafalRutowski.Service
{
    public interface IEmailService
    {
        Task Send(EmailMetadata emailMetadata);
        string CreateVerificationToken(
            EmailVerificationToken emailVerificationToken,
            string controllerAndActionName);
        Task<bool> VerifityEmail<TModel>(Guid tokenId,
            Func<EmailVerificationToken, Guid> modelIdSelector,
            Func<TModel, bool> propertySelector,
            Action<TModel> updateAction
            ) where TModel : class;
    }
}
