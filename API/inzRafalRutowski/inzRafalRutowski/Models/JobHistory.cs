using System.Data;

namespace inzRafalRutowski.Models
{
    public class JobHistory
    {
        public int Id { get; set; }
        public DateTime TimeStartJob { get; set; }
        public DateTime TimeFinishJob { get; set; }
        public DateTime CurrentTimeFinishJob { get; set; }
        public string Title { get; set; }
        public string ListEmployeeAddToJob { get; set; }
        public string Color { get; set; }
        public DateTime TimeAddHistory { get; set; }


        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
