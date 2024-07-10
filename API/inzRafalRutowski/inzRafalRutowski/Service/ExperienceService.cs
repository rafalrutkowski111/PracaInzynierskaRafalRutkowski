using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public class ExperienceService : IExperienceService
    {
        public IActionResult AddExperience(Experience request)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Experience> CheckCanModify(int experianceId, int employerId, int value, bool edit)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Experience> Delete(int experianceId)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Experience> Edit(EditExperianceDTO request)
        {
            throw new NotImplementedException();
        }

        public ActionResult<List<Experience>> GetExperience(int employerId)
        {
            throw new NotImplementedException();
        }
    }
}
