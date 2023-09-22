using inzRafalRutowski.Models;

namespace inzRafalRutowski.DTO
{
    public class JobDTO
    {
        //public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int EmployerId { get; set; }
    }
}
