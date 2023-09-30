using inzRafalRutowski.Models;

namespace inzRafalRutowski.DTO
{
    public class JobDTO
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Title { get; set; }
        public string Desc { get; set; }
        public int EmployerId { get; set; }
    }
}
