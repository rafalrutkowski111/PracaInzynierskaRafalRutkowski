using AutoMapper;
using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public ActionResult<List<JobDTO>> GetJobs() //[FromRoute] int id
        {
            var restult =_context.Jobs.ToList();

            var resultDTO = _mapper.Map<List<JobDTO>>(restult);

            return Ok(resultDTO);
        }

        [HttpPost("JobSpecialization")]
        public IActionResult SpecialisationInJob([FromBody] JobSpecializationDTO request)
        {
            var restult = new List<JobSpecializationEmployeeDTO>();

            request.JobSpecialization.ForEach(e => // do poprawy uwzględniając czas
            {
                var SmployeeSpecialization = _context.EmployeeSpecializations.FirstOrDefault(x => int.Equals(x.SpecializationId, e.SpecializationId) 
                && _context.Employees.FirstOrDefault(y => string.Equals(y.Id ,x.EmployeeId)).EmployerId == request.EmployerId
                && _context.Experiences.FirstOrDefault(y=> int.Equals(y.Id, x.ExperienceId)).experienceValue >=70); // 70 waga - stała

                var jobSpecializationEmployee = new JobSpecializationEmployeeDTO();

                jobSpecializationEmployee.SpecializationId = e.SpecializationId;
                jobSpecializationEmployee.SpecializationName = _context.Specializations.FirstOrDefault(x => int.Equals(x.Id, e.SpecializationId)).Name;

                if(SmployeeSpecialization != null) jobSpecializationEmployee.HaveSpecialist = true;
                else jobSpecializationEmployee.HaveSpecialist = false;
                if (SmployeeSpecialization != null) jobSpecializationEmployee.EmployeeId = SmployeeSpecialization.EmployeeId;

                    restult.Add(jobSpecializationEmployee);
            });

            return Ok();
        }

        [HttpPost]
        public IActionResult AddJob([FromBody] JobDTO request)
        {
            var result = _mapper.Map<Job>(request);
            _context.Jobs.Add(result);
            _context.SaveChangesAsync();

            return Ok(result);
        }
    }
}
