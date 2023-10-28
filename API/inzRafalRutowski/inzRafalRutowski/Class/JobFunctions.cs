using Azure.Core;
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

        public Tuple<List<EmployeeInJobDTOList>, DateTime> UpdateDateInJob(ListEmployeeInJobDTOList request)
        {
            request.listEmployeeInJobDTOList.ForEach(x =>
            {
                double workAllEmployeeInSpecializationIn1h = 0;
                x.EmployeeInJobList.ForEach(e =>
                {
                    workAllEmployeeInSpecializationIn1h += ((double)e.ExperienceValue / 100);
                });

                double allHours = 0;
                double sumWorkAllEmployeeInSpecializationIn1h = 0;

                while (sumWorkAllEmployeeInSpecializationIn1h < x.HoursStart)
                {
                    allHours++; //zaokrąglamy powyzej potrzebnego czau
                    sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                }

                int days = (int)allHours / 8;
                int leftHours = (int)allHours % 8;
                if (leftHours != 0) days++; // jeżeli mamy reszte to dodajemy dzień i to ilość godzin pracy w kolejnym dniu

                var jobFunctions = new JobFunctions();
                var newDateEnd = jobFunctions.NewDateEnd(request.Start, days); //coś tu jest nie tak
                TimeSpan hours = new TimeSpan(0, 0, 0);
                if (leftHours != 0)
                {
                    hours = new TimeSpan(7 + leftHours, 0, 0); //dodanie godzin
                }
                else hours = new TimeSpan(15, 0, 0);

                newDateEnd = newDateEnd.Date + hours;
                x.End = newDateEnd;
            });
            var EndWorkDay = request.listEmployeeInJobDTOList.OrderByDescending(x => x.End).First().End;

            return Tuple.Create(request.listEmployeeInJobDTOList, EndWorkDay);
        }
    }
}
