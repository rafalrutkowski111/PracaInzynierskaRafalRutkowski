namespace inzRafalRutowski.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string TimeStartJob { get; set; }
        public string TimeFinishJob { get; set; }
        public string EstimatedTimeFinishJob { get; set; }
        public double RemainingJobHours { get; set; }


        /*
        public List<Specialization> Specializations { get; set; }
        public List<JobEmployee> JobEmployee { get; set; }
        public List<JobTeam> JobTeam { get; set; }
        public List<WorkDay> WorkDays { get; set; }
        public int EmployerId { get; set; }
        */
    }
}
