using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface ISpecializationService
    {
        ActionResult<List<Specialization>> GetSpecializations(int EmployerId);
        IActionResult AddSpecialization(SpecializationAddDTO request);
        ActionResult<Specialization> Edit(SpecializationEditDTO request);
        ActionResult<Specialization> CheckCanModify(int specializationId, int employerId);
        ActionResult<Specialization> Delete(int specializationId);
    }
}
