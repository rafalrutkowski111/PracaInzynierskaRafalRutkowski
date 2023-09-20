namespace inzRafalRutowski.Models
{
    public class Specialization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Experience { get; set; }
        public double? RemainingHours { get; set; }


        //public Employee Employee { get; set; } bedzie wiele do wielu, a nie 1 do wielu

        // public int EmployeeId { get; set; }
        // public int JobId { get; set; }
    }   
}
