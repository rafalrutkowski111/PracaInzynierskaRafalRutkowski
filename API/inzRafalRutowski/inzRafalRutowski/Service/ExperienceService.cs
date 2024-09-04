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
        public Experience AddExperience(Experience request)
        {
            if (request == null) return null;
            _context.Experiences.Add(request);
            _context.SaveChanges();

            return request;
        }

        public int CheckCanModify(int experianceId, int employerId, int value, bool edit)
        {
            var experiences = _context.Experiences.FirstOrDefault(x => int.Equals(x.Id, experianceId));
            if (experiences == null) return -1;
            var employer = _context.Employers.FirstOrDefault(x => int.Equals(x.Id, employerId));
            if (employer == null) return -2;

            var canModify = 0;
            var listEmployees = _context.Employees.Where(x => int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.ExperienceId, experianceId)) != null)
                    canModify = 1;

            });

            if (edit && (_context.Experiences.First(x => int.Equals(x.Id, experianceId)).ExperienceValue == value))
                canModify = 0;
            return canModify;
        }

        public bool Delete(int experianceId)
        {
            var result = _context.Experiences.FirstOrDefault(x => int.Equals(x.Id, experianceId));
            if(result == null) return false;

            _context.Experiences.Remove(result);
            _context.SaveChanges();

            return true;
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

        public List<Experience> GetExperience(int employerId)
        {
            var employer = _context.Employers.FirstOrDefault(x=> int.Equals(x.Id, employerId));
            if (employer == null) return null;

            return _context.Experiences.Where(x => int.Equals(x.EmployerId, employerId) || int.Equals(x.EmployerId, null)).ToList();
        }
    }
}
