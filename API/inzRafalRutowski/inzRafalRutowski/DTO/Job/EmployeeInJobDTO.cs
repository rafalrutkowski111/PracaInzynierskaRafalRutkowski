namespace inzRafalRutowski.DTO.Job
{
    public class EmployeeInJobDTOList
    {
        public int SpecializationId { get; set; }
        public DateTime End { get; set; }
        public List<EmployeeInJobDTO> EmployeeInJobList { get; set; }
        public double Hours { get; set; }
        public double HoursStart { get; set; }
        public int HoursInLastDay { get; set; }
    }

    public class EmployeeInJobDTO
    {
        public Guid EmployeeId { get; set; }
        public int ExperienceValue { get; set; }
        public double HoursJob { get; set; }
    }
}
