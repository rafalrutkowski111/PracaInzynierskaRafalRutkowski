namespace inzRafalRutowski.DTO
{
    public class ListJobSpecialization
    {
        public int SpecializationId { get; set; }
        public int Hours { get; set; }
        public bool? Disabled { get; set; }
    }

    public class JobSpecializationDTO
    {
        public List<ListJobSpecialization> JobSpecialization { get; set; }
        public int EmployerId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
