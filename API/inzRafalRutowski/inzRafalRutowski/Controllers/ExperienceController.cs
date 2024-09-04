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

        [HttpGet("checkCanModify")]
        public ActionResult<Experience> CheckIfCanModifyExperience([FromQuery] int experianceId, int employerId, int value, bool edit)
        {
            var result = _service.CheckCanModify(experianceId, employerId, value, edit);
            if (result == -1) return BadRequest("Id doświadczenia jest niepoprawne");
            else if (result == -2) return BadRequest("Id pracownika jest niepoprawne");
            else if (result == 0) return Ok(true);
            return Ok(false);

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
