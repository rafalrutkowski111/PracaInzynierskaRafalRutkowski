using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface ISpecializationService
    {
        List<Specialization> GetSpecializations(Guid EmployerId);
        bool AddSpecialization(SpecializationAddDTO request);
        bool EditSpecialization(SpecializationEditDTO request);
        int CheckIfSpecializationIsWithoutEmployee(int specializationId, Guid employerId);
        bool DeleteSpecialization(int specializationId);
    }
}
