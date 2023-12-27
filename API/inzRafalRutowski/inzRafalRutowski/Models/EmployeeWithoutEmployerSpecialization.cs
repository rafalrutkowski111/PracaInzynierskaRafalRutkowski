namespace inzRafalRutowski.Models
{
    public class EmployeeWithoutEmployerSpecialization
    {
        public int Id { get; set; }
        public Guid EmployeeWithoutEmployerId { get; set; }
        public EmployeeWithoutEmployer EmployeeWithoutEmployer { get; set; }
        public int SpecializationId { get; set; }
        public Specialization Specialization { get; set; }
        public int ExperienceId { get; set; }

    }
}
