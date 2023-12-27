namespace inzRafalRutowski.Models
{
    public class EmployeeWithoutEmployer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsEmployed { get; set; }
        public Employee Employee { get; set; }

    }
}
