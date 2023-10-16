namespace inzRafalRutowski.DTO.Job
{
    public class ListJobSpecializationEmployeeDTO
    {
        public List<ListJobSpecialization> JobSpecialization { get; set; }
        public List<JobSpecializationEmployeeDTO> listJobSpecializationEmployeeDTO { get; set; }
        public int EmployerId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool EmployeeWithoutEmployer { get; set; }
    }
    public class JobSpecializationEmployeeDTO
    {
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; }
        public bool HaveSpecialist { get; set; }
        public Guid? EmployeeId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
    }
}
