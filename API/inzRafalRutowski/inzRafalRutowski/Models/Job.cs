using inzRafalRutowski.DTO.Job;

namespace inzRafalRutowski.Models
{
    public class Job
    {
        public int Id { get; set; }
        public DateTime TimeStartJob { get; set; }
        public DateTime TimeFinishJob { get; set; }
        public DateTime CurrentTimeFinishJob { get; set; }
        public string Title { get; set; }
        public string ListEmployeeAddToJob { get; set; } //json przekonwertowany na stringa
        public string Color { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Zip { get; set; }
        public string Name { get; set; } //imie zleceniodawacy
        public string Surname { get; set; } //nazwisko zleceniodawacy
        public bool isEstimate { get; set; }
        public string Estimate { get; set; }

        public Guid EmployerId { get; set; }
        public Employer Employer { get; set; }
        public List<JobHistory> JobHistories { get; set; }
        public List<JobEmployee> JobEmployees { get; set; }
    }
}
