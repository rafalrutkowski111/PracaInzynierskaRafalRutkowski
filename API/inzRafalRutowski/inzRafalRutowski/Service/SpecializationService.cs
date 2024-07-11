using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public class SpecializationService : ISpecializationService
    {
        public IActionResult AddSpecialization(SpecializationAddDTO request)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Specialization> CheckCanModify(int specializationId, int employerId)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Specialization> Delete(int specializationId)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Specialization> Edit(SpecializationEditDTO request)
        {
            throw new NotImplementedException();
        }

        public ActionResult<List<Specialization>> GetSpecializations(int EmployerId)
        {
            throw new NotImplementedException();
        }
    }
}
