namespace inzRafalRutowski.ModelsAnother
{
    // ten katalog ma reprezentowac modele które mogłby być umiejszczone w innym serwisie i tylko do nas wstrzykiwane.
    // w przyszłości może tak zrobie
    public class EmployeeAnother
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsEmployed { get; set; }


        public List<EmployeeSpecializationAnother> EmployeeSpecializationAnothers { get; set; }
    }
}
