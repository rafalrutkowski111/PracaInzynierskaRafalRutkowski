using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Identity;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : HomeController
    {
        private readonly DataContext _context;
        private readonly IExperienceService _service;
        private readonly IJwtService _jwtService;

        public ExperienceController(DataContext context, IExperienceService service, IJwtService jwtService) :base (jwtService)
        {
            _context = context;
            _service = service;
            _jwtService = jwtService;
        }

        //[Authorize(Policy = IdentityData.AdminUserPolicyName)]
        //[Authorize(Roles = _context)]
        //[RequiresClaim(IdentityData.AdminUserClaimName, "True")]
        [HttpGet]
        public ActionResult<List<Experience>> GetExperience([FromQuery] int employerId)
        {
            if (!CheckAuthoriationOwnUserOrAdmin(employerId)) return Unauthorized(); // ustawienie dostepu do zalogowanej osoby lub admina

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

        // zrefaktoryzowac
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

            var result = _service.Delete(experianceId);

            if(!result) return BadRequest("Id doświadczenia jest niepoprawne");
            return Ok();
        }
    }
}
