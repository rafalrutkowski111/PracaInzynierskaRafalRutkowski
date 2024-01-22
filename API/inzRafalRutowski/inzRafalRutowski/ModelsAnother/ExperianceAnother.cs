namespace inzRafalRutowski.ModelsAnother
{
    public class ExperianceAnother
    {
        public int Id { get; set; }
        public string ExperienceName { get; set; }
        public int ExperienceValue { get; set; }


        public List<EmployeeSpecializationAnother> EmployeeSpecializationAnothers { get; set; }
    }
}
