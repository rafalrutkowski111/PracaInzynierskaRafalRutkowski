using AutoMapper;
using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using inzRafalRutowski.Class;
using inzRafalRutowski.DTO.Job;
using System.Linq;
using System.ComponentModel;
using System;
using System.Diagnostics.Eventing.Reader;
using System.Collections.Generic;
using System.Text.Json;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public JobController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<JobDTO>> GetJobs([FromQuery] int userId)
        {
            var result = _context.Jobs.Where(x=> int.Equals(x.EmployerId, userId)).ToList();
            var resultDTO = _mapper.Map<List<JobDTO>>(result);
            return Ok(resultDTO);
        }

        [HttpGet("GetJob")]
        public ActionResult<JobDTO> GetJob([FromQuery] int jobId) 
        {
            var result = _context.Jobs.FirstOrDefault(x => int.Equals(x.Id, jobId));
            var resultDTO = _mapper.Map<JobDTO>(result);
            return Ok(resultDTO);
        }


        [HttpPost("JobSpecialization")]
        public IActionResult SpecialisationInJob([FromBody] JobSpecializationDTO request)
        {
            var restult = new List<JobSpecializationEmployeeDTO>();
            var employeeDTOListInList = new List<EmployeeSpecializationListDTO>();
            var isOpenModalSpecialization = false;
            var jobFunctions = new JobFunctions();
            var listEmployeeSpecializationListEmplty = new List<string>();

            request.JobSpecialization.ForEach(e =>
            {
                var EmployeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(x => int.Equals(x.SpecializationId, e.SpecializationId)
                && _context.Employees.FirstOrDefault(y => string.Equals(y.Id, x.EmployeeId)).EmployerId == request.EmployerId
                && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, x.ExperienceId)).experienceValue >= 70 // 70 stała waga- średniozaawansowany
                && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == x.EmployeeId)
                && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
                ).EmployerId == request.EmployerId));

                var jobSpecializationEmployee = new JobSpecializationEmployeeDTO();


                jobSpecializationEmployee.SpecializationId = e.SpecializationId;
                jobSpecializationEmployee.SpecializationName = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, e.SpecializationId)).Name;
                if (EmployeeSpecialization != null)
                {
                    jobSpecializationEmployee.Name = _context.Employees.FirstOrDefault(x => x.Id == EmployeeSpecialization.EmployeeId).Name;
                    jobSpecializationEmployee.Surname = _context.Employees.FirstOrDefault(x => x.Id == EmployeeSpecialization.EmployeeId).Surname;
                }
                if (EmployeeSpecialization != null) jobSpecializationEmployee.HaveSpecialist = true;
                else jobSpecializationEmployee.HaveSpecialist = false;
                if (EmployeeSpecialization != null) jobSpecializationEmployee.EmployeeId = EmployeeSpecialization.EmployeeId;

                if (EmployeeSpecialization == null)
                    jobFunctions.AddEmployeeWithoutEmployerToList(e, jobSpecializationEmployee, employeeDTOListInList, _context, listEmployeeSpecializationListEmplty);

                restult.Add(jobSpecializationEmployee);
            });

            return Ok(new
            {
                specializationList = restult,
                isOpenModalSpecialization = isOpenModalSpecialization,
                searchEmployee = employeeDTOListInList,
                listEmployeeSpecializationListEmplty = listEmployeeSpecializationListEmplty
            });
        }

        [HttpPost("JobEmployee")]
        public IActionResult EmployeeInJob([FromBody] ListJobSpecializationEmployeeDTO request)
        {
            request.Start = request.Start.AddDays(1); //dodajemy po dniu, bo zmienila sie data a potrzebujemy poprawnej do obliczeń (wykluczmay weekendy)
            request.End = request.End.AddDays(1);

            DateTime EndWorkDay = request.Start;
            bool CanStartWork = false;
            var listEmployeeSpecialization = new List<EmployeeSpecialization>();

            var specializationsWithHours = request.JobSpecialization;
            List<Employee> listEmployeeFreeInTime;


            if (request.EmployeeWithoutEmployer == true)
            {
                listEmployeeFreeInTime = _context.Employees.Where(e => e.EmployerId == null).ToList();

                List<Employee> listEmployeeFreeInTimeTemp = _context.Employees.Where(e => e.EmployerId == null).ToList(); //zamiast robić głęboką kopie pobrałem to samo
                request.listJobSpecializationEmployeeDTO.ForEach(e => //usunięcie (o ile są) dodani nowi wyspecjalizowani pracownicy
                {
                    listEmployeeFreeInTimeTemp.ForEach(e2 =>
                    {
                        if (e.EmployeeId == e2.Id)
                            listEmployeeFreeInTime.Remove(e2);
                    });
                });
                List<CopyListJobSpecialization> copySpecializationsWithHours = new List<CopyListJobSpecialization>();

                specializationsWithHours.ForEach(x =>
                {
                    copySpecializationsWithHours.Add(new CopyListJobSpecialization(x));
                });

                copySpecializationsWithHours.ForEach(x =>
                {
                    if (x.Hours < 0)
                    {
                        specializationsWithHours.Remove(specializationsWithHours.Find(x2 => x2.SpecializationId == x.SpecializationId));
                    }
                });
                copySpecializationsWithHours.Clear();
            }
            else
            {
                listEmployeeFreeInTime = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
                && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
                && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
                ).EmployerId == request.EmployerId)
                ).ToList();

                request.listJobSpecializationEmployeeDTO.ForEach(e =>
                {
                    if (listEmployeeFreeInTime.FirstOrDefault(e2 => e2.Id == e.EmployeeId) == null)
                    {
                        var newEmployee = new Employee();
                        newEmployee.Name = _context.Employees.First(x => x.Id == e.EmployeeId).Name;
                        newEmployee.Surname = _context.Employees.First(x => x.Id == e.EmployeeId).Surname;
                        newEmployee.Id = (Guid)e.EmployeeId;
                        listEmployeeFreeInTime.Add(newEmployee);
                    }
                });
            }
            var experianceDescending = _context.Experiences.OrderByDescending(x => x.experienceValue).Where(x => int.Equals(x.EmployerId, request.EmployerId) || int.Equals(x.EmployerId, null)).ToList();


            var lastExperianceDescending = experianceDescending.Last();
            var lastSpecializationsWithHours = specializationsWithHours.Last();
            Guid LastEmployeeId = new Guid();

            var jobFunctions = new JobFunctions();
            var numberOfWorkDaysWithWeekend = request.End.Subtract(request.Start).Days;
            var numberOfWorkDays = jobFunctions.NumberOfWorkDays(request.Start, numberOfWorkDaysWithWeekend);
            int hoursWorkInDay = 8;
            double withoutExperience = (double)40 / 100; // 40 stała waga- niedoświadczony

            var listEmployeeInJobDTOList = new List<EmployeeInJobDTOList>();


            request.JobSpecialization.ForEach(x =>
            {
                var employeeInJobDTOlist = new List<EmployeeInJobDTO>();

                var employeeInJobDTOList = new EmployeeInJobDTOList()
                {
                    HoursStart = x.Hours,
                    SpecializationId = x.SpecializationId,
                    SpecializationName = _context.Specializations.First(x2 => x2.Id == x.SpecializationId).Name,
                    End = request.End,
                    EmployeeInJobList = employeeInJobDTOlist
                };

                listEmployeeInJobDTOList.Add(employeeInJobDTOList);
            }
            );

            // można by jakoś posortować listEmployeeFreeInTime, aby algorytm był bardziej dokłądny
            // ogolnie algortm jest niewydajny, słabe podejście robić tyle pętel, program nie jest przystowsowany do dużej ilości danch
            // wypadałoby napisać jakieś zapytanie łączące tabele i sortujące, coś jak w poście wyżej

            listEmployeeFreeInTime.ForEach(e =>
            {
                experianceDescending.ForEach(e2 =>
                {
                    specializationsWithHours.ForEach(e3 =>
                    {
                        var employeeSpecializationList = _context.EmployeeSpecializations.Where(e4 => e4.ExperienceId == e2.Id
                        && e4.SpecializationId == e3.SpecializationId
                        && e4.EmployeeId == e.Id
                        ).ToList();

                        // sprawdzanie czy istnieje najlepsze doswiadczenie z wystepujacych specjalizacji(wyżej), ale
                        // biorąc w przypadku większej ilości tą opcje gdzie jest więcej godzin
                        var specializationMostHoursList = specializationsWithHours.OrderByDescending(x2 => x2.Hours).ToList();
                        EmployeeSpecialization employeeSpecialization = null;
                        specializationMostHoursList.ForEach(x3 =>
                        {
                            if(employeeSpecialization == null)
                            employeeSpecialization = employeeSpecializationList.FirstOrDefault(x4 => x4.SpecializationId == x3.SpecializationId);
                        }
                        );

                        if ((employeeSpecialization == null && e2.Equals(lastExperianceDescending) && e3.Equals(lastSpecializationsWithHours) || employeeSpecialization != null)
                        && LastEmployeeId != e.Id)
                        {
                            var specializationMostHours = specializationsWithHours.OrderByDescending(x => x.Hours).First();

                            if (specializationMostHours.Hours < 0)
                            {
                                employeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(e5 => e5.EmployeeId == e.Id
                               && e5.SpecializationId == specializationMostHours.SpecializationId);
                                if (employeeSpecialization != null)
                                {
                                    var experienceValue = _context.Experiences.FirstOrDefault(x => x.Id == employeeSpecialization.ExperienceId).experienceValue;
                                    var FindIndex = specializationsWithHours.FindIndex(x => int.Equals(x.SpecializationId, specializationMostHours.SpecializationId));
                                    specializationsWithHours[FindIndex].Hours -= (numberOfWorkDays * hoursWorkInDay) * ((double)experienceValue / 100);
                                    listEmployeeSpecialization.Add(employeeSpecialization);

                                    var FindIndexResult = listEmployeeInJobDTOList.FindIndex(x => x.SpecializationId == employeeSpecialization.SpecializationId);
                                    var employeeInJobDTO = new EmployeeInJobDTO();
                                    employeeInJobDTO.EmployeeId = employeeSpecialization.EmployeeId;
                                    employeeInJobDTO.ExperienceValue = experienceValue;
                                    employeeInJobDTO.HoursJob = (numberOfWorkDays * hoursWorkInDay) * ((double)experienceValue / 100);
                                    employeeInJobDTO.Name = e.Name;
                                    employeeInJobDTO.Surname = e.Surname;
                                    employeeInJobDTO.ExperienceName = _context.Experiences.FirstOrDefault(x => x.Id == employeeSpecialization.ExperienceId).experienceName;
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                    listEmployeeInJobDTOList[FindIndexResult].Hours = specializationsWithHours[FindIndex].Hours;

                                    double workAllEmployeeInSpecializationIn1h = 0;
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.ForEach(e =>
                                    {
                                        workAllEmployeeInSpecializationIn1h += ((double)e.ExperienceValue / 100);
                                    });

                                    double allHours = 0;
                                    double sumWorkAllEmployeeInSpecializationIn1h = 0;

                                    while (sumWorkAllEmployeeInSpecializationIn1h < listEmployeeInJobDTOList[FindIndexResult].HoursStart)
                                    {
                                        allHours++;
                                        sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                                    }

                                    int days = (int)allHours / 8;
                                    int leftHours = (int)allHours % 8;
                                    if (leftHours != 0) days++;

                                    var jobFunctions = new JobFunctions();
                                    var newDateEnd = jobFunctions.NewDateEnd(request.Start, days);
                                    TimeSpan hours = new TimeSpan(0, 0, 0);
                                    if (leftHours != 0)
                                    {
                                        hours = new TimeSpan(7 + leftHours, 0, 0); //dodanie godzin
                                    }
                                    else hours = new TimeSpan(15, 0, 0);

                                    newDateEnd = newDateEnd.Date + hours;
                                    listEmployeeInJobDTOList[FindIndexResult].End = newDateEnd;

                                }
                                else
                                {
                                    var FindIndex = specializationsWithHours.FindIndex(x => int.Equals(x.SpecializationId, specializationMostHours.SpecializationId));
                                    specializationsWithHours[FindIndex].Hours -= (numberOfWorkDays * hoursWorkInDay) * withoutExperience;

                                    var employeeSpecializationNew = new EmployeeSpecialization();
                                    employeeSpecializationNew.SpecializationId = specializationMostHours.SpecializationId;
                                    employeeSpecializationNew.EmployeeId = e.Id;
                                    listEmployeeSpecialization.Add(employeeSpecializationNew);

                                    var FindIndexResult = listEmployeeInJobDTOList.FindIndex(x => x.SpecializationId == employeeSpecializationNew.SpecializationId);
                                    var employeeInJobDTO = new EmployeeInJobDTO();
                                    employeeInJobDTO.ExperienceValue = 40;
                                    employeeInJobDTO.EmployeeId = employeeSpecializationNew.EmployeeId;
                                    employeeInJobDTO.HoursJob = (numberOfWorkDays * hoursWorkInDay) * withoutExperience;
                                    employeeInJobDTO.Name = e.Name;
                                    employeeInJobDTO.Surname = e.Surname;
                                    employeeInJobDTO.ExperienceName = "Brak doświadczenia";
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                    listEmployeeInJobDTOList[FindIndexResult].Hours = specializationsWithHours[FindIndex].Hours;

                                    double workAllEmployeeInSpecializationIn1h = 0;
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.ForEach(e =>
                                    {
                                        workAllEmployeeInSpecializationIn1h += ((double)e.ExperienceValue / 100);
                                    });

                                    double allHours = 0;
                                    double sumWorkAllEmployeeInSpecializationIn1h = 0;

                                    while (sumWorkAllEmployeeInSpecializationIn1h < listEmployeeInJobDTOList[FindIndexResult].HoursStart)
                                    {
                                        allHours++;
                                        sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                                    }

                                    int days = (int)allHours / 8;
                                    int leftHours = (int)allHours % 8;
                                    if (leftHours != 0) days++;

                                    var jobFunctions = new JobFunctions();
                                    var newDateEnd = jobFunctions.NewDateEnd(request.Start, days);
                                    TimeSpan hours = new TimeSpan(0, 0, 0);
                                    if (leftHours != 0)
                                    {
                                        hours = new TimeSpan(7 + leftHours, 0, 0);
                                    }
                                    else hours = new TimeSpan(15, 0, 0);

                                    newDateEnd = newDateEnd.Date + hours;
                                    listEmployeeInJobDTOList[FindIndexResult].End = newDateEnd;

                                }
                                var specializationMostHoursTemp = specializationsWithHours.OrderBy(x => x.Hours).First();
                                LastEmployeeId = e.Id;
                            }
                            else if (employeeSpecialization != null)
                            {
                                if (e3.Hours < 0) { LastEmployeeId = new Guid(); }
                                else
                                {
                                    e3.Hours -= (numberOfWorkDays * hoursWorkInDay) * ((double)e2.experienceValue / 100);
                                    listEmployeeSpecialization.Add(employeeSpecialization);

                                    var FindIndexResult = listEmployeeInJobDTOList.FindIndex(x => x.SpecializationId == employeeSpecialization.SpecializationId);
                                    var employeeInJobDTO = new EmployeeInJobDTO();
                                    employeeInJobDTO.EmployeeId = employeeSpecialization.EmployeeId;
                                    employeeInJobDTO.ExperienceValue = e2.experienceValue;
                                    employeeInJobDTO.HoursJob = (numberOfWorkDays * hoursWorkInDay) * ((double)e2.experienceValue / 100);
                                    employeeInJobDTO.Name = e.Name;
                                    employeeInJobDTO.Surname = e.Surname;
                                    employeeInJobDTO.ExperienceName = e2.experienceName;
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                    listEmployeeInJobDTOList[FindIndexResult].Hours = e3.Hours;

                                    double workAllEmployeeInSpecializationIn1h = 0;
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.ForEach(e =>
                                    {
                                        workAllEmployeeInSpecializationIn1h += ((double)e.ExperienceValue / 100);
                                    });

                                    double allHours = 0;
                                    double sumWorkAllEmployeeInSpecializationIn1h = 0;

                                    while (sumWorkAllEmployeeInSpecializationIn1h < listEmployeeInJobDTOList[FindIndexResult].HoursStart)
                                    {
                                        allHours++;
                                        sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                                    }

                                    int days = (int)allHours / 8;
                                    int leftHours = (int)allHours % 8;
                                    if (leftHours != 0) days++;

                                    var jobFunctions = new JobFunctions();
                                    var newDateEnd = jobFunctions.NewDateEnd(request.Start, days);
                                    TimeSpan hours = new TimeSpan(0, 0, 0);
                                    if (leftHours != 0)
                                    {
                                        hours = new TimeSpan(7 + leftHours, 0, 0);
                                    }
                                    else hours = new TimeSpan(15, 0, 0);

                                    newDateEnd = newDateEnd.Date + hours;
                                    listEmployeeInJobDTOList[FindIndexResult].End = newDateEnd;

                                    LastEmployeeId = e.Id;
                                }
                            }
                            else
                            {
                                var FindIndex = specializationsWithHours.FindIndex(x => int.Equals(x.SpecializationId, specializationMostHours.SpecializationId));
                                specializationsWithHours[FindIndex].Hours -= (numberOfWorkDays * hoursWorkInDay) * withoutExperience;

                                var employeeSpecializationNew = new EmployeeSpecialization();
                                employeeSpecializationNew.SpecializationId = specializationsWithHours[FindIndex].SpecializationId;
                                employeeSpecializationNew.EmployeeId = e.Id;
                                listEmployeeSpecialization.Add(employeeSpecializationNew);

                                var FindIndexResult = listEmployeeInJobDTOList.FindIndex(x => x.SpecializationId == employeeSpecializationNew.SpecializationId);
                                var employeeInJobDTO = new EmployeeInJobDTO();
                                employeeInJobDTO.EmployeeId = employeeSpecializationNew.EmployeeId;
                                employeeInJobDTO.ExperienceValue = 40;
                                employeeInJobDTO.HoursJob = (numberOfWorkDays * hoursWorkInDay) * withoutExperience;
                                employeeInJobDTO.Name = e.Name;
                                employeeInJobDTO.Surname = e.Surname;
                                employeeInJobDTO.ExperienceName = "Brak doświadczenia";
                                listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                listEmployeeInJobDTOList[FindIndexResult].Hours = specializationsWithHours[FindIndex].Hours;

                                double workAllEmployeeInSpecializationIn1h = 0;
                                listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.ForEach(e =>
                                {
                                    workAllEmployeeInSpecializationIn1h += ((double)e.ExperienceValue / 100);
                                });

                                double allHours = 0;
                                double sumWorkAllEmployeeInSpecializationIn1h = 0;

                                while (sumWorkAllEmployeeInSpecializationIn1h < listEmployeeInJobDTOList[FindIndexResult].HoursStart)
                                {
                                    allHours++;
                                    sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                                }

                                int days = (int)allHours / 8;
                                int leftHours = (int)allHours % 8;
                                if (leftHours != 0) days++;

                                var jobFunctions = new JobFunctions();
                                var newDateEnd = jobFunctions.NewDateEnd(request.Start, days);
                                TimeSpan hours = new TimeSpan(0, 0, 0);
                                if (leftHours != 0)
                                {
                                    hours = new TimeSpan(7 + leftHours, 0, 0);
                                }
                                else hours = new TimeSpan(15, 0, 0);

                                newDateEnd = newDateEnd.Date + hours;
                                listEmployeeInJobDTOList[FindIndexResult].End = newDateEnd;

                                LastEmployeeId = e.Id;
                            }

                            specializationMostHours = specializationsWithHours.OrderByDescending(x => x.Hours).First();
                            if (specializationMostHours.Hours < 0)
                                CanStartWork = true;

                        }
                    });
                });
            });

            EndWorkDay = listEmployeeInJobDTOList.OrderByDescending(x => x.End).First().End;

            //żeby algorytm był dokładniejszy można ciagle te same dane do niego dawać, zmieniając czas zakończenia o ile ten sie zmienił, wtedy istnieje możliwość,
            // że bęzie dostępnych więcej pracowników. Problem byłby przy usuwaniu pracowników w podsumowaniu (o ile dodam taką opcję), bo za każdym razem będzie
            // bo musielibyśmy sprawdzać czy przy usuwaniu pracownika a dalej pracownik b będzie dostępny jeżei zmieni się czas zakończenia, bo jeżeli nie to 
            // wtedy również pracownik b musiałby być usunięty i wtedy byłoby trzeba sprawdzać czy czasowo praca będzie mogła się odbyć, wypadałboby też dać komunikat o
            // zmianach
            return Ok(new
            {
                ListEmployeeInJob = listEmployeeInJobDTOList,
                CanStartWork = CanStartWork,
                EndWorkDay = EndWorkDay,
                specializationList = specializationsWithHours,
            });
        }


        [HttpPost("UpdateTimeJob")]
        public IActionResult UpdateTimeJob([FromBody] ListEmployeeInJobDTOList request)
        {
            JobFunctions jobFunctions = new JobFunctions();
            var result = jobFunctions.UpdateDateInJob(request);

            return Ok(new
            {
                ListEmployeeInJob = result.Item1,
                EndWorkDay = result.Item2,
            });
        }

        [HttpPost("AddEmployee")]
        public IActionResult AddEmployee([FromBody] ListEmployeeInJobWithEmployerIdDTOList request)
        {
            
            List<EmployeeInJobDTO> EmployeeToAdd = new List<EmployeeInJobDTO>();
            List<Employee> listEmployeeFreeInTime = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
                && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
                && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
                ).EmployerId == request.EmployerId)
                ).ToList();
            List<Employee> listEmployeeWithoutEmployer = _context.Employees.Where(e => e.EmployerId == null).ToList();

            listEmployeeFreeInTime.AddRange(listEmployeeWithoutEmployer);

            var EmployeeInJob = request.listEmployeeInJobDTOList.Find(x=> x.SpecializationId == request.SpecializationId).EmployeeInJobList;

            listEmployeeFreeInTime.ForEach(x =>
            {
                if(EmployeeInJob.Find(x2=> x2.EmployeeId == x.Id) == null)
                {
                    EmployeeInJobDTO employee = new EmployeeInJobDTO();
                    employee.Name = x.Name;
                    employee.Surname = x.Surname;
                    employee.EmployeeId = x.Id;


                    var EmployeeSpecializations = _context.EmployeeSpecializations.FirstOrDefault(x3 => x3.EmployeeId == x.Id && x3.SpecializationId == request.SpecializationId);
                    if(EmployeeSpecializations != null)
                    {
                        employee.ExperienceName = _context.Experiences.First(x3 => x3.Id == EmployeeSpecializations.ExperienceId).experienceName;
                    }
                    else employee.ExperienceName = "Brak doświadczenia";

                    EmployeeToAdd.Add(employee);
                }

            });

            var SpecialializationName = _context.Specializations.FirstOrDefault(x=> x.Id == request.SpecializationId).Name;


            return Ok(new
            {
                SpecialializationName = SpecialializationName,
                EmployeeToAdd = EmployeeToAdd
            });
        }

        [HttpPost("UpdateDataNewEmployee")]
        public IActionResult UpdateDateNewEmployee([FromBody] ListEmployeeInJobWithNewEmployeeDTOList request)
        {
            var experienceIdNewEnployee = _context.EmployeeSpecializations.FirstOrDefault(x => x.SpecializationId == request.SpecializationId && x.EmployeeId == request.Employee.EmployeeId);

            var experiencesName = "Brak doświadczenia";
            var experiencesValue = 40;

            if (experienceIdNewEnployee != null)
            {
                var experiences = _context.Experiences.First(x => x.Id == experienceIdNewEnployee.ExperienceId);
                experiencesName = experiences.experienceName;
                experiencesValue = experiences.experienceValue;
            }
            
            var jobFunctions = new JobFunctions();
            var numberOfWorkDaysWithWeekend = request.End.Subtract(request.Start).Days;
            var numberOfWorkDays = jobFunctions.NumberOfWorkDays(request.Start, numberOfWorkDaysWithWeekend);
            int hoursWorkInDay = 8;

            EmployeeInJobDTO EmployeeInJobDTO = new EmployeeInJobDTO()
            {
                EmployeeId = request.Employee.EmployeeId,
                ExperienceValue = experiencesValue,
                ExperienceName = experiencesName,
                HoursJob = (numberOfWorkDays * hoursWorkInDay) * ((double)experiencesValue / 100),
                Name = request.Employee.Name,
                Surname = request.Employee.Surname,
            };

            request.listEmployeeInJobDTOList.Find(x => x.SpecializationId == request.SpecializationId).EmployeeInJobList.Add(EmployeeInJobDTO);
            request.listEmployeeInJobDTOList.Find(x => x.SpecializationId == request.SpecializationId).Hours -= EmployeeInJobDTO.HoursJob;

            var result = jobFunctions.UpdateDateInJob(request);

            return Ok(new
            {
                ListEmployeeInJob = result.Item1,
                EndWorkDay = result.Item2,
            });
        }

        [HttpPost("addJob")]
        public async Task<IActionResult> AddJob([FromBody] JobDTO request)
        {

            request.Start = request.Start.AddDays(1); // dwa różne systemy dat i trzeba je przekonwertować
            request.End = request.End.AddDays(1);
            request.CurrentEnd = request.CurrentEnd.AddHours(1);

            List<Employee> employeeList= new List<Employee>();

            request.ListEmployeeAddToJob.ForEach(x =>
            {
                x.EmployeeInJobList.ForEach(x2 =>
                {
                    var employee = _context.Employees.FirstOrDefault(x3 => x3.Id == x2.EmployeeId && x3.IsEmployed == false);
                    if (employee != null) employeeList.Add(employee);
                });

            });

            //złe podajście, trzeba przesłać liste pracowników do dodania i tu sprawdzać czy zmiany nie nastąpiły- jakaś tranzakcja, albo badrequest w przed zapisem


                //employeeList.ForEach(async x =>
                //{
                //    var employee = _context.Employees.First(x2 => x2.Id == x.Id);
                //    if (employee.Employer == null && employee.IsEmployed == false)
                //    {
                //        employee.EmployerId = request.EmployerId;
                //        employee.IsEmployed = true;
                //    }
                //});

                //await _context.SaveChangesAsync();



            TimeSpan resetHours = new TimeSpan(8, 0, 0);
            request.Start = request.Start.Date + resetHours;

            var result = _mapper.Map<Job>(request);

            if(request.End.Date == request.CurrentEnd.Date) result.Color = "#3174ad"; //niebieski
            else if(request.End<request.CurrentEnd) result.Color = "#b40000"; //czerwony
            else result.Color = "#388700"; //zielony

            var saveNewJob = _context.Jobs.Add(result);
            await _context.SaveChangesAsync();


            //request.ListEmployeeAddToJob.ForEach(x =>
            //{
            //    //mejbi tu dodawać najpierw osobe odpowiedzialna, a potem na dole sprawdzać po id czy jest i ją pomijać + zrobić idSpecjalizacji żeby łatwo ogarnąć osoby odpowiedzialne za prace
            //    x.EmployeeInJobList.ForEach(x2 =>
            //    {
            //        var jobEmployee = new JobEmployee();

            //        jobEmployee.EmployerId = request.EmployerId;
            //        jobEmployee.EmployeeId = x2.EmployeeId;
            //        jobEmployee.JobId = currentJobId.Id;
            //        jobEmployee.TimeStartJob = request.Start;
            //        jobEmployee.TimeFinishJob = x.End;
            //        if(x.ResponsiblePersonEmployeeId == x2.EmployeeId)
            //            jobEmployee.IsNeed = true;
            //        else 
            //        jobEmployee.IsNeed = false;
            //        _context.JobEmployees.Add(jobEmployee);
            //    });
            //});


            var currentJobId = saveNewJob.Entity.Id;


            var resultJobHistory = _mapper.Map<JobHistory>(request);

            if (request.End.Date == request.CurrentEnd.Date) resultJobHistory.Color = "#3174ad"; //niebieski
            else if (request.End < request.CurrentEnd) resultJobHistory.Color = "#b40000"; //czerwony
            else resultJobHistory.Color = "#388700"; //zielony
            DateTime currentDateTime = DateTime.Now;
            resultJobHistory.TimeAddHistory = currentDateTime;
            resultJobHistory.Job = _context.Jobs.FirstOrDefault(x => x.Id == currentJobId);


            _context.JobHistorys.Add(resultJobHistory);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("editJob")]
        public async Task<IActionResult> EditJob([FromBody] JobDTO request)
        {
            // jak sie potem dokonczy AddJob, tu trzeba dodać to samo(brakuje przypisywania pracowników do pracy)

            request.Start = request.Start.AddDays(1); // dwa różne systemy dat i trzeba je przekonwertować
            request.End = request.End.AddDays(1);
            request.CurrentEnd = request.CurrentEnd.AddHours(1);

            List<Employee> employeeList = new List<Employee>();

            request.ListEmployeeAddToJob.ForEach(x =>
            {
                x.EmployeeInJobList.ForEach(x2 =>
                {
                    var employee = _context.Employees.FirstOrDefault(x3 => x3.Id == x2.EmployeeId && x3.IsEmployed == false);
                    if (employee != null) employeeList.Add(employee);
                });

            });

            TimeSpan resetHours = new TimeSpan(8, 00, 0);
            request.Start = request.Start.Date + resetHours;

            var result = _mapper.Map<Job>(request);

            if (request.End.Date == request.CurrentEnd.Date) result.Color = "#3174ad"; //niebieski
            else if (request.End < request.CurrentEnd) result.Color = "#b40000"; //czerwony
            else result.Color = "#388700"; //zielony



            var jobEdit = _context.Jobs.First(x => int.Equals(x.Id, request.JobId));

            result.Id = (int)request.JobId;

            _mapper.Map(result, jobEdit);

            await _context.SaveChangesAsync();




            var currentJobId = request.JobId;

            var resultJobHistory = _mapper.Map<JobHistory>(request);

            if (request.End.Date == request.CurrentEnd.Date) resultJobHistory.Color = "#3174ad"; //niebieski
            else if (request.End < request.CurrentEnd) resultJobHistory.Color = "#b40000"; //czerwony
            else resultJobHistory.Color = "#388700"; //zielony
            DateTime currentDateTime = DateTime.Now;
            resultJobHistory.TimeAddHistory = currentDateTime;
            resultJobHistory.Job = _context.Jobs.FirstOrDefault(x => x.Id == currentJobId);


            _context.JobHistorys.Add(resultJobHistory);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("GetLastUpdate")]
        public ActionResult<JobHistory> GetLastUpdate([FromQuery] int jobId)
        {
            var result = _context.JobHistorys.OrderByDescending(x => x.TimeAddHistory).Where(x => int.Equals(x.JobId, jobId)).First();
            var resultDTO = _mapper.Map<JobHistory>(result);
            return Ok(resultDTO);
        }
    }
}
