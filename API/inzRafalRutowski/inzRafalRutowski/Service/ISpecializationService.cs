using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface ISpecializationService
    {
        ActionResult<List<Specialization>> GetSpecializations(int EmployerId);
        void AddSpecialization(SpecializationAddDTO request);
        void EditSpecialization(SpecializationEditDTO request);
        bool CheckIfSpecializationIsWithoutEmployee(int specializationId, int employerId);
        void DeleteSpecialization(int specializationId);
        bool CheckEmployerAndSpecializationExist(int specializationId, int employerId);
        bool CheckSpecializationExist(int specializationId);
        bool CheckEmployerExist(int employerId);
    }
}
