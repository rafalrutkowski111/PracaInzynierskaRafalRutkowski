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
        public bool AddSpecialization(SpecializationAddDTO request)
        {
            var employer = _context.Employers.FirstOrDefault(x => Equals(x.Id, request.EmployerId));

            if (employer == null || request.Name == "") return false;

            Specialization specialization = new Specialization()
            {
                EmployerId = request.EmployerId,
                Name = request.Name
            };

            _context.Specializations.Add(specialization);
            _context.SaveChanges();
            return true;

        }

        public ActionResult<Specialization> CheckCanModify(int specializationId, int employerId)
        {
            throw new NotImplementedException();
        }

        public ActionResult<Specialization> Delete(int specializationId)
        {
            throw new NotImplementedException();
        }

        public bool Edit(SpecializationEditDTO request)
        {
            var specialization = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, request.Id));

            if (specialization == null) return false;
            else specialization.Name = request.Name;

            _context.SaveChanges();

            return true;
        }

        public ActionResult<List<Specialization>> GetSpecializations(int EmployerId)
        {
            return _context.Specializations.Where(x => int.Equals(x.EmployerId, EmployerId) || int.Equals(x.EmployerId, null)).ToList();
        }
    }
}
