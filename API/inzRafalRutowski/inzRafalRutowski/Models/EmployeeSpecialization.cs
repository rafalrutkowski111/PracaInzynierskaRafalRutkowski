namespace inzRafalRutowski.Models
{
    public class EmployeeSpecialization
    {
        public int Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int SpecializationId { get; set; }
        public Specialization Specialization { get; set; }
        public int ExperienceId { get; set; }
    }
}
