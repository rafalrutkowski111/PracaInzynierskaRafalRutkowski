﻿using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Employee;
using inzRafalRutowski.Models;
using inzRafalRutowski.ModelsAnother;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : HomeController
    {
        private readonly DataContext _context;
        public EmployeeController(DataContext context , IJwtService jwtService) : base(jwtService)
        {
            _context = context;
        }

        [HttpGet("employeeSearch")]
        public ActionResult<List<EmployeeDTO>> GetEmployeeSearch([FromQuery] Guid id)
        {
            var result = new List<EmployeeDTO>();

            Employee? employeeSearch;
            var employeeWithoutEmployerSearch = _context.EmployeeAnothers.FirstOrDefault(e => Guid.Equals(e.Id, id));

            if (employeeWithoutEmployerSearch is null)
            {
                employeeSearch = _context.Employees.FirstOrDefault(e => Guid.Equals(e.Id, id));

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, employeeSearch.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                    employee.Name = employeeSearch.Name;
                    employee.Surname = employeeSearch.Surname;
                    employee.EmployeeId = employeeSearch.Id;
                    employee.SpecializationId = e2.SpecializationId;
                    result.Add(employee);
                });
            }
            else
            {
                var employeeSpecialization = _context.EmployeeSpecializationAnothers.Where(e2 => Guid.Equals(e2.EmployeeAnotherId, employeeWithoutEmployerSearch.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationAnotherId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperianceAnotherId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                    employee.Name = employeeWithoutEmployerSearch.Name;
                    employee.Surname = employeeWithoutEmployerSearch.Surname;
                    employee.EmployeeId = employeeWithoutEmployerSearch.Id;
                    employee.SpecializationId = e2.SpecializationAnotherId;
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

            var employees = _context.EmployeeAnothers.Where(e => bool.Equals(e.IsEmployed, false)).ToList();


            employees.ForEach(e =>
            {

                var employeeSpecialization = _context.EmployeeSpecializationAnothers.Where(e2 => Guid.Equals(e2.EmployeeAnotherId, e.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationAnotherId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperianceAnotherId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
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

                if (employeeSpecialization.Count == 0)
                {
                    var employee = new EmployeeDTO();
                    employee.SpecializationName = "Brak";
                    employee.ExperienceName = "Brak";
                    employee.Name = e.Name;
                    employee.Surname = e.Surname;
                    employee.EmployeeId = e.Id;
                    result.Add(employee);
                }
                else
                {
                    employeeSpecialization.ForEach(e2 =>
                    {
                        var employee = new EmployeeDTO();
                        var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                        employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                        var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                        employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                        employee.Name = e.Name;
                        employee.Surname = e.Surname;
                        employee.EmployeeId = e.Id;
                        result.Add(employee);
                    });
                }

            });
            return Ok(result);
        }

        // kopiowanie z danych z EmployeeAnother i robienie nowego pracowniak z nimi w Emplyee, analogicznie z specjalziacjami pracowników
        [HttpPut]
        public IActionResult AddEmployeeToEmployer([FromQuery] Guid employeeId, [FromQuery] Guid employerId)
        {
            var employee = _context.EmployeeAnothers.First(e => Guid.Equals(e.Id, employeeId));

            employee.IsEmployed = true;

            var newEmployee = new Employee()
            {
                Name = employee.Name,
                Surname = employee.Surname,
                Id = employee.Id,
                EmployerId = employerId,
            };
            _context.Employees.Add(newEmployee);


            var listSpecialization = _context.EmployeeSpecializationAnothers.Where(x => Guid.Equals(x.EmployeeAnotherId, employeeId)).ToList();

            listSpecialization.ForEach(x =>
            {
                var newSpecialist = new EmployeeSpecialization()
                {
                    EmployeeId = x.EmployeeAnotherId,
                    SpecializationId = x.SpecializationAnotherId,
                    ExperienceId = x.ExperianceAnotherId,
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
                EmployerId = request.EmployerId,
                Id = Guid.NewGuid()
            };
            _context.Employees.Add(newEmployee);

            var employeeSpecialization = request.ListSpecializationAndExperience.Select(
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

            var newEmployee = new EmployeeAnother
            {
                Name = request.Name,
                Surname = request.Surname,
                IsEmployed = request.IsEmployed,
                Id = Guid.NewGuid()
            };
            _context.EmployeeAnothers.Add(newEmployee);

            var employeeSpecialization = request.ListSpecializationAndExperience.Select(
                e => new EmployeeSpecializationAnother
                {
                    EmployeeAnotherId = newEmployee.Id,
                    SpecializationAnotherId = e.SpecializationId,
                    ExperianceAnotherId = e.ExperienceId
                }
                ).ToList();

            employeeSpecialization.ForEach(e =>
            {
                _context.EmployeeSpecializationAnothers.Add(e);
            });

            _context.SaveChanges();
            return Ok();
        }

        //kontroler sprawdza czy pracownik pracuje i czy jest osobą odpowiedzialną za jakąś prace 
        [HttpPost("checkEmployeeWork")]
        public IActionResult checkEmployeeWorkForEdit([FromBody] EmployeeCheckDTO request)
        {

            bool modifyWorks = false;
            bool removeSpecialist = false;
            DateTime tomorrow = DateTime.Today.AddDays(1);
            List<EmployeeModifyDTO> employeeModifylist = new List<EmployeeModifyDTO>();

            var listEmployeeJob = _context.JobEmployees.Where(x => Guid.Equals(x.EmployeeId, request.EmployeeId) && x.TimeFinishJob > tomorrow).ToList();

            if (listEmployeeJob.Count != 0)
            {
                listEmployeeJob.ForEach(x =>
                {
                    SpecializationAndExperience? changeSpecializationOrExperriance = null;

                    if (request.IsEdit)
                    {
                        changeSpecializationOrExperriance = request.ListSpecializationAndExperience.FirstOrDefault(x2 =>
                        int.Equals(x2.SpecializationId, x.SpecializationId) && x2.ExperienceId != x.ExperienceId);
                    }

                    if (changeSpecializationOrExperriance is not null || !request.IsEdit)
                    {
                        modifyWorks = true;
                        var employeeModify = new EmployeeModifyDTO();

                        employeeModify.JobName = _context.Jobs.First(x2 => int.Equals(x2.Id, x.JobId)).Title;
                        employeeModify.JobId = _context.Jobs.First(x2 => int.Equals(x2.Id, x.JobId)).Id;

                        if (request.IsEdit)
                        {
                            var exp = request.ListSpecializationAndExperience.FirstOrDefault(x3 => int.Equals(x3.SpecializationId, x.SpecializationId));
                            int? expId = null;

                            if (exp is not null)
                                expId = exp.ExperienceId;

                            int expValue = -1;
                            if (expId is not null)
                                expValue = _context.Experiences.FirstOrDefault(x2 => int.Equals(x2.Id, expId)).ExperienceValue;

                            if (x.IsNeed && expValue < 70)
                            {
                                removeSpecialist = true;
                                employeeModify.RemoveSpecialist = true;
                            }
                        }
                        else
                        {
                            if (x.IsNeed)
                            {
                                removeSpecialist = true;
                                employeeModify.RemoveSpecialist = true;
                            }
                        }

                        employeeModifylist.Add(employeeModify);
                    }
                });
            }

            return Ok(new
            {
                modifyWorks = modifyWorks,
                removeSpecialist = removeSpecialist, //oznacza ze bedziemy wywalac go jako osobe odpowiedzialna, wiec jezeli bedzie edycja, ale dalej powyzej 70 doswiadczenie to bedzie to false
                employeeModifylist = employeeModifylist
            });
        }


        [HttpDelete]
        public ActionResult<Employee> DeleteEmployee([FromQuery] Guid employeeId)
        {
            var result = _context.Employees.First(x => Guid.Equals(x.Id, employeeId));
            _context.Employees.Remove(result);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("getEmployeeToEdit")]
        public IActionResult GetEmployeeToEdit([FromQuery] Guid employeeId)
        {
            var employee = _context.Employees.First(x => Guid.Equals(x.Id, employeeId));
            var employeeSpecializations = _context.EmployeeSpecializations.Where(x => Guid.Equals(x.EmployeeId, employeeId)).ToList();

            List<SpecializationAndExperience> dataListSpecializationAndExperience = new List<SpecializationAndExperience>();

            if (employeeSpecializations is not null)
                employeeSpecializations.ForEach(x =>
                {
                    SpecializationAndExperience specializationAndExperience = new SpecializationAndExperience();

                    specializationAndExperience.SpecializationId = x.SpecializationId;
                    specializationAndExperience.ExperienceId = x.ExperienceId;
                    specializationAndExperience.ExperianceName = _context.Experiences.First(x2 => int.Equals(x2.Id, x.ExperienceId)).ExperienceName;
                    specializationAndExperience.SpecializationName = _context.Specializations.First(x2 => int.Equals(x2.Id, x.SpecializationId)).Name;

                    dataListSpecializationAndExperience.Add(specializationAndExperience);
                });

            return Ok(new
            {
                name = employee.Name,
                surname = employee.Surname,
                dataListSpecializationAndExperience = dataListSpecializationAndExperience
            });
        }

        [HttpPost("editEmployee")]
        public ActionResult<Employee> EditEmployee([FromBody] EmployeeAddDTO request)
        {
            //edycja pracownika
            var employee = _context.Employees.First(x => Guid.Equals(x.Id, request.EmployeeId));
            employee.Name = request.Name;
            employee.Surname = request.Surname;
            employee.EmployerId = request.EmployerId;

            //usunieciewczesniejszych specjalizacji
            var oldEmployeeSpecialization = _context.EmployeeSpecializations.Where(x => Guid.Equals(x.EmployeeId, employee.Id)).ToList();

            oldEmployeeSpecialization.ForEach(x =>
            {
                _context.EmployeeSpecializations.Remove(x);
            });

            _context.SaveChanges();

            //dodanie nowych specjalizacji
            var employeeSpecialization = request.ListSpecializationAndExperience.Select(
                e => new EmployeeSpecialization
                {
                    EmployeeId = employee.Id,
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

    }
}
