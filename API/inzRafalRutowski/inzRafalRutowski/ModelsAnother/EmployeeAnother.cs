namespace inzRafalRutowski.ModelsAnother
{
    public class EmployeeAnother
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsEmployed { get; set; }


        public List<EmployeeSpecializationAnother> EmployeeSpecializationAnothers { get; set; }
    }
}
