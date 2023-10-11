using inzRafalRutowski.Models;

namespace inzRafalRutowski.DTO.Job
{
    public class ListJobSpecializationCopy
    {
        public ListJobSpecializationCopy(ListJobSpecialization e)
        {
            SpecializationId = e.SpecializationId;
            Hours = e.Hours;
            Disabled = e.Disabled;
        }

        public int SpecializationId { get; set; }
        public double Hours { get; set; }
        public bool? Disabled { get; set; }

    }
    public class ListJobSpecialization
    {
        public int SpecializationId { get; set; }
        public double Hours { get; set; }
        public bool? Disabled { get; set; }

    }

    public class JobSpecializationDTO
    {
        public List<ListJobSpecialization> JobSpecialization { get; set; }
        public int EmployerId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
