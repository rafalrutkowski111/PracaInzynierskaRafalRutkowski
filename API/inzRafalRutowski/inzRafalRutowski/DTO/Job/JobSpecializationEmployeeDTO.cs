namespace inzRafalRutowski.DTO.Job
{
    public class ListJobSpecializationEmployeeDTO
    {
        public List<ListJobSpecialization> JobSpecialization { get; set; }
        public List<JobSpecializationEmployeeDTO> listJobSpecializationEmployeeDTO { get; set; }
    }
    public class JobSpecializationEmployeeDTO
    {
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; }
        public bool HaveSpecialist { get; set; }
        public Guid? EmployeeId { get; set; }
    }
}
