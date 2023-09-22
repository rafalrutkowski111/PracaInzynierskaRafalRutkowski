namespace inzRafalRutowski.Models
{
    public class Employer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public List<Employee> Employees { get; set; }
        public List<Job> Jobs { get; set; }

        /*
        public List<Team> Teams { get; set; }
        public List<Job> Jobs { get; set; }
        */
    }
}
