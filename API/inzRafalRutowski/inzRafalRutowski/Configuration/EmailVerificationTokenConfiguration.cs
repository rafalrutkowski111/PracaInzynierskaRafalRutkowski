using inzRafalRutowski.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using static System.Net.WebRequestMethods;

//
// Instalacja i uruchomienie SMTP4DEV(zmieniamy port na 5001 bo domyślnie jest 5000 a już go używamy w aplikacji):
// dotnet tool install -g Rnwood.Smtp4dev
// smtp4dev --urls=http://127.0.0.1:5001
//
// zainstalowac w react potem rozszeżenie "ES7 React/Redux/GraphQL/React-Native snippets" dzięki ktorym będizemy mogli robić szablony np rafce tworzy komponent funkcyjny
namespace inzRafalRutowski.Controllers
{
    // inne podejście, chciałem je przetestować. Normalnie można w contexcie to zrobić w metodzie OnModelCreating
    internal sealed class EmailVerificationTokenConfiguration : IEntityTypeConfiguration<EmailVerificationToken>
    {
        public void Configure(EntityTypeBuilder<EmailVerificationToken> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Employer).WithMany().HasForeignKey(x => x.EmployerId);
        }
    }
}