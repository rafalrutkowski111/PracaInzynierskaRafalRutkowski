namespace inzRafalRutowski.Models
{
    public class JobHistory
    {
        public int Id { get; set; }
        public int SpecializationId{ get; set; }
        public int HourLeft { get; set; }


        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
