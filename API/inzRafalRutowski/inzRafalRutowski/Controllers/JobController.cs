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
using System.Xml.XPath;
using Azure.Core;

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
            var result = _context.Jobs.Where(x => int.Equals(x.EmployerId, userId)).ToList();
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
            if(request.IsUpdate == false)
            {
                request.Start = request.Start.AddDays(1); //dodajemy po dniu, bo zmienila sie data a potrzebujemy poprawnej do obliczeń
                request.End = request.End.AddDays(1);
            }

            var restult = new List<JobSpecializationEmployeeDTO>();
            var employeeDTOListInList = new List<EmployeeSpecializationListDTO>();
            var isOpenModalSpecialization = false;
            var jobFunctions = new JobFunctions();
            var listEmployeeSpecializationListEmplty = new List<string>();

            request.JobSpecialization.ForEach(e =>
            {
                EmployeeSpecialization? EmployeeSpecialization;

                if (request.IsUpdate == true)
                {
                    EmployeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(x => int.Equals(x.SpecializationId, e.SpecializationId)
                    && _context.Employees.FirstOrDefault(y => string.Equals(y.Id, x.EmployeeId)).EmployerId == request.EmployerId
                    && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, x.ExperienceId)).experienceValue >= 70 // 70 stała waga- średniozaawansowany
                    && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == x.EmployeeId)
                    && ((y.TimeStartJob.Date >= request.Start.Date && y.TimeStartJob.Date <= request.End.Date && y.JobId != request.JobId) ||
                    (y.TimeFinishJob.Date >= request.Start.Date && y.TimeFinishJob.Date <= request.End.Date && y.JobId != request.JobId))
                    ).EmployerId == request.EmployerId));
                }
                else
                {
                    EmployeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(x => int.Equals(x.SpecializationId, e.SpecializationId)
                    && _context.Employees.FirstOrDefault(y => string.Equals(y.Id, x.EmployeeId)).EmployerId == request.EmployerId
                    && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, x.ExperienceId)).experienceValue >= 70 // 70 stała waga- średniozaawansowany
                    && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == x.EmployeeId)
                    && ((y.TimeStartJob.Date >= request.Start.Date && y.TimeStartJob.Date <= request.End.Date) ||
                    (y.TimeFinishJob.Date >= request.Start.Date && y.TimeFinishJob.Date <= request.End.Date))
                    ).EmployerId == request.EmployerId));
                }


                var jobSpecializationEmployee = new JobSpecializationEmployeeDTO();


                jobSpecializationEmployee.SpecializationId = e.SpecializationId;
                jobSpecializationEmployee.SpecializationName = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, e.SpecializationId)).Name;
                if (EmployeeSpecialization != null)
                {
                    jobSpecializationEmployee.Name = _context.Employees.FirstOrDefault(x => x.Id == EmployeeSpecialization.EmployeeId).Name;
                    jobSpecializationEmployee.Surname = _context.Employees.FirstOrDefault(x => x.Id == EmployeeSpecialization.EmployeeId).Surname;
                }
                else
                {
                    jobSpecializationEmployee.Name = "Brak";
                    jobSpecializationEmployee.Surname = "";

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

            if (request.IsUpdate == true)
            {
                request.ListEmployeeAddToJob.ForEach(x => // zmiana pobranych wartościu hours na te które zmieniliśmy
                {
                    x.HoursStart = (int)request.JobSpecialization.Find(x2 => x2.SpecializationId == x.SpecializationId).Hours;
                });

                request.ListEmployeeAddToJob.ForEach(x =>
                {
                    var specializationToChange = request.JobSpecialization.FirstOrDefault(x2 => int.Equals(x2.SpecializationId, x.SpecializationId));
                    if (specializationToChange != null)
                    {
                        specializationToChange.Hours -= (double)x.FinishWorkHours;
                    }

                });
                if (request.Start.DayOfWeek == DayOfWeek.Saturday) request.Start.AddDays(2); //jeżeli edytujemy w weekend zmieniamy start na poneidizałek
                if (request.Start.DayOfWeek == DayOfWeek.Sunday) request.Start.AddDays(1);

                request.End = request.End.AddDays(1); //dodajemy dzień bo wlicza się włącznie ostatni a zrobiłem obliczenia nie uwzlędniajac go
            }
            else
            {
                request.Start = request.Start.AddDays(1); //dodajemy po dniu, bo zmienila sie data a potrzebujemy poprawnej do obliczeń (wykluczmay weekendy)
                request.End = request.End.AddDays(2);
            }

            List<ListJobSpecialization> updateJobSpecialization = new List<ListJobSpecialization>();

            request.JobSpecialization.ForEach(x => //wykluczanie przerobionej specjalizajci
            {
                if (x.Hours > 0.5)
                    updateJobSpecialization.Add(x);
            });

            request.JobSpecialization = updateJobSpecialization;

            DateTime EndWorkDay = request.Start;
            bool CanStartWork = false;

            var specializationsWithHours = request.JobSpecialization;



            List<Employee> listEmployeeFreeInTime = new List<Employee>();

            if (request.JustEdit == true) // tylko edycja czyli uwzględniamy tylko tych pracowników którzy byli wcześniej
            {
                request.listJobSpecializationEmployeeDTO.ForEach(e =>
                {
                    if (e.EmployeeId != null)
                    {
                        var newEmployee = new Employee();
                        newEmployee.Name = _context.Employees.First(x => x.Id == e.EmployeeId).Name;
                        newEmployee.Surname = _context.Employees.First(x => x.Id == e.EmployeeId).Surname;
                        newEmployee.Id = (Guid)e.EmployeeId;
                        listEmployeeFreeInTime.Add(newEmployee);
                    }
                });

                request.ListEmployeeAddToJob.ForEach(e =>
                {
                    e.EmployeeInJobList.ForEach(e2 =>
                    {
                        if (listEmployeeFreeInTime.FirstOrDefault(e3 => e3.Id == e2.EmployeeId) == null) // jeżeli nie ma specjalisty w tej liście to dodać (nowy dodany)
                        {
                            var newEmployee = new Employee();
                            newEmployee.Name = e2.Name;
                            newEmployee.Surname = e2.Surname;
                            newEmployee.Id = (Guid)e2.EmployeeId;
                            listEmployeeFreeInTime.Add(newEmployee);
                        }

                    });
                });
            }
            else if (request.EmployeeWithoutEmployer == true) //chcemy znaleść wolnych praconików których nie dodaliśmy
            {

                var listEmployeeFreeInTimeFromAnotherTable = _context.EmployeeWithoutEmployers.Where(e => e.IsEmployed == false).ToList();

                listEmployeeFreeInTimeFromAnotherTable.ForEach(x =>
                {
                    var newEmploye = new Employee()
                    {
                        Name = x.Name,
                        Surname = x.Surname,
                        Id = x.Id
                    };
                    listEmployeeFreeInTime.Add(newEmploye);
                });

                List<EmployeeWithoutEmployer> listEmployeeFreeInTimeTemp = _context.EmployeeWithoutEmployers.Where(e => e.IsEmployed == false).ToList(); //zamiast robić głęboką kopie pobrałem to samo
                request.listJobSpecializationEmployeeDTO.ForEach(e => //usunięcie (o ile są) dodani nowi wyspecjalizowani pracownicy, aby ponownie ich nie dodać
                {
                    listEmployeeFreeInTimeTemp.ForEach(e2 =>
                    {
                        if (e.EmployeeId == e2.Id)
                        {
                            listEmployeeFreeInTime.Remove(listEmployeeFreeInTime.Find(e3 => Guid.Equals(e3.Id, e.EmployeeId)));
                        }
                    });
                });
                List<CopyListJobSpecialization> copySpecializationsWithHours = new List<CopyListJobSpecialization>();

                specializationsWithHours.ForEach(x =>
                {
                    copySpecializationsWithHours.Add(new CopyListJobSpecialization(x));
                });

                copySpecializationsWithHours.ForEach(x =>
                {
                    if (x.Hours < 0) //uwzględniamy poprzednie oblcizenia, daltego może sie zdażyć że jakaś specjalizacja jest obliczony i pomojamy go
                    {
                        specializationsWithHours.Remove(specializationsWithHours.Find(x2 => x2.SpecializationId == x.SpecializationId));
                    }
                });
                copySpecializationsWithHours.Clear();
            }
            else //normalne podejście
            {
                var freeEmployeeFromDB = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
                && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
                && ((y.TimeStartJob.Date >= request.Start.Date && y.TimeStartJob.Date <= request.End.Date) ||
                (y.TimeFinishJob.Date >= request.Start.Date && y.TimeFinishJob.Date <= request.End.Date))
                ).EmployerId == request.EmployerId)
                ).ToList(); //wolni pracownicy w tym czasie

                request.listJobSpecializationEmployeeDTO.ForEach(e =>
                {
                    var newEmployee = new Employee();

                    if (_context.Employees.FirstOrDefault(x => x.Id == e.EmployeeId) == null)
                    {
                        newEmployee.Name = _context.EmployeeWithoutEmployers.First(x => Guid.Equals(x.Id, e.EmployeeId)).Name;
                        newEmployee.Surname = _context.EmployeeWithoutEmployers.First(x => Guid.Equals(x.Id, e.EmployeeId)).Surname;
                    }
                    else
                    {
                        newEmployee.Name = _context.Employees.First(x => x.Id == e.EmployeeId).Name;
                        newEmployee.Surname = _context.Employees.First(x => x.Id == e.EmployeeId).Surname;
                    }
                    newEmployee.Id = (Guid)e.EmployeeId;

                    listEmployeeFreeInTime.Add(newEmployee);
                });

                freeEmployeeFromDB.ForEach(e =>
                {
                    if (listEmployeeFreeInTime.FirstOrDefault(e2 => e2.Id == e.Id) == null) // jeżeli nie ma specjalisty w tej liście to dodać (nowy dodany)
                    {
                        listEmployeeFreeInTime.Add(e);
                    }
                });

                if (request.IsUpdate == true) //to powinno działać, ale sprawdzić potem jak będziemy zapisywać uzytownikow
                {
                    request.ListEmployeeAddToJob.ForEach(e =>
                    {
                        e.EmployeeInJobList.ForEach(e2 =>
                        {
                            if (listEmployeeFreeInTime.FirstOrDefault(e3 => e3.Id == e2.EmployeeId) == null)
                            {
                                var newEmployee = new Employee();
                                newEmployee.Name = e2.Name;
                                newEmployee.Surname = e2.Surname;
                                newEmployee.Id = (Guid)e2.EmployeeId;
                                listEmployeeFreeInTime.Add(newEmployee);
                            }
                        });
                    });
                }
            }

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

            // lepszym podejściem byłaby pętla while która by się wykonywała listEmployeeFreeInTime.lenght razy, przy czym z listy byłby brany najbardziej odpowiedni kandytat
            // który byłby wybierany na podstawie poniższych wyliczeń (wiemy dla której specjalizacji trzeba dodać osobę). Wiedząc do jakiej specjalizacji trzeba dodać kandytata wybrałoby się
            // z najwiekszym doświadczeniem, wprowadziło do algorytmu, a na końcu usuneło z listy.

            listEmployeeFreeInTime.ForEach(e =>
            {
                var employeeSpecializationList = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, e.Id)).ToList();

                List<EmployeeWithoutEmployerSpecialization>? employeeSpecializationListListToAdd;
                if (request.EmployeeWithoutEmployer == true)
                {
                    employeeSpecializationListListToAdd = _context.EmployeeWithoutEmployerSpecializations.Where(e2 => Guid.Equals(e2.EmployeeWithoutEmployerId, e.Id)).ToList();

                    if (employeeSpecializationListListToAdd != null)
                        employeeSpecializationListListToAdd.ForEach(x =>
                        {
                            EmployeeSpecialization employeeSpecialization = new EmployeeSpecialization()
                            {
                                EmployeeId = x.EmployeeWithoutEmployerId,
                                SpecializationId = x.SpecializationId,
                                ExperienceId = x.ExperienceId
                            };
                            employeeSpecializationList.Add(employeeSpecialization);
                        });
                }


                // sprawdzanie czy istnieje najlepsze doswiadczenie z wystepujacych specjalizacji dla danego pracownika(wyżej lista), ale
                // szukamy dla tych specjalizacji dla których liczba Hours jest dodatnia, chya że nie ma takich, to szukamy najlepszego doświadczenia,
                // o ile istnieje, ale TYLKO dla spacjalizacji z najwiekszą ilością godzin.
                // Jeżeli spośród szukanych doświadczeń (chodzi o 1 przypadek) dwie, lub więcj mają tą samą wartość to bierzemy tą który ma najwięcej godzin.
                var specializationMostHoursList = specializationsWithHours.OrderByDescending(x2 => x2.Hours).ToList();
                EmployeeSpecialization? employeeSpecialization = null;
                bool hoursNonNegative = false;

                if (specializationMostHoursList.First().Hours > 0)
                    hoursNonNegative = true;


                if (hoursNonNegative)
                {
                    specializationMostHoursList.ForEach(x =>
                    {
                        var employeeSpecializationTemp = employeeSpecializationList.FirstOrDefault(x2 => int.Equals(x2.SpecializationId, x.SpecializationId));

                        if (employeeSpecialization != null && employeeSpecializationTemp != null)
                        {
                            if(_context.Experiences.First(x2 => int.Equals(x2.Id, employeeSpecializationTemp.ExperienceId)).experienceValue >
                            _context.Experiences.First(x2 => int.Equals(x2.Id, employeeSpecialization.ExperienceId)).experienceValue)
                                employeeSpecialization = employeeSpecializationTemp;

                        }
                        else if (employeeSpecialization != null && employeeSpecializationTemp == null)
                        {
                            // else if wykona się, kiedy już mamy specjalizację, ale kolejny aktualny obiekt z listy nie ma specjalizacji, więc nic nie obliczamy
                        }
                        else
                            employeeSpecialization = employeeSpecializationTemp;
                    });
                }
                else
                    employeeSpecialization = employeeSpecializationList.FirstOrDefault(x2 => int.Equals(x2.SpecializationId, specializationMostHoursList.First().SpecializationId));


                Experience currentEmployeeExperiance = new Experience();
                ListJobSpecialization currentEmployeeSpecialization = new ListJobSpecialization();
                if (employeeSpecialization != null)
                {
                    currentEmployeeExperiance = _context.Experiences.First(x => int.Equals(x.Id, employeeSpecialization.ExperienceId));
                    currentEmployeeSpecialization = specializationsWithHours.First(x => int.Equals(x.SpecializationId, employeeSpecialization.SpecializationId));
                }
                

                if (employeeSpecialization != null)
                {
                    currentEmployeeSpecialization.Hours -= (numberOfWorkDays * hoursWorkInDay) * ((double)currentEmployeeExperiance.experienceValue / 100);

                    var FindIndexResult = listEmployeeInJobDTOList.FindIndex(x => x.SpecializationId == employeeSpecialization.SpecializationId);
                    var employeeInJobDTO = new EmployeeInJobDTO();
                    employeeInJobDTO.EmployeeId = employeeSpecialization.EmployeeId;
                    employeeInJobDTO.ExperienceValue = currentEmployeeExperiance.experienceValue;
                    employeeInJobDTO.HoursJob = (numberOfWorkDays * hoursWorkInDay) * ((double)currentEmployeeExperiance.experienceValue / 100);
                    employeeInJobDTO.Name = e.Name;
                    employeeInJobDTO.Surname = e.Surname;
                    employeeInJobDTO.ExperienceName = currentEmployeeExperiance.experienceName;
                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);

                    listEmployeeInJobDTOList[FindIndexResult].Hours = currentEmployeeSpecialization.Hours;

                    JobFunctions jobFunctions = new JobFunctions();
                    jobFunctions.UpdateEndTime(listEmployeeInJobDTOList[FindIndexResult], request.Start);
                }
                else
                {
                    var specializationMostHours = specializationsWithHours.OrderByDescending(x => x.Hours).First();

                    var FindIndex = specializationsWithHours.FindIndex(x => int.Equals(x.SpecializationId, specializationMostHours.SpecializationId));
                    specializationsWithHours[FindIndex].Hours -= (numberOfWorkDays * hoursWorkInDay) * withoutExperience;

                    var employeeSpecializationNew = new EmployeeSpecialization();
                    employeeSpecializationNew.SpecializationId = specializationsWithHours[FindIndex].SpecializationId;
                    employeeSpecializationNew.EmployeeId = e.Id;

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

                    JobFunctions jobFunctions = new JobFunctions();
                    jobFunctions.UpdateEndTime(listEmployeeInJobDTOList[FindIndexResult], request.Start);
                }

            });


            EndWorkDay = listEmployeeInJobDTOList.OrderByDescending(x => x.End).First().End;

            if (EndWorkDay.Date < request.End.Date)
                CanStartWork = true;

            if (request.JustEdit == true)
                CanStartWork = true;

            // zmieniamy dane na takie jak były przy wprowadzeniu. Trzeba je przywrócić, ponieważ w dalszych obliczenaich się do nich odwołuje
            if (request.IsUpdate == true)
            {
                request.ListEmployeeAddToJob.ForEach(x =>
                {
                    var updateList = listEmployeeInJobDTOList.FirstOrDefault(x2 => x2.SpecializationId == x.SpecializationId);
                    if (updateList != null)
                    {
                        updateList.HoursStart = x.HoursStart;
                    }
                });

                request.Start = (DateTime)request.RealStart;
            }


            return Ok(new
            {
                start = request.Start,
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

        [HttpPost("EmployeeToAdd")]
        public IActionResult EmployeeToAdd([FromBody] ListEmployeeInJobWithEmployerIdDTOList request)
        {

            var EmployeeToAdd = new List<EmployeeInJobDTO>();
            var EmployeeWithoutEmployerToAdd = new List<EmployeeInJobDTO>();
            var SpecialializationName = _context.Specializations.FirstOrDefault(x => x.Id == request.SpecializationId).Name;
            var EmployeeInJob = request.listEmployeeInJobDTOList.Find(x => x.SpecializationId == request.SpecializationId).EmployeeInJobList;


            //lista naszych wolnych pracowników
            List<Employee> listEmployeeFreeInTime = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
                && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
                && ((y.TimeStartJob.Date >= request.Start.Date && y.TimeStartJob.Date <= request.End.Date) ||
                (y.TimeFinishJob.Date >= request.Start.Date && y.TimeFinishJob.Date <= request.End.Date))
                ).EmployerId == request.EmployerId)
                ).ToList();

            if (listEmployeeFreeInTime != null)
                listEmployeeFreeInTime.ForEach(x =>
                {
                    if (EmployeeInJob.Find(x2 => x2.EmployeeId == x.Id) == null)
                    {
                        EmployeeInJobDTO employee = new EmployeeInJobDTO()
                        {
                            Name = x.Name,
                            Surname = x.Surname,
                            EmployeeId = x.Id
                        };

                        var EmployeeSpecializations = _context.EmployeeSpecializations.FirstOrDefault(x3 => x3.EmployeeId == x.Id && x3.SpecializationId == request.SpecializationId);
                        if (EmployeeSpecializations != null)
                        {
                            employee.ExperienceName = _context.Experiences.First(x3 => x3.Id == EmployeeSpecializations.ExperienceId).experienceName;
                        }
                        else employee.ExperienceName = "Brak doświadczenia";

                        EmployeeToAdd.Add(employee);
                    }

                });

            //lista pracowników szuakjacych pracy
            List<EmployeeWithoutEmployer> listEmployeeWithoutEmployer = _context.EmployeeWithoutEmployers.Where(e => e.IsEmployed == false).ToList();

            if (listEmployeeWithoutEmployer != null)
                listEmployeeWithoutEmployer.ForEach(x =>
                {
                    if (EmployeeInJob.Find(x2 => x2.EmployeeId == x.Id) == null)
                    {
                        EmployeeInJobDTO employee = new EmployeeInJobDTO()
                        {
                            Name = x.Name,
                            Surname = x.Surname,
                            EmployeeId = x.Id
                        };

                        var EmployeeSpecializations = _context.EmployeeWithoutEmployerSpecializations
                            .FirstOrDefault(x3 => x3.EmployeeWithoutEmployerId == x.Id && x3.SpecializationId == request.SpecializationId);
                        if (EmployeeSpecializations != null)
                        {
                            employee.ExperienceName = _context.Experiences.First(x3 => x3.Id == EmployeeSpecializations.ExperienceId).experienceName;
                        }
                        else employee.ExperienceName = "Brak doświadczenia";

                        EmployeeWithoutEmployerToAdd.Add(employee);
                    }
                });



            return Ok(new
            {
                SpecialializationName = SpecialializationName,
                EmployeeToAdd = EmployeeToAdd,
                EmployeeWithoutEmployerToAdd = EmployeeWithoutEmployerToAdd
            });
        }

        [HttpPost("UpdateDataNewEmployee")]
        public IActionResult UpdateDateNewEmployee([FromBody] ListEmployeeInJobWithNewEmployeeDTOList request)
        {
            var experienceIdNewEnployee = _context.EmployeeSpecializations.FirstOrDefault(x => x.SpecializationId == request.SpecializationId && x.EmployeeId == request.Employee.EmployeeId);
            var experienceIdNewEnployeeWithoutEmployer = _context.EmployeeWithoutEmployerSpecializations.FirstOrDefault(x => x.SpecializationId == request.SpecializationId && x.EmployeeWithoutEmployerId == request.Employee.EmployeeId);

            var experiencesName = "Brak doświadczenia";
            var experiencesValue = 40;

            if (experienceIdNewEnployee != null && request.Employee.IsEmployed == true)
            {
                var experiences = _context.Experiences.First(x => x.Id == experienceIdNewEnployee.ExperienceId);
                experiencesName = experiences.experienceName;
                experiencesValue = experiences.experienceValue;
            }
            else if (experienceIdNewEnployeeWithoutEmployer != null && request.Employee.IsEmployed == false)
            {
                var experiences = _context.Experiences.First(x => x.Id == experienceIdNewEnployeeWithoutEmployer.ExperienceId);
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
                IsEmployed = request.Employee.IsEmployed,
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

            //dodajemy wszystkich pracowników do jednej lsity
            List<Employee> employeeList = new List<Employee>();
            request.ListEmployeeAddToJob.ForEach(x =>
            {
                x.EmployeeInJobList.ForEach(x2 =>
                {
                    var employee = _context.Employees.FirstOrDefault(x3 => Guid.Equals(x3.Id, x2.EmployeeId));
                    if (employee != null) employeeList.Add(employee);
                    else
                    {
                        var employeeWithoutEmployer = _context.EmployeeWithoutEmployers.FirstOrDefault(x3 => Guid.Equals(x3.Id, x2.EmployeeId));
                        if (employeeWithoutEmployer != null) // jakby w czasie robienia pracy użytkowni by usuną konto to by nie znalazło go, niżej powinno być sprawdzenie tego
                        {
                            Employee empployeToAdd = new Employee()
                            {
                                Id = employeeWithoutEmployer.Id,
                                Name = employeeWithoutEmployer.Name,
                                Surname = employeeWithoutEmployer.Surname,
                            };
                            employeeList.Add(empployeToAdd);
                        }
                    }
                });
            });

            //złe podajście. Poprwanie - tranzakcjia dla dodania nowych pracowników sprawdzając czy podczas procesu tworzenia pracy nie zmieniła się ich dostępność i niepowodzenie badrequest

            //dodamy niezatrudnionych pracwoników(z 1 tabeli przeniesiemy do drugiej to samo z specjalizacjami)
            EmployeeController employeeController = new EmployeeController(_context);
            employeeList.ForEach(x =>
            {
                var employee = _context.EmployeeWithoutEmployers.FirstOrDefault(x2 => Guid.Equals(x2.Id , x.Id)  && bool.Equals(x2.IsEmployed, false));
                if (employee != null)
                {
                    employeeController.AddEmployeeToEmployer(employee.Id, request.EmployerId);
                }
            });


            TimeSpan resetHours = new TimeSpan(8, 0, 0);
            request.Start = request.Start.Date + resetHours;

            var result = _mapper.Map<Job>(request);

            if (request.End.Date == request.CurrentEnd.Date) result.Color = "#3174ad"; //niebieski
            else if (request.End < request.CurrentEnd) result.Color = "#b40000"; //czerwony
            else result.Color = "#388700"; //zielony

            var saveNewJob = _context.Jobs.Add(result);
            await _context.SaveChangesAsync();

            var currentJobId = saveNewJob.Entity.Id;

            //powiązanie pracowników z pracą
            request.ListEmployeeAddToJob.ForEach(x =>
            {
                x.EmployeeInJobList.ForEach(x2 =>
                {
                    var jobEmployee = new JobEmployee();

                    jobEmployee.EmployerId = request.EmployerId;
                    jobEmployee.EmployeeId = x2.EmployeeId;
                    jobEmployee.JobId = currentJobId;
                    jobEmployee.TimeStartJob = request.Start;
                    jobEmployee.TimeFinishJob = x.End;
                    if (x.ResponsiblePersonEmployeeId == x2.EmployeeId)
                        jobEmployee.IsNeed = true;
                    else
                        jobEmployee.IsNeed = false;
                    _context.JobEmployees.Add(jobEmployee);
                });
            });


            //poniżej dodajemy zmiany do histtori 
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
            // przy edycji trzeba usunąć wszystkich jobemployee i dodać nowych, ablo dodać do dnia disiejszego i od dnia dzisiejszego zacząć

            request.CurrentEnd = request.CurrentEnd.AddHours(1);



            List<Employee> employeeList = new List<Employee>();
            request.ListEmployeeAddToJob.ForEach(x =>
            {
                x.EmployeeInJobList.ForEach(x2 =>
                {
                    var employee = _context.Employees.FirstOrDefault(x3 => Guid.Equals(x3.Id, x2.EmployeeId));
                    if (employee != null) employeeList.Add(employee);
                    else
                    {
                        var employeeWithoutEmployer = _context.EmployeeWithoutEmployers.FirstOrDefault(x3 => Guid.Equals(x3.Id, x2.EmployeeId));
                        if (employeeWithoutEmployer != null) // jakby w czasie robienia pracy użytkowni by usuną konto to by nie znalazło go, niżej powinno być sprawdzenie tego
                        {
                            Employee empployeToAdd = new Employee()
                            {
                                Id = employeeWithoutEmployer.Id,
                                Name = employeeWithoutEmployer.Name,
                                Surname = employeeWithoutEmployer.Surname,
                            };
                            employeeList.Add(empployeToAdd);
                        }
                    }
                });
            });

            EmployeeController employeeController = new EmployeeController(_context);
            employeeList.ForEach(x =>
            {
                var employee = _context.EmployeeWithoutEmployers.FirstOrDefault(x2 => Guid.Equals(x2.Id, x.Id) && bool.Equals(x2.IsEmployed, false));
                if (employee != null)
                {
                    employeeController.AddEmployeeToEmployer(employee.Id, request.EmployerId);
                }
            });

            TimeSpan resetHours = new TimeSpan(8, 00, 0);
            request.Start = request.Start.Date + resetHours;

            var result = _mapper.Map<Job>(request);

            if (request.End.Date == request.CurrentEnd.Date) result.Color = "#3174ad"; //niebieski
            else if (request.CurrentEnd.Date.Year == 2100) result.Color = "#000000"; // czarny
            else if (request.End < request.CurrentEnd) result.Color = "#b40000"; //czerwony
            else result.Color = "#388700"; //zielony



            var jobEdit = _context.Jobs.First(x => int.Equals(x.Id, request.JobId));

            result.Id = (int)request.JobId;

            _mapper.Map(result, jobEdit);

            await _context.SaveChangesAsync();


            var currentJobId = request.JobId;

            //usuwamy poprzednie powiązanie
            var jobEmployeListRemove = _context.JobEmployees.Where(x => int.Equals(x.JobId, request.JobId)).ToList();

            jobEmployeListRemove.ForEach(x =>
            {
                _context.JobEmployees.Remove(x);
            });
            await _context.SaveChangesAsync();

            //powiązanie pracowników z pracą
            request.ListEmployeeAddToJob.ForEach(x =>
            {
                x.EmployeeInJobList.ForEach(x2 =>
                {
                    var jobEmployee = new JobEmployee();

                    jobEmployee.EmployerId = request.EmployerId;
                    jobEmployee.EmployeeId = x2.EmployeeId;
                    jobEmployee.JobId = (int)currentJobId;
                    jobEmployee.TimeStartJob = request.Start;
                    jobEmployee.TimeFinishJob = x.End;
                    if (x.ResponsiblePersonEmployeeId == x2.EmployeeId)
                        jobEmployee.IsNeed = true;
                    else
                        jobEmployee.IsNeed = false;
                    _context.JobEmployees.Add(jobEmployee);
                });
            });


            var resultJobHistory = _mapper.Map<JobHistory>(request);

            if (request.End.Date == request.CurrentEnd.Date) resultJobHistory.Color = "#3174ad"; //niebieski
            else if (request.CurrentEnd.Date.Year == 2100) result.Color = "#000000"; // czarny
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
            var resultDTO = _mapper.Map<JobDTO>(result);
            return Ok(resultDTO);
        }

        [HttpGet("GetAllUpdate")]
        public ActionResult<List<JobHistory>> GetAllUpdate([FromQuery] int jobId)
        {
            var result = _context.JobHistorys.Where(x => int.Equals(x.JobId, jobId)).ToList();

            var resultDTO = new List<JobDTO>();
            result.ForEach(x =>
            {
                resultDTO.Add(_mapper.Map<JobDTO>(x));
            });
            return Ok(resultDTO);
        }
    }
}
