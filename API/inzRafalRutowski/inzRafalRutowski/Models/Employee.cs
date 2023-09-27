namespace inzRafalRutowski.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsEmployed { get; set; }
        //public double? HourStartWork { get; set; }
        //public double? HourFinishtWork { get; set; }
        //public string? ContractFinishTime { get; set; }


        public int? EmployerId { get; set; }
        public Employer? Employer { get; set; }
        public List<EmployeeSpecialization> EmployeeSpecializations { get; set; }
        public List<JobEmployee> JobEmployees { get; set; }

        //public List<Specialization> Specializations { get; set; }
        /*
        public int TeamId { get; set; }
        
        public List<WorkDay> WorkDays { get; set; }
        */
    }
}
