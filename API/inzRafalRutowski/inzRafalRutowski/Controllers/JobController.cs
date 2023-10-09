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

            var listEmployeeFreeInTime = _context.Employees.Where(e => int.Equals(e.EmployerId, request.EmployerId)
            && !(_context.JobEmployees.FirstOrDefault(y => (y.EmployeeId == e.Id)
            && ((y.TimeStartJob <= request.Start && y.TimeFinishJob >= request.Start) || (y.TimeStartJob <= request.End && y.TimeFinishJob >= request.End))
            ).EmployerId == request.EmployerId)
            ).ToList();

            listEmployeeFreeInTime.ForEach(e => //wykonuje sie dla każdego wolnego pracownika
            {
                // _context.Specialization.fristordefault  -jeżeli nie znajdzie specjalizacji to będzie trzeba odjąć od specjalizacji z największą liczbą godzin
                // jak specjalizacja będzie miała liczbe godzina na minusie to nie brać jej ( może zrobić drugą lsite przechowująca specjalizacje,żeby ciagle nie sprawdzać tego)
                // jeżeli wszystkie specjalizacje będą miały godziny na minus, to inaczej obliczać (zapisane gdzieś mam jak)
                // listaUmiejetnoscimalejaco.ForEach(porownanie umiejetnosci najlepszej + praca z jeszcze 1 ForEach.specializationsWithHours(SpecializationId == praca))

                //aby wyjść z foreach jeżeli znajdziemy specjalizacje czyli nie bedzie null zrobić warunetk if(specjalizacja !=null) return true


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
