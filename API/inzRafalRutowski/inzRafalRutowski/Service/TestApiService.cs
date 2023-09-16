using Azure.Core;
using inzRafalRutowski.Controllers;
using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Service
{
    public class TestApiService : ITestApiService
    {
        private readonly DataContext _context;
        public TestApiService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<List<Employer>>> GetEmployers()
        {
            return await _context.Employers.ToListAsync();
        }

        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            return await _context.Employers.FindAsync(id);
        }

        public async Task<ActionResult<Employer>> AddEmployer(EmployerDTO request)
        {

            var newEmployer = new Employer
            {
                Name = request.Name,
                Surname = request.Surname,
            };

            _context.Employers.Add(newEmployer);
            await _context.SaveChangesAsync();

            return newEmployer;
        }

        public async Task<ActionResult<Employer>> UpdateEmployer(EmployerDTO request)
        {
            var result = await _context.Employers
                .FirstOrDefaultAsync(e => e.Id == request.Id);

            

            if (result != null) 
            {
                result.Surname = request.Surname;
                result.Name = request.Name;

                await _context.SaveChangesAsync();
                return result;
            }
            var message = "Miss Employer id";
            return null;
        }

        public async Task<ActionResult<Employer>> DeleteEmployer(int id)
        {
            var result = await _context.Employers
                .FirstOrDefaultAsync(e => e.Id == id);

            if (result != null)
            {
                _context.Employers.Remove(result);

                await _context.SaveChangesAsync();
                return result;
            }

            return null;
        }
    }
}
