namespace inzRafalRutowski.Models
{
    public class Employer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public bool Admin { get; set; }
        public string Email { get; set; }
        public bool ConfirmEmail { get; set; }
        public bool SmsMFA { get; set; }
        public DateTime? IgnoreMFA { get; set; }

        public List<Employee> Employees { get; set; }
        public List<Job> Jobs { get; set; }
        public List<Experience> Experiences { get; set; }
        public List<Specialization> Specializations { get; set; }
    }
}
