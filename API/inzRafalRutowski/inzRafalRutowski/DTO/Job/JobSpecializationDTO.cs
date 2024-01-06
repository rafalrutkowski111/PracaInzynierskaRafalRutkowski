using inzRafalRutowski.Models;

namespace inzRafalRutowski.DTO.Job
{
    public class CopyListJobSpecialization
    {

        public CopyListJobSpecialization(ListJobSpecialization x)
        {
            SpecializationId = x.SpecializationId;
            Hours = x.Hours;
            Disabled = x.Disabled;
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
        public bool IsUpdate { get; set; }
        public int? JobId { get; set; }
        public List<JobSpecializationEmployeeDTO>? DataEmployeeWithSpecialization { get; set; }
        public bool? RemoveSpecialist { get; set; }
        public Guid? EmployeeId { get; set; }
    }
}
