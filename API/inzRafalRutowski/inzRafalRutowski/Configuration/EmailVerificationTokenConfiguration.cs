using inzRafalRutowski.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
