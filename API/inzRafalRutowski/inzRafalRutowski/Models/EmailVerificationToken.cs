namespace inzRafalRutowski.Models
{
    public class EmailVerificationToken
    {
        public Guid Id { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime ExpiresOnUtc { get; set; }

        public Guid EmployerId { get; set; }
        public Employer Employer { get; set; }
    }
}
