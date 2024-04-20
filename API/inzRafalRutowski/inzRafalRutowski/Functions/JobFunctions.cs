using Azure.Core;
using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Employee;
using inzRafalRutowski.DTO.Job;
using inzRafalRutowski.Models;
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

            var employees = _context.EmployeeAnothers.Where(e => int.Equals(e.IsEmployed, false)).ToList();

            var employeeDTOList = new List<EmployeeDTO>();
            employees.ForEach(x =>
            {

                var employeeSpecialization = _context.EmployeeSpecializationAnothers.Where(e2 => Guid.Equals(e2.EmployeeAnotherId, x.Id) && int.Equals(e2.SpecializationAnotherId, e.SpecializationId)
                && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, e2.ExperianceAnotherId)).ExperienceValue >= 70 // 70 stała waga- średniozaawansowany
                ).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationAnotherId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperianceAnotherId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                    employee.Name = x.Name;
                    employee.Surname = x.Surname;
                    employee.EmployeeId = x.Id;
                    employee.SpecializationId = e.SpecializationId;
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
            if (numberOfDays <= 0) throw new ArgumentOutOfRangeException();

            if (start.DayOfWeek == DayOfWeek.Saturday || start.DayOfWeek == DayOfWeek.Sunday)
                throw new ArgumentOutOfRangeException();

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
            if (numberOfDays <= 0) throw new ArgumentOutOfRangeException();

            if (start.DayOfWeek == DayOfWeek.Saturday || start.DayOfWeek == DayOfWeek.Sunday)
                throw new ArgumentOutOfRangeException();

            int workDays = 1;

            DateTime end = start;

            while (workDays < numberOfDays)
            {
                if (end.DayOfWeek != DayOfWeek.Saturday && end.DayOfWeek != DayOfWeek.Sunday)
                {
                    workDays++;
                }
                end = end.AddDays(1);
            }

            if (end.DayOfWeek == DayOfWeek.Saturday) end = end.AddDays(2);

            return end;
        }

        public Tuple<List<EmployeeInJobDTOList>, DateTime> UpdateDateInJob(ListEmployeeInJobDTOList request)
        {
            bool needChangeEnd = false;
            request.listEmployeeInJobDTOList.ForEach(x =>
            {

                if(request.listSpecialisationListEmployeeRemoveDTO == null)
                {
                    UpdateEndTime(x, request.Start);
                }
                else if (request.listSpecialisationListEmployeeRemoveDTO.First(x2 => x2.SpecializationId == x.SpecializationId).HaveSpecialist == false)
                {
                    needChangeEnd = true;
                    x.End = new DateTime(2100, 1, 1, 1, 0, 0);
                }
                else
                {
                    UpdateEndTime(x, request.Start);
                }

            });
            var EndWorkDay = request.listEmployeeInJobDTOList.OrderByDescending(x => x.End).First().End;

            if (needChangeEnd == true) EndWorkDay = new DateTime(2100, 1, 1, 1, 0, 0);

            return Tuple.Create(request.listEmployeeInJobDTOList, EndWorkDay);
        }

        public void  UpdateEndTime(EmployeeInJobDTOList employeeInJobDTOList, DateTime start)
        {
            double workAllEmployeeInSpecializationIn1h = 0;
            employeeInJobDTOList.EmployeeInJobList.ForEach(e =>
            {
                workAllEmployeeInSpecializationIn1h += ((double)e.ExperienceValue / 100);
            });

            double allHours = 0;
            double sumWorkAllEmployeeInSpecializationIn1h = 0;

            while (sumWorkAllEmployeeInSpecializationIn1h < employeeInJobDTOList.HoursStart)
            {
                allHours++; //zaokrąglamy powyzej potrzebnego czau
                sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
            }

            int days = (int)allHours / 8;
            int leftHours = (int)allHours % 8;
            if (leftHours != 0) days++; // jeżeli mamy reszte to dodajemy dzień i to ilość godzin pracy w kolejnym dniu

            var jobFunctions = new JobFunctions();
            var newDateEnd = jobFunctions.NewDateEnd(start, days);
            TimeSpan hours = new TimeSpan(0, 0, 0);
            if (leftHours != 0)
            {
                hours = new TimeSpan(7 + leftHours, 0, 0); //dodanie godzin
            }
            else hours = new TimeSpan(15, 0, 0);

            newDateEnd = newDateEnd.Date + hours;
            employeeInJobDTOList.End = newDateEnd;
        }
    }
}
