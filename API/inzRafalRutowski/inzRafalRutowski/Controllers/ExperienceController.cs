using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IExperienceService _service;

        public ExperienceController(DataContext context, IExperienceService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Experience>> GetExperience([FromQuery] int employerId)
        {
            var result = _service.GetExperience(employerId);
            if (result == null) return BadRequest("Id pracodawny jest niepoprawne");
            else return Ok(result);
        }

        [HttpPut]
        public IActionResult AddExperience([FromBody] Experience request)
        {       
            return Ok(_service.AddExperience(request));
        }
        [HttpPost]

        public ActionResult<Experience> EditExperience([FromBody] EditExperianceDTO request)
        {
            var result = _service.EditExperience(request);

            if (!result) return BadRequest("Id doświadczenia jest niepoprawne");
            return Ok();
        }

        [HttpGet("checkCanModify")]
        public ActionResult<Experience> CheckIfCanModifyExperience([FromQuery] int experianceId, int employerId, int value, bool edit)
        {
            var canModify = true;
            var listEmployees = _context.Employees.Where(x => int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.ExperienceId, experianceId)) != null)
                    canModify = false;

            });

            if (edit && (_context.Experiences.First(x => int.Equals(x.Id, experianceId)).ExperienceValue == value))
                canModify = true;
            return Ok(canModify);
        }

        [HttpDelete]
        public ActionResult<Experience> DeleteExperience(int experianceId)
        {
            var result = _context.Experiences.First(x => int.Equals(x.Id, experianceId));
            _context.Experiences.Remove(result);
            _context.SaveChanges();
            return Ok();
        }
    }
}
