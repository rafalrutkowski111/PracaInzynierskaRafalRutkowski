using inzRafalRutowski.Models;

namespace inzRafalRutowski.DTO.Job
{
    public class JobDTO
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime CurrentEnd { get; set; }
        public string Title { get; set; }
        public int EmployerId { get; set; }
        public List<ListEmployeeAddToJob> ListEmployeeAddToJob { get; set; }
        public string Color { get; set; }
        public int? JobId { get; set; }
        public double? FinishWorkHours { get; set; }

    }

    public class ListEmployeeAddToJob
    {
        public List<EmployeeInJobDTO> EmployeeInJobList { get; set; }
        public DateTime End { get; set; }
        public int HoursStart { get; set; }
        public Guid ResponsiblePersonEmployeeId { get; set; }
        public string ResponsiblePersonName { get; set; }
        public string ResponsiblePersonSurname { get; set; }
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; }
        public double? FinishWorkHours { get; set; }

    }


}
