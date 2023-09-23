namespace inzRafalRutowski.Models
{
    public class Experience
    {
        public int Id { get; set; }
        public string experienceName { get; set; }
        public int experienceValue { get; set;}


        public int? EmployerId { get; set; } // dodane usuwanie kaskadowe, żeby jeżeli dodamy speronalizowane doświadczenie to
        //niech usuwa się wraz z nim. Domyślnie było wyłączone, bo employeeId może być nullem
        public Employer? Employer { get; set; }
    }
}
