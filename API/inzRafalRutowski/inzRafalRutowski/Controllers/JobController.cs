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
                && _context.Experiences.FirstOrDefault(y => int.Equals(y.Id, x.ExperienceId)).experienceValue >= 70 // 70 waga - stała
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

            return Ok(new { specializationList = restult, isOpenModalSpecialization = isOpenModalSpecialization,
                searchEmployee = employeeDTOListInList, listEmployeeSpecializationListEmplty = listEmployeeSpecializationListEmplty });
        }

        [HttpPost("JobEmployee")]
        public IActionResult EmployeeInJob([FromBody] ListJobSpecializationEmployeeDTO request)
        {

            var specializationsWithHours = request.JobSpecialization;

            var specializationsWithHoursSearch = new List<ListJobSpecializationCopy>(specializationsWithHours.Count);

            request.JobSpecialization.ForEach(e =>
            {
                specializationsWithHoursSearch.Add(new ListJobSpecializationCopy(e));
            });

            var listEmployeeFreeInTime = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
            && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
            && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
            ).EmployerId == request.EmployerId)
            ).ToList();

            var experianceDescending = _context.Experiences.OrderByDescending(x => x.experienceValue).Where(x=> int.Equals(x.EmployerId, request.EmployerId) || int.Equals(x.EmployerId, null)).ToList();

            var listEmployeeSpecialization = new List<EmployeeSpecialization>();

            var lastExperianceDescending = experianceDescending.Last();
            var lastSpecializationsWithHours = specializationsWithHours.Last();
            Guid LastEmployeeId = new Guid();

            var jobFunctions = new JobFunctions();
            var numberOfWorkDaysWithWeekend = request.End.Subtract(request.Start).Days;
            var numberOfWorkDays = jobFunctions.NumberOfWorkDays(request.Start, numberOfWorkDaysWithWeekend);
            int hoursWorkInDay = 8;

            listEmployeeFreeInTime.ForEach(e =>
            {
                experianceDescending.ForEach(e2 =>
                {
                    specializationsWithHours.ForEach(e3 =>
                    {
                        var employeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(e4 => e4.ExperienceId == e2.Id
                        && e4.SpecializationId == e3.SpecializationId
                        && e4.EmployeeId == e.Id
                        );

                        //spradzać czy godziny w specjalizacji są na minusie i czy wszystkie specjalizacje są na minusie

                        if ((employeeSpecialization == null && e2.Equals(lastExperianceDescending) && e3.Equals(lastSpecializationsWithHours) || employeeSpecialization != null)
                        && LastEmployeeId != e.Id)
                        {
                            e3.Hours -= (numberOfWorkDays * hoursWorkInDay);// * (e2.experienceValue / 100); //to trzeba zmienić na double bo sie wyniki psują
                            if (employeeSpecialization != null)
                            {
                                //e3.Hours -= (numberOfWorkDays * hoursWorkInDay) * (e2.experienceValue / 100);
                            }

                            LastEmployeeId = e.Id;
                            listEmployeeSpecialization.Add(employeeSpecialization);
                        }
                    });

                });


            });
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
