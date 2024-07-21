using System.Text.Json.Serialization;

namespace inzRafalRutowski.Models
{
    public class Experience
    {
        public int Id { get; set; }
        public string ExperienceName { get; set; }
        public int ExperienceValue { get; set;}

        [JsonIgnore]
        public int? EmployerId { get; set; } // dodane usuwanie kaskadowe, żeby jeżeli dodamy speronalizowane doświadczenie to niech usuwa się wraz z nim
        [JsonIgnore]
        public Employer? Employer { get; set; }
    }
}
