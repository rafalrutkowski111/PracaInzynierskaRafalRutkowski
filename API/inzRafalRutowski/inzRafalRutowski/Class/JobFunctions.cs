using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Class
{
    public class JobFunctions
    {
        public List<EmployeeSpecializationListDTO> AddEmployeeWithoutEmployerToList(ListJobSpecialization e, JobSpecializationEmployeeDTO jobSpecializationEmployee, List<EmployeeSpecializationListDTO> employeeDTOListInList, DataContext _context)
        {
            var employeeSpecializationListDTO = new EmployeeSpecializationListDTO();

            var employees = _context.Employees.Where(e => int.Equals(e.IsEmployed, false)).ToList();

            var employeeDTOList = new List<EmployeeDTO>();
            employees.ForEach(x =>
            {

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, x.Id) && int.Equals(e2.SpecializationId, e.SpecializationId)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.experienceName).First();
                    employee.Name = x.Name;
                    employee.Surname = x.Surname;
                    employee.EmployeeId = x.Id;
                    employeeDTOList.Add(employee);


                });
            });

            employeeSpecializationListDTO.SpecializationId = e.SpecializationId;
            employeeSpecializationListDTO.SpecializationName = jobSpecializationEmployee.SpecializationName;
            employeeSpecializationListDTO.EmployeeList = employeeDTOList;

            employeeDTOListInList.Add(employeeSpecializationListDTO);

            return (employeeDTOListInList);
        }
    }
}
