using inzRafalRutowski.Models;

namespace inzRafalRutowski.DTO.Job
{
    public class JobDTO
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime CurrentEnd { get; set; }
        public string Title { get; set; }
        public int EmployerId { get; set; }
        public List<ListEmployeeAddToJob> ListEmployeeAddToJob { get; set; }
        public string Color { get; set; }
        public int? JobId { get; set; }
        public double? FinishWorkHours { get; set; }
        public DateTime? TimeAddHistory { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Zip { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool isEstimate { get; set; }
        public Estimate? Estimate { get; set; }
    }

    public class ListEmployeeAddToJob
    {
        public List<EmployeeInJobDTO> EmployeeInJobList { get; set; }
        public DateTime? End { get; set; }
        public int HoursStart { get; set; }
        public Guid? ResponsiblePersonEmployeeId { get; set; }
        public string? ResponsiblePersonName { get; set; }
        public string? ResponsiblePersonSurname { get; set; }
        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; }
        public double? FinishWorkHours { get; set; }

    }

    public class Estimate
    {
        public string NameJob { get; set; }
        public string AddressJob { get; set; }
        public string Investor { get; set; }
        public string TypeJob { get; set; }
        public double moneyPerHour { get; set; }
        public DateTime CreateDate { get; set; }
        public string Create { get; set; }
        public string Phone { get; set; }
        public int FullCost { get; set; }
        public List<CostInSpecialization> ListCost { get; set; }
    }

    public class CostInSpecialization
    {
        public string SpecializationName { get; set;}
        public int Cost { get; set;}
    }
}
