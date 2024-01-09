namespace inzRafalRutowski.DTO.Job
{
    public class ListEmployeeInJobDTOList
    {
        public List<EmployeeInJobDTOList> listEmployeeInJobDTOList { get; set; }
        public DateTime Start { get; set; }
        public List<SpecialisationListEmployeeRemoveDTO>? listSpecialisationListEmployeeRemoveDTO { get; set; }
    }
    public class ListEmployeeInJobWithEmployerIdDTOList
    {
        public List<EmployeeInJobDTOList> listEmployeeInJobDTOList { get; set; }
        public int EmployerId { get; set; }
        public int SpecializationId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
    public class EmployeeInJobDTOList
    {
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; }
        public DateTime End { get; set; }
        public List<EmployeeInJobDTO> EmployeeInJobList { get; set; }
        public double Hours { get; set; }
        public double HoursStart { get; set; }
        public int HoursInLastDay { get; set; }
    }

    public class EmployeeInJobDTO
    {
        public Guid EmployeeId { get; set; }
        public int ExperienceValue { get; set; }
        public double HoursJob { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ExperienceName { get; set; }
        public bool? IsEmployed { get; set; }
        public int? ExperienceId { get; set; }
    }

    public class ListEmployeeInJobWithNewEmployeeDTOList : ListEmployeeInJobDTOList
    {
        public int EmployerId { get; set; }
        public int SpecializationId { get; set; }
        public DateTime End { get; set; }
        public EmployeDataToChangeDTO Employee { get; set; }
    }
    public class EmployeDataToChangeDTO
    {
        public Guid EmployeeId { get; set;}
        public string ExperienceName { get; set;}
        public string Name { get; set; }
        public string Surname { get; set; }
        public int SpecializationId { get; set; }
        public string specializationName { get; set; }
        public bool? IsEmployed { get; set; }

    }

    public class SpecialisationListEmployeeRemoveDTO
    {
        public Guid? EmployeeId { get; set; }
        public bool HaveSpecialist { get; set; }
        public double Hours { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string NameSurname { get; set; }
        public int SpecializationId { get; set; }
        public string specializationName { get; set; }


    }
}
