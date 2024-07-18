using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public class ExperienceService : IExperienceService
    {
        private readonly DataContext _context;

        public ExperienceService(DataContext context)
        {
            _context = context;
        }
        public ActionResult<Experience> AddExperience(Experience request)
        {
            if (request == null) return null;
            _context.Experiences.Add(request);
            _context.SaveChanges();

            return request;
        }

        public ActionResult<Experience> CheckCanModify(int experianceId, int employerId, int value, bool edit)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Experience> Delete(int experianceId)
        {
            throw new NotImplementedException();
        }

        public bool EditExperience(EditExperianceDTO request)
        {
            var experiance = _context.Experiences.FirstOrDefault(x => int.Equals(x.Id, request.ExperianceId));
            if (experiance == null) return false;

            experiance.ExperienceName = request.Name;
            experiance.ExperienceValue = request.Value;

            _context.SaveChanges();
            return true;
        }

        public ActionResult<List<Experience>> GetExperience(int employerId)
        {
            var employer = _context.Employers.FirstOrDefault(x=> int.Equals(x.Id, employerId));
            if (employer == null) return null;

            return _context.Experiences.Where(x => int.Equals(x.EmployerId, employerId) || int.Equals(x.EmployerId, null)).ToList();
        }
    }
}
