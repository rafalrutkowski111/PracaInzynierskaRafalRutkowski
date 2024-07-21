using inzRafalRutowski.DTO.Employer;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Service
{
    public interface ITestApiService
    {
        Task<ActionResult<Employer>> AddEmployer(EmployerDTO request); //lepiej nie dawac  action result bo zrobi sie result i value jako 2 obiekty
        // gdzie value to to czego szukamy, a jak zrobimy samo <Employer> to juz bedzie wynik

        Task<ActionResult<List<EmployerDTO>>> GetEmployers(); //mapper dodany

        Task<ActionResult<Employer>> GetEmployer(int id);

        Task<ActionResult<Employer>> UpdateEmployer(EmployerDTO request);

        Task<ActionResult<Employer>> DeleteEmployer(int id);
    }
}