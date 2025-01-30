using inzRafalRutowski.Models;
using inzRafalRutowski.ModelsAnother;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Employer> Employers { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<EmployeeSpecialization> EmployeeSpecializations { get; set; }
        public DbSet<JobEmployee> JobEmployees { get; set; }
        public DbSet<JobHistory> JobHistorys { get; set; }
        public DbSet<EmployeeAnother> EmployeeAnothers { get; set; }
        public DbSet<EmployeeSpecializationAnother> EmployeeSpecializationAnothers { get; set; }
        public DbSet<ExperianceAnother> ExperianceAnothers { get; set; }
        public DbSet<SpecializationAnother> SpecializationAnothers { get; set; }
        public DbSet<EmailVerificationToken> EmailVerificationTokens { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employer>()
                .HasIndex(e => new { e.Login, e.Email })
                .IsUnique();

            // usuwanie kaskadowe mogło powodować cykle lub wiele ścieżek kaskadowych więc zostało zmienione na DeleteBehavior.Restrict
            modelBuilder.Entity<JobEmployee>()
                .HasOne(j => j.Job)
                .WithMany(j => j.JobEmployees)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
