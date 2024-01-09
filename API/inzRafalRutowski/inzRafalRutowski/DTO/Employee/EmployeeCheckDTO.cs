namespace inzRafalRutowski.DTO.Employee
{
    public class EmployeeCheckDTO
    {
        public Guid EmployeeId { get; set; }
        public bool IsEdit { get; set; }
        public List<SpecializationAndExperience>? ListSpecializationAndExperience { get; set; }
    }
}
