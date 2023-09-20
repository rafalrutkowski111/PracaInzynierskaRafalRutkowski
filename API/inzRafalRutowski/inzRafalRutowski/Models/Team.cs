namespace inzRafalRutowski.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double HourStartWork { get; set; }
        public double HourFinishtWork { get; set; }
        public string MemberCounter { get; set;}
        public int MaxNumberOfMembers { get; set;}


        /*
        public List<Employee> Employees { get; set; }
        public int EmployerId { get; set; }
        public List<JobTeam> JobTeam { get; set; }
        */

    }
}
