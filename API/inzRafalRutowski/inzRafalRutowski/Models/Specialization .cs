namespace inzRafalRutowski.Models
{
    public class Specialization
    {
        public int Id { get; set; }
        public string Name { get; set; }


        public int? EmployerId { get; set; } // dodane usuwanie kaskadowe, żeby jeżeli dodamy speronalizowane doświadczenie to niech usuwa się wraz z nim
        public Employer? Employer { get; set; }
        public List<EmployeeSpecialization> EmployeeSpecializations { get; set; }
    }   
}
