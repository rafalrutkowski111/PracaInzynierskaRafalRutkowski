using inzRafalRutowski.Models;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Data
{
    public class DataContext :DbContext
    {
        public DataContext (DbContextOptions<DataContext> options) :base(options) { }

        public DbSet<Employer> Employers { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<EmployeeSpecialization> EmployeeSpecializations { get; set; }
        public DbSet<JobEmployee> JobEmployees { get; set; }
        public DbSet<JobHistory> JobHistorys { get; set; }
        public DbSet<EmployeeWithoutEmployer> EmployeeWithoutEmployers { get; set; }
        public DbSet<EmployeeWithoutEmployerSpecialization> EmployeeWithoutEmployerSpecializations { get; set; }
    }
}
