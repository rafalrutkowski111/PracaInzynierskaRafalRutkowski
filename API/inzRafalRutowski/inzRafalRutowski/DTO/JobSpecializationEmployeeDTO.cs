namespace inzRafalRutowski.DTO
{
    public class JobSpecializationEmployeeDTO
    {
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; }
        public bool HaveSpecialist { get; set; }
        public Guid? EmployeeId { get; set; }
    }
}
