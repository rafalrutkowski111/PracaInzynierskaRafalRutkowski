namespace inzRafalRutowski.DTO
{
    public class EmployeeSpecializationListDTO
    {
        public string SpecializationName { get; set; }
        public int SpecializationId { get; set; }
        public List<EmployeeDTO> EmployeeList { get; set; }
    }
}
