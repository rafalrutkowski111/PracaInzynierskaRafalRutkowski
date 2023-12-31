using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Employee;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("employeeSearch")]
        public ActionResult<List<EmployeeDTO>> GetEmployeeSearch([FromQuery] Guid id)
        {
            var result = new List<EmployeeDTO>();

            Employee? employeeSearch;
            var employeeWithoutEmployerSearch = _context.EmployeeWithoutEmployers.FirstOrDefault(e => Guid.Equals(e.Id, id));

            if (employeeWithoutEmployerSearch == null)
            {
                employeeSearch = _context.Employees.FirstOrDefault(e => Guid.Equals(e.Id, id));

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, employeeSearch.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.experienceName).First();
                    employee.Name = employeeSearch.Name;
                    employee.Surname = employeeSearch.Surname;
                    employee.EmployeeId = employeeSearch.Id;
                    employee.SpecializationId = e2.SpecializationId;
                    employee.IsEmployed = employeeSearch.IsEmployed;
                    result.Add(employee);
                });
            }
            else
            {
                var employeeSpecialization = _context.EmployeeWithoutEmployerSpecializations.Where(e2 => Guid.Equals(e2.EmployeeWithoutEmployerId, employeeWithoutEmployerSearch.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.experienceName).First();
                    employee.Name = employeeWithoutEmployerSearch.Name;
                    employee.Surname = employeeWithoutEmployerSearch.Surname;
                    employee.EmployeeId = employeeWithoutEmployerSearch.Id;
                    employee.SpecializationId = e2.SpecializationId;
                    employee.IsEmployed = employeeWithoutEmployerSearch.IsEmployed;
                    result.Add(employee);
                });
            }
                
            return Ok(result);
        }

        [HttpGet("getEmployeesWithoutEmployer")]
        public ActionResult<List<EmployeeDTO>> GetEmployeesWithoutEmployer()
        {
            var result = new List<EmployeeDTO>();

            var employees = _context.EmployeeWithoutEmployers.Where(e => bool.Equals(e.IsEmployed, false) ).ToList();


            employees.ForEach(e =>
            {
                
                var employeeSpecialization = _context.EmployeeWithoutEmployerSpecializations.Where(e2 => Guid.Equals(e2.EmployeeWithoutEmployerId, e.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.experienceName).First();
                    employee.Name = e.Name;
                    employee.Surname = e.Surname;
                    employee.EmployeeId = e.Id;
                    result.Add(employee);
                });
            });
            return Ok(result);
        }

        [HttpGet("getEmployees")]
        public ActionResult<List<EmployeeDTO>> GetEmployee([FromQuery] int employerId)
        {
            var result = new List<EmployeeDTO>();

            var employees = _context.Employees.Where(e => int.Equals(e.EmployerId, employerId)).ToList();


            employees.ForEach(e =>
            {

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, e.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.experienceName).First();
                    employee.Name = e.Name;
                    employee.Surname = e.Surname;
                    employee.EmployeeId = e.Id;
                    result.Add(employee);
                });
            });
            return Ok(result);
        }

        // kopiowanie z danych z EmployeeWithoutEmployers i robienie nowego pracowniak z nimi w Emplyee, analogicznie z specjalziacjami pracowników
        [HttpPut]
        public IActionResult AddEmployeeToEmployer([FromQuery] Guid employeeId, [FromQuery] int employerId)
        {
            var employee = _context.EmployeeWithoutEmployers.First(e => Guid.Equals(e.Id, employeeId));

            employee.IsEmployed = true;

            var newEmployee = new Employee()
            {
                Name = employee.Name,
                Surname = employee.Surname,
                Id = employee.Id,
                IsEmployed = true,
                EmployerId = employerId,
            };
            _context.Employees.Add(newEmployee);


            var listSpecialization = _context.EmployeeWithoutEmployerSpecializations.Where(x => Guid.Equals(x.EmployeeWithoutEmployerId, employeeId)).ToList();

            listSpecialization.ForEach(x =>
            {
                var newSpecialist = new EmployeeSpecialization()
                {
                    EmployeeId = x.EmployeeWithoutEmployerId,
                    SpecializationId = x.SpecializationId,
                    ExperienceId = x.ExperienceId,
                };
                _context.EmployeeSpecializations.Add(newSpecialist);
            });

            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] EmployeeAddDTO request)
        {

            var newEmployee = new Employee
            {
                Name = request.Name,
                Surname = request.Surname,
                IsEmployed = request.IsEmployed,
                EmployerId = request.EmployerId,
                Id = Guid.NewGuid()
            };
            _context.Employees.Add(newEmployee);
            
            var employeeSpecialization = request.SpecializationAndExperience.Select(
                e => new EmployeeSpecialization
                {
                    EmployeeId = newEmployee.Id,
                    SpecializationId = e.SpecializationId,
                    ExperienceId = e.ExperienceId
                }
                ).ToList();

            employeeSpecialization.ForEach(e =>
            {
                _context.EmployeeSpecializations.Add(e);
            });
            
            _context.SaveChanges();
            return Ok();
        }

        //ten kontorler jest napisany tylko po to żeby dodać pracowników do Empoyeewitoutemployer których będziemy uzywali w programie(szukanie pracowników)

        [HttpPost("addEmployeeWithoutEmployer")]
        public IActionResult AddEmployeeWithoutEmployer([FromBody] EmployeeAddDTO request)
        {

            var newEmployee = new EmployeeWithoutEmployer
            {
                Name = request.Name,
                Surname = request.Surname,
                IsEmployed = request.IsEmployed,
                Id = Guid.NewGuid()
            };
            _context.EmployeeWithoutEmployers.Add(newEmployee);

            var employeeSpecialization = request.SpecializationAndExperience.Select(
                e => new EmployeeWithoutEmployerSpecialization
                {
                    EmployeeWithoutEmployerId = newEmployee.Id,
                    SpecializationId = e.SpecializationId,
                    ExperienceId = e.ExperienceId
                }
                ).ToList();

            employeeSpecialization.ForEach(e =>
            {
                _context.EmployeeWithoutEmployerSpecializations.Add(e);
            });

            _context.SaveChanges();
            return Ok();
        }
        
    }
}
