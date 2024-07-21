using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface ISpecializationService
    {
        List<Specialization> GetSpecializations(int EmployerId);
        bool AddSpecialization(SpecializationAddDTO request);
        bool EditSpecialization(SpecializationEditDTO request);
        int CheckIfSpecializationIsWithoutEmployee(int specializationId, int employerId);
        bool DeleteSpecialization(int specializationId);
    }
}
