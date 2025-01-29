namespace inzRafalRutowski.Models
{
    public class JobEmployee
    {
        public int Id { get; set; }
        public DateTime TimeStartJob { get; set; }
        public DateTime TimeFinishJob { get; set; }
        public bool IsNeed { get; set; }
        public int SpecializationId { get; set; }
        public int? ExperienceId { get; set; }
        public Guid EmployerId { get; set; }


        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
