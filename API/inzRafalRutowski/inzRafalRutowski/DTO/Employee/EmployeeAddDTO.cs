namespace inzRafalRutowski.DTO.Employee
{
    public class ListSpecializationAndExperience
    {
        public int SpecializationId { get; set; }
        public int ExperienceId { get; set; }
        public bool? Disabled { get; set; }
    }
    public class EmployeeAddDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsEmployed { get; set; }
        public List<ListSpecializationAndExperience> SpecializationAndExperience { get; set; }
        public int EmployerId { get; set; }
    }
}
