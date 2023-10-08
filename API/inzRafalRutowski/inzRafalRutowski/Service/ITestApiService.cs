using inzRafalRutowski.DTO.Employer;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface ITestApiService
    {
        Task<ActionResult<Employer>> AddEmployer(EmployerDTO request);

        Task<ActionResult<List<EmployerDTO>>> GetEmployers(); //mapper dodany

        Task<ActionResult<Employer>> GetEmployer(int id);

        Task<ActionResult<Employer>> UpdateEmployer(EmployerDTO request);

        Task<ActionResult<Employer>> DeleteEmployer(int id);
    }
}