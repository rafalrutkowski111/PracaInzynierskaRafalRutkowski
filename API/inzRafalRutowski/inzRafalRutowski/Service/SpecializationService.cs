using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public class SpecializationService : ISpecializationService
    {
        private readonly DataContext _context;
        public SpecializationService(DataContext context)
        {
            _context = context;
        }
        public void AddSpecialization(SpecializationAddDTO request)
        {
            Specialization specialization = new Specialization()
            {
                EmployerId = request.EmployerId,
                Name = request.Name
            };

            _context.Specializations.Add(specialization);
            _context.SaveChanges();
        }

        public bool CheckIfSpecializationIsWithoutEmployee( int specializationId, int employerId)
        {
            var canModify = true;
            var listEmployees = _context.Employees.Where(x => int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.SpecializationId, specializationId)) != null)
                    canModify = false;
            });
            return canModify;
        }

        public bool CheckEmployerAndSpecializationExist(int specializationId, int employerId)
        {
            var employer = _context.Employers.FirstOrDefault(x => int.Equals(x.Id, employerId));
            var specialization = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, specializationId));

            if (employer == null || specialization == null) return false;
            else return true;
        }
        public bool CheckSpecializationExist(int specializationId)
        {
            var specialization = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, specializationId));

            if (specialization == null) return false;
            else return true;
        }

        public bool CheckEmployerExist(int employerId)
        {
            var employer = _context.Employers.FirstOrDefault(x => int.Equals(x.Id, employerId));

            if (employer == null) return false;
            else return true;
        }
        public void DeleteSpecialization(int specializationId)
        {
            _context.Specializations.Remove(_context.Specializations.First(x => int.Equals(x.Id, specializationId)));
            _context.SaveChanges();
        }

        public void EditSpecialization(SpecializationEditDTO request)
        {
            var specialization = _context.Specializations.First(x => int.Equals(x.Id, request.Id));
            specialization.Name = request.Name;
            _context.SaveChanges();
        }

        public ActionResult<List<Specialization>> GetSpecializations(int EmployerId)
        {
            return _context.Specializations.Where(x => int.Equals(x.EmployerId, EmployerId) || int.Equals(x.EmployerId, null)).ToList();
        }
    }
}
