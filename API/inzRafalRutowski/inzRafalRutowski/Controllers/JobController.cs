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
        public ActionResult<List<JobDTO>> GetJobs()
        {
            var restult = _context.Jobs.ToList();

            var resultDTO = _mapper.Map<List<JobDTO>>(restult);

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
                var SmployeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(x => int.Equals(x.SpecializationId, e.SpecializationId)
                && _context.Employees.FirstOrDefault(y => string.Equals(y.Id, x.EmployeeId)).EmployerId == request.EmployerId
                && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, x.ExperienceId)).experienceValue >= 70 // 70 stała waga- średniozaawansowany
                && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == x.EmployeeId)
                && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
                ).EmployerId == request.EmployerId));

                var jobSpecializationEmployee = new JobSpecializationEmployeeDTO();


                jobSpecializationEmployee.SpecializationId = e.SpecializationId;
                jobSpecializationEmployee.SpecializationName = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, e.SpecializationId)).Name;

                if (SmployeeSpecialization == null) isOpenModalSpecialization = true;

                if (SmployeeSpecialization != null) jobSpecializationEmployee.HaveSpecialist = true;
                else jobSpecializationEmployee.HaveSpecialist = false;
                if (SmployeeSpecialization != null) jobSpecializationEmployee.EmployeeId = SmployeeSpecialization.EmployeeId;

                if (SmployeeSpecialization == null)
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
            // będe musiał jeszcze raz zrobić obliczenia w przypadku jeżeli zabraknie pracowników i sprawdzić czy po dodaniu wszystkich pracowników bez pracodawców 
            // będzie możliwe utworzenie pracy. Może dodam w request kolejną zmienna bool i jeżeli będzie true (w 2 przypadku) do listy bedziemy dodawać jeszcze liste wszystkich
            // wolnych pracowników (teraz dodajemy liste praconików + liste odanych wyspecjalizowanych pracowników o ile tacy są)
            // zwracamy boola czy da się zrobić prace czy nie a potem na froncie robimy liste z możliwościądodania i zmniejszania się czasu itd.
            // jak w każdej specjalizacji zejdziemy z brakujacego czasu bedziemy mogli dodać prace i koniecccccccjkgwshdakljASYDFGOAsjldygAJLGSHDalfgyjshd
            // koniec w senssie trzeba zapisać wszystko to co wczeniej się przechowuje, najlepiej przez tranzacje

            DateTime EndWorkDay;
            int EndWorkHours;
            bool CanStartWork = false;
            var listEmployeeSpecialization = new List<EmployeeSpecialization>();

            var specializationsWithHours = request.JobSpecialization;

            var listEmployeeFreeInTime = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
            && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
            && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
            ).EmployerId == request.EmployerId)
            ).ToList();

            
            request.listJobSpecializationEmployeeDTO.ForEach(e =>
            {
                if (listEmployeeFreeInTime.FirstOrDefault(e2 => e2.Id == e.EmployeeId) == null)
                {
                    var newEmployee = new Employee();
                    newEmployee.Id = (Guid)e.EmployeeId;
                    listEmployeeFreeInTime.Add(newEmployee);
                }
            });

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
          

            request.JobSpecialization.ForEach(x=>
            {
                var employeeInJobDTOlist = new List<EmployeeInJobDTO>();

                var employeeInJobDTOList = new EmployeeInJobDTOList()
                {
                    HoursStart = x.Hours,
                    SpecializationId = x.SpecializationId,
                    End = request.End,
                    EmployeeInJobList = employeeInJobDTOlist
                };

                listEmployeeInJobDTOList.Add(employeeInJobDTOList);
            }
            );

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
                        employeeSpecialization = employeeSpecializationList.FirstOrDefault(x4 => x4.SpecializationId == x3.SpecializationId));


                        if ((employeeSpecialization == null && e2.Equals(lastExperianceDescending) && e3.Equals(lastSpecializationsWithHours) || employeeSpecialization != null)
                        && LastEmployeeId != e.Id)
                        {
                             var specializationMostHours = specializationsWithHours.OrderByDescending(x => x.Hours).First();

                            if (specializationMostHours.Hours < 0)
                            {
                                CanStartWork = true;

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
                                        allHours++; //zaokrąglamy powyzej potrzebnego czau
                                        sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                                    }

                                    int days = (int)allHours / 8;
                                    int leftHours = (int)allHours % 8; 
                                    if (leftHours != 0) days++; // jeżeli mamy reszte to dodajemy dzień i to ilość godzin pracy w kolejnym dniu

                                    var jobFunctions = new JobFunctions();
                                    var newDateEnd = jobFunctions.NewDateEnd(request.Start, days);
                                    listEmployeeInJobDTOList[FindIndexResult].End = newDateEnd;
                                    listEmployeeInJobDTOList[FindIndexResult].HoursInLastDay = leftHours;

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
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                    listEmployeeInJobDTOList[FindIndexResult].Hours = specializationsWithHours[FindIndex].Hours;

                                    double workAllEmployeeInSpecializationIn1h = 0;
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.ForEach(e =>
                                    {
                                        workAllEmployeeInSpecializationIn1h += ((double)40 / 100);
                                    });

                                    double allHours = 0;
                                    double sumWorkAllEmployeeInSpecializationIn1h = 0;

                                    while (sumWorkAllEmployeeInSpecializationIn1h < listEmployeeInJobDTOList[FindIndexResult].HoursStart)
                                    {
                                        allHours++; //zaokrąglamy powyzej potrzebnego czau
                                        sumWorkAllEmployeeInSpecializationIn1h += workAllEmployeeInSpecializationIn1h;
                                    }

                                    int days = (int)allHours / 8;
                                    int leftHours = (int)allHours % 8;
                                    if (leftHours != 0) days++; // jeżeli mamy reszte to dodajemy dzień i to ilość godzin pracy w kolejnym dniu

                                    var jobFunctions = new JobFunctions();
                                    var newDateEnd = jobFunctions.NewDateEnd(request.Start, days);
                                    listEmployeeInJobDTOList[FindIndexResult].End = newDateEnd;
                                    listEmployeeInJobDTOList[FindIndexResult].HoursInLastDay = leftHours;

                                }
                                var specializationMostHoursTemp = specializationsWithHours.OrderBy(x => x.Hours).First();
                                EndWorkDay = listEmployeeInJobDTOList.First(x => x.SpecializationId == specializationMostHoursTemp.SpecializationId).End;
                                EndWorkHours = listEmployeeInJobDTOList.First(x => x.SpecializationId == specializationMostHoursTemp.SpecializationId).HoursInLastDay;

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
                                    listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                    listEmployeeInJobDTOList[FindIndexResult].Hours = e3.Hours;

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
                                listEmployeeInJobDTOList[FindIndexResult].EmployeeInJobList.Add(employeeInJobDTO);
                                listEmployeeInJobDTOList[FindIndexResult].Hours = specializationsWithHours[FindIndex].Hours;

                                LastEmployeeId = e.Id;
                            }

                            
                        }
                    });
                });
            });
            // jako argument wysyłać czy zeszliśmy poniżej ustalonego czasu(czy będziemy mogli wgrać proace)(bool) - CanStartWork
            // konćowa data pracy dla skończenia pracy, wysłać jako argument - EndWorkDay
            // konćowa godzina skonczenia pracu, wysłać jako argument - EndWorkHours
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddJob([FromBody] JobDTO request)
        {
            var result = _mapper.Map<Job>(request);
            _context.Jobs.Add(result);
            await _context.SaveChangesAsync();

            var currentJobId = await _context.Jobs.OrderBy(x => x.Id).LastOrDefaultAsync();



            //będzie jeszcze przesyłana lista z user id i czas trwania pracy, na razie na sztywno dodane praametry
            var test111 = new List<Guid>();
            test111.Add(Guid.Parse("829d9fd0-3bf7-43f7-a28c-d80ee18e4472"));
            test111.Add(Guid.Parse("b0d3a1bf-04d8-4a31-bde1-80fcd1f88f75"));

            test111.ForEach(async x =>
            {
                var jobEmployee = new JobEmployee();

                jobEmployee.EmployerId = request.EmployerId;
                jobEmployee.EmployeeId = x;
                jobEmployee.JobId = currentJobId.Id;
                jobEmployee.IsNeed = false; // będzie trzeba przesyłać czy jest i zmienić tu
                jobEmployee.TimeStartJob = request.Start;
                jobEmployee.TimeFinishJob = request.End;

                _context.JobEmployees.Add(jobEmployee);
            });
            await _context.SaveChangesAsync();


            return Ok();
        }
    }
}
