using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface IExperienceService
    {
        ActionResult<Experience> AddExperience(Experience request);
        ActionResult<List<Experience>> GetExperience(int employerId);
        ActionResult<Experience> CheckCanModify(int experianceId, int employerId, int value, bool edit);
        bool EditExperience(EditExperianceDTO request);
        ActionResult<Experience> Delete(int experianceId);
    }
}
