namespace inzRafalRutowski.ModelsAnother
{
    public class EmployeeSpecializationAnother
    {
        public int Id { get; set; }


        public Guid EmployeeAnotherId { get; set; }
        public EmployeeAnother EmployeeAnother { get; set; }
        public int SpecializationAnotherId { get; set; }
        public SpecializationAnother SpecializationAnother { get; set; }
        public int  ExperianceAnotherId { get; set; }
        public ExperianceAnother ExperianceAnother { get; set; }
    }
}
