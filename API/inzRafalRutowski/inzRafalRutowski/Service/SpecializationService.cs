﻿using inzRafalRutowski.Data;
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
            var employer = _context.Employers.FirstOrDefault(x => int.Equals(x.Id, request.EmployerId));

            if (employer is null) return false;

            Specialization specialization = new Specialization()
            {
                EmployerId = request.EmployerId,
                Name = request.Name
            };

            _context.Specializations.Add(specialization);
            _context.SaveChanges();
            return true;
        }

        public int CheckIfSpecializationIsWithoutEmployee( int specializationId, Guid employerId)
        {

            var employer = _context.Employers.FirstOrDefault(x => int.Equals(x.Id, employerId));
            var specialization = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, specializationId));

            if (employer is null && specialization is null) return -1;
            else if (employer is null) return -2;
            else if (specialization is null) return -3;

            var canModify = 0;
            var listEmployees = _context.Employees.Where(x => int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.SpecializationId, specializationId)) is not null)
                    canModify = 1;
            });
            return canModify;
        }

        public bool DeleteSpecialization(int specializationId)
        {
            var specialization = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, specializationId));

            if (specialization is null) return false;

            _context.Specializations.Remove(_context.Specializations.First(x => int.Equals(x.Id, specializationId)));
            _context.SaveChanges();
            return true;
        }

        public bool EditSpecialization(SpecializationEditDTO request)
        {
            var specialization = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, request.Id));

            if (specialization is null) return false;

            specialization.Name = request.Name;
            _context.SaveChanges();
            return true;
        }

        public List<Specialization> GetSpecializations(Guid EmployerId)
        {
            var employer = _context.Employers.FirstOrDefault(x => int.Equals(x.Id, EmployerId));

            if (employer is null) return null;

            return _context.Specializations.Where(x => int.Equals(x.EmployerId, EmployerId) || int.Equals(x.EmployerId, null)).ToList();
        }
    }
}
