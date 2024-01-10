namespace inzRafalRutowski.Models
{
    public class Job
    {
        public int Id { get; set; }
        public DateTime TimeStartJob { get; set; }
        public DateTime TimeFinishJob { get; set; }
        public DateTime CurrentTimeFinishJob { get; set; }
        public string Title { get; set; }
        public string ListEmployeeAddToJob { get; set; } 
        public string Color { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Zip { get; set; }

        public int EmployerId { get; set; }
        public Employer Employer { get; set; }
        public List<JobHistory> JobHistorys { get; set; }
        public List<JobEmployee> JobEmployees { get; set; }
        //public string EstimatedTimeFinishJob { get; set; }
        //public double RemainingJobHours { get; set; }


        /*
        public List<Specialization> Specializations { get; set; }

        public List<JobTeam> JobTeam { get; set; }
        public List<WorkDay> WorkDays { get; set; }
        public int EmployerId { get; set; }
        */
    }
}
