using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Employee;
using inzRafalRutowski.DTO.Job;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Class
{
    public class JobFunctions
    {
        public Tuple<List<EmployeeSpecializationListDTO>, List<string>> AddEmployeeWithoutEmployerToList(
            ListJobSpecialization e, JobSpecializationEmployeeDTO jobSpecializationEmployee, 
            List<EmployeeSpecializationListDTO> employeeDTOListInList, DataContext _context,
             List<string> listEmployeeSpecializationListEmplty)
        {
            var employeeSpecializationListDTO = new EmployeeSpecializationListDTO();
            
            var employees = _context.Employees.Where(e => int.Equals(e.IsEmployed, false)).ToList();

            var employeeDTOList = new List<EmployeeDTO>();
            employees.ForEach(x =>
            {

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, x.Id) && int.Equals(e2.SpecializationId, e.SpecializationId)
                && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, e2.ExperienceId)).experienceValue >= 70 // 70 stała waga- średniozaawansowany
                ).ToList();
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

            if (employeeSpecializationListDTO.EmployeeList.Count() == 0) listEmployeeSpecializationListEmplty.Add(employeeSpecializationListDTO.SpecializationName);

            employeeDTOListInList.Add(employeeSpecializationListDTO);

            return Tuple.Create(employeeDTOListInList, listEmployeeSpecializationListEmplty);
        }

        public int NumberOfWorkDays(DateTime start, int numberOfDays)
        {
            int workDays = 0;

            DateTime end = start.AddDays(numberOfDays);

            while (start != end)
            {
                if (start.DayOfWeek != DayOfWeek.Saturday && start.DayOfWeek != DayOfWeek.Sunday)
                {
                    workDays++;
                }

                start = start.AddDays(1);
            }

            return workDays;
        }

        public DateTime NewDateEnd(DateTime start, int numberOfDays)
        {
            int workDays = 0;

            DateTime end = start;

            while (workDays<= numberOfDays)
            {
                if (end.DayOfWeek != DayOfWeek.Saturday && end.DayOfWeek != DayOfWeek.Sunday)
                {
                    workDays++;
                }
                end = end.AddDays(1);
            }

            return end;
        }
    }
}
