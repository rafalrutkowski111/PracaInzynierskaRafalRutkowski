namespace inzRafalRutowski.DTO.Employee
{
    public class SpecializationAndExperience
    {
        public int SpecializationId { get; set; }
        public int ExperienceId { get; set; }
        public bool? Disabled { get; set; }
        public string? SpecializationName { get; set; }
        public string? ExperianceName { get; set; }
    }
    public class EmployeeAddDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsEmployed { get; set; }
        public List<SpecializationAndExperience> ListSpecializationAndExperience { get; set; }
        public Guid EmployerId { get; set; }
        public Guid? EmployeeId { get; set; }
    }
}
