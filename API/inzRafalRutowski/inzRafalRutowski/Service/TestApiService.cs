using AutoMapper;
using Azure.Core;
using inzRafalRutowski.Controllers;
using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Employer;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Service
{
    public class TestApiService : ITestApiService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TestApiService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ActionResult<List<EmployerDTO>>> GetEmployers() //przykład użycia mapera
        {
            var result = await _context.Employers.ToListAsync();

            var resultDTO = _mapper.Map<List<EmployerDTO>>(result);

            return resultDTO;
        }

        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            return await _context.Employers.FindAsync(id);
        }

        public async Task<ActionResult<Employer>> AddEmployer(EmployerDTO request) //zmiana z standardowego podejścia do uzycia mappera
        {
            /*                                  
            var newEmployer = new Employer
            {
                Name = request.Name,
                Surname = request.SurnameTest,
            };

            _context.Employers.Add(newEmployer);
            await _context.SaveChangesAsync();

            return newEmployer;
            */
            var result = _mapper.Map<Employer>(request);

            _context.Employers.Add(result);
            await _context.SaveChangesAsync();

            return result;

        }

        public async Task<ActionResult<Employer>> UpdateEmployer(EmployerDTO request)
        {
            var result = await _context.Employers
                .FirstOrDefaultAsync(e => e.Id == request.Id);

            

            if (result is not null) 
            { /*
                result.Surname = request.SurnameTest;
                result.Name = request.Name;
                */

                result = _mapper.Map<Employer>(request); // kolejny przykład użycia mappera

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

            if (result is not null)
            {
                _context.Employers.Remove(result);

                await _context.SaveChangesAsync();
                return result;
            }

            return null;
        }
    }
}
