namespace inzRafalRutowski.Models
{
    public class WorkDay
    {
        public int Id { get; set; }
        public string Day { get; set; }
        public double HourStartWork { get; set; }
        public double HourFinishtWork { get; set; }
        public double AmountHours { get; set; }

        // co z team, job i employer????

        /*
        public int EmployeeId { get; set; }
        */
    }
}
