namespace inzRafalRutowski.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }


        public int EmployerId { get; set; }
        public Employer Employer { get; set; }
        public List<EmployeeSpecialization> EmployeeSpecializations { get; set; }
        public List<JobEmployee> JobEmployees { get; set; }
    }
}
