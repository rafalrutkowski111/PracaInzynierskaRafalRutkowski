namespace inzRafalRutowski.DTO.Specialization
{
    public class SpecializationAddDTO
    {
        public string Name { get; set; }
        public Guid EmployerId { get; set; }
    }
    public class SpecializationEditDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
