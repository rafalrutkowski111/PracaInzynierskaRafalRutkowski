namespace inzRafalRutowski.DTO.Employee
{
    public class EmployeeDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string SpecializationName { get; set; }
        public string ExperienceName { get; set; }
        public Guid? EmployeeId { get; set; }
        public int? SpecializationId { get; set; }
        public bool? IsEmployed { get; set; }


    }
}
