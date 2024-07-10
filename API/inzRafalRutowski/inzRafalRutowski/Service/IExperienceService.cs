using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface IExperienceService
    {
        IActionResult AddExperience(Experience request);
        ActionResult<List<Experience>> GetExperience(int employerId);
        ActionResult<Experience> CheckCanModify(int experianceId, int employerId, int value, bool edit);
        ActionResult<Experience> Edit(EditExperianceDTO request);
        ActionResult<Experience> Delete(int experianceId);
    }
}
