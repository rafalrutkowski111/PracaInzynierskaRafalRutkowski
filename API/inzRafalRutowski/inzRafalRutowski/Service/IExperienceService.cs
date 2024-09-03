using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface IExperienceService
    {
        Experience AddExperience(Experience request);
        List<Experience> GetExperience(int employerId);
        Experience CheckCanModify(int experianceId, int employerId, int value, bool edit);
        bool EditExperience(EditExperianceDTO request);
        bool Delete(int experianceId);
    }
}
