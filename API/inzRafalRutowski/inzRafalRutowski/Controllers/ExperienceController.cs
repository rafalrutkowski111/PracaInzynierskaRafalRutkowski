using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly DataContext _context;

        public ExperienceController(DataContext context)
        {
            _context = context;
        }

        [HttpPut]
        public IActionResult AddExperience([FromBody] Experience request)
        {
            _context.Experiences.Add(request);
            _context.SaveChanges();
            return Ok(request);
        }

        [HttpGet]
        public ActionResult<List<Experience>> GetExperience([FromQuery] int employerId)
        {
            var result = _context.Experiences.Where(x => int.Equals(x.EmployerId, employerId) || int.Equals(x.EmployerId, null));

            return Ok(result);
        }

        [HttpGet("checkCanModify")]
        public ActionResult<Experience> CheckCanModify([FromQuery] int experianceId, int employerId)
        {
            var canModify = true;
            var listEmployees = _context.Employees.Where(x=> int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.ExperienceId, experianceId)) != null)
                    canModify = false;

            });
            return Ok(canModify);
        }
    }
}
