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
    }
}
