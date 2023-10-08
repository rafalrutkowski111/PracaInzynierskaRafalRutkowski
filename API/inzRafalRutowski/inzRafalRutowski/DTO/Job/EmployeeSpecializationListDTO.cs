using inzRafalRutowski.DTO.Employee;

namespace inzRafalRutowski.DTO.Job
{
    public class EmployeeSpecializationListDTO
    {
        public string SpecializationName { get; set; }
        public int SpecializationId { get; set; }
        public List<EmployeeDTO> EmployeeList { get; set; }
    }
}
